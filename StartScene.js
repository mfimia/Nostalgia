let screen;

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    // this.load.image(
    //   'start',
    //   'assets/insert-coin.gif'
    // );
    this.load.spritesheet('startgif', 'assets/insert-coin-spritesheet.png', {
      frameWidth: 480,
      frameHeight: 640,
    })
  }

  create() {

    this.anims.create({
      key: "startgif",
      frames: this.anims.generateFrameNumbers("startgif", { start: 0, end: 1 }),
      frameRate: 1,
      repeat: -1
    });

    this.add.sprite(0, 0, 'startgif').setOrigin(0).play('startgif');
    // const screen = this.add.image(-85, 0, 'start').setOrigin(0, 0);

    // on keypress any, transition to GameScene
    this.input.keyboard.on('keydown', () => {
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}
