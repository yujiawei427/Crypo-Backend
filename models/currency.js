const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
  name: String,
  date: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: String,
  marketCap: String,
});

const currencyModel = mongoose.model('Currency', currencySchema); //collection name

module.exports = currencyModel;

