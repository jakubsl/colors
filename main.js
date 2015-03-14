var canvas, ctx;
var width, height;
var pads = {};
var colors;
var currentColor;
var colorPos;
var canvasContainer;
var score;

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

    if (mouse.x < canvasContainerWidth/2 && mouse.y < canvasContainerHeight/3*2){
      ctx.clearRect(0,canvas.height/3,canvas.width/2,canvas.height/3);
      ctx.beginPath();
      ctx.arc(canvas.width/2 - canvas.width/3 +canvas.width/12, (2/3)*canvas.height - 100, 100, 0, 2 * Math.PI, false);
      redrawSubColor(0)
    } else if (mouse.x > canvasContainerWidth/2 && mouse.y < canvasContainerHeight/3*2){
      ctx.clearRect(canvas.width/2,canvas.height/3,canvas.width/2,canvas.height/3);
      ctx.beginPath();
      ctx.arc(canvas.width - canvas.width/3 +canvas.width/12, (2/3)*canvas.height - 100, 100, 0, 2 * Math.PI, false);
      redrawSubColor(1);
    } else if (mouse.x < canvasContainerWidth/2 && mouse.y > canvasContainerHeight/3){
      ctx.clearRect(0,canvas.height/3*2,canvas.width/2,canvas.height/3);
      ctx.beginPath();
      ctx.arc(canvas.width/2 - canvas.width/3 +canvas.width/12, canvas.height - 100, 100, 0, 2 * Math.PI, false);
      redrawSubColor(2);
    } else if (mouse.x > canvasContainerWidth/2 && mouse.y > canvasContainerHeight/3){
      ctx.clearRect(canvas.width/2,canvas.height/3*2,canvas.width/2,canvas.height/3);
      ctx.beginPath();
      ctx.arc(canvas.width - canvas.width/3 +canvas.width/12, canvas.height - 100, 100, 0, 2 * Math.PI, false);
      redrawSubColor(3);
    }
    return false;
  };
}
function redrawSubColor(position) {
  var selectedColor = colorPos[position];
  var upcomingMainColor = getRandomColor();
  var upcomingSubColor = getRandomColor();
  if (currentColor == selectedColor) {
    score ++;
    colorPos[position] = upcomingSubColor;
    if (colorPos.indexOf(upcomingMainColor) < 0) {
      upcomingSubColor = upcomingMainColor;
      colorPos[position] = upcomingSubColor;
    }
    ctx.fillStyle = upcomingSubColor;
    ctx.fill();
    redrawMainColor(upcomingMainColor);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.onclick = 0;
    $('#end-screen').show();
    $('#score-container').html('score:'+score);
  }
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

Array.prototype.allValuesSame = function() {
  for(var i = 1; i < this.length; i++) {
    if(this[i] !== this[0])
      return false;
  }

  return true;
}


introScreen();