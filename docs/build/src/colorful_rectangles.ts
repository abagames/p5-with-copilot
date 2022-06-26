import p5 from "p5";

let p: p5;

export function sketch(_p: p5) {
  p = _p;
  _p.setup = setup;
  _p.draw = draw;
}

new p5(sketch);

function setup() {
  p.createCanvas(400, 400);
}

function draw() {
  p.background(0);
  // Draw colorful rectangles
  for (let i = 0; i < 10; i++) {
    p.fill(p.random(255), p.random(255), p.random(255));
    p.rect(p.random(p.width), p.random(p.height), 50, 50);
  }
}
