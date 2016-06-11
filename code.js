//PJS
var sketchProc = function(processingInstance) {
  with(processingInstance) {
    size(1000, 800);
    frameRate(60);
    //DEBUG
    var bug = false;
    //
    var world = {
      rows: 100,
      cols: 200,
    };
    /** Images **/
    noiseSeed(1);
    var images = {
      //Grass
      grass: function() { //leave the extra parameters empty
        //Draw The Image
        for (var y = 50; y < 55; y++) {
          for (var x = 0; x < 25; x++) {
            var noiseVal;
            var noiseScale = 0.02;
            noiseDetail(8, 0.6);
            noiseVal = noise((x + 200) * noiseScale, (y + 200) *
              noiseScale);
            stroke(noiseVal * 0, noiseVal * 182, noiseVal * 0);
            point(x, y);
          }
        }
        for (var y = 55; y < 75; y++) {
          for (var x = 0; x < 25; x++) {
            var noiseVal;
            var noiseScale = 0.02;
            noiseDetail(8, 0.6);
            noiseVal = noise((x + 200) * noiseScale, (y + 200) *
              noiseScale);
            stroke(noiseVal * 160, noiseVal * 112, noiseVal * 0);
            point(x, y);
          }
        }
        //Make the function display the image
        return get(0, 50, 25, 25);
      },
      //Dirt
      dirt: function() {
        for (var y = 75; y < 100; y++) {
          for (var x = 0; x < 25; x++) {
            var noiseVal;
            var noiseScale = 0.02;
            noiseDetail(8, 0.6);
            noiseVal = noise((x + 200) * noiseScale, (y + 200) *
              noiseScale);
            stroke(noiseVal * 160, noiseVal * 112, noiseVal * 0);
            point(x, y);
          }
        }
        return get(0, 75, 25, 25);
      },
      //Stone
      stone: function() {
        for (var y = 100; y < 125; y++) {
          for (var x = 0; x < 25; x++) {
            var noiseVal;
            var noiseScale = 0.02;
            noiseDetail(8, 0.6);
            noiseVal = noise((x + 10) * noiseScale, (y + 100) *
              noiseScale);
            stroke(noiseVal * 150, noiseVal * 150, noiseVal * 150);
            point(x, y);
          }
        }
        return get(0, 100, 25, 25);
      },
    };
    imageMode(CORNER);
    var grass,
      dirt,
      stone,
      Grass = [],
      Dirt = [],
      Stone = [];
    //Grass
    grass = function(x, y) {
      this.position = new PVector(x, y);
      this.w = 25;
      this.h = 25;
    };
    grass.prototype.run = function() {
      this.display();
    };
    grass.prototype.display = function() {
      image(images.grass, this.position.x, this.position.y, this.w, this.h);
    };
    //Dirt
    dirt = function(x, y) {
      this.position = new PVector(x, y);
      this.w = 25;
      this.h = 25;
    };
    dirt.prototype.run = function() {
      this.display();
    };
    dirt.prototype.display = function() {
      image(images.dirt, this.position.x, this.position.y, this.w, this.h);
    };
    //Stone
    stone = function(x, y) {
      this.position = new PVector(x, y);
      this.w = 25;
      this.h = 25;
    };
    stone.prototype.run = function() {
      this.display();
    };
    stone.prototype.display = function() {
      image(images.stone, this.position.x, this.position.y, this.w, this.h);
    };
    //Tile Generation
    var tilegeneration = function(t) {
      this.tt = t; //Terrain Type
    };
    tilegeneration.prototype.run = function() {
      this.generate();
    };
    tilegeneration.prototype.generate = function() {
      switch (this.tt) {
        case 1:
          //Layers
          var grassLayers = [375, 400, 425];
          var stoneLayers = [525, 550, 575];
          //Generation stuff
          var GrassPOS = [];
          var StonePOS = [];
          //Generate the grass
          while (GrassPOS.length < world.cols) {
            GrassPOS.push(grassLayers[floor(random() * grassLayers.length)]);
          }
          //Generate the stone
          while (StonePOS.length < world.cols) {
            StonePOS.push(stoneLayers[floor(random() * stoneLayers.length)]);
          }
          //Make the bottom of the stone flat
          for (var i = 0; i < world.cols; i += 1) {
            if (StonePOS[i] === stoneLayers[0]) {
              Stone.push(new stone(i * 25, stoneLayers[1]));
              Stone.push(new stone(i * 25, stoneLayers[2]));
            } else if (StonePOS[i] === stoneLayers[1]) {
              Stone.push(new stone(i * 25, stoneLayers[2]));
            }
          }
          for (var w = 0; w < world.cols; w += 1) {
            for (var h = 600; h < world.rows * 25; h += 25) {
              Stone.push(new stone(w * 25, h));
            }
          }
          //Add the terrain to the arrays
          //Grass
          for (var w = 0; w < world.cols; w += 1) {
            Grass.push(new grass(w * 25, GrassPOS[w]));
          }
          //Stone
          for (var w = 0; w < world.cols; w += 1) {
            Stone.push(new stone(w * 25, StonePOS[w]));
          }
          //Dirt
          for (var w = 0; w < world.cols; w++) {
            for (var h = GrassPOS[w] + 25; h < StonePOS[w]; h += 25) {
              Dirt.push(new dirt(w * 25, h));
            }
          }
          break;
        case 2:
          for (var w = 0; w < world.cols; w += 1) {
            Grass.push(new grass(w * 25, 375));
          }
          for (var w = 0; w < world.cols; w += 1) {
            for (var h = 400; h < 475; h += 25) {
              Dirt.push(new dirt(w * 25, h));
            }
          }
          for (var w = 0; w < world.cols; w += 1) {
            for (var h = 475; h < world.rows * 25; h += 25) {
              Stone.push(new stone(w * 25, h));
            }
          }
          break;
      }
    };
    var gt = [1, 2];
    var tg = new tilegeneration(gt[floor(random() * gt.length)]);
    tg.run(); /** ONLY CALL THIS LINE OF CODE HERE - NO-WHERE ELSE **/
    var keys = [];
    var keyPressed = function() {
      keys[keyCode] = true;
    };
    var keyReleased = function() {
      keys[keyCode] = false;
    };
    //
    var Player = function(x, y) {
      this.pos = new PVector(x, y);
      this.w = 25;
      this.h = 25;
      this.s = 12.5;
    };
    Player.prototype.run = function() {
      this.draw();
      this.update();
    };
    Player.prototype.draw = function() {
      noStroke();
      fill(255);
      rect(this.pos.x, this.pos.y, this.w, this.h, 5);
      stroke(0);
      strokeWeight(5);
      point(this.pos.x + 7.5, this.pos.y + 10);
      point(this.pos.x + 17.5, this.pos.y + 10);
    };
    Player.prototype.update = function() {
      if (keys[UP]) {
        this.pos.y -= this.s;
      }
      if (keys[DOWN]) {
        this.pos.y += this.s;
      }
      if (keys[LEFT]) {
        this.pos.x -= this.s;
      }
      if (keys[RIGHT]) {
        this.pos.x += this.s;
      }
      this.pos.x = constrain(this.pos.x, 0, world.cols * 25 - this.w);
      this.pos.y = constrain(this.pos.y, 0, world.rows * 25 - this.h);
    };
    var player = new Player(world.cols * 25 / 2, 200);
    //
    var mapCamera = {
      pos: new PVector(200 - player.pos.x, 200 - player.pos.y),
      right: -world.cols * 25,
      bottom: -world.rows * 25,
      run: function() {
        this.pos.x = constrain(this.pos.x + (width / 2 - player.pos.x -
          this.pos.x) / 10, this.right, 0);
        this.pos.y = constrain(this.pos.y + (height / 2 - player.pos.y -
          this.pos.y) / 10, this.bottom, 0);
        translate(this.pos.x, this.pos.y);
      }
    };
    //Draw Function
    var draw = function() {
      for (var each in images) {
        if (typeof images[each] !== "object") {
          background(0, 0, 0, 0);
          images[each] = images[each]();
        }
      }
      background(0, 139, 255);
      pushMatrix();
      mapCamera.run();
      for (var each in Grass) {
        Grass[each].run();
      }
      for (var each in Dirt) {
        Dirt[each].run();
      }
      for (var each in Stone) {
        Stone[each].run();
      }
      player.run();
      if (bug) {
        noFill();
        stroke(0);
        strokeWeight(10);
        rect(0, 0, world.cols * 25, world.rows * 25);
      }
      popMatrix();
    };
  }
}; // 
var canvas = document.getElementById("mycanvas");
var processingInstance = new Processing(canvas, sketchProc);
//Risizing canvas
function resizeCanvas() {
  canvas.style.width = window.innerWidth + "px";
  setTimeout(function() {
    canvas.style.height = window.innerHeigh + "px";
  }, 0);
};
window.onresize = resizeCanvas;
resizeCanvas();
