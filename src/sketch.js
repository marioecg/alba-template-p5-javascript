import vertexShader from './shaders/basic.vert';
import fragmentShader from './shaders/basic.frag';

const ASPECT_RATIO = 1;

const sketch = (p) => {
  const { seed = window.alba._testSeed(), isRenderer } = window.alba.params;

  // Seed the PRNG with the input seed and use it with p5's random functions.
  const prng = window.alba.prng(seed);
  p.randomSeed(prng() * 1e15);

  // Compute the canvas size based on the window size and the aspect ratio.
  let width = window.innerWidth;
  let height = width / ASPECT_RATIO;

  // In the Alba renderer, we ignore the window height limitation as the entire canvas is captured.
  // But if we are in a display which is constrained by height, then use the height and compute the width.
  // This ensures we don't overflow the window.
  if (!isRenderer && height > window.innerHeight) {
    height = window.innerHeight;
    width = height * ASPECT_RATIO;
  }

  let shader;

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL);
    p.noStroke();

    shader = p.createShader(vertexShader, fragmentShader);
  };

  p.draw = () => {
    p.shader(shader);

    let time = p.millis() / 1000.0;
    shader.setUniform('uResolution', [width, height]);
    shader.setUniform('uTime', time);

    p.rect(0, 0, width, height);
  };
};

new window.p5(sketch);
