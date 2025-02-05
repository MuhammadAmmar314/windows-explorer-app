import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { fileRoutes } from './routes/fileRoutes';
import { folderRoutes } from './routes/folderRoutes';

const app = new Elysia()
  .use(cors({ origin: 'http://localhost:5173' })) // Mengizinkan request dari localhost:5173
  .use(folderRoutes)
  .use(fileRoutes)
  .get('/test', () => {
    return app.routes.map(r => ({
      method: r.method,
      path: r.path
    }))
  })
  .listen(3000);

console.log('Server running at http://localhost:3000');
