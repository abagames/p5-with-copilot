## GitHub Copilot といっしょに p5.js によるジェネレーティブアートを作る

[English](./index.html) | 日本語

[GitHub Copilot](https://github.com/features/copilot/)は AI によるペアプログラマだ。コードの一部やコメントを書くと、それに続くコードを自動に生成する。

本記事では、Copilot と[p5.js](https://p5js.org/)を使い、[ジェネレーティブアート](https://en.wikipedia.org/wiki/Generative_art)を作る。Copilot の機能を使い、なるべく私がコードを書かずに実装する。そうすることで、Copilot の実力を知り、また、その使い方を学びたい。

注意：GitHub Copilot が提案するコードは毎回異なる。同じ条件であっても、異なるコードが提案されることがある。そのため、本記事の通りのソースコードを入力しても、結果は同じにならない。

<br><br><br><br>

### p5.js の import、そしてすべてを作ってもらう

今回は TypeScript を用いてコーディングする。型を用いることで、関数や変数で実現する内容を Copilot により具体的に伝えることができる。そのため、JavaScript よりも TypeScript の方が、Copilot を用いたコーディングには適していると思われる。

(src) [import_p5.ts](./src/import_p5.ts)

まず p5.js を import し、Copilot に使用するライブラリを教える。

<br><br><br><br>

そして次の行で Copilot にいきなり提案を求める。[VSCode のプラグイン](https://docs.github.com/en/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code)であれば、`Ctrl` + `Enter`を押すと、現在のカーソル位置に挿入すべきコードがまるごと提案される。

(src) [first_suggest.ts](./src/first_suggest.ts)

そうして提案されたコードが右のコードになる。ボールが画面端で反射するスケッチのコードだ。こうして GitHub Copilot によるジェネレーティブアートが完成した。また次回会いましょう！

<br><br><br><br>

### 別の作品を作る

さすがにこれではできあがる作品が画一的だ。人間が協調しないと、様々な作品を作ることはできない。

(src_silent) [before_function_to_update.ts](./src/before_function_to_update.ts)

(src) [function_to_update.ts](./src/function_to_update.ts)

まずは`setup`関数と`update`関数をコードのトップレベルに手動で移動する。この後、これらの関数に Copilot から提案されたコードを追加していく。

<br><br><br><br>

`p.background(0);`に続くコードを提させてみよう。

(src) [hello_world.ts](./src/hello_world.ts)

今回は`Hello World`を表示するコードが提案された。

<br><br><br><br>

### コメントで Copilot に意図を伝える

コード中にコメントを書くことで、どのようなコードを書きたいかの意図を Copilot に伝えることができる。

(src) [colorful_rectangles.ts](./src/colorful_rectangles.ts)

ここでは`// Draw colorful rectangles`とコメントを書き、それに続くコードを提案させた。すると右のような様々な色の四角がランダムに表示されるスケッチができた。ほぼ意図通りのコードが提案されたと言えよう。

<br><br><br><br>

次は Windows のスクリーンセーバーの[ラインアート](https://www.youtube.com/watch?v=FPfMkEgi2qI)のようなスケッチを作りたい。

(src) [lines_failing.ts](./src/lines_failing.ts)

そのために、`// Draw lines reflecting at the edges of the screen`と書いた。残念ながら、線がクロスするだけのスケッチができた。動く線などの状態を持つオブジェクトをいきなり生成するのは難しいようだ。

<br><br><br><br>

### オブジェクトの型を定義する

Copilot では、作りたいオブジェクトの型を適切な名前で定義することで、作りたいコードの意図を伝えることができる。なので、まずはラインアートを構成するオブジェクトとして、`Point`, `MovingPoint`, `MovingLine`を定義しよう。

(src) [define_types.ts](./src/define_types.ts)

人が入力する必要があるのは、`type Point`までだ。後のコードは自動的に提案される。同様に、`type MovingPoint`, `type MovingLine`を入力するだけで、その定義は自動的に提案される。

また`MovingLine`を型として持つ`movingLines`変数も定義しておく。これも同様に`let movingLines`だけ入力すれば良い。

<br><br><br><br>

### 線の初期化や更新、描画はコメントを入力するだけで実装できる

次は線を初期化しよう。

(src) [init_lines.ts](./src/init_lines.ts)

コメントとして、`// Initialize moving lines`と入力する。すると右のコードがまるごと提案される。

<br><br><br><br>

次は線を更新する。これはコメントを入力する必要すらない。

(src) [update_lines.ts](./src/update_lines.ts)

`draw`関数の先頭付近で、`//`と入力するだけで、コメントもコードも提案される。線を描画する部分も自動的に追加された。

<br><br><br><br>

ところが線が描画されない。よくみると線の色を指定する部分が無い。

(src) [add_stroke.ts](./src/add_stroke.ts)

なので手動で`p.stroke(255);`を入力する。無事に線が描画された。

Copilot では、提案されたコードを何も考えずに追加していると、このように重要なコードが抜け落ちることがある。なので追加されたコードをよく確認する必要がたまにある。型やテストを用いて、エラーや意図しないコードの生成を防ぐことも、有効であろう。

<br><br><br><br>

次は線が画面端で反射するようにする。

(src) [reflect_at_edge.ts](./src/reflect_at_edge.ts)

`// Reflect point if it hits the edge of the screen`とコメントを書く。これで右のコードが提案され、線が画面端で反射するようになった。

<br><br><br><br>

次は線に色を付けよう。

(src) [add_color.ts](./src/add_color.ts)

ここでも型が役に立つ。`type MovingLine`に`color`を追加すると、その型である`p5.Color`が提案される。線の初期化のコードで`color:`と書くだけで、その初期値が提案される。描画のコードの線を書く直前のところへカーソルを移動させると、`p.stroke(line.color);`が提案される。これで線にランダムな色が付いた。

<br><br><br><br>

だが、これでは複数の線がバラバラに動いているだけだ。ラインアートでは最初の線を他の線が追いかけるように移動していた。それを再現したい。

(src_silent) [before_add_first_line.ts](./src/before_add_first_line.ts)

(src) [add_first_line.ts](./src/add_first_line.ts)

なのでまず`first line`を初期化しよう。`// Initialize first line`を書くことで、右のコードが提案された。

これは思っていた結果とちょっと違う。一つの線に 10 個の点を使っているため、複数の三角形が描画された。でも、これはこれで面白いので、今回はそのまま使うことにした。

<br><br><br><br>

ただ、線の色を`stroke`で指定しているため、三角形に色が付いていない。

(src) [change_to_fill.ts](./src/change_to_fill.ts)

なので色の指定を`fill`で行うよう、手動で修正した。

<br><br><br><br>

変数に適切な名前を付けることも、コードの意図を Copilot に伝えるためには重要だ。

(src) [rename_line.ts](./src/rename_line.ts)

なので、ここでは`line`とだけ書いてあった変数名を、`firstLine`に変更した。こうすることで、この後のコメントで`first line`を明示的に示すことができる。

<br><br><br><br>

`first line`に続く他の線を追加しよう。

(src) [add_other_lines.ts](./src/add_other_lines.ts)

`// Add lines having the same position and speed as the first line`と書くことで、同一の座標、スピードを持つ線を追加できる。

<br><br><br><br>

(src) [slow_down.ts](./src/slow_down.ts)

その後に、`// Slow down all lines according to their index`と書くと、少しづつ線のスピードを落とすことができる。

<br><br><br><br>

これでラインアートっぽい、ちょっと違ったジェネレーティブアートが完成した。Copilot を使うことで、型や変数の名前と、作りたい内容のコメントを書くだけで、ほとんどコードを書かずにプログラムを作成することができた。

今回の Copilot を使ったコーディングは、効率的であっただろうか？コメントに対して適切なコードを、Copilot に生成させるためには、コメントの言い回しや、変数や型のネーミングを工夫する必要がある。それは通常のコーディングでは不要な手間であり、その分効率は低下していると思われる。コード生成による効率の上昇もあるが、全体で考えると、効率の上昇は限定的かもしれない。

Copilot にとって分かりやすいコードは、適切なネーミングやコメントが成されているコードであり、人にとっても分かりやすいコードである。適切なコーディングの作法を身につけるという面では、Copilot と一緒にコーディングすることには利点がある。

Copilot は人が意図していない意外なコードを提案してくることがある。ジェネレーティブアートの実装においては、この意外性をうまく活用することで、作品の幅を広げることができるかもしれない。

最終的にできあがったコードは以下になる。

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
