const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
  })
);

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingData = await fs.readFile('users.json', 'utf-8');
    const users = JSON.parse(existingData);

    const user = users.find((user) => user.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { email: user.email, fullName: user.fullName };
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
