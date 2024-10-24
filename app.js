// app.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import countriesRoutes from './routes/countries.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', countriesRoutes);

// Middleware para manejar errores
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
