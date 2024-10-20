import Player from "../entities/Player";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // Load default game background
    this.load.image(
      "background",
      "https://labs.phaser.io/assets/skies/space3.png"
    );

    this.load.image("tiles", "assets/images/demo_tiles.png");
    this.load.tilemapTiledJSON("mapKey", "assets/maps/test_map.json");

    // Load animated player sprite sheets
    this.load.spritesheet("player_idle", "assets/images/hero_idle.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 32,
      spacing: 64,
    });

    this.load.spritesheet("player_walk", "assets/images/hero_walk.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 32,
      spacing: 64,
    });
  }

  create() {
    // MAP
    // Add map and tileset
    const map = this.make.tilemap({ key: "mapKey" });
    const tileset = map.addTilesetImage("test_map", "tiles"); // Replace with your tileset name
    const groundLayer = map.createLayer("Tile Layer 1", tileset, 0, 0); // Layer 1
    const detailsLayer = map.createLayer("Tile Layer 2", tileset, 0, 0); // Layer 2
    const collisionLayer = map.createLayer("Tile Layer 3", tileset, 0, 0); // Collision layer
    const detailsLayer2 = map.createLayer("Tile Layer 4", tileset, 0, 0); // Layer 4
    const overlayLayer = map.createLayer("Tile Layer 5", tileset, 0, 0); // Layer that displays any assets over the sprite

    // Set the depth for the overlay layer above the player sprite
    overlayLayer.setDepth(10);

    // Enables collision detection on the collision layer
    collisionLayer.setCollisionByProperty({ collides: true });

    // PLAYER
    // Add idle animations
    this.anims.create({
      key: "idle_up",
      frames: this.anims.generateFrameNumbers("player_idle", {
        start: 0,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_down",
      frames: this.anims.generateFrameNumbers("player_idle", {
        start: 6,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_left",
      frames: this.anims.generateFrameNumbers("player_idle", {
        start: 12,
        end: 17,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_right",
      frames: this.anims.generateFrameNumbers("player_idle", {
        start: 18,
        end: 23,
      }),
      frameRate: 5,
      repeat: -1,
    });

    // Add walking animations
    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("player_walk", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("player_walk", {
        start: 6,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player_walk", {
        start: 12,
        end: 17,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player_walk", {
        start: 18,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Add the player sprite
    this.player = new Player(this, 120, 88).play("idle_down");
    this.player.setScale(1);
    this.physics.add.collider(this.player, collisionLayer);

    // Visualize collision tiles
    // const viewCollisionTiles = this.add.graphics().setAlpha(0.5);
    // collisionLayer.renderDebug(viewCollisionTiles, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(255, 10, 40, 255), // Highlight collidable tiles
    //   faceColor: null,
    // });

    // Keybindings for WASD movement
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    // Delegate movement logic to the player entity
    this.player.handleMovement(this.keys);
  }
}
