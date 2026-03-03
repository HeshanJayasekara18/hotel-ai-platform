import { FastifyInstance } from 'fastify';
import { BookingController } from '../controllers/booking.controller';

export default async function bookingRoutes(fastify: FastifyInstance) {
  fastify.post('/check', BookingController.checkAvailability);
  fastify.post('/hold', BookingController.holdRoom);
}
