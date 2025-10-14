import express, { Request, Response } from 'express';
import path from 'path';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 4000;
const API_URL = process.env.API_URL || 'http://localhost:5000';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API Proxy endpoints
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi kết nối đến API' });
  }
});

app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi kết nối đến API' });
  }
});

app.get('/api/health', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Backend không khả dụng' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend server đang chạy tại http://localhost:${PORT}`);
  console.log(`📡 Kết nối API tại ${API_URL}`);
});

