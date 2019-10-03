import Dude from '../objects/Dude';
import Platform from '../objects/Platform';

import ground from '../assets/platform.png';
import sky from '../assets/sky.png';
import dude from '../assets/dude.png';
import goal from '../assets/goal.png';
import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH } from '../constants';
import getRandomNumber from '../helpers/getRandomNumber';

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
    this.load.image('goal', goal);
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

    this.createPlatforms();

    this.player = new Dude({
      scene: this,
      x: 100,
      y: 450,
      texture: 'dude'
    });

    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.startFollow(this.player, true);
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

  private createPlatforms() {
    this.platforms = this.add.group({
      runChildUpdate: true
    });

    this.platforms.add(
      new Platform({
        scene: this,
        x: 50,
        y: GAME_SCREEN_HEIGHT - 32,
        texture: 'ground'
      })
    );

    this.platforms.add(
      new Platform({
        scene: this,
        x: GAME_SCREEN_WIDTH * 2 - 400,
        y: GAME_SCREEN_HEIGHT - 32,
        texture: 'ground'
      })
    );

    for (let count = 0; count <= GAME_SCREEN_WIDTH * 2; count += 100) {
      const x = count + getRandomNumber(400);
      const y = Math.ceil(getRandomNumber(GAME_SCREEN_HEIGHT - 32) / 100) * 100;

      this.platforms.add(
        new Platform({
          scene: this,
          x: x,
          y: y,
          texture: 'ground'
        })
      );
    }

    this.platforms.add(
      new Platform({
        scene: this,
        x: GAME_SCREEN_WIDTH * 2 - 200,
        y: GAME_SCREEN_HEIGHT - 32 - 54,
        texture: 'goal'
      })
    );
  }
}
