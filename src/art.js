import p5 from "p5";
import colorMap from "./colorMap";
import frag from "./mist.frag?url";
import vert from "./mist.vert?url";

const p = new p5(() => {}, "art");

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

  shader.setUniform("iResolution", [p.width, p.height]);
  shader.setUniform("iTime", p.millis() / 1000);

  p.rect(0, 0, p.width, p.height);
};

p.windowResized = () => {
  p.resizeCanvas(window.innerWidth, window.innerHeight);
};
