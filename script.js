window.onload = () => {
  // Show face and bubble after 5 seconds
  setTimeout(() => {
    document.getElementById('faceWrapper').style.display = 'flex';
  }, 5000);

  // Confetti
  const confettiCanvas = document.getElementById('confetti');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const ctx = confettiCanvas.getContext('2d');
  const pieces = [];

  for (let i = 0; i < 200; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      c: `hsl(${Math.random() * 360}, 100%, 50%)`,
      d: Math.random() * 4 + 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = p.c;
      ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    pieces.forEach(p => {
      p.y += p.d;
      if (p.y > confettiCanvas.height) {
        p.y = 0;
        p.x = Math.random() * confettiCanvas.width;
      }
    });
  }

  draw();
};
