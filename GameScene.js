let player, trees, floor, walls, test, houses;
let direction, moving;
let spawnX = 3355;
let spawnY = 4707;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.spritesheet('Adam', 'assets/Modern_Interiors_Free_v2.2/Modern tiles_Free/Characters_free/Adam_16x16.png', {frameWidth: 16, frameHeight: 32});
    // this.load.tilemapTiledJSON('map', 'city-theme/city1-tilemap.json');
    this.load.image('serene-village-16x16', 'assets/Serene_Village_revamped_v1.9/SERENE_VILLAGE_REVAMPED/Serene_Village_16x16.png')
    this.load.tilemapTiledJSON('map', 'assets/Worlds/Prima.json')
  }

  create() {
    
    // Adding tile layers from Tiled
    const map = this.make.tilemap({ key: 'map' });
    const groundFloor = map.addTilesetImage('Serene_Village_16x16', 'serene-village-16x16');
    floor = map.createStaticLayer('Basic geography', groundFloor);
    const darkTreesBot = map.addTilesetImage('Serene_Village_16x16', 'serene-village-16x16');
    trees = map.createStaticLayer('Dark trees', darkTreesBot);
    const greenTreesBot = map.addTilesetImage('Serene_Village_16x16', 'serene-village-16x16');
    map.createStaticLayer('Green trees', greenTreesBot);
    const lightTreesBot = map.addTilesetImage('Serene_Village_16x16', 'serene-village-16x16');
    map.createStaticLayer('Light trees', lightTreesBot);
    const cityOneWalls = map.addTilesetImage('Serene_Village_16x16', 'serene-village-16x16');
    walls = map.createStaticLayer('walls', cityOneWalls);
    const cityOneHouses = map.addTilesetImage('Serene_Village_16x16', 'serene-village-16x16');
    houses = map.createStaticLayer('houses', cityOneHouses);

    // const treesTest = map.addTilesetImage('Serene_Village_16x16', 'serene-village-16x16');
    // test = map.createStaticLayer('test', treesTest);
    this.cameras.main.setSize(480, 640);

    // Create the CJ sprite and set boundaries for it

    player = this.physics.add.sprite(spawnX, spawnY, "Adam");
    player.setSize(16, 16);
    this.cameras.main.startFollow(player);


    // map.setCollision(trees);
    
    // player.setCollideWorldBounds(true);
    // player = this.add.sprite(this.world.centerX, this.world.centerY, "Adam");

    
    // Checking wich tiles have the custom Tiled property "collides" set to 
    // true and giving them colliding properties in Phaser

    trees.setCollisionByProperty({ collides: true });
    walls.setCollisionByProperty({ collides: true });
    houses.setCollisionByProperty({ collides: true });
    // lockers.setCollisionByProperty({ collides: true });
    // fenceRight.setCollisionByProperty({ collides: true });
    // fenceLeft.setCollisionByProperty({ collides: true });
    // mainFence.setCollisionByProperty({ collides: true });

    // Adding colliders
    this.physics.add.collider(player, trees);
    this.physics.add.collider(player, walls);
    this.physics.add.collider(player, houses);
    // this.physics.add.collider(player, lockers);
    // this.physics.add.collider(player, fenceRight);
    // this.physics.add.collider(player, fenceLeft);
    // this.physics.add.collider(player, mainFence);
    
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
    // console.log(player.x, player.y)
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
      direction = 53;
      moveCJRight();
    } else if (leftArrow) {
      moveCJLeft();
      direction = 65;
    } else if (upArrow) {
      moveCJUp();
      direction = 30;
    } else if (downArrow) {
      moveCJDown();
      direction = 42;
    } else {
      player.setFrame(direction);
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
