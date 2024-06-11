function setText(){
  print("NEW!");
  var enteredText = document.getElementById("textArea").value;
  
  inputText = "";
  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    print("SHORT EXECUTED! and inputText is " + inputText);
    inputText = [];
    inputText[0] = " ";
  }

  coreCount = inputText.length;

  findMaxSize();

  drawText(1);
  drawText2(0);
}

function findMaxSize(){
  var testerSize = 100;
  textSize(testerSize);
  textFont(tFont[selFont]);
  
  ///////// FIND THE LONGEST LINE
  var longestLine = 0;
  var measurer = 0;

  for(var m = 0; m < inputText.length; m++){
    var tapeMeasurer = textWidth(inputText[m]);

    if(tapeMeasurer > measurer){
      longestLine = m;
      measurer = tapeMeasurer;
    }
  }
  // print("LONGLEST LINE IS:" + longestLine + " which reads: " + inputText[longestLine]);

  ///////// FIND THE SIZE THAT FILLS TO THE MAX WIDTH
  var widthTest = wWindow;

  let sizeHolder = 2;
  textSize(sizeHolder);
  let holdW = 0;

  while(holdW < widthTest){
    textSize(sizeHolder);
    holdW = textWidth(inputText[longestLine]);

    sizeHolder += 2;
  }
  pgTextSize = sizeHolder;

  ///////// MAKE SURE THE HEIGHT DOESN'T BRAKE THE HEIGHT
  var heightTest = (height - 100) - (inputText.length - 1) * leading;
  let holdH = inputText.length * sizeHolder * tFontFactor[selFont];
  while(holdH > heightTest){
    holdH = inputText.length * sizeHolder * tFontFactor[selFont];
    sizeHolder -= 2;
  }
  pgTextSize = sizeHolder;

}

function setFont(val){
  selFont = val;

  setText();
}

function runPlay(){
  pauseOn = !pauseOn;

  var elem = document.getElementById("togglePlayButton");
  if(pauseOn){
    elem.innerHTML = "ALLOW EBB";
  } else {
    elem.innerHTML = "PAUSE EBB";
  }
    // if (elem.value=="Close Curtain") elem.value = "Open Curtain";
    // else elem.value = "Close Curtain";

  console.log("Pause is now: " + pauseOn);
}

function setScaler(val){
  scaler = map(val, 0, 100, 0.1, 1);

  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);
  
  setText();
}

function runPNGsave(){
  // saveStaticOn = true;
  save("FindYourKind_KielDM.png");
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}