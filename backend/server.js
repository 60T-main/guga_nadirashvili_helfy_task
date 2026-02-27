import express from 'express'
import cors from 'cors';

// Routes imports
import tasksRouter from '#routes/tasks.js'

// Middleware imports
import errorHandler from '#middleware/errorHandler.js'


// App initialization
const app = express();

// Cors
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Port Number
const PORT = 4000;


// Parse JSON request bodies
app.use(express.json());


// Routes
app.use('/api/tasks', tasksRouter);



// Middleware
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});