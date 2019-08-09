export default class Platform extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.currentScene = params.scene;
    this.initPlatforms();
    this.currentScene.add.existing(this);
  }

  private initPlatforms() {
    this.currentScene.physics.world.enable(this);

    this.setOrigin(0, 0);
    this.setFrame(0);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }
}
