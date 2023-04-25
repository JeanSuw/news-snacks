const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Just in case I made more functions
const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'yougotthis',
  cookie: {
    // Have the cookie (and session) expire after one hour.
    endTime: 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', async (req, res) => {
//   res.redirect('./api/users/login');
// });
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});