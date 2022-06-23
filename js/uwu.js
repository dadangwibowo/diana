const s = (p) => {
  let demo1Shader, img, fft, audio, toggleBtn;

  p.preload = () => {
    audio = p.loadSound("audio/anji.mp3");
    demo1Shader = p.loadShader("shaders/base.vert", "shaders/d1.frag");
    img = p.loadImage("img/4.jpg");
  };

  p.setup = () => {
    playBtn = document.querySelector("#play-btn");
    playBtn.addEventListener("click", () => {
      document.body.classList.add("start-anim");
      audio.loop();
    });

    p.pixelDensity(1);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    toggleBtn = document.querySelector("#toggle-btn");
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("toggle--on");
      this.toggleAudio();
    });

    fft = new p5.FFT();
    p.shader(demo1Shader);

    demo1Shader.setUniform("u_resolution", [p.windowWidth, p.windowHeight]);
    demo1Shader.setUniform("u_texture", img);
    demo1Shader.setUniform("u_tResolution", [img.width, img.height]);
  };

  p.draw = () => {
    fft.analyze();

    // const bass = fft.getEnergy("bass");
    // const treble = fft.getEnergy("treble");
    // const mid = fft.getEnergy("mid");

    // const mapBass = p.map(bass, 0, 255, 10, 15.0);
    // const mapTremble = p.map(treble, 0, 255, 0, 0.0);
    // const mapMid = p.map(mid, 0, 255, 0.0, 0.1);

    // demo1Shader.setUniform("u_time", p.frameCount / 20);
    // demo1Shader.setUniform("u_bass", mapBass);
    // demo1Shader.setUniform("u_tremble", mapTremble);
    // demo1Shader.setUniform("u_mid", mapMid);

    p.rect(0, 0, p.width, p.height);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    demo1Shader.setUniform("u_resolution", [p.windowWidth, p.windowHeight]);
  };

  toggleAudio = () => {
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.loop();
    }
  };
};

new p5(s);
