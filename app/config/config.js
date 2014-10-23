module.exports = {
  port: (process.env.PORT || 3000),
  db: (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://scotch:scotch@ds033170.mongolab.com:33170/nordicarts')
};