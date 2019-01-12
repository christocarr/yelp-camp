let express = require('express');
let app = express();
let request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  let campgrounds = [
    {name: "Silver Creek", img: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
    {name: "Pilgram's Rest", img: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Sunderland Pass", img: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"}
  ];
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/results', (req, res) => {
  request('http://www.omdbapi.com/?s=night&apikey=thewdb', (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let data = JSON.parse(body);
      res.render('results', {data: data});
    } 
  })
});

app.listen(3000, () => {
  console.log('Open browser on port 3000');
})