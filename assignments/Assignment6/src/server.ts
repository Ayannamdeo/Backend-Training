// const express = require("express");
import express, {Request, Response, NextFunction} from 'express';
// const cookieparser = require('cookie-parser');
import cookieparser from "cookie-parser";
// const appRouter = require('./routes/appRouter');
import appRouter from './routes/appRouter';
// const {generateDummyToken, logRequest, errorHandle, requestLimiter} = require('./middlewares/appMiddlewares');
import {generateDummyToken, logRequest, errorHandle, requestLimiter} from './middlewares/appMiddlewares';

const app = express();

const server = () => {
  app.use(cookieparser());
  app.use(express.json());

  app.use(requestLimiter(3));
  
  app.use((req: Request, res: Response, next: NextFunction)=>{
    req.headers['X-customRequestHeader'] = 'qqqqqqqq';
    res.setHeader('X-customResponseHeader', 'ssssss');
    next();
  });
  app.use((req: Request, res: Response, next: NextFunction)=>{
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

export default server;