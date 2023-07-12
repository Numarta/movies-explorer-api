const corsOptions = {
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'localhost:3000',
    'localhost:3001',
    'localhost:3002',
    'localhost:3003',
    'localhost:3004',
    'localhost:3005',
    'http://numarta.nomoredomains.monster',
    'https://numarta.nomoredomains.monster',
  ],
};

module.exports = { corsOptions };
