const express = require('express');

const {handleGetUsers, handleCreateUser} = require('../controllers/appRouterControllers');
const {ValidateJwt, ValidateFieldContent, ValidateFieldLength} = require('../middlewares/appMiddlewares');

const router = express.Router();

router.route("/")
      .all(ValidateJwt)
      .get(handleGetUsers)
      .post(ValidateFieldLength, ValidateFieldContent, handleCreateUser);


module.exports = router;