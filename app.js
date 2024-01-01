require('dotenv').config({path:'./.env'})
const express = require('express');
const logger = require('morgan');
const app = express();
// const  = require(morgan);
app.use(logger('tiny'));
app.use('/', require('./routes/indexRoutes'));

app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`));