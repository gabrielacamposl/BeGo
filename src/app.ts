import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import { errorHandler } from './middlewares/error';


export const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


app.get('/health', (_, res) => res.json({ ok: true }));


app.use('/api', router);


app.use(errorHandler);