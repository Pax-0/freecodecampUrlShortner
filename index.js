require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let urls = [ ];
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: false }));
app.use(express.raw())
app.use(express.json()); 

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  console.log(req.body)
  let shortend = {original_url: req.body.url, short_url: urls.length};
  // urls.push(shortend);
  
  res.json({ original_url : req.body.url, short_url : shortend.short_url});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
