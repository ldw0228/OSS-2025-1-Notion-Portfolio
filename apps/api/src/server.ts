import express from 'express';
import cors from 'cors';
import { portfolioRouter } from './routes/portfolio';

export const createServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/portfolio', portfolioRouter);

    app.get('/health', (req, res) => {
        res.json({ status: 'ok' });
    });

    return app;
};
