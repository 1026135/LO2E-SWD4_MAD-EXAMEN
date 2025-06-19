// backend/index.js
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const config = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  server: 'YOUR_DB_SERVER',
  database: 'YOUR_DB_NAME',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

app.post('/log', async (req, res) => {
  const { username, number } = req.body;
  const timestamp = new Date().toISOString();

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO NumberLog (Username, SentNumber, Timestamp)
      VALUES (${username}, ${number}, ${timestamp})
    `;
    res.status(200).json({ message: 'Logged successfully' });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));