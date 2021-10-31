class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  preload() {
    this.load.image("end", "assets/game-over.jpg");
  }

  create() {
    screen = this.add.image(0, 0, "end").setOrigin(0);

    this.input.keyboard.on("keydown", () => {
      this.scene.stop("EndScene");
      this.scene.start("StartScene");
    });
  }
}
