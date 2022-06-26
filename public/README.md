## Generate a p5.js generative art with GitHub Copilot

English | [日本語](./index.html?lang=ja)

[GitHub Copilot](https://github.com/features/copilot/) is an AI-powered pair programmer. When you write a piece of code or a comment, it automatically generates the code that follows.

This article uses Copilot and [p5.js](https://p5js.org/) to create [generative art](https://en.wikipedia.org/wiki/Generative_art). Using Copilot's functionality, I will implement the p5.js sketch with as little code as possible from me. In doing so, I want to see what Copilot can do and learn how to use it.

Note: GitHub Copilot suggests different codes each time. Even under the same conditions, different codes may be proposed. Therefore, even if you enter the source code as described in this article, the result will not be the same.

<br><br><br><br>

### p5.js import and Copilot makes all the code

This time, I will code using TypeScript. By using types, it is possible to tell Copilot specifically what should be implemented in functions and variables. Therefore, TypeScript seems to be more suitable for coding with Copilot than JavaScript.

(src) [import_p5.ts](./src/import_p5.ts)

First, import p5.js and tell Copilot what libraries to use.

<br><br><br><br>

Hover over the next line of the import and ask Copilot for suggestions. If you use the [Plugin for VSCode](https://docs.github.com/en/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code), pressing `Ctrl` + `Enter` will suggest the entire code to insert at the current cursor position.

(src) [first_suggest.ts](./src/first_suggest.ts)

The proposed code is displayed on the right. The code for the sketch of the ball reflecting off the edge of the screen. And so the generative art by GitHub Copilot is complete. See you next time!

<br><br><br><br>

### Create another work

As expected, the resulting work is uniform and uninteresting. Without human cooperation, it is impossible to create a variety of works of art.

(src_silent) [before_function_to_update.ts](./src/before_function_to_update.ts)

(src) [function_to_update.ts](./src/function_to_update.ts)

First, manually move the `setup` and `update` functions to the top level of the code. After this, I will add the code suggested by Copilot to these functions.

<br><br><br><br>

Let Copilot suggest the code that follows `p.background(0)`.

(src) [hello_world.ts](./src/hello_world.ts)

This time, a code to display `Hello World` was proposed.

<br><br><br><br>

### Tell Copilot what you intend to do with your code by commenting

By writing comments in your code, you can tell Copilot what kind of code you intend to write.

(src) [colorful_rectangles.ts](./src/colorful_rectangles.ts)

Here I wrote the comment `// Draw colorful rectangles` and let Copilot suggest the code to follow. Then, a sketch with various colored rectangles randomly displayed, as shown on the right, was created. It can be said that the code was suggested almost as intended.

<br><br><br><br>

Next, I want to make sketches like [Mystify](https://www.youtube.com/watch?v=FPfMkEgi2qI) of Windows screensavers.

(src) [lines_failing.ts](./src/lines_failing.ts)

To do this, I wrote `// Draw lines reflecting at the edges of the screen`. Unfortunately, I got a sketch with only lines crossing. It seems to be difficult to generate objects with states such as moving lines.

<br><br><br><br>

### Defining the type of an object

In Copilot, you can tell the intent of the code by defining the type of the object with an appropriate name. So, let's define `Point`, `MovingPoint`, and `MovingLine` as the objects that make up Mystify.

(src) [define_types.ts](./src/define_types.ts)

I needed to enter only `type Point`. The rest of the code is automatically suggested. Similarly, Just enter `type MovingPoint` and `type MovingLine` and their definitions will be automatically suggested.

Also, define a `movingLines` variable with `type MovingLine`. Just enter `let movingLines` in the same way.

<br><br><br><br>

### Initializing, updating, and drawing lines can be implemented by simply entering comments

Next, let's initialize the lines.

(src) [init_lines.ts](./src/init_lines.ts)

Enter `// Initialize moving lines` as a comment. Then the whole code on the right is proposed.

<br><br><br><br>

The next step is to update the line. This does not even require entering a comment.

(src) [update_lines.ts](./src/update_lines.ts)

Just type `//` near the beginning of the `draw` function and both comments and code will be suggested. The part for drawing lines is also automatically added.

<br><br><br><br>

However, the lines are not drawn. If you look closely, you will see that there is no section to specify the color of the line.

(src) [add_stroke.ts](./src/add_stroke.ts)

So I manually input `p.stroke(255);`. The line is successfully drawn.

In Copilot, if you add the suggested code without thinking, important code like this may be missing. So it is sometimes necessary to check the added code carefully. It may also be useful to use types and tests to prevent errors and unintended code generation.

<br><br><br><br>

The next step is to make the lines reflect at the edges of the screen.

(src) [reflect_at_edge.ts](./src/reflect_at_edge.ts)

Comment `// Reflect point if it hits the edge of the screen`. Now the code on the right is proposed, and the line is reflected at the edge of the screen.

<br><br><br><br>

Next, let's color the lines.

(src) [add_color.ts](./src/add_color.ts)

Types are useful here, too. Adding `color` to `type MovingLine` will propose its type, `p5.Color`. Just write `color:` in the line initialization code, and the initial value will be suggested. If you move the cursor to the place just before drawing a line in the drawing code, `p.stroke(line.color);` is proposed. Now the line has a random color.

<br><br><br><br>

But this is just multiple lines moving apart. In Mystify, the lines were moving as if following the first line. I want to reproduce that.

(src_silent) [before_add_first_line.ts](./src/before_add_first_line.ts)

(src) [add_first_line.ts](./src/add_first_line.ts)

So let's initialize the `first line` first. By writing `// Initialize first line`, the right code was suggested.

This is not quite what I expected. Since 10 points are used for each line, multiple triangles are drawn. But this seems to be interesting, so I decided to use it as is.

<br><br><br><br>

However, the triangles are not colored because the line color is specified with `stroke`.

(src) [change_to_fill.ts](./src/change_to_fill.ts)

So I modified it manually to specify the color with `fill`.

<br><br><br><br>

Proper naming of variables is also important to convey the intent of the code to Copilot.

(src) [rename_line.ts](./src/rename_line.ts)

So here, I changed the variable name from just `line` to `firstLine`. This way, we can explicitly indicate `first line` in the following comment.

<br><br><br><br>

Let's add other lines following the `first line`.

(src) [add_other_lines.ts](./src/add_other_lines.ts)

`// Add lines having the same position and speed as the first line` to add lines with the same coordinates and speed.

<br><br><br><br>

After that, you can write `// Slow down all lines according to their index` to slow down the lines a little bit according to their index.

(src) [slow_down.ts](./src/slow_down.ts)

Now I had a piece of generative art that looked like Mystify but was a little different.
By using Copilot, I was able to create a program with very little code, just writing the names of the types and variables, and comments on what I wanted to create.

Was this coding with Copilot efficient? To have Copilot generate appropriate code for the comments, it is necessary to devise the wording of the comments and the naming of variables and types. This is an unnecessary effort in normal coding, and the efficiency is likely to be reduced because of it. There is also an increase in efficiency due to code generation. But taken as a whole, the increase in efficiency may be limited.

Code that is easy for Copilot to understand is code that is appropriately named and commented. It is also a code that is easy for people to understand. There are advantages to coding with Copilot in terms of learning proper coding conventions.

Copilot can suggest unexpected codes that one may not have intended. In the implementation of generative art, this unexpectedness may be well utilized to broaden the scope of the work.

The final code is shown below.

```ts
import p5 from "p5";

let p: p5;

export function sketch(_p: p5) {
  p = _p;
  _p.setup = setup;
  _p.draw = draw;
}

new p5(sketch);

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
  // Initialize first line
  const firstLine: MovingLine = {
    points: [],
    color: p.color(255, 0, 0),
  };
  for (let i = 0; i < 10; i++) {
    const point: MovingPoint = {
      x: p.random(p.width),
      y: p.random(p.height),
      speed: { x: p.random(-1, 1), y: p.random(-1, 1) },
      acceleration: { x: 0, y: 0 },
    };
    firstLine.points.push(point);
  }
  movingLines.push(firstLine);
  // Add lines having the same position and speed as the first line
  for (let i = 0; i < 10; i++) {
    const line: MovingLine = {
      points: [],
      color: p.color(p.random(255), p.random(255), p.random(255)),
    };
    for (let j = 0; j < firstLine.points.length; j++) {
      const point: MovingPoint = {
        x: firstLine.points[j].x,
        y: firstLine.points[j].y,
        speed: {
          x: firstLine.points[j].speed.x,
          y: firstLine.points[j].speed.y,
        },
        acceleration: { x: 0, y: 0 },
      };
      line.points.push(point);
    }
    movingLines.push(line);
  }
  // Slow down all lines according to their index
  for (let i = 0; i < movingLines.length; i++) {
    const line = movingLines[i];
    for (let j = 0; j < line.points.length; j++) {
      const point = line.points[j];
      point.speed.x *= 0.1 + 0.9 * (i / movingLines.length);
      point.speed.y *= 0.1 + 0.9 * (i / movingLines.length);
    }
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
    p.fill(line.color);
    for (let j = 0; j < line.points.length; j++) {
      const point = line.points[j];
      p.vertex(point.x, point.y);
    }
    p.endShape();
  }
}
```
