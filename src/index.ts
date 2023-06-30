import 'dotenv/config';
import express, { Request, Response, Application } from 'express';
import ApiRouter from './apis';
import cors from 'cors';
import connect from './loader/mongoose';
import GoogleAuthRouter from './apis/googleAuth';
import cookieParser from 'cookie-parser';
import config from './config';

const app: Application = express();
const PORT = process.env.PORT || 8000;
const { clientURI } = config;

app.get('/', (req: Request, res: Response): void => {
    res.send('blabla');
});

app.use(cors({
    origin: clientURI,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api', ApiRouter);
app.use('/', GoogleAuthRouter);

app.listen(PORT, ():void => {
    connect();
    console.log(`Server is running on PORT ${PORT}`);
});