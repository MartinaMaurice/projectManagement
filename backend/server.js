const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const metricRoutes = require('./routes/metricRoutes');
const examAdminRoutes = require('./routes/examAdminRoutes'); // Update to use new routes
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); // Import the cors package

dotenv.config();

connectDB();

const app = express();

app.use(cors()); // Use the cors middleware
app.use(express.json());

app.use('/users', userRoutes);
app.use('/notifications', notificationRoutes);
app.use('/metrics', metricRoutes);
app.use('/examsAdmin', examAdminRoutes); // Update to use new routes

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
