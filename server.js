if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/author');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//import view template / layout, and use them with directions to the files
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

//Makes sure the DB is connected and throws error is something goes wrong

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//Routes
app.use('/', indexRouter);
app.use('/authors', authorRouter);

//Listener
app.listen(process.env.PORT || 3000);



