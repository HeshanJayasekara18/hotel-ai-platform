import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/db';

export class RoomController {
  static async getRooms(request: FastifyRequest, reply: FastifyReply) {
    try {
      const rooms = await prisma.room.findMany();
      return reply.send(rooms);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getRoomById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const room = await prisma.room.findUnique({
        where: { id },
      });

      if (!room) {
        return reply.status(404).send({ error: 'Room not found' });
      }

      return reply.send(room);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
