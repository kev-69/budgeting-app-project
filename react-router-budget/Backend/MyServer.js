import express, { json } from 'express';
import { connect, connection } from 'mongoose';
require('dotenv').config({ path: './MyBD.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection set up
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(json());

// Routes
app.use('/api/budgets', require('./Routes/budgets').default);
app.use('/api/expenses', require('./Routes/expenses').default);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});