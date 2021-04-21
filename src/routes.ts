import { Router } from "express";
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const settingsController = new SettingsController();
const usersController = new UsersController();

const routes = Router();

routes.post("/settings", settingsController.CreateSettings);
routes.delete("/settings/:username",settingsController.DeleteSettings);

routes.post("/users", usersController.CreateUser);


export default routes;