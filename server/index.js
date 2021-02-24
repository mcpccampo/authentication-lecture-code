require('dotenv').config();

const express = require('express');
const massive = require('massive');
const { URI, SERVER_PORT, SESSION_SECRET } = process.env;
const session = require('express-session');

const authCtrl = require('./authCtrl');

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 360 },
  })
);

massive({
  connectionString: URI,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    console.log(`Database Connected on ${SERVER_PORT}`);
    app.set('db', dbInstance); // app.db = dbInstance
    app.listen(SERVER_PORT, () => {
      console.log('App listening on port 3000!');
    });
  })
  .catch((err) => console.log(`Error connecting to end Point ${err}`));

// auth endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);
