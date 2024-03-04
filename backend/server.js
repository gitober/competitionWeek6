require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const customMiddleware = require('./middleware/customMiddleware');
const userRouter = require('./routers/userRouter');
const goalRouter = require('./routers/goalRouter');

// express app
const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use(customMiddleware.requestLogger);

app.get('/', (req, res) => res.send('API Running!'));

app.use('/api/users', userRouter);
app.use('/api/goals', goalRouter);

app.use(customMiddleware.unknownEndpoint);
app.use(customMiddleware.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
