import type { FastifyBaseLogger } from "fastify";
import { Server as SocketIOServer } from "socket.io";
import type {
  AgentMessagePayload,
  ClientNavigatePayload,
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  UserInputPayload
} from "../types/socket-events";

import type { AgentBrokerService } from "./agent-broker.service";

type SocketServer = SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export class SocketService {
  private readonly activeConnections = new Map<string, Set<string>>();
  public agentBroker?: AgentBrokerService;

  constructor(
    private readonly io: SocketServer,
    private readonly logger: FastifyBaseLogger
  ) {
    this.registerConnectionHandlers();
  }

  navigateUser(userId: string, payload: ClientNavigatePayload): boolean {
    const socketIds = this.activeConnections.get(userId);

    if (!socketIds || socketIds.size === 0) {
      this.logger.warn({ userId, event: "CLIENT_NAVIGATE" }, "No active socket for user");
      return false;
    }

    for (const socketId of socketIds) {
      this.io.to(socketId).emit("CLIENT_NAVIGATE", payload);
    }

    this.logger.info(
      { userId, event: "CLIENT_NAVIGATE", connectionCount: socketIds.size },
      "Pushed event to user sockets"
    );
    return true;
  }

  sendAgentMessage(userId: string, payload: AgentMessagePayload): boolean {
    const socketIds = this.activeConnections.get(userId);

    if (!socketIds || socketIds.size === 0) {
      this.logger.warn({ userId, event: "AGENT_MESSAGE" }, "No active socket for user");
      return false;
    }

    for (const socketId of socketIds) {
      this.io.to(socketId).emit("AGENT_MESSAGE", payload);
    }

    this.logger.info(
      { userId, event: "AGENT_MESSAGE", connectionCount: socketIds.size },
      "Pushed event to user sockets"
    );
    return true;
  }

  private registerConnectionHandlers(): void {
    this.io.on("connection", (socket) => {
      const handshakeUserId = this.extractUserIdFromHandshake(socket.handshake.auth?.userId);

      if (handshakeUserId) {
        this.bindSocketToUser(handshakeUserId, socket.id);
        socket.data.userId = handshakeUserId;
      }

      this.logger.info({ socketId: socket.id, userId: socket.data.userId }, "Socket connected");

      socket.on("USER_INPUT", (payload: UserInputPayload) => {
        if (payload.userId && payload.userId !== socket.data.userId) {
          this.unbindSocket(socket.data.userId, socket.id);
          this.bindSocketToUser(payload.userId, socket.id);
          socket.data.userId = payload.userId;
        }

        this.logger.info(
          { socketId: socket.id, userId: payload.userId, textLength: payload.text.length },
          "Received USER_INPUT event"
        );

        // Process through Agent Broker
        if (this.agentBroker) {
          this.agentBroker.processUserInput(payload.userId, payload.text).catch((err: any) => {
            this.logger.error({ err, userId: payload.userId }, "Error processing user input via agent broker");
          });
        }
      });

      socket.on("disconnect", () => {
        this.unbindSocket(socket.data.userId, socket.id);
        this.logger.info({ socketId: socket.id, userId: socket.data.userId }, "Socket disconnected");
      });
    });
  }

  private bindSocketToUser(userId: string, socketId: string): void {
    const existing = this.activeConnections.get(userId) ?? new Set<string>();
    existing.add(socketId);
    this.activeConnections.set(userId, existing);
  }

  private unbindSocket(userId: string | undefined, socketId: string): void {
    if (!userId) {
      return;
    }

    const existing = this.activeConnections.get(userId);

    if (!existing) {
      return;
    }

    existing.delete(socketId);
    if (existing.size === 0) {
      this.activeConnections.delete(userId);
    }
  }

  private extractUserIdFromHandshake(rawUserId: unknown): string | undefined {
    if (typeof rawUserId !== "string") {
      return undefined;
    }

    const userId = rawUserId.trim();
    return userId.length > 0 ? userId : undefined;
  }
}
