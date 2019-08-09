export default class Dude extends Phaser.Physics.Arcade.Sprite {
  private currentScene: Phaser.Scene;
  private player: Phaser.Physics.Arcade.Image;
  private cursors;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  public update() {
    this.handleAnimations();
    this.handleInput();
  }

  private initSprite() {
    this.currentScene.physics.world.enable(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.setGravityY(300);
  }

  private handleAnimations() {
    this.currentScene.anims.create({
      key: 'left',
      frames: this.currentScene.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.currentScene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.currentScene.anims.create({
      key: 'right',
      frames: this.currentScene.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
  }

  private handleInput() {
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);

      this.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);

      this.anims.play('right', true);
    } else {
      this.setVelocityX(0);

      this.anims.play('turn');
    }

    if (this.cursors.up.isDown) {
      this.setVelocityY(-330);
    }
  }
}
