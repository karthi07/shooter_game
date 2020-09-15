import Phaser from 'phaser';

const GROUND_KEY = 'ground2';
const DUDE_KEY = 'dude';
const score = 0;
// var gameOver = false;

function overlap_virus(lasers, virus) {
  virus.disableBody(true, true);
  lasers.disableBody(true, true);
  this.score += 10;
  this.scoreText.setText(`Score: ${this.score}`);
  if (this.score >= 400) {
    this.end();
  }
}
function gameover(player, virus) {
  // this.tween.stop()

  this.player.play('attack', false);
  this.player.play('run', false);
  this.player.play('dead', true);
  this.physics.pause();
  virus.disableBody(true, true);
  this.gameOver = true;
  this.end();
  // this.tween.stop()
}


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');

    this.cursors = undefined;
    this.player = undefined;
    this.lasers = undefined;
    this.tween = undefined;
    const gameOver = false;

    let scoreText;
  }

  preload() {
    this.gameOver = false;
    this.load.image('sky', 'assets/background/sky.png');
    this.load.image('mountains', 'assets/background/mountains.png');
    this.load.image('plateau', 'assets/background/plateau.png');
    this.load.image('plants', 'assets/background/plant.png');
    this.load.image('ground', 'assets/background/ground.png');

    // this.load.image(GROUND_KEY, 'assets/platform.png')
    this.load.image('star', 'assets/star.png');
    // this.load.image('virus', 'assets/virus.svg')
    this.load.image('bomb', 'assets/bomb.png');

    this.load.image('laser', 'assets/blue_laser.png');


    this.load.spritesheet('hero',
      'assets/character/hero.png',
      { frameWidth: 127, frameHeight: 165 });

    this.load.spritesheet('virus',
      'assets/virus.png',
      { frameWidth: 51, frameHeight: 51 });


    // this.load.multiatlas("hero", "assets/character/hero.json", "assets/character/hero.png");
    this.load.atlas('heroAtlas', 'assets/character/hero.png', 'assets/character/hero.json');
  }

  create() {
    const { width } = this.scale;
    const { height } = this.scale;
    const totalWidth = width * 10;


    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0);
    this.physics.world.setBounds(0, 0, totalWidth, 600);

    createAligned(this, totalWidth, 'mountain', 0.25);
    createAligned(this, totalWidth, 'plateau', 0.5);
    createAligned(this, totalWidth, 'ground', 1);
    createAligned(this, totalWidth, 'plants', 1.25);

    this.player = this.createPlayer();
    const virus = this.createVirus();


    this.lasers = this.physics.add.group();


    this.score = 0;
    this.scoreText = this.add.text(this.player.x, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(this.lasers, virus, overlap_virus, null, this);
    this.physics.add.collider(this.player, virus, gameover, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);

    this.cameras.main.setBounds(0, 0, totalWidth, 600);
  }


  update() {
    if (this.gameOver) {
      this.end();
      return;
    }


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.setFlipX(true);
      if (this.player.body.onFloor()) {
        this.player.play('run', true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.setFlipX(false);
      if (this.player.body.onFloor()) {
        this.player.play('run', true);
      }
    } else {
      this.player.setVelocityX(0);
      this.player.play('run', false);
      this.player.play('attack', false);
      if (this.player.body.onFloor()) {
        // this.player.play('idle', true);

      }
    }


    if ((this.cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.setVelocityY(-250);
    } else if ((this.cursors.down.isDown) && !this.player.body.onFloor()) {
      this.player.setVelocityY(200);
    }


    if (this.cursors.space.isDown) {
      this.player.play('attack', true);
      const laser = this.physics.add.sprite(this.player.x, this.player.y, 'laser');
      laser.setCollideWorldBounds(true);
      this.lasers.add(laser);
      // this.lasers.setVelocityY(0);
      this.lasers.setVelocityX(1000);
      if (this.player.body.velocity.x < 0) {
        this.lasers.setVelocityX(-1000);
      }
    } else {
      // this.lasers.disableBody(true, true)
      // this.lasers.children.iterate((child)
      this.lasers.setVelocityX(0);
      // this.lasers.setVelocityY(0);
    }
    if (this.player.x > 300) {
      this.scoreText.x = this.player.x - 300;
    }
  }

  end() {
    this.time.addEvent({
      delay: 1000,
      callback() {
        // this.scene.sleep('GameScene');
        this.scene.start('GetUsername', { cscore: this.score });
      },
      callbackScope: this,
      loop: false,
    });
  }


  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody();

    platforms.create(800, 400, GROUND_KEY);
    platforms.create(50, 250, GROUND_KEY);

    return platforms;
  }

  createVirus() {
    const virus = this.physics.add.group({
      key: 'virus',
      repeat: 40,
      setXY: {
        x: 300, y: 200, stepX: 200, stepY: 30,
      },
    });


    const list = [];
    virus.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
      child.body.setOffset(0, 160);
      list.push(child);
      child.setCollideWorldBounds(true);

      this.tween = this.tweens.add({
        targets: child,
        props: {
          x: { value: child.x + 200, duration: 5000, ease: 'Linear' },
          y: {
            value: 300, duration: 1000, ease: 'Bounce.easeInOut', yoyo: true, delay: 1000,
          },
        },
        flipX: true,
        yoyo: true,
        repeat: -1,

      });
    });

    return virus;
  }


  createPlayer() {
    const hero = this.physics.add.sprite(200, 50, 'hero');
    hero.setBounce(0.2);
    // hero.setScrollFactor(1.5)
    hero.body.setOffset(20, 160);
    hero.setCollideWorldBounds(true);

    const attackFrm = this.anims.generateFrameNames('heroAtlas', {
      start: 1, end: 10, prefix: 'Attack (', suffix: ').png',
    });
    this.anims.create({
      key: 'attack',
      frames: attackFrm,
      frameRate: 20,
      repeat: -1,
    });

    const runFrm = this.anims.generateFrameNames('heroAtlas', {
      start: 1, end: 10, prefix: 'Run (', suffix: ').png',
    });
    this.anims.create({
      key: 'run',
      frames: runFrm,
      frameRate: 20,
      repeat: -1,
    });

    const deadFrm = this.anims.generateFrameNames('heroAtlas', {
      start: 1, end: 10, prefix: 'Dead (', suffix: ').png',
    });
    this.anims.create({
      key: 'dead',
      frames: deadFrm,
      frameRate: 20,
      // repeat: -1
    });

    return hero;
  }
}


const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; ++i) {
    const m = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};
