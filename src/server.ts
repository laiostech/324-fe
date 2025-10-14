import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(
  express.static(path.join(__dirname, '../public'), {
    maxAge: isDevelopment ? 0 : '1d',
    etag: !isDevelopment,
    lastModified: !isDevelopment,
    cacheControl: true,
    setHeaders: (res) => {
      if (isDevelopment) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
    }
  })
);

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Main route
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: '324 Frontend Server',
    version: '2.0.0',
    description: 'Hoi nghi tong ket hoat dong CTD va PTTN Su doan 324 - Video Streaming Page',
    endpoints: {
      main: '/',
      health: '/health',
      api: '/api'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log(`   Frontend Server dang chay`);
  console.log('   =======================================');
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Started at: ${new Date().toLocaleString('vi-VN')}`);
  console.log('   =======================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  process.exit(0);
});
