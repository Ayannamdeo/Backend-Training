const express = require("express");
const cookieparser = require('cookie-parser');

const appRouter = require('./routes/appRouter');
const {generateDummyToken, logRequest, errorHandle, requestLimiter} = require('./middlewares/appMiddlewares');

const app = express();

const server = () => {
  app.use(cookieparser());
  app.use(express.json());

  app.use(requestLimiter(3));
  
  app.use((req, res, next)=>{
    req.headers['X-customRequestHeader'] = 'qqqqqqqq';
    res.setHeader('X-customResponseHeader', 'ssssss');
    next();
  });
  app.use((req, res, next)=>{
    console.log(req.headers['X-customRequestHeader']);
    console.log(res.getHeader('X-customResponseHeader'));
    next();
  });

  app.use(logRequest);
  app.use('/getAuthorized', generateDummyToken);
  app.use('/', appRouter);
  app.use(errorHandle);
  return app;
};

module.exports = server;
