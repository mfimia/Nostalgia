let player, lockers, mainFence, fenceLeft, fenceRight, walls, floor, rooms, floor2;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image('wall-left', 'city-theme/Scene/1 Tiles/city1-wall-left.png')
    this.load.image('wall-right', 'city-theme/Scene/1 Tiles/city1-wall-right.png')
    this.load.spritesheet("CJ", "city-theme/pjs/CJ.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('Adam', 'assets/Modern_Interiors_Free_v2.2/Modern tiles_Free/Characters_free/Adam_16x16.png', {frameWidth: 16, frameHeight: 32});
    this.load.tilemapTiledJSON('map', 'city-theme/city1-tilemap.json');
    this.load.image('tile', 'city-theme/Scene/1 Tiles/IndustrialTile_02.png');
    this.load.image('floor1', 'city-theme/Scene/1 Tiles/IndustrialTile_21.png');
    this.load.image('floor2', 'city-theme/Scene/1 Tiles/IndustrialTile_46.png');
    this.load.image('fence1', 'city-theme/Scene/3 Objects/Fence1.png');
    this.load.image('fence2', 'city-theme/Scene/3 Objects/Fence2.png');
    this.load.image('fence3', 'city-theme/Scene/3 Objects/Fence3.png');
    this.load.image('locker', 'city-theme/Scene/3 Objects/Locker4.png');
    this.load.image('wall', 'city-theme/Scene/1 Tiles/IndustrialTile_64.png');
  }

  create() {
    // Adding tile layers from Tiled
    const map = this.make.tilemap({ key: 'map' });
    const tileset1 = map.addTilesetImage('IndustrialTile_21', 'floor1');
    floor = map.createStaticLayer('floor', tileset1);
    const tileset2 = map.addTilesetImage('IndustrialTile_64', 'wall');
    walls = map.createStaticLayer('walls', tileset2);
    const tileset3 = map.addTilesetImage('IndustrialTile_46', 'floor2');
    floor2 = map.createStaticLayer('floor2', tileset3);
    const tileset4 = map.addTilesetImage('Fence2', 'fence2');
    mainFence = map.createStaticLayer('main-fence', tileset4);
    const tileset5 = map.addTilesetImage('Fence1', 'fence1');
    fenceLeft = map.createStaticLayer('fence-left', tileset5);
    const tileset6 = map.addTilesetImage('Fence3', 'fence3');
    fenceRight = map.createStaticLayer('fence-right', tileset6);
    const tileset7 = map.addTilesetImage('Locker4', 'locker');
    lockers = map.createStaticLayer('lockers', tileset7);

    this.cameras.main.setSize(480, 640);

    // Create the CJ sprite and set boundaries for it

    player = this.physics.add.sprite(512, 704, "Adam");
    this.cameras.main.startFollow(player);
    
      // player.setCollideWorldBounds(true);
    // player = this.add.sprite(this.world.centerX, this.world.centerY, "Adam");


    // Checking wich tiles have the custom Tiled property "collides" set to 
    // true and giving them colliding properties in Phaser

    walls.setCollisionByProperty({ collides: true });
    lockers.setCollisionByProperty({ collides: true });
    fenceRight.setCollisionByProperty({ collides: true });
    fenceLeft.setCollisionByProperty({ collides: true });
    mainFence.setCollisionByProperty({ collides: true });

    // Adding colliders
    this.physics.add.collider(player, walls);
    this.physics.add.collider(player, lockers);
    this.physics.add.collider(player, fenceRight);
    this.physics.add.collider(player, fenceLeft);
    this.physics.add.collider(player, mainFence);
    
    // Add animation functions
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("Adam", { start: 48, end: 53 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("Adam", { start: 60, end: 65 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers('Adam', {start: 54, end: 59}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("Adam", { start: 66, end: 71 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "chill",
      frames: this.anims.generateFrameNumbers("Adam", { start: 144, end: 152 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: "stop-up",
      frames: this.anims.generateFrameNumbers('Adam', {start: 30, end: 35}),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: "stop-down",
      frames: this.anims.generateFrameNumbers('Adam', {start: 42, end: 47}),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: "stop-left",
      frames: this.anims.generateFrameNumbers('Adam', {start: 36, end: 41}),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: "stop-right",
      frames: this.anims.generateFrameNumbers('Adam', {start: 24, end: 29}),
      frameRate: 2,
      repeat: -1
    });

    // this.anims.create({
    //   key: "point",
    //   frames: this.anims.generateFrameNumbers("Adam", { start: 6, end: 11 }),
    //   frameRate: 6,
    //   repeat: -1
    // });
    // this.cameras.main.setBounds(0,0);
    // this.cameras.main.startfollow(player);

  }

  update() {

    // Arrow keys that will move CJ in 4 directions and general game keys
    const cursors = this.input.keyboard.createCursorKeys();

    const keys = this.input.keyboard.addKeys({
      a:  Phaser.Input.Keyboard.KeyCodes.A,
      s:  Phaser.Input.Keyboard.KeyCodes.S,
      d:  Phaser.Input.Keyboard.KeyCodes.D,
      w:  Phaser.Input.Keyboard.KeyCodes.W,
      t:  Phaser.Input.Keyboard.KeyCodes.T
  });

    const rightArrow = cursors.right._justDown;
    const leftArrow = cursors.left._justDown;
    const upArrow = cursors.up._justDown;
    const downArrow = cursors.down._justDown;
    const space = cursors.space._justDown;
    const tArrow = keys.t.isDown;

    player.setVelocity(0);

    const speed = 80;
    // // Check for whether any of the arrow keys were pressed, move CJ    
    if (rightArrow) {
      moveCJRight();
    } else if (leftArrow) {
      moveCJLeft();
    } else if (upArrow) {
      moveCJUp();
    } else if (downArrow) {
      moveCJDown();
    } else {
      player.anims.stop();
      
    }

    function moveCJRight() {

      player.setVelocityX(speed);
      player.setVelocityY(0);
      player.anims.play("right", true);
      
      if (cursors.right.JustUp) {
        player.anims.play('stop-right', true)
      }
    }

    function moveCJLeft() {
      player.setVelocityX(-speed);
      player.setVelocityY(0);
      player.anims.play("left", true);
    }

    function moveCJUp() {
      // player.flipX = false;
      player.anims.play("up", true);
      player.setVelocityX(0);
      player.setVelocityY(-speed);
    }

    function moveCJDown() {
      // player.flipX = false;
      player.anims.play("down", true);
      // player.setTexture("cj-front");
      player.setVelocityX(0);
      player.setVelocityY(speed);
    }


    

    // if (tArrow) {
    //   player.anims.play("point", true);
    // }

    // End game when pressing space
    if (space) {
      this.endGame();
    }
    
  }

  // A type of function that ends current Game and transition to End Scene
  endGame() {
    // Stop sprites moving
    this.physics.pause();
    // Transition to end scene with fade
    this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
      if (progress > 0.5) {
        this.scene.stop("GameScene");
        this.scene.start("EndScene");
      }
    });
  }
}
