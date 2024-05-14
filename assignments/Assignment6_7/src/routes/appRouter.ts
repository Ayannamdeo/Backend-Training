import express, { Router } from 'express';
import {Middleware} from '../middlewares/appMiddlewares';
import {AppRouterControllers} from '../controllers/appRouterControllers'

class AppRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    this.router.route("/")
      .all(Middleware.ValidateJwt)
      .get(AppRouterControllers.handleGetUsers)
      .post(Middleware.ValidateFieldLength, Middleware.ValidateFieldContent, AppRouterControllers.handleCreateUser);
  }
}
// const router = express.Router();

// router.route("/")
//       .all(ValidateJwt)
//       .get(handleGetUsers)
//       .post(ValidateFieldLength, ValidateFieldContent, handleCreateUser);

// export default router;
export{AppRouter};