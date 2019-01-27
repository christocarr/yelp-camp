let mongoose = require('mongoose');

let campSiteShema = new mongoose.Schema({
  name: String,
  img: String,
  description: String
});

module.exports = mongoose.model("Campsite", campSiteShema);