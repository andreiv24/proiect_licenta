const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

const { handleError, convertToApiError } = require('./middleware/apiError');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json())
app.use(xss());
app.use(mongoSanitize());
app.use(passport.initialize());
passport.use('jwt',jwtStrategy);
app.use('/api',routes)
app.use(convertToApiError);
app.use((err,req,res,next)=>{
    handleError(err,res)
})

const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Serverul este pornit. Port: ${port}`)
});