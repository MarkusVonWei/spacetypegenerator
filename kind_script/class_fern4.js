class Fern4 {     //////////// BERRY
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.anim1 = growBase + random(-15, 15);
    this.anim2 = this.anim1 + pauseBase + random(-30, 90);
    this.anim3 = this.anim2 + random(30, 60);

    this.ticker = 0;

    this.sActual = 0;
    this.sStart = 0;
    this.sMid = 1;
    this.sFinal = 1;

    this.sCore = random(5, 20);

    this.rActual = random(-PI/2, PI/2);
    // this.rStart = this.rActual;
    this.rStart = 0;
    this.rTarget = 0;

    this.fYactual = 0;
    this.fXactual = 0;
    this.fYstart = 0;
    this.fXstart = 0;
    this.fYtarget = random(100, 300);
    this.fXtarget = 0;

    this.rBase = 0;
    this.direct = 1;
    if(this.rBase > PI/2){
      this.direct = -1;
    }
    this.rWind = 0;

    this.cActual = bkgdColor;
    this.cStart = color(255,0,0);
    this.cTarget = color(255,0,0);
    // this.tColor = colorSet[int(random(4))];

    this.lineC = colorSet[int(random(colorSet.length))];

    this.removeIt = false;
    this.lineAdd = false;
    if(random(10) < 6){
      this.lineAdd = true;
    }
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    if(!pauseOn){
      this.ticker ++;
    } else if(this.ticker < this.anim1){
      this.ticker ++;
    }

    ///// MAIN ANIMATION
    if(this.ticker < this.anim1){
      var tk0 = map(this.ticker, 0, this.anim1, 0, 1);

      this.sActual = map(easeOutExpo(tk0), 0, 1, this.sStart, this.sMid);
      this.fYactual = this.fYstart;
      this.fXactual = this.fXstart;
      this.cActual = lerpColor(this.cStart, this.cTarget, easeOutQuad(tk0));

    } else if(this.ticker < this.anim2){
      var tk0 = map(this.ticker, this.anim1, this.anim2, 0, 1);

      this.sActual = this.sMid;
      this.fYactual = this.fYstart;
      this.fXactual = this.fXstart;
      this.cActual = this.cTarget;

    } else if(this.ticker < this.anim3){
      var tk0 = map(this.ticker, this.anim2, this.anim3 - 1, 0, 1);
      var tk1 = map(easeInSine(tk0), 0, 1, 0, TWO_PI);

      this.sActual = map(easeInExpo(tk0), 0, 1, this.sMid, this.sFinal);
      this.fYactual = map(easeInExpo(tk0), 0, 1, this.fYstart, this.fYtarget);
      this.fXactual = map(sin(tk1), -1, 1, -this.fXtarget, this.fXtarget);
      this.cActual = this.cTarget;

    }

    ///// ROTATION BOUNCE
    if(this.ticker < this.anim2){
      var tk0 = map(this.ticker, 0, this.anim2, 0, 1);

      this.rActual = map(easeOutElastic(tk0), 0, 1, this.rStart, this.rTarget);
    } else {
      var tk0 = map(this. ticker, this.anim2, this.anim3, 0, 1);

      this.rActual = map(easeInQuint(tk0), 0, 1, this.rTarget, this.rTarget * 2);
    }

    this.rWind = map(noise((this.x + frameCount * 0.4) * 0.02, this.y * 0.02), 0, 1, -PI/4, PI/4);

    if(this.ticker > this.anim3){
      this.removeIt = true;
    }
  }

  display(){
    push();
      translate(this.x, this.y);
      translate(this.fXactual, this.fYactual);

      rotate(this.rWind);
      rotate(this.rBase);
      rotate(this.rActual);

      scale(this.sActual)
      noStroke();
      fill(this.cActual);

      scale(1, this.direct);

      ellipse(0, this.sCore/2, this.sCore);
    pop();
  }

}