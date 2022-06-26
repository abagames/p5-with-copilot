import * as literateDiffViewer from "./literate-diff-viewer/main";
import p5 from "p5";

let srcToModule;
const executedSourceDirectory = "./exec/";
const execModules = (import.meta as any).globEager("./exec/*.ts");
let floatDiv: HTMLDivElement;

async function onLoad() {
  const diffViewer = await literateDiffViewer.init({
    onSourceChange,
    storageKeyName: "p5-with-copilot",
  });
  srcToModule = {};
  for (let i = 0; i < diffViewer.sourceFileNameElements.length; i++) {
    const e = diffViewer.sourceFileNameElements[i];
    if (e.type === "silent") {
      continue;
    }
    srcToModule[e.fileName] =
      execModules[`${executedSourceDirectory}${e.fileName}`];
  }
  (diffViewer.markdownDiv as any).addEventListener(
    "sourcechange",
    onSourceChange
  );
  floatDiv = document.createElement("div");
  floatDiv.style.cssText = `
position: fixed;
left: 98%;
top: 98%;
transform: translate(-100%, -100%);
width: 35vmin;
height: 35vmin;
z-index: 1;
`;
  document.body.appendChild(floatDiv);
  initNone();
  literateDiffViewer.start();
}

function onSourceChange(e: literateDiffViewer.SourceChangeEvent) {
  const fileName = e.currentFileName;
  if (fileName === "(none)") {
    initNone();
    return;
  }
  if (e.type === "silent") {
    return;
  }
  const m = srcToModule[fileName];
  if (m.sketch == null) {
    initNone();
    return;
  }
  removeAllChildrenOfFloatDiv();
  const p = new p5(m.sketch, floatDiv);
  fitCanvasToContainer(p);
}

function initNone() {
  removeAllChildrenOfFloatDiv();
  const p = new p5((p) => {
    p.setup = () => {
      p.background(0);
    };
    p.draw = () => {
      p.background(0);
    };
  }, floatDiv);
  fitCanvasToContainer(p);
}

function fitCanvasToContainer(p: p5) {
  const canvas = (p as any).canvas as HTMLCanvasElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  // Make the canvas translucent
  canvas.style.opacity = "0.7";
}

function removeAllChildrenOfFloatDiv() {
  while (floatDiv.firstChild) {
    floatDiv.removeChild(floatDiv.firstChild);
  }
}

window.addEventListener("load", onLoad);
