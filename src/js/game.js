(function(global) {
  'use strict';

  var game = new Phaser.Game(750, 600, Phaser.CANVAS, 'playground', {
    preload: preload,
    create: create,
    update: update,
    render: render
  }, true, false);

  var bot;
  var key;
  var text;
  var map;
  var key;
  var gate;
  var layer;
  var group1;
  var group2;
  var group3;
  var commandCount = 0;
  var commands = [];
  var intervalID;
  var botCommand = {
    LEFT : false,
    RIGHT: false,
    UP   : false,
    DOWN : false
  };
  var debug = {
    info    : false,
    overlay : false
  };
  var commandBar = document.getElementById('command-bar');

  $('#play').on('click', function() {
    $("#command-bar li").each(function() { 
      var toolId = $(this).data('tool');
        commands.push(toolId);
    })
    commands.reverse();
    commandCount = commands.length;
    moveBot();
  });

  $('#rewind').on('click', function() {
    $("#command-bar li").removeClass('active');
    resetBot();
  });

  $('#reset').on('click', function() {
    $("#command-bar").html('');
    resetKey();
    resetBot();
  });

  $('#debug-info').on('click', function() {
    if(debug.info){
      debug.info = false;
      $(this).removeClass('active');
    } else {
      debug.info = true;
      $(this).addClass('active');
    }
  });

  $('#debug-overlay').on('click', function() {
    if(debug.overlay){
      debug.overlay = false;
      $(this).removeClass('active');
    } else {
      debug.overlay = true;
      $(this).addClass('active');
    }
  });

  $("#tool-bar li").on('click', function() {
    if($("#command-bar li").length < 10) {
      $(this).clone(true).appendTo( "#command-bar" );
    }
  });

  new Sortable(commandBar, {});

  function preload () {

    game.world.setBounds(0,0,800, 600);

    game.load.image('dirt', 'img/dirt.png');
    game.load.image('stone', 'img/stone.png');
    game.load.image('water', 'img/water.png');
    game.load.image('girl', 'img/girl.png');
    game.load.image('key', 'img/key.png');

    game.load.image('shadow-east', 'img/shadow-east.png');
    game.load.image('shadow-north-east', 'img/shadow-north-east.png');
    game.load.image('shadow-north-west', 'img/shadow-north-west.png');
    game.load.image('shadow-north', 'img/shadow-north.png');
    game.load.image('shadow-side-west', 'img/shadow-side-west.png');
    game.load.image('shadow-south-east', 'img/shadow-south-east.png');
    game.load.image('shadow-south-west', 'img/shadow-south-west.png');
    game.load.image('shadow-south', 'img/shadow-south.png');
    game.load.image('shadow-west', 'img/shadow-west.png');

    game.load.tilemap('map', 'json/level1.json', null, Phaser.Tilemap.TILED_JSON);

  }

  function create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map');

    map.addTilesetImage('dirt');
    map.addTilesetImage('water');
    map.addTilesetImage('stone');
    map.addTilesetImage('shadow-east');
    map.addTilesetImage('shadow-north-east');
    map.addTilesetImage('shadow-north-west');
    map.addTilesetImage('shadow-north');
    map.addTilesetImage('shadow-side-west');
    map.addTilesetImage('shadow-south-east');
    map.addTilesetImage('shadow-south-west');
    map.addTilesetImage('shadow-south');
    map.addTilesetImage('shadow-west');

    group1 = game.add.group();
    group2 = game.add.group();
    group3 = game.add.group();

    group1.y = 40;
    group2.y = 40;

    map.createLayer('layer01', 800, 600, group1);
    map.createLayer('layer02', 800, 600, group2);
    map.createLayer('layer03', 800, 600, group3);

    key = group3.create(150, 120, 'key');
    key.name = 'key';
    key.anchor.setTo(0.5, 0.5);
    game.physics.enable(key, Phaser.Physics.ARCADE);

    key.body.setSize(100, 80, 0, 50); // change the bounding box
    key.body.immovable = true;

    bot = group3.create(150, 280, 'girl');
    bot.name = 'girl';
    bot.anchor.setTo(0.5, 0.5);
    game.physics.enable(bot, Phaser.Physics.ARCADE);

    bot.body.setSize(100, 80, 0, 50); // change the bounding box

  }

  function render () {
    // game.debug.spriteBounds(bot);
    // game.debug.spriteBounds(key);

    if(debug.overlay) {
      game.debug.body(bot);
      game.debug.body(key);
    }

    if(debug.info) {
      game.debug.bodyInfo(bot, 10, 50);
    }

  }

  function update() {
    game.physics.arcade.overlap(bot, key, collisionHandler, null, this);
  }

  function collisionHandler (obj1, obj2) {
    obj2.kill();
  }

  function resetBot() {
    clearInterval(intervalID);
    commands = [];
    bot.reset(150, 280, 0);
  }

  function resetKey() {
    key.reset(150, 130, 0);
  }

  function moveBot() {
    intervalID = setInterval(function() { 
      if(!botCommand.LEFT || !botCommand.RIGHT || !botCommand.UP || !botCommand.DOWN) {
        var currentMove = commands.pop();
        var currentCommandNumber = commandCount - commands.length - 1;
        var tweenConfig = {};
        $("#command-bar li:eq( " + currentCommandNumber + " )").addClass( "active" );
        switch (currentMove) {
          case 3:
              tweenConfig = { y: bot.body.y - 80 };
            break;
          case 2:
              tweenConfig = { x: bot.body.x + 100 };
            break;
          case 4:
              tweenConfig = { y: bot.body.y + 80 };
            break;
          case 1:
              tweenConfig = { x: bot.body.x - 100 };
            break;
          default:
        }
        game.add.tween(bot.body).to( tweenConfig, 200, Phaser.Easing.Linear.None, true);
      }
    }, 1000);
  }

}(this));