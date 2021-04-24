import { Request, Response } from 'express';
import { SettingsServices } from '../services/SettingsService';

class SettingsController{
  
  async CreateSettings (req : Request,res : Response) {
    
    const {chat, username} =  req.body;
    const service = new SettingsServices();
    const settings = await service.Create({chat, username});
  
    return res.json(settings);  
  }

  async DeleteSettings(req : Request, res : Response){
    
    const { username } =  req.params;
    try{
      const service = new SettingsServices();
      service.Delete(username);
      return res.json("Deleted_user:" + username);  
    }
    catch(e){
      return res.json("Error: " + e.message);
    }
  }
  async FindByUsername(req : Request, res : Response){
    
    const { username } =  req.params;
    try{
      const service = new SettingsServices();
      const settings = await service.FindByUsername(username); 
      return res.json(settings);  
    }
    catch(e){
      return res.json("Error: " + e.message);
    }
  }

}

export { SettingsController };