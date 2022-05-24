if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//Imports
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

//Routes
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/author');
const bookRouter = require('./routes/books');

//import view template / layout, and use them with directions to the files
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(methodOverride('_method'))
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
app.use('/books', bookRouter)

//Listener
app.listen(process.env.PORT || 3000);



