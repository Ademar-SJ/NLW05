import { Router } from "express";
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';
import { MessagesController } from './controllers/MessagesController';

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

const routes = Router();

routes.post("/settings", settingsController.CreateSettings);
routes.delete("/settings/:username",settingsController.DeleteSettings);

routes.post("/users", usersController.CreateUser);
routes.get("/users", usersController.ListUsers);

routes.post('/messages', messagesController.CreateMessage);
routes.get('/messages/:user_id', messagesController.FindByUser);


export default routes;