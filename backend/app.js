import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import booksRoutes from './routes/bookRoutes.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT;
const mongoDB = process.env.DB_URL;

const app = express();
//middleware for parsing json content
app.use(express.json());
//middleware for handling cors policy
app.use(cors());
//or for more controll
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)

app.get('/', (req, res)=>{
    console.log(req);
    return res.status(234).send("Hello from Prince");
})

app.use('/books', booksRoutes);



mongoose
    .connect(mongoDB)
    .then(() => {

        console.log("App connected to database successfully");

        app.listen(port, () => {
            console.log(`App started successfully on port: ${port}`);
        })
    }

    )
    .catch((error)=>{
        console.log({message: 'An error occured', data: error});
    })