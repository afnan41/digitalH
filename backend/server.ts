import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const corsOptions = {
  origin: 'http://localhost:3000', // Limit to specific frontend origin
  methods: 'GET,POST,PUT,DELETE',
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// API Routes
app.use('/api', userRoutes);

// Health check route
app.get('/', (_, res) => {
  res.send('🚀 API is running!');
});

// Global error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
