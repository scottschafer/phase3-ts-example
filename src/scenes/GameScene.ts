import Dude from '../objects/Dude';
import Platform from '../objects/Platform';

import ground from '../assets/platform.png';
import sky from '../assets/sky.png';
import dude from '../assets/dude.png';
import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH } from '../constants';

export default class GameScene extends Phaser.Scene {
  private player: Dude;
  private platforms: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  public preload() {
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.spritesheet('dude', dude, {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  public create() {
    this.add
      .image(0, 0, 'sky')
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.platforms = this.add.group({
      runChildUpdate: true
    });

    this.platforms.add(
      new Platform({
        scene: this,
        x: 50,
        y: 50,
        key: 'ground'
      })
    );

    this.player = new Dude({
      scene: this,
      x: 100,
      y: 450,
      key: 'dude'
    });

    this.physics.add.collider(this.player, this.platforms);

    // TODO change Offset
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      GAME_SCREEN_WIDTH * 2,
      GAME_SCREEN_HEIGHT
    );
  }

  public update() {
    this.player.update();
  }
}
