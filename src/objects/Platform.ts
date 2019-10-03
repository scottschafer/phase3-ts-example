import { ObjectParams } from '../types';

export default class Platform extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;

  constructor(params: ObjectParams) {
    super(params.scene, params.x, params.y, params.texture);

    this.currentScene = params.scene;
    this.initPlatforms();
    this.currentScene.add.existing(this);
  }

  private initPlatforms() {
    this.currentScene.physics.world.enable(this);

    this.setOrigin(0, 0);
    this.setFrame(0);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setAllowGravity(false);
      this.body.setImmovable(true);
    }
  }
}
