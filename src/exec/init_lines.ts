import p5 from "p5";

let p: p5;

export function sketch(_p: p5) {
  p = _p;
  _p.setup = setup;
  _p.draw = draw;
}

//new p5(sketch);

type Point = { x: number; y: number };
type MovingPoint = Point & {
  speed: { x: number; y: number };
  acceleration: { x: number; y: number };
};
type MovingLine = {
  points: MovingPoint[];
};

let movingLines: MovingLine[] = [];

function setup() {
  p.createCanvas(400, 400);
  // Initialize moving lines
  for (let i = 0; i < 10; i++) {
    movingLines.push({
      points: [
        {
          x: p.random(p.width),
          y: p.random(p.height),
          speed: { x: p.random(-1, 1), y: p.random(-1, 1) },
          acceleration: { x: 0, y: 0 },
        },
        {
          x: p.random(p.width),
          y: p.random(p.height),
          speed: { x: p.random(-1, 1), y: p.random(-1, 1) },
          acceleration: { x: 0, y: 0 },
        },
      ],
    });
  }
}

function draw() {
  p.background(0);
}