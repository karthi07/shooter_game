import Phaser from 'phaser'



export default class MapScene extends Phaser.Scene {
  constructor() {
    super('hello-world')

    this.cursors = undefined
    this.player = undefined
  }

  preload() {

    this.load.image('sky', 'assets/background/sky.png')

    this.load.spritesheet('hero',
      'assets/character/hero.png',
      { frameWidth: 127, frameHeight: 165 }
    )
    // this.load.multiatlas("hero", "assets/character/hero.json", "assets/character/hero.png");
    this.load.atlas("heroAtlas", "assets/character/hero.png", "assets/character/hero.json");


    this.load.image('tiles', 'assets/tilemap/tilesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemap/mario_map.json');

  }

  create() {

    const width = this.scale.width
    const height = this.scale.height
    // const totalWidth = width * 10

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0)

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('kenny_simple_platformer', 'tiles');
    const platforms = map.createStaticLayer('Platforms', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // create player

    this.player = this.createPlayer()
    this.physics.add.collider(this.player, platforms);

    this.cursors = this.input.keyboard.createCursorKeys();


    //text
    this.scoreText = this.add.text(16, 16, 'Score: ' + 0, { fontSize: '32px', fill: '#FF0000' });
    this.scoreText.setScrollFactor(0);


    // Text space for immunity
    this.immunityText = this.add.text(16, 50, 'Immunity: ' + 100, { fontSize: '32px', fill: '#FF0000' });
    this.immunityText.setScrollFactor(0);

    // Creating camera to follow the player
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

  }





  createPlayer() {

    const hero = this.physics.add.sprite(600, 0, 'hero')
    hero.setBounce(0.1);
    // hero.body.setSize(55, 75).setOffset(20, 25);
    hero.setCollideWorldBounds(true);


    const attackFrm = this.anims.generateFrameNames('heroAtlas', { start: 1, end: 10, prefix: 'Attack (', suffix: ').png' })
    this.anims.create({
      key: 'attack',
      frames: attackFrm,
      frameRate: 20,
      repeat: -1
    })

    const runFrm = this.anims.generateFrameNames('heroAtlas', { start: 1, end: 10, prefix: 'Run (', suffix: ').png' })
    this.anims.create({
      key: 'run',
      frames: runFrm,
      frameRate: 20,
      repeat: -1
    })

    return hero
  }



  update() {

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);

      if (this.player.body.onFloor()) {
        this.player.play('run', true);
      }
    }

    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);

      if (this.player.body.onFloor()) {
        this.player.play('run', true);
      }
    }

    else {
      this.player.setVelocityX(0);

      if (this.player.body.onFloor()) {
        this.player.play('idle', true);
      }
    }


    if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-600);
      this.player.play('attack', true);
    }
    if ((this.cursors.down.isDown) && !this.player.body.onFloor()) {
      this.player.setVelocityY(200);
      this.player.play('attack', true);
    }

    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    }

    else if (this.player.body.velocity.x < 0) {
      this.player.setFlipX(true);
    }

  }


}