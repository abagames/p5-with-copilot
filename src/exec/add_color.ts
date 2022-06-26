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
  color: p5.Color;
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
      color: p.color(p.random(255), p.random(255), p.random(255)),
    });
  }
}

function draw() {
  p.background(0);
  p.stroke(255);
  // Update moving lines
  for (let i = 0; i < movingLines.length; i++) {
    const line = movingLines[i];
    for (let j = 0; j < line.points.length; j++) {
      const point = line.points[j];
      point.x += point.speed.x;
      point.y += point.speed.y;
      point.speed.x += point.acceleration.x;
      point.speed.y += point.acceleration.y;
      // Reflect point if it hits the edge of the screen
      if (point.x < 0 || point.x > p.width) {
        point.speed.x *= -1;
      }
      if (point.y < 0 || point.y > p.height) {
        point.speed.y *= -1;
      }
    }
  }
  // Draw moving lines
  for (let i = 0; i < movingLines.length; i++) {
    const line = movingLines[i];
    p.beginShape();
    p.stroke(line.color);
    for (let j = 0; j < line.points.length; j++) {
      const point = line.points[j];
      p.vertex(point.x, point.y);
    }
    p.endShape();
  }
}
