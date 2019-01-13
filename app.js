let express = require('express');
let app = express();
let request = require('request');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/camp_site', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//schema setup
let campSiteShema = new mongoose.Schema({
  name: String,
  img: String
});

let CampSite = mongoose.model("Campsite", campSiteShema);

// CampSite.create(
//   {
//     name: "Silver Creek", img: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"
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
      res.render('campgrounds', {campgrounds: allCampsites});
      console.log(allCampsites)
    }
  });
});

app.post('/campgrounds', (req, res) => {
  //get data from form
  let name = req.body.name;
  let img = req.body.image;
  let newCampground = {name: name, img: img};
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

app.listen(3000, () => {
  console.log('Open browser on port 3000');
})