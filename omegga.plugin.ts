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

    this.omegga.on('cmd:itemplz', (speaker: string) => {
      const player = this.omegga.getPlayer(speaker);
      player.giveItem('Weapon_HeavyAssaultRifle');
    });

    /*
    const randomWeapon = () => {

      this.omegga.get
      const wep = 'Weapon_Tomahawk';
      return wep;

    }
    */
    this.omegga.on('cmd:buyitem', (speaker: string, subcommand: string) => {
      const player = this.omegga.getPlayer(speaker);
      if(!subcommand){
        this.omegga.whisper(player, 'Usage: /buyitem # to buy item <color="cccccc">(example: /buyitem 1 to buy bazooka)</color>. Item numbers can be found using <color="00ff00">/itemshop</color>');
      } else {
        if(subcommand == '1'){
          this.omegga.whisper(player, 'You have bought a <b>Bazooka</b> for <color="00ff00">$0</color>!')
          player.giveItem('Weapon_Bazooka');
        } else if(subcommand == '2'){
          this.omegga.whisper(player, 'You have bought a <b>Heavy Assault Rifle</b> for <color="00ff00">$0</color>!')
          player.giveItem('Weapon_HeavyAssaultRifle');
        } else if(subcommand == '3'){
          this.omegga.whisper(player, 'You have bought a <b>Bow</b> for <color="00ff00">$0</color>!')
          player.giveItem('Weapon_Bow');
        } else if(subcommand == '4'){
          this.omegga.whisper(player, `You can't afford that shit, bitch. You currently have <color="00ff00">$0</color> in your account.`)
        } else {
          this.omegga.whisper(player, `What the hell is a ${subcommand}? Try again. Use /itemshop if you need help`)
        }
      }
    });

    this.omegga.on('cmd:itemshop', (speaker: string) => {
      const player = this.omegga.getPlayer(speaker);
      this.omegga.whisper(player, `<b>iten shop</b> --- /buyitem # to buy item <color="cccccc">(example: /buyitem 1 to buy bazooka)</color>`,
      '[1] - <b>Bazooka</b> - <color="00ff00">$0</color>',
      '[2] - <b>Heavy Assault Rifle</b> - <color="00ff00">$0</color>',
      '[3] - <b>Bow</b> - <color="00ff00">$0</color>',
      '[4] - <color="ff00ff"><b>Mystery Item</b></color> - <color="00ff00">$1</color>');
    });

    return { registeredCommands: ['test', 'itemplz', 'itemshop', 'buyitem'] };
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
