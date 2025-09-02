import cors from 'cors';
import express from 'express';
import userRouter from './routers/userRouter'


const server = express();
const port = process.env.PORT || 3000;

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));


server.use('/user', userRouter)

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
