let express = require('express');
let app = express();
let request = require('request');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let campgrounds = [
  {name: "Silver Creek", img: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
  {name: "Pilgram's Rest", img: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "Sunderland Pass", img: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"}
];

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
  //get data from form and add to campgrounds array
  let name = req.body.name;
  let img = req.body.image;
  let newCampground = {name: name, img: img};
  campgrounds.push(newCampground);
  //redirect back to campgrounds page
  res.redirect('/campgrounds');
})

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
})

app.listen(3000, () => {
  console.log('Open browser on port 3000');
})