(function(){
  var canvas, ctx;
  var width, height;
  var pads = {};
  var colors;
  var currentColor;
  var colorPos;
  var canvasContainer;
  var score;
  var particles = [];
  var frameRate = 60.0;
  var frameDelay = 1000.0/frameRate;
  var refresh;

  var introScreen = function() {
    $( ".start-button" ).click(function() {
      $('#intro-screen').hide();
      $('#end-screen').hide();
      initialize();
    });
  }

  var initialize = function() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    score = 0;

    canvasContainer = $('.canvas-container');
    height = canvasContainer.height();
    width = canvasContainer.width();
    colors = ['#ff0035', '#48ccff', '#0DFE8F'];
    pads.rows = 2;
    pads.cols = 2;

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/3 - 100, 100, 0, 2 * Math.PI, false);
    var nRandom = Math.floor(Math.random() * 3) + 1
    currentColor = colors[nRandom-1];
    ctx.fillStyle = currentColor;
    ctx.fill();
    colorPos =[]

    for (i = 0; i < 4; i++) {
      colorPos[i] = getRandomColor();
    }

    if (colorPos.indexOf(currentColor) < 0) {
      var nRandom = Math.floor(Math.random() * 3) + 1;
      colorPos[nRandom] = currentColor;
    }

    for (i = 1; i < pads.rows+1; i++) {
      for (j = 1; j < pads.cols+1; j++){
        ctx.beginPath();
        ctx.arc(canvas.width*i/2 - canvas.width/3 +canvas.width/12, ((j+1)/3)*canvas.height - 100, 100, 0, 2 * Math.PI, false);
        ctx.fillStyle = colorPos[i*i+j-1*i-1]
        ctx.fill();
      }
    }
    checkForClicks();
  }
    // ctx.beginPath();
    // ctx.moveTo(0, canvas.height/3);
    // ctx.lineTo(canvas.width, canvas.height/3);
    // ctx.strokeStyle = '#ffffff';
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(0, canvas.height/3*2);
    // ctx.lineTo(canvas.width, canvas.height/3*2);
    // ctx.strokeStyle = '#ffffff';
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(canvas.width/2, 0);
    // ctx.lineTo(canvas.width/2, canvas.height);
    // ctx.strokeStyle = '#ffffff';
    // ctx.stroke();
  function checkForClicks() {
    canvas.onclick = function(e) {
      var canvasContainerWidth = canvasContainer.width();
      var canvasContainerHeight = canvasContainer.height();
      var canvasPosition = {
        x: canvasContainer.offset().left,
        y: canvasContainer.offset().top
      };
      e.preventDefault();
      var mouse = {
          x: e.pageX - canvasPosition.x,
          y: e.pageY - canvasPosition.y
      }

      if (mouse.x < canvasContainerWidth/2 && mouse.y > canvasContainerHeight/3 && mouse.y < canvasContainerHeight/3*2) {
        if (currentColor !== colorPos[0]) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.onclick = 0;
          $('#end-screen').show();
          $('#score-container').html('score:'+score);
        } else {
          ctx.clearRect(0,canvas.height/3,canvas.width/2,canvas.height/3);
          clearInterval(refresh);
          ctx.clearRect(0,canvas.height/3,canvas.width/2,canvas.height/3);
          ctx.beginPath();
          ctx.arc(canvas.width/2 - canvas.width/3 +canvas.width/12, (2/3)*canvas.height - 100, 100, 0, 2 * Math.PI, false);
          redrawSubColor(0);
          createExplosion(canvas.width/2 - canvas.width/3 +canvas.width/12, (2/3)*canvas.height - 100, 0);
        }
      } else if (mouse.x > canvasContainerWidth/2 && mouse.y > canvasContainerHeight/3 && mouse.y < canvasContainerHeight/3*2) {
        if (currentColor !== colorPos[2]) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.onclick = 0;
          $('#end-screen').show();
          $('#score-container').html('score:'+score);
        } else {
          ctx.clearRect(canvas.width/2,canvas.height/3,canvas.width/2,canvas.height/3);
          clearInterval(refresh);
          ctx.clearRect(canvas.width/2,canvas.height/3,canvas.width/2,canvas.height/3);
          ctx.beginPath();
          ctx.arc(canvas.width - canvas.width/3 +canvas.width/12, (2/3)*canvas.height - 100, 100, 0, 2 * Math.PI, false);
          redrawSubColor(2);
          createExplosion(canvas.width - canvas.width/3 +canvas.width/12, (2/3)*canvas.height - 100, 2);
        }
      } else if (mouse.x < canvasContainerWidth/2 && mouse.y > canvasContainerHeight/3) {
        if (currentColor !== colorPos[1]) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.onclick = 0;
          $('#end-screen').show();
          $('#score-container').html('score:'+score);
        } else {
          ctx.clearRect(0,canvas.height/3*2,canvas.width/2,canvas.height/3);
          clearInterval(refresh);
          ctx.clearRect(0,canvas.height/3*2,canvas.width/2,canvas.height/3);
          ctx.beginPath();
          ctx.arc(canvas.width/2 - canvas.width/3 +canvas.width/12, canvas.height - 100, 100, 0, 2 * Math.PI, false);
          createExplosion(canvas.width/2 - canvas.width/3 +canvas.width/12, canvas.height - 100, 1);
        }
      } else if (mouse.x > canvasContainerWidth/2 && mouse.y > canvasContainerHeight/3) {
        if (currentColor !== colorPos[3]) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.onclick = 0;
          $('#end-screen').show();
          $('#score-container').html('score:'+score);
        } else {
          ctx.clearRect(canvas.width/2,canvas.height/3*2,canvas.width/2,canvas.height/3);
          clearInterval(refresh);
          ctx.clearRect(canvas.width/2,canvas.height/3*2,canvas.width/2,canvas.height/3);
          ctx.beginPath();
          ctx.arc(canvas.width - canvas.width/3 +canvas.width/12, canvas.height - 100, 100, 0, 2 * Math.PI, false);
          redrawSubColor(3);
          createExplosion(canvas.width - canvas.width/3 +canvas.width/12, canvas.height - 100, 3);
        }
      }
      return false;
    };
  }
  function redrawSubColor(position) {
    var upcomingMainColor = getRandomColor();
    var upcomingSubColor = getRandomColor();
    score ++;
    colorPos[position] = upcomingSubColor;
    if (colorPos.indexOf(upcomingMainColor) < 0) {
      upcomingSubColor = upcomingMainColor;
      colorPos[position] = upcomingSubColor;
    }
    ctx.fillStyle = upcomingSubColor;
    ctx.fill();
    redrawMainColor(upcomingMainColor);
  }

  function redrawMainColor(upcomingMainColor) {
    ctx.clearRect(0,0,canvas.width,canvas.height/3);
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/3 - 100, 100, 0, 2 * Math.PI, false);
    ctx.fillStyle = upcomingMainColor;
    currentColor = upcomingMainColor;
    ctx.fill();
  }

  function getRandomColor() {
    var nRandom = Math.floor(Math.random() * 3) + 1;
    var randomColor = colors[nRandom-1];
    return randomColor;
  }

  function createExplosion(x, y, position) {
    refresh = setInterval(function() {
      update(x, y, frameDelay);
    }, frameDelay);
    var color = colorPos[position];

    var minSize = 30;
    var maxSize = 50;
    var count = 10;
    var minSpeed = 60;
    var maxSpeed = 200;
    var minScaleSpeed = 2.0;
    var maxScaleSpeed = 5.0;
    for (var angle=0; angle<360; angle += 360/count) {
      var particle = new Particle();

      particle.x = x;
      particle.y = y;
      particle.radius = randomFloat(minSize, maxSize);
      particle.color = color;
      particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

      var speed = randomFloat(minSpeed, maxSpeed);
      particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
      particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

      particles.push(particle);
    }
  }

  function Particle () {
    this.scale = 1;
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;

    this.update = function(ms) {
      // shrinking
      this.scale -= this.scaleSpeed * ms / 1000.0;

      if (this.scale <= 0) {
        this.scale = 0;
      }
      // moving away from explosion center
      this.x += this.velocityX * ms/1000.0;
      this.y += this.velocityY * ms/1000.0;
    };

    this.draw = function(ctx) {
      // translating the 2D context to the particle coordinates
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);

      // drawing a filled circle in the particle's local space
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    };
  }

  function update (x, y, frameDelay) {
    // draw a white background to clear canvas
    ctx.fillStyle = "#FFF";
    ctx.clearRect(x -100, y -100, canvas.width/2, canvas.height/3);
    // update and draw particles
    for (var i=0; i<particles.length; i++) {
      var particle = particles[i];
      particle.update(frameDelay);
      particle.draw(ctx);
    }
  }

  function randomFloat (min, max) {
    return min + Math.random()*(max-min);
  }

  Array.prototype.allValuesSame = function() {
    for(var i = 1; i < this.length; i++) {
      if(this[i] !== this[0])
        return false;
    }
    return true;
  }

  introScreen();
})();