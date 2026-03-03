import { FastifyInstance } from 'fastify';
import { RoomController } from '../controllers/room.controller';

export default async function roomRoutes(fastify: FastifyInstance) {
  fastify.get('/', RoomController.getRooms);
  fastify.get('/:id', RoomController.getRoomById);
}
