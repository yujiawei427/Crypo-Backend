const Currency = require('../models/currency');
const currencyRoutes = (app, fs) => {
  //read
  app.get('/currency', (req, res) => {
    Currency.find({}, (err, currency) => {
      if (err) {
        res.status(404);
        res.send('Currency not found!');
      }
    res.send(currency);
    })
  });

  app.get('/currencies/:name', (req, res) => {
    Currency.find({name: req.params.name}, (err, currency) => {
      if (err) {
        res.status(404);
        res.send('Currency not found');
      }
      res.send(currency); 
    })
  });

  app.get('/currency/seed', (req, res) => {
    // create some events
    const currencies = [
        {
          name: "tezos",
          date: "Dec 19, 2019",
          open: 1.29,
          high: 1.32,
          low: 1.25,
          close: 1.25,
          volume: "46,048,752",
          marketCap: "824,588,509",
        },
        {
          name: "bitcoin",
          date: "Dec 19, 2019",
          open: 7764.06,
          high: 7836.10,
          low: 7291.34,
          close: 7424.29,
          volume: "18,720,708,479",
          marketCap: "134,215,145,410",
      }
    ];

    // use the Event model to insert/save
    Currency.deleteMany({}, (err, currency) => {
      if (err) {
        console.log(err);
        res.status(400).send('cannot delete currency');
      }
    });
    for (currency of currencies) {
      let newCurrency = new Currency(currency);
      newCurrency.save(err => {
          console.log(err);
      })
    } 
    res.send('seed!');
});

  //create
  app.post('/currency', (req, res) => {
    let currency = new Currency( {
      name: req.body.name,
      date: req.body.date,
      open: req.body.open,
      high: req.body.high,
      low: req.body.low,
      close: req.body.close,
      volume: req.body.volume,
      marketCap: req.body.marketCap,
    });
    currency.save(err => {
      if(err) {
        console.log(err);
        res.status(400).send('cannot create currency');
      }
      res.status(200).send('currency added.')
    })//difference of insert and save
  });

//update
app.put('/currencies/:currency', (req, res) => {
  Currency.updateOne({currency: req.params.currency}, {
    currency: req.body.currency,
    date: req.body.date,
    open: req.body.open,
    high: req.body.high,
    low: req.body.low,
    close: req.body.close,
    volume: req.body.volume,
    marketCap: req.body.marketCap,
  }, (err => {
    if(err) {
      console.log(err);
      res.status(400).send('cannot update currency');
    }
    res.status(200).send('currency updated')
  }));
});

  //delete
  app.delete('/currencies/:currency', (req, res) => {
    Currency.deleteOne({currency: req.params.currency}, (err, currency) => {
      if (err) {
        console.log(err);
        res.status(400).send('cannot delete currency');
      }
      res.send('currency deleted'); 
    })
  });
};

module.exports = currencyRoutes;
