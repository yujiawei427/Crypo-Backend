const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
  Currency: String,
  Date: Date,
  Open: Number,
  High: Number,
  Low: Number,
  Close: Number,
  Volume: String,
  MarketCap: String,
});

const currencyModel = mongoose.model('Currency', currencySchema); //collection name

module.exports = currencyModel;

