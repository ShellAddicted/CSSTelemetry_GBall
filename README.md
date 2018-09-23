# CSSTelemetry | GBall
 A G-Force visualizer inspired by MotoGP telemtetry graphics

![screenshot](https://github.com/ShellAddicted/CSSTelemetry_GBall/blob/master/screenshot.jpg)


# Quickstart
HTML:
```html
<div id="ball1" class="csstelemetry-gball"style="height: 300px; width: 300px;"></div>
<script src="js/csstelemetry-gball.js"></script>
```
Other CSS classes:

<b>Align</b>
- ```csstelemetry-gball-left```
- ```csstelemetry-gball-center```
- ```csstelemetry-gball-right```

JS:
```javascript
// ID of <div>, cursor diameter, max G value
ball = new GBall("ball1",4,8);
// show a Force -> G values (x,y)
ball.showForce(2,1); // 2g (x) ; 1g(y)
//Alternative:
ball.showForce(ms2tog(12,13)) //12m/s² (x) ; 13mm/s² (y)
```

## DEMO
https://shelladdicted.github.io/CSSTelemetry_GBall/