export interface ClientNavigatePayload {
  path: string;
  reason?: string;
}

export interface AgentMessagePayload {
  text: string;
  timestamp: string;
}

export interface UserInputPayload {
  userId: string;
  text: string;
}

export interface ServerToClientEvents {
  CLIENT_NAVIGATE: (payload: ClientNavigatePayload) => void;
  AGENT_MESSAGE: (payload: AgentMessagePayload) => void;
}

export interface ClientToServerEvents {
  USER_INPUT: (payload: UserInputPayload) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId?: string;
}
