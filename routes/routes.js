const currencyRoutes = require('./currencies');

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('welcome to the currency records');
  });

  currencyRoutes(app, fs);
};

module.exports =  appRouter;