import Fastify from "fastify";
import { z } from "zod";
import { Server as SocketIOServer } from "socket.io";
import { SocketService } from "./services/socket.service";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "./types/socket-events";

import { AgentBrokerService } from "./services/agent-broker.service";
import roomRoutes from "./routes/room.routes";
import bookingRoutes from "./routes/booking.routes";

const app = Fastify({
  logger: true
});

const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(app.server, {
  cors: {
    origin: true
  }
});

const socketService = new SocketService(io, app.log);
const agentBroker = new AgentBrokerService(socketService);
socketService.agentBroker = agentBroker;

app.register(roomRoutes, { prefix: "/api/rooms" });
app.register(bookingRoutes, { prefix: "/api/bookings" });

const navigateSchema = z.object({
  userId: z.string().min(1),
  path: z.string().min(1),
  reason: z.string().optional()
});

app.get("/health", async () => {
  return { status: "ok" };
});

app.post("/realtime/navigate", async (request, reply) => {
  const parsed = navigateSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      message: "Invalid payload",
      issues: parsed.error.flatten()
    });
  }

  const delivered = socketService.navigateUser(parsed.data.userId, {
    path: parsed.data.path,
    reason: parsed.data.reason
  });

  return reply.status(202).send({ delivered });
});

const start = async (): Promise<void> => {
  try {
    const port = Number(process.env.PORT ?? 4000);
    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`API server listening on port ${port}`);
  } catch (error) {
    app.log.error(error, "Failed to start API server");
    process.exit(1);
  }
};

void start();
