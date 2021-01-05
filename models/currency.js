const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
  Currency: String,
  Date: Date,
  Open: String,
  High: String,
  Low: String,
  Close: String,
  Volume: String,
  MarketCap: String,
});

const currencyModel = mongoose.model('Currency', currencySchema); //collection name

module.exports = currencyModel;

