import express, { Application } from 'express';
import apiRoutes from './routes/api.route';
import cors from 'cors';

const app: Application = express();
const PORT = 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'authentication'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Bot server is running on http://localhost:${PORT}`);
});
