require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const urls = [];
const axios = require('axios').default;
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.get('/api/shorturl/:short_url', function(req, res) {
  let url = urls[req.params.short_url];
  
  if(url){
    res.redirect(url.original_url)
  }else{
    res.sendStatus(404)
  }
});
app.post('/api/shorturl', async function(req, res) {
  try {
    await axios.get(req.body.url);
  } catch (error) {
    return res.json({ error: 'invalid url' }); 
  }

  let shortend = {original_url: req.body.url, short_url: urls.length};
 
  urls.push(shortend);
  res.json({ original_url : req.body.url, short_url : shortend.short_url});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
