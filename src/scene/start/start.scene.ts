import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class StartScene extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private squares: Array<Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }>;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.squares = [
      this.add.rectangle(800, 400, 100, 100, 0xFF0000) as any,
      this.add.rectangle(400, 400, 100, 100, 0xFF0000) as any,
    ];
    this.square = this.add.rectangle(400, 200, 100, 100, 0XFFFFFF) as any;

    this.squares.forEach(s => this.physics.add.existing(s));
    this.physics.add.existing(this.square);
    this.physics.world.setBoundsCollision(true, true, true, true);
  }

  public update() {
    const cursorKeys = this.input.keyboard.createCursorKeys();

    // only can jump if are touching object
    if (this.squares.some(s => this.physics.collide(this.square, s))) {
      this.square.body.setVelocityY(0);
      this.square.body.setVelocityX(0);
      if (cursorKeys.up.isDown) {
        this.square.body.setVelocityY(-1_000);
      } else if (cursorKeys.down.isDown) {
        this.square.body.setVelocityY(500);
      } else {
        // this.square.body.setVelocityY(0);
      }
    }

    // allow user to move left and right always
    if (cursorKeys.right.isDown) {
      this.square.body.setVelocityX(500);
    } else if (cursorKeys.left.isDown) {
      this.square.body.setVelocityX(-500);
    } else {
      this.square.body.setVelocityX(0);
    }

    // TODO figure out how to actually fixate objectsg
    this.squares.forEach(s => {
      s.body.setVelocityY(0);
      s.body.setVelocityX(0);
    });
  }
}