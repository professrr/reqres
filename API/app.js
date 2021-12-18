const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');


const reqresRoutes = require('./routes/reqresRoutes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Of Nginx proxy
app.set('trust proxy', 1);

// Limit request from the same API 
const limiter = rateLimit({
    max: 240,
    windowMs: 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading json from body into req.body
app.use(express.json({
    limit: '15mb'
}));

// Body parser, reading data from body into req.body
app.use(
    express.urlencoded({
      limit: '15mb',
      extended: true
    })
  )

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Routes
app.use('/api/v1/reqres', reqresRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;