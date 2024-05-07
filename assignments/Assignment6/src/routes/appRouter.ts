// const express = require('express');
// const {handleGetUsers, handleCreateUser} = require('../controllers/appRouterControllers');
// const {ValidateJwt, ValidateFieldContent, ValidateFieldLength} = require('../middlewares/appMiddlewares');
import express from 'express';
import {ValidateJwt, ValidateFieldContent, ValidateFieldLength} from '../middlewares/appMiddlewares';
import {handleGetUsers, handleCreateUser} from '../controllers/appRouterControllers'


const router = express.Router();

router.route("/")
      .all(ValidateJwt)
      .get(handleGetUsers)
      .post(ValidateFieldLength, ValidateFieldContent, handleCreateUser);


// module.exports = router;
export default router;