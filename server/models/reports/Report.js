const slug = require("mongoose-slug-generator", {
  truncate: 35
});

const mongoose = require("mongoose");
mongoose.plugin(slug);


const Report = mongoose.model("Report", {
  title: {
    type: String,
    required: true
  },
  form_link: String,
  slug: { type: String, slug: ["title"], unqiue: true },
  subject: {
    name: String,
    trip_date: String,
    age: Number,
    location: String,
    gender: String,
  },
  substance: {
    name: String,
    dose: String,
    roa: String
  },
  introduction: String,
  description: String,
  onset: [{
    time: String,
    description: String,
  }],
  peak: [{
    time: String,
    description: String,
  }],
  offset: [{
    time: String,
    description: String,
  }],
  conclusion: String,
  tags: [String],
  sectionVisibility: Object
});

module.exports = Report;
