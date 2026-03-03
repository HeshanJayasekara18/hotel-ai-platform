import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/db';

export class BookingController {
  static async checkAvailability(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roomId, startDate, endDate } = request.body as {
        roomId: string;
        startDate: string;
        endDate: string;
      };

      if (!roomId || !startDate || !endDate) {
        return reply.status(400).send({ error: 'Missing required fields' });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      // Simple implementation: check if room exists and is available
      // In a real system, we would query overlapping bookings
      const room = await prisma.room.findUnique({
        where: { id: roomId },
        include: {
          bookings: {
            where: {
              AND: [
                { startDate: { lte: end } },
                { endDate: { gte: start } },
                { status: { not: 'CANCELLED' } },
              ],
            },
          },
        },
      });

      if (!room) {
        return reply.status(404).send({ error: 'Room not found' });
      }

      const isAvailable = room.isAvailable && room.bookings.length === 0;

      return reply.send({ isAvailable, room });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async holdRoom(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { roomId, userId, startDate, endDate } = request.body as {
        roomId: string;
        userId: string;
        startDate: string;
        endDate: string;
      };

      if (!roomId || !userId || !startDate || !endDate) {
        return reply.status(400).send({ error: 'Missing required fields' });
      }

      // In real scenario, we'll verify availability then create pending booking
      const booking = await prisma.booking.create({
        data: {
          roomId,
          userId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          status: 'PENDING',
        },
      });

      return reply.status(201).send(booking);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
