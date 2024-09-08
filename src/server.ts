import Fastify from 'fastify';
import { generateUniqueId, decodeUniqueId } from './idController';

const server = Fastify({ logger: true });

// Rota para gerar o ID único
server.get('/generate-id', async (request, reply) => {
  const uniqueId = generateUniqueId();
  return { id: uniqueId };
});

// Rota para decodificar o ID
server.get('/decode-id', async (request, reply) => {
  const { id } = request.query as { id: string };
  try {
    const decoded = decodeUniqueId(id);
    return { creationDate: decoded.creationDate, machineId: decoded.machineId };
  } catch (error) {
    return reply.status(400).send({ error: 'Invalid ID format' });
  }
});

// Iniciando o servidor
const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
