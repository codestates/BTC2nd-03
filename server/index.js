const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
////const cors = require('cors');
const serverRouter= require('./routes/route_handle');

const app = express();
app.set('port', process.env.PORT ||5005);
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

//app.use(cors());

app.get('/',(req,res)=>
{ res.send('Test : Server is working  !! <h1>You are Welcome !!</h1>');});


app.use('/test',serverRouter);

app.use((req, res, next) => {
  const error =  new Error(`[APP] ${req.method} ${req.url} - no router.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);  
});

const server = app.listen(app.get('port'), ()=>{
  console.log('running on port - ', app.get('port'));
})
