let express = require('express');
let app = express();
let request = require('request');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let CampSite = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/camp_site', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// CampSite.create(
//   {
//     name: "Silver Creek", 
//     img: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
//     description: "Wonderful site in open fields."
//   }, function(err, campsite) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("Newly created campsite", campsite);
//     }
//   });

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  CampSite.find({}, (err, allCampsites) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {campgrounds: allCampsites});
    }
  });
});

app.post('/campgrounds', (req, res) => {
  //get data from form
  let name = req.body.name;
  let img = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, img: img, description: desc};
  //create a new camp site and save to db
  CampSite.create(newCampground, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
  
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
})

app.get('/campgrounds/:id', (req, res) => {
  CampSite.findById(req.params.id, (err, foundCampsite) => {
    if(err) {
      console.log(err)
    } else {
      res.render('show', {campground: foundCampsite});
    }
  });
  
 
});

app.listen(3000, () => {
  console.log('Open browser on port 3000');
})