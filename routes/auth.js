onst express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    function (err) {
      if (err) return res.status(400).json({ error: 'Email already registered.' });
      res.json({ message: 'User registered successfully!' });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Invalid email or password.' });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid email or password.' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
