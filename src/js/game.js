(function(global) {
  'use strict';

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'playground', {
    preload: preload,
    create: create,
    update: update,
    render: render
  }, true, false);

  var bot;
  var gem;
  var text;
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
    moveBot();
  });

  $('#rewind').on('click', function() {
    clearInterval(intervalID);
    $("#command-bar li").removeClass('active');
    bot.reset(100, 380, 0);
    commands = [];
  });

  $('#reset').on('click', function() {
    clearInterval(intervalID);
    $("#command-bar").html('');
    moveRangeX = 0;
    moveRangeY = 0;
    commands = [];
    bot.reset(100, 380, 0);
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

  new Sortable(commandBar, {

  });


  function preload () {

    game.world.setBounds(0,0,800, 600);

    game.load.image('dirt', 'img/dirt.png');
    game.load.image('stone', 'img/stone.png');
    game.load.image('water', 'img/water.png');
    game.load.image('girl', 'img/girl.png');
    game.load.image('gem', 'img/gem.png');

  }

  function create () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(100, 180, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(200, 180, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(300, 180, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(400, 180, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(500, 180, 'dirt').anchor.setTo(0.5, 0.5);

    game.add.sprite(100, 260, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(200, 260, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(300, 260, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(400, 260, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(500, 260, 'stone').anchor.setTo(0.5, 0.5);

    game.add.sprite(100, 340, 'water').anchor.setTo(0.5, 0.5);
    game.add.sprite(200, 340, 'water').anchor.setTo(0.5, 0.5);
    game.add.sprite(300, 340, 'water').anchor.setTo(0.5, 0.5);
    game.add.sprite(400, 340, 'water').anchor.setTo(0.5, 0.5);
    game.add.sprite(500, 340, 'stone').anchor.setTo(0.5, 0.5);

    game.add.sprite(100, 420, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(200, 420, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(300, 420, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(400, 420, 'stone').anchor.setTo(0.5, 0.5);
    game.add.sprite(500, 420, 'stone').anchor.setTo(0.5, 0.5);

    game.add.sprite(100, 500, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(200, 500, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(300, 500, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(400, 500, 'dirt').anchor.setTo(0.5, 0.5);
    game.add.sprite(500, 500, 'dirt').anchor.setTo(0.5, 0.5);

    gem = game.add.sprite(100, 220, 'gem');
    gem.name = 'gem';
    gem.anchor.setTo(0.5, 0.5);
    game.physics.enable(gem, Phaser.Physics.ARCADE);

    gem.body.setSize(100, 80, 0, 45); // change the bounding box
    gem.body.immovable = true;

    bot = game.add.sprite(100, 380, 'girl');
    bot.name = 'girl';
    bot.anchor.setTo(0.5, 0.5);
    game.physics.enable(bot, Phaser.Physics.ARCADE);

    bot.body.setSize(100, 80, 0, 45); // change the bounding box

  }

  function render () {
    // game.debug.spriteBounds(bot);
    // game.debug.spriteBounds(gem);

    if(debug.overlay) {
      game.debug.body(bot);
      game.debug.body(gem);
    }

    if(debug.info) {
      game.debug.bodyInfo(bot, 10, 50);
    }

  }

  function update() {
    game.physics.arcade.overlap(bot, gem, collisionHandler, null, this);
  }

  function collisionHandler (obj1, obj2) {
    obj2.kill();
  }

  function moveBot() {
    intervalID = setInterval(function() { 
      if(!botCommand.LEFT || !botCommand.RIGHT || !botCommand.UP || !botCommand.DOWN) {
        var currentMove = commands.pop();
        var currentCommandNumber = 9 - commands.length;
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
