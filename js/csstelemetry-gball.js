/*Copyright (c) 2019 ShellAddicted <ShellAddicted@gmail.com> - MIT License*/
const G = 9.80665;
// eslint-disable-next-line no-unused-vars
function ms2tog(ms2) {
  /*Convert m/s² to g*/
  return ms2 / G;
}
// eslint-disable-next-line no-unused-vars
function gtoms2(g) {
  /*Convert g to m/s²*/
  return g * G;
}

// eslint-disable-next-line no-unused-vars
class GBall {
  constructor(DOMElement, cursorSize = 4, maxGValue = 8, steps = 4, dashed = true) {
    /*
    GBall(DOMElement, cursorSize = 4, maxGValue = 8, steps = 4, dashed = true)

    DOMElement: DOM Element reserved for GBall
    cursorSize: (int)size of force indicator
    maxGValue: (float)maximum representable value
    steps: (int) number of steps between -maxGValue && +maxGValue (more steps =
    more resolution) dashed: (bool) alternates solid circle and dashed circles
    */
    this.cursorSize = cursorSize;
    this.maxGValue = maxGValue;
    this.ball = DOMElement;
    this.cursor = document.createElement('div');
    this.cursor.classList.add('csstelemetry-gball-cursor');
    this.cursor.style.height = this.cursorSize + '%';
    this.cursor.style.width = this.cursorSize + '%';
    this.cursor.style.margin = -(this.cursorSize / 2) + '% 0 0 ' + -(this.cursorSize / 2) + '%';
    this.ball.appendChild(this.cursor);
    // steps-1 -> don't draw the last ring because it's already there
    for (let i = steps-1; i > 0; i--) {
      let currentStep = ((100 / steps) * i);
      let grid = document.createElement('div');
      grid.classList.add('csstelemetry-gball');
      grid.classList.add('csstelemetry-gball-rect');
      grid.style.width = grid.style.height = currentStep + '%';
      grid.style.margin = -(currentStep / 2) + '% 0 0 ' + -(currentStep / 2) + '%';
      let span = document.createElement('span');
      span.innerText = ((currentStep / 100) * this.maxGValue).toFixed(2) + 'G';
      grid.appendChild(span);
      if (dashed && (i % 2 != 0)) {
        grid.style.borderStyle = 'dashed';
      }
      this.ball.appendChild(grid);
    }
    let span = document.createElement('span');
    span.innerText = this.maxGValue.toFixed(2) + 'G';
    this.ball.appendChild(span);
  }

  showForce(xAxis, yAxis) {
    /*
    showForce(xAxis, yAxis)

    xAxis: (float) force along xAxis (unit: G)
    yAxis: (float) force along yAxis (unit: G)
    */
    let angle = Math.atan(yAxis / xAxis);
    let maxY = Math.sin(angle) * this.maxGValue;
    let maxX = Math.cos(angle) * this.maxGValue;
    let res = [
      (Math.abs(xAxis) > Math.abs(maxX)) ? maxX : xAxis,
      (Math.abs(yAxis) > Math.abs(maxY)) ? maxY : yAxis
    ];
    this.cursor.style.left =
        50 + ((50 - (this.cursorSize / 2)) * res[0]) / this.maxGValue + '%';
    this.cursor.style.top =
        50 + ((50 - (this.cursorSize / 2)) * res[1]) / this.maxGValue + '%';
  }
}

/*
Example:

// HTML
<link rel="stylesheet" type="text/css" href="csstelemetry-gball.css" />
<div id="ball1" class="csstelemetry-gball" style="height: 200px;
width:200px;"></div> <script src="csstelemetry-gball.js"></script>

//JS
ball = new GBall(document.getElementById("ball1"));

ball.showForce(2,1); // 2g (x) ; 1g(y)
OR
ball.showForce(ms2tog(12),ms2tog(13)) //12m/s² (x) ; 13mm/s² (y)

// Done!
*/