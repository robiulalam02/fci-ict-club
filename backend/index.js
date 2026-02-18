const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 5000;

// 1. Basic Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://fciictclub2026.web.app', 'https://fciictclub2026.firebaseapp.com', 'https://fciictclub.com'],
    credentials: true
}));
app.use(express.json());
app.set('trust proxy', 1);

// 2. Immediate Health Check (Prevents cPanel Timeout)
app.get('/', (req, res) => {
    res.status(200).send('🚀 FCI ICT Club Server is flying high!');
});

// 3. Auth Routes
app.post('/api/jwt', (req, res) => {
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET || 'secret', { expiresIn: '1h' });
    res.send({ token });
});
app.post('/api/logout', (req, res) => res.send({ success: true }));

// 4. API Routes
app.use(apiRoutes);

// 5. Export for Passenger (Crucial for cPanel)
module.exports = app;

// 6. Local Development Listener
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    app.listen(port, () => console.log(`🚀 Local Server running on port ${port}`));
}