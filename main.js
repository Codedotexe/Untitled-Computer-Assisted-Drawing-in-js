/*---------------------------------------------------------------------------------------+
| Reimplementation of Paul Browns 'Computer Assisted Drawing' made in 1975. It was       |
| originally written in fortran but this implementation was derived from this            |
| drawbot script: https://gist.github.com/justvanrossum/76945a2804057aededd0865be2e1f37d |
+---------------------------------------------------------------------------------------*/

// --------------Settings--------------------
const numTiles = 16;
const lineColor = "white";
const backgroundColor = "black";
const lineWidth = 0.12;
// ------------------------------------------


const canvas = document.getElementById("canvas");
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");
const numTilesWidth = width>=height ? numTiles : numTiles*(width/height)
const numTilesHeight = width<height ? numTiles : numTiles/(width/height)

function degToRad(deg) { return deg * (Math.PI/180); }
function radToDeg(rad) { return rad * (180/Math.PI); }

function arc(x, y, radius, startAngle, endAngle, counterclockwise=false) {
	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
	ctx.stroke();
}

function rotate(angle, cx, cy) {
	ctx.translate(cx, cy);
	ctx.rotate(angle);
	ctx.translate(-cx, -cy);
}

function scale(scaleX, scaleY, cx, cy) {
	ctx.translate(cx, cy);
	ctx.scale(scaleX, scaleY);
	ctx.translate(-cx, -cy);
}

function clearCircle(cx, cy, r) {
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, 2*Math.PI);
	ctx.fill();
	//ctx.clip();
	//ctx.clearRect(0,0,1,1);
}

function tile1(x, y, q) {
	ctx.save();
	ctx.translate(x, y);
	rotate(Math.PI/2 *q, 0.5, 0.5);
	for(let r=0.2; r<=0.8; r+=0.2) {
		arc(0, 0, r, 0, degToRad(90));
		if(r == 0.8) {
			arc(1, 1, r, degToRad(180), degToRad(198));
			arc(1, 1, r, degToRad(252), degToRad(270));
		} else {
			arc(1, 1, r, degToRad(180), degToRad(270));
		}
	}
	ctx.restore();
}

function tile5(x, y) {
	ctx.save();
	ctx.translate(x, y);
	for(let i=0; i<4; i++) {
		arc(0, 0.5, 0.1, degToRad(270), degToRad(90));
		arc(0, 0.5, 0.3, degToRad(270), degToRad(90));
		rotate(Math.PI/2, 0.5, 0.5);
	}
	ctx.restore();
}

function tile6(x, y) {
	ctx.save();
	ctx.translate(x, y);
	clearCircle(0.3, 0.3, 0.2);
	for(let i=0; i<4; i++) {
		arc(0, 0, 0.2, 0, degToRad(90));
		arc(0, 0, 0.4, 0, degToRad(90));
		rotate(Math.PI/2, 0.5, 0.5);
	}
	ctx.restore();
}

function main() {
	ctx.strokeStyle = backgroundColor;
	ctx.lineJoin = "round";
	ctx.lineWidth = lineWidth;

	// Fill background
	ctx.fillStyle = lineColor;
	ctx.fillRect(0, 0, width, height);

	ctx.scale(width / numTilesWidth, height / numTilesHeight);

	// Create border around image
	//scale(0.9, 0.9, numTiles/2, numTiles/2);

	for(let y=0; y<numTilesHeight; y++) {
		for(let x=0; x<numTilesWidth; x++) {
			switch(Math.ceil(Math.random() * 6)) {
				case 1:
					tile1(x, y, 0);
					break;
				case 2:
					tile1(x, y, 1);
					break;
				case 3:
					tile1(x, y, 2);
					break;
				case 4:
					tile1(x, y, 3);
					break;
				case 5:
					tile5(x, y);
					break;
				case 6:
					tile6(x, y);
					break;
			}
		}
	}
}

window.onload = main;

