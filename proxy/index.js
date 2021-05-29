const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/upload', (req, res) => {
  request(
    { url: 'http://localhost:5000/upload' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));