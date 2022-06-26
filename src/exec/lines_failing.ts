import p5 from "p5";

let p: p5;

export function sketch(_p: p5) {
  p = _p;
  _p.setup = setup;
  _p.draw = draw;
}

//new p5(sketch);

function setup() {
  p.createCanvas(400, 400);
}

function draw() {
  p.background(0);
  // Draw lines reflecting at the edges of the screen
  p.stroke(255);
  p.line(0, 0, p.width, p.height);
  p.line(p.width, 0, 0, p.height);
}
