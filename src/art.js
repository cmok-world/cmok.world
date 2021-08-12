import p5 from "p5";
import colorMap from "./colorMap";
import frag from "./mist.frag?url";
import vert from "./mist.vert?url";

const p = new p5(() => {}, "art");

let cColorA = [0.666, 0.0, 0.0];
let cColorB = [1.0, 0.333, 1.0];
let prevColorA = cColorA;
let prevColorB = cColorB;

const letter1 = document.querySelector(".letter--1");
const letter2 = document.querySelector(".letter--2");
const letter3 = document.querySelector(".letter--3");
const letter4 = document.querySelector(".letter--4");

letter1.addEventListener("mouseover", () => {
  prevColorA = cColorA;
  prevColorB = cColorB;
  cColorA = [0.0, 0.0, 0.666];
  cColorB = [0.333, 1.0, 1.0];
});

letter2.addEventListener("mouseover", () => {
  prevColorA = cColorA;
  prevColorB = cColorB;
  cColorA = [0.666, 0.0, 0.0];
  cColorB = [1.0, 0.333, 1.0];
});

letter3.addEventListener("mouseover", () => {
  prevColorA = cColorA;
  prevColorB = cColorB;
  cColorA = [0.666, 0.333, 0.0];
  cColorB = [1.0, 1.0, 0.333];
});

letter4.addEventListener("mouseover", () => {
  prevColorA = cColorA;
  prevColorB = cColorB;
  cColorA = [0.0, 0.0, 0.0];
  cColorB = [0.666, 0.666, 0.666];
});

/**
 * @type {p5.Shader}
 */
let shader;

p.preload = () => {
  shader = p.loadShader(vert, frag);
};

p.setup = () => {
  p.pixelDensity(1);
  p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  p.frameRate(30);
  p.noStroke();
  document.body.style.backgroundColor = colorMap.magenta;
  document.body.classList.add("show");
};

p.draw = () => {
  p.shader(shader);

  prevColorA[0] = p.lerp(prevColorA[0], cColorA[0], 0.2);
  prevColorA[1] = p.lerp(prevColorA[1], cColorA[1], 0.2);
  prevColorA[2] = p.lerp(prevColorA[2], cColorA[2], 0.2);

  prevColorB[0] = p.lerp(prevColorB[0], cColorB[0], 0.2);
  prevColorB[1] = p.lerp(prevColorB[1], cColorB[1], 0.2);
  prevColorB[2] = p.lerp(prevColorB[2], cColorB[2], 0.2);

  shader.setUniform("iResolution", [p.width, p.height]);
  shader.setUniform("iTime", p.millis() / 1000);
  shader.setUniform("cColorA", prevColorA);
  shader.setUniform("cColorB", prevColorB);

  p.rect(0, 0, p.width, p.height);
};

p.windowResized = () => {
  p.resizeCanvas(window.innerWidth, window.innerHeight);
};
