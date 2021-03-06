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

  app.get('/currencies/:currency', (req, res) => {
    Currency.find({Date: req.params.currency}, (err, currency) => {
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
          Currency: "tezos",
          Date: "Dec 19, 2019",
          Open: "1.29",
          High: "1.32",
          Low: "1.25",
          Close: "1.25",
          Volume: "46,048,752",
          MarketCap: "824,588,509",
        },
        {
          Currency: "bitcoin",
          Date: "Dec 19, 2019",
          Open: "7765.06",
          High: "7836.10",
          Low: "7291.34",
          Close: "7424.29",
          Volume: "18,720,708,479",
          MarketCap: "134,215,145,410",
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
      Currency: req.body.Currency,
      Date: req.body.Date,
      Open: req.body.Open,
      High: req.body.High,
      Low: req.body.Low,
      Close: req.body.Close,
      Volume: req.body.Volume,
      MarketCap: req.body.MarketCap,
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
    Currency: req.body.Currency,
    Date: req.body.Date,
    Open: req.body.Open,
    High: req.body.High,
    Low: req.body.Low,
    Close: req.body.Close,
    Volume: req.body.Volume,
    MarketCap: req.body.MarketCap,
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
    Currency.deleteOne({Currency: req.params.currency}, (err, currency) => {
      if (err) {
        console.log(err);
        res.status(400).send('cannot delete currency');
      }
      res.send('currency deleted'); 
    })
  });
};

module.exports = currencyRoutes;
