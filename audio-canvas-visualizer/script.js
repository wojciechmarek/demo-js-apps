const playButton = document.querySelector(".button");

playButton.addEventListener("click", () => {
  const audio = new Audio("https://github.com/wojciechmarek/musicfy/raw/main/demo-songs/a_small_miracle.mp3");
  audio.crossOrigin = "anonymous";
  audio.play();

  const context = new AudioContext();
  const source = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();

  const canvas = document.querySelector(".canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  source.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 1024;

  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x;

  function animate() {
    x = 0;

    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      const r = barHeight + 25 * (i / bufferLength);
      const g = 250 * (i / bufferLength);
      const b = 50;

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }

    requestAnimationFrame(animate);
  }

  animate();
});
