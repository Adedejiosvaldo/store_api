const mongoose = require("mongoose");

const conenctDB = (url) => {
  return mongoose.connect(url);
};
