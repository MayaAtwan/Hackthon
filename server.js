const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs').promises;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to check if a user is logged in
const checkLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware to check if a user with the given email already exists during signup
const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingData = await fs.readFile('users.json', 'utf-8');
    const users = JSON.parse(existingData);

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      res.status(400).json({ message: 'User with this email already exists' });
    } else {
      next();
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

app.post('/signup', checkUserExists, async (req, res) => {
  try {
    const { email, fullName, age, phone, password } = req.body;

    let users = [];
    try {
      const existingData = await fs.readFile('users.json', 'utf-8');
      users = JSON.parse(existingData);
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        throw readError;
      }
    }

    users.push({ email, fullName, age, phone, password });

    await fs.writeFile('users.json', JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingData = await fs.readFile('users.json', 'utf-8');
    const users = JSON.parse(existingData);

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      req.session.user = { email: user.email, fullName: user.fullName }; // Store user information in the session
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Example protected route
app.get('/protected', checkLoggedIn, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.session.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
