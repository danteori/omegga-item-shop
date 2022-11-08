import OmeggaPlugin, { OL, PS, PC } from 'omegga';

type Config = { foo: string };
type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
  omegga: OL;
  config: PC<Config>;
  store: PS<Storage>;

  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) {
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }

  async init() {
    // Write your plugin!
    this.omegga.on('cmd:testitemshop', (speaker: string) => {
      this.omegga.broadcast(`ITEM SHOPE TEST!`);
    });

    this.omegga.on('cmd:GIVEITEMPLZ', (speaker: string) => {
      const player = this.omegga.getPlayer(speaker);
      player.giveItem('Weapon_Tomahawk');
    });

    /*
    const randomWeapon = () => {

      this.omegga.get
      const wep = 'Weapon_Tomahawk';
      return wep;

    }
    */

    return { registeredCommands: ['test'] };
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
