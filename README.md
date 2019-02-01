# CSSTelemetry | GBall
 A G-Force visualizer inspired by MotoGP telemetry, powered by CSS and JS

![screenshot](https://github.com/ShellAddicted/CSSTelemetry_GBall/blob/master/screenshot.jpg)


## DEMO
https://shelladdicted.github.io/CSSTelemetry_GBall/

# Quickstart
## HTML:
```html
<link rel="stylesheet" type="text/css" href="dist/csstelemetry-gball.min.css" />
<div id="ball1" class="csstelemetry-gball csstelemetry-gball-left" style="height: 300px; width: 300px;"></div>
<script src="dist/csstelemetry-gball.min.js"></script>
```
#### Alignment options
- ```csstelemetry-gball-left```
- ```csstelemetry-gball-center```
- ```csstelemetry-gball-right```

## JS:
```javascript
/*
  GBall(DOMElement, cursorSize = 4, maxGValue = 8, steps = 4, dashed = true)

  DOMElement: DOM Element reserved for GBall
  cursorSize: (int)size of force indicator
  maxGValue: (float)maximum representable value
  steps: (int) number of steps between -maxGValue && +maxGValue (more steps =
  more resolution) dashed: (bool) alternates solid circle and dashed circles
*/
ball = new GBall(document.getElementById("ball1"),4,8);
/*
  showForce(xAxis, yAxis)

  xAxis: (float) force along xAxis (unit: G)
  yAxis: (float) force along yAxis (unit: G)

  Examples:
    ball.showForce(2,1); // 2g (x) ; 1g(y)
    ball.showForce(ms2tog(12), ms2tog(13)) //12m/s² (x) ; 13mm/s² (y)
*/
ball.showForce(2,1); // 2g (x) ; 1g(y)
```

#### Unit conversion helpers
- ```const: G = 9.80665 (m/s²)```
- ```function: ms2tog(m/s²) -> g```
- ```function: gtoms2(g) -> m/s²```