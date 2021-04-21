import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository" 
import { Request, Response } from 'express'

class SettingsController{
  
  async CreateSettings (req : Request,res : Response) {
    const repo = getCustomRepository(SettingsRepository);
    const {chat, username} =  req.body;
    const settings = repo.create({
      chat,
      username 
    });
  
    await repo.save(settings);
  
    return res.json(settings);  
  }

  async DeleteSettings(req : Request, res : Response){
    const repo = getCustomRepository(SettingsRepository);
    const { name } =  req.params;
    try{
      let settingsDel = await repo.findOne({ username: name});
      await repo.remove(settingsDel);
      return res.json("Deleted_user:" + name);  
    }
    catch(e){
      return res.json("Error: " + e.message);
    }
  }

}

export { SettingsController };