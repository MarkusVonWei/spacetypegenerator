var bkgdColor, foreColor;

var inputText = [];
var starterText = "FIND\nYOUR\nKIND";
// var starterText = "GROW\nYOUR\nKIND";

var pg = [];
var tFont = [];
var tFontFactor = [];
var pgTextSize = 100;
var colorSet = [];

var colorType = 0;

var leading = 0;

var pauseLength = 30;

var wWindowMin, wWindowMax;
var scaler = 0.9;

var widgetOn = true;

var floralsTop = [];
var floralsBot = [];

var growBase = 90; // Grow
var pauseBase = 120; // Pause
var fallBase = 120; // Fall

var pgLogo, pgArtist;

var pauseOn = false;
var hideWidget = false;
var saveStaticOn = false;

var selFont = 4;

function preload(){
  tFont[0] = loadFont("resources_kind/Milligram-Heavy.ttf");
  tFont[1] = loadFont("resources_kind/Evans-Narrow-Medium.ttf")
  tFont[2] = loadFont("resources_kind/Heading-Now-25-Medium.ttf")
  tFont[3] = loadFont("resources_kind/Unigeo32-Medium.ttf")
  tFont[4] = loadFont("resources_kind/Groot-Regular.ttf")

  tFontFactor[0] = 0.75;
  tFontFactor[1] = 0.85;
  tFontFactor[2] = 0.8;
  tFontFactor[3] = 0.75;
  tFontFactor[4] = 0.75;

  pgLogo = loadImage("resources_kind/logo.png");
  pgArtist = loadImage("resources_kind/artist.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  noSmooth();
  strokeCap(ROUND);
  strokeJoin(ROUND);

  foreColor = color('#ffffff');
  bkgdColor = color('#ffffff');

  colorSet[0] = color('#034c8c');
  colorSet[1] = color('#5b9ed9');
  colorSet[2] = color('#02735e');
  colorSet[3] = color('#8fd9be');
  colorSet[4] = color('#f2f2f2');
  // colorSet[5] = color('#000000');
 
  document.getElementById("textArea").value = starterText;
  setText();
}

function draw(){
  // if(saveStaticOn){
  //   createCanvas(windowWidth * 2, windowHeight * 2);
  //   scale(2);
  // }

  background(bkgdColor);

  // fill(foreColor);
  // textSize(40);
  // textAlign(CENTER);
  // textFont(tFont[3]);
  // text("I want death to find me", width/2, 200);
  // text("planting my cabbages,", width/2, 200 + 330);
  // text("neither worrying about it", width/2, 200 + 660);
  // text("nore the unfinished gardening.", width/2, 200 + 990);

  for(var m = 0; m < floralsBot.length; m++){
    floralsBot[m].run();
  }

  image(pg[0], 0, 0, windowWidth, windowHeight);

  for(var m = 0; m < floralsTop.length; m++){
    floralsTop[m].run();
  }

  // for (let i = florals.length - 1; i >= 0; i--) {
  for(let i = 0; i < floralsTop.length; i++) {
    if (floralsTop[i].removeIt) {
      floralsTop.splice(i, 1); // Remove the object at index i
      // break; // Exit the loop once the object is found and removed
    }
  }

  for(let i = 0; i < floralsBot.length; i++) {
    if (floralsBot[i].removeIt) {
      floralsBot.splice(i, 1); // Remove the object at index i
      // break; // Exit the loop once the object is found and removed
    }
  }

  image(pgLogo, 0, height - pgLogo.height/3, pgLogo.width/3, pgLogo.height/3);
  image(pgArtist, width - pgArtist.width/3, height - pgArtist.height/3, pgArtist.width/3, pgArtist.height/3);

  // fill(255);
  // textSize(10);
  // textFont(tFont[1]);
  // text(floralsTop.length, 20, height - 50);
  // text(round(frameRate()), 20, height - 30);

  // if(saveStaticOn){
  //   save("FindYourKind_KielDM.png");

  //   saveStaticOn = false;
  //   createCanvas(windowWidth, windowHeight);
  // }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  setText();
}

function mouseDragged(){
  if(dist(mouseX, mouseY, pmouseX, pmouseY) > 10){
    for(var m = 0; m < 10; m++){
      var ranAng = random(-PI, PI);
      var ranRad = random(-300, 300);

      var tX = mouseX + cos(ranAng) * ranRad;
      var tY = mouseY + sin(ranAng) * ranRad;

      var rs0 = random(40);
      if(random(10) > 9.5){
        if(rs0 < 10){
          floralsTop[floralsTop.length] = new Fern1(tX, tY);
        } else if(rs0 < 25){
          floralsTop[floralsTop.length] = new Fern2(tX, tY);
        } else if(rs0 < 30){
          floralsTop[floralsTop.length] = new Fern3(tX, tY);
        } else if(rs0 < 35) {
          var rs0 = int(random(1,5));
          for(var m = 0; m < rs0; m++){
            floralsTop[floralsTop.length] = new Fern4(tX + random(-20, 20), tY + random(-20, 20));
          }
        } else {
          // floralsTop[floralsTop.length] = new Fern5(tX, tY);
        }
      } else {
        if(rs0 < 10){
          floralsBot[floralsBot.length] = new Fern1(tX, tY);
        } else if(rs0 < 25){
          floralsBot[floralsBot.length] = new Fern2(tX, tY);
        } else if(rs0 < 30){
          floralsBot[floralsBot.length] = new Fern3(tX, tY);
        } else if(rs0 < 35) {
          var rs0 = int(random(1,5));
          for(var m = 0; m < rs0; m++){
            floralsBot[floralsBot.length] = new Fern4(tX + random(-20, 20), tY + random(-20, 20));
          }
        } else {
          floralsBot[floralsBot.length] = new Fern5(tX, tY);
        }
      }

      // if(brightness(pg[1].get(tX, tY)) > 10){
      //   var rs0 = random(40);

      //   if(rs0 < 10){
      //     floralsTop[floralsTop.length] = new Fern1(tX, tY);
      //   } else if(rs0 < 25){
      //     floralsTop[floralsTop.length] = new Fern2(tX, tY);
      //   } else if(rs0 < 30){
      //     floralsTop[floralsTop.length] = new Fern3(tX, tY);
      //   } else if(rs0 < 35) {
      //     var rs0 = int(random(1,5));
      //     for(var m = 0; m < rs0; m++){
      //       floralsTop[floralsTop.length] = new Fern4(tX + random(-20, 20), tY + random(-20, 20));
      //     }
      //   } else {
      //     floralsTop[floralsTop.length] = new Fern5(tX, tY);
      //   }
      // }
    }
  }

  // if(brightness(pg[0].get(mouseX, mouseY)) > 10){
  //   florals[florals.length] = new Floral(mouseX, mouseY);
  // }
}
// if(brightness(pg[0].get(tX, tY)) < 10){
