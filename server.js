const path = require('path');
require('dotenv').config();
require('colors');
const express = require('express');
const securityMiddlewares = require('./security-packages');
require('./db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const globalErrorMiddleware = require('./controllers/error');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

securityMiddlewares(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', auth);

app.use(globalErrorMiddleware);

const PORT = process.env.PORT || 3100;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline.bold
  )
);

process.on('unhandledRejection', (err) => {
  console.log(
    'Unhandled rejection! Shutting down server and node...'.red.underline.bold
  );
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
