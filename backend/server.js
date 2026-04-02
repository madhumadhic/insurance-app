const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes');
const claimRoutes = require('./routes/claimRoutes');

app.use('/api/users', userRoutes);
app.use('/api/policy', policyRoutes);
app.use('/api/claims', claimRoutes);

app.get('/', (req, res) => {
  res.send('SmartCover Backend Running 🚀');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
