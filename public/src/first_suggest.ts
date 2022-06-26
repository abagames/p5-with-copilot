import p5 from "p5";

export function sketch(p: p5) {
  let x = 0;
  let y = 0;
  let xspeed = 1;
  let yspeed = 1;

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(0);
    p.ellipse(x, y, 50, 50);
    x += xspeed;
    y += yspeed;
    if (x > p.width || x < 0) {
      xspeed *= -1;
    }
    if (y > p.height || y < 0) {
      yspeed *= -1;
    }
  };
}

new p5(sketch);
