import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { Setting } from "../entities/Setting";

interface ISettingsServices{
  chat : boolean;
  username : string;
}

class SettingsServices {

  private settingsRepository : Repository<Setting>;

  async Create({chat, username} : ISettingsServices){

    const settings = this.settingsRepository.create({
      chat,
      username 
    });
  
    await this.settingsRepository.save(settings);

    return settings;
  }

  async Delete(username : string){
    try{
      let settingsDel = await this.settingsRepository.findOne({ username });
      await this.settingsRepository.remove(settingsDel);
    }catch(err){
      throw err;
    }
  }

  async FindByUsername(username : string){
    try{
      let settings = await this.settingsRepository.findOne({ username });
      return settings;
    }catch(err){
      throw err;
    }
  }

  constructor(){
    if (!this.settingsRepository){
      this.settingsRepository = getCustomRepository(SettingsRepository);
    }
  }

}

export { SettingsServices };