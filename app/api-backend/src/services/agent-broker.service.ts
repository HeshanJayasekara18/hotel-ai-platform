import { SocketService } from './socket.service';

export class AgentBrokerService {
  constructor(private readonly socketService: SocketService) {}

  public async processUserInput(userId: string, text: string) {
    console.log(`[AgentBroker] Processing input for ${userId}: ${text}`);
    
    // Simulate AI Agent processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock AI Agent logic based on keyword
    if (text.toLowerCase().includes('presidential')) {
      this.socketService.sendAgentMessage(userId, {
        text: 'The Presidential Suite is our most luxurious room! Let me take you there now.',
        timestamp: new Date().toISOString(),
      });
      
      this.socketService.navigateUser(userId, {
        path: '/rooms/presidential',
        reason: 'Requested presidential suite details',
      });
    } else if (text.toLowerCase().includes('cheap') || text.toLowerCase().includes('budget')) {
      this.socketService.sendAgentMessage(userId, {
        text: 'We have some great standard rooms available. Let me show you.',
        timestamp: new Date().toISOString(),
      });

      this.socketService.navigateUser(userId, {
        path: '/rooms',
        reason: 'Requested budget rooms',
      });
    } else {
      this.socketService.sendAgentMessage(userId, {
        text: 'I can help you find the perfect room. Are you looking for something specific?',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
