import express, { json } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/database.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL

// CORS policy
app.use(cors())

// Database connection
connectDB(DATABASE_URL);

//JSON
app.use(express.json())

// Routes
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})