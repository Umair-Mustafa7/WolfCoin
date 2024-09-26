const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow CORS
app.use(express.json()); // Parse JSON body data

// Connect to MongoDB
mongoose.connect('mongodb+srv://skyshipstorelimited:ywMaxfvNddBrMmLX@cluster0.hfrku.mongodb.net/wolftest?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

const telegramRoutes = require('./routes/telegramRoutes');
app.use('/api/telegram', telegramRoutes);

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
