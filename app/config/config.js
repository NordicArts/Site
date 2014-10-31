module.exports = {
  port: (process.env.PORT || 3000),
  db: (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://scotch:scotch@ds033170.mongolab.com:33170/nordicarts'),
  github: {
    clientID: '41aebc454484d246045d',
    clientSecret: '65d41a313b83f813174a55cf24a22a550c733b9a',
    callbackURL: 'http://www.chewedfeed.com:3000/auth/github/callback'
  },
  twitter: {
    consumerKey: 's0f7sU8zELBXHwQJQ3BZrVffo',
    consumerSecret: '7qusCvPtOqNzqoSIrH22JI0n1qFhMVe28zIASqR6NuWE2KsnLK',
    callbackUrl: 'http://www.chewedfeed.com:3000/auth/twitter/callback'
  },
  facebook: {
    clientID: '1558044707741365',
    clientSecret: '95828f510aa4eecb75ae9670a74e3a24',
    callbackURL: 'http://www.chewedfeed.com:3000/auth/facebook/callback'
  }
};