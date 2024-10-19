import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { initializeDatabase } from './src/lib/db';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
let port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const startServer = (retries = 0) => {
    server.listen(port, async () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      
      try {
        await initializeDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    }).on('error', (e: NodeJS.ErrnoException) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying with port ${port + 1}`);
        port++;
        if (retries < 10) {
          startServer(retries + 1);
        } else {
          console.error('Failed to find an open port after 10 retries');
          process.exit(1);
        }
      } else {
        console.error('Failed to start server:', e);
        process.exit(1);
      }
    });
  };

  startServer();
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});