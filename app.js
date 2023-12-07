const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const passport = require('./passport-config');
const apiRoutes = require('./app_api/routes/routes');
const flash = require('connect-flash');
const { connectToMongoDB, closeMongoDBConnection, mongoose } = require('./app_api/models/db');

const app = express();

app.use(session({
    secret: 'hidsakj12312156561566',
    resave: false,
    saveUninitialized: false,
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

connectToMongoDB();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', apiRoutes);


process.on('SIGINT', async () => {
    await closeMongoDBConnection();
    process.exit(0);
});


module.exports = app;
