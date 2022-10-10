import express from 'express';
import router from './src/controllers/image.controller';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3100;

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.use(express.json())

app.use('/api/unsplash', router)

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})