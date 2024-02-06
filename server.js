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

// ... (your signup and login routes)

app.get('/profilePage', (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      res.status(200).json({ fullName: user.fullName, email: user.email });
    } else {
      res.status(401).json({ message: 'User not logged in' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
app.post('/signup', async (req, res) => {
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

    users.push({ email, fullName, age, phone, password }); // Store the password as a string

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

// Assuming you have a `users.json` file to store user data
const usersFilePath = 'users.json';

app.post('/answer-question', (req, res) => {
  try {
    const { userId, isCorrect } = req.body;

    // Read the existing user data from the file
    const existingData = fs.readFileSync(usersFilePath, 'utf-8');
    let users = JSON.parse(existingData);

    // Find the user by ID
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      // Update the user's coin balance based on the correctness of the answer
      users[userIndex].coins += isCorrect ? 1 : 0; // Update based on your logic

      // Save the updated user data back to the file
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

      res.status(200).json({ message: 'Answer submitted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
