
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('animationWrapper').style.display = 'block';

  const music = document.getElementById('partyMusic');
  music.play().catch(err => console.log('Autoplay blocked'));

  // Closed envelope slide in
  const closed = document.getElementById('envelopeClosed');
  closed.style.transform = 'translateY(-100vh)';
  closed.style.transition = 'transform 1s ease-out';
  setTimeout(() => { closed.style.transform = 'translateY(0)'; }, 100);

  // Open envelope
  setTimeout(() => {
    closed.style.display = 'none';
    document.getElementById('envelopeOpen').style.display = 'block';
  }, 1200);

  // Half-open envelope
  setTimeout(() => {
    document.getElementById('envelopeOpen').style.display = 'none';
    document.getElementById('envelopeHalf').style.display = 'block';
  }, 2200);

  // Show invitation after 1 more second (3.2s total)
  setTimeout(() => {
    document.querySelector('.invitation-img').style.display = 'block';
  }, 3200);

  // Hide envelope after invite is revealed
  setTimeout(() => {
    document.getElementById('envelopeHalf').style.display = 'none';
  }, 4000);

  // Show face overlay after 5s
  setTimeout(() => {
    document.getElementById('faceOverlay').style.display = 'flex';
  }, 5000);

  // Tap to remove face
  document.body.addEventListener('click', () => {
    const face = document.getElementById('faceOverlay');
    if (face.style.display === 'flex') {
      face.style.display = 'none';
    }
  });

  // Start confetti after 5s
  setTimeout(() => {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({length: 150}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 10 + 4,
      a: Math.random() * Math.PI * 2,
      c: `hsl(${Math.random() * 360}, 100%, 50%)`,
      d: Math.random() * 5 + 2
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
      });
      update();
      requestAnimationFrame(draw);
    }

    function update() {
      pieces.forEach(p => {
        p.y += p.d;
        p.a += 0.02;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
      });
    }

    draw();
  }, 5000);
});
