/*Copyright (c) 2018 ShellAddicted <ShellAddicted@gmail.com> - MIT License*/
const G = 9.80665;

function ms2tog(ms2) {
	/*Convert m/s² to g*/
	return ms2 * (1 / G);
}

function gtoms2(g) {
	/*Convert g to m/s²*/
	return g * G;
}

class GBall {
	constructor(id, size = 4, scale = 8) {
		this.size = size;
		this.scale = scale;
		this.ball = document.getElementById(id);
		this.cursor = document.createElement("div");
		this.cursor.classList.add("csstelemetry-gball-cursor");
		this.cursor.style.height = size + "%";
		this.cursor.style.width = size + "%";
		this.cursor.style.margin = -(size / 2) + "% 0 0 " + -(size / 2) + "%";
		this.ball.appendChild(this.cursor);
		/*Scale*/
		const steps = 3
		for (let i = steps; i > 0; i--) {
			let currentStep = (25 * i);
			let grid = document.createElement("div");
			grid.classList.add("csstelemetry-gball");
			grid.classList.add("csstelemetry-gball-rect");
			grid.style.width = grid.style.height = currentStep + "%";
			grid.style.margin = -(currentStep / 2) + "% 0 0 " + -(currentStep / 2) + "%";
			let span = document.createElement("span");
			span.innerText = ((currentStep / 100) * scale) + "G";
			grid.appendChild(span);
			if (i % 2 != 0) {
				grid.style.borderStyle = "dashed";
			}
			this.ball.appendChild(grid);
		}
		let span = document.createElement("span");
		span.innerText = Math.trunc(this.scale) + "G";
		this.ball.appendChild(span);

	}

	showForce(xAxis, yAxis) {
		let angle = Math.atan(yAxis / xAxis);
		let maxY = Math.sin(angle) * this.scale;
		let maxX = Math.cos(angle) * this.scale;
		let res = [(Math.abs(xAxis) > Math.abs(maxX)) ? maxX : xAxis, (Math.abs(yAxis) > Math.abs(maxY)) ? maxY : yAxis];
		this.cursor.style.left = 50 + ((50 - (this.size / 2)) * res[0]) / this.scale + "%";
		this.cursor.style.top = 50 + ((50 - (this.size / 2)) * res[1]) / this.scale + "%";
	}
}

/*
Example:

// HTML
<link rel="stylesheet" type="text/css" href="csstelemetry-gball.css" />
<div id="ball1" class="csstelemetry-gball" style="height: 200px; width:200px;"></div>
<script src="csstelemetry-gball.js"></script>

//JS
ball = new GBall("ball1");

ball.showForce(2,1); // 2g (x) ; 1g(y)
OR 
ball.showForce(ms2tog(12,13)) //12m/s² (x) ; 13mm/s² (y)

// Done! 
*/

