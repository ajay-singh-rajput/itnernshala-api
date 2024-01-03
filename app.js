require('dotenv').config({path:'./.env'})
const express = require('express');
const app = express();

// db connection
require('./models/database').connectDatabase();

// logger
const logger = require('morgan');
app.use(logger('tiny'));

// bodyParser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// session and cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieParser());

// routes
app.use('/', require('./routes/indexRoutes'));

// error handling
const ErrorHandler = require('./utils/ErrorHandler');
const { generatedErrors } = require('./middlewares/error');
app.all('*',(req, res, next)=>{
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`,404))
});
app.use(generatedErrors)

app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`));