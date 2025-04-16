
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('animationWrapper').style.display = 'block';

  const closed = document.getElementById('envelopeClosed');
  const open = document.getElementById('envelopeOpen');
  const half = document.getElementById('envelopeHalf');
  const inviteImg = document.querySelector('.invitation-img');

  const music = document.getElementById('partyMusic');
  music.play().catch(err => console.log('Autoplay blocked'));

  // 1. Slide in closed envelope
  closed.style.transform = 'translateY(-100vh)';
  closed.style.transition = 'transform 1s ease-out';
  setTimeout(() => {
    closed.style.transform = 'translateY(0)';
  }, 100);

  // 2. Switch to open envelope
  setTimeout(() => {
    closed.style.display = 'none';
    open.style.display = 'block';
  }, 1200);

  // 3. Switch to half-open envelope
  setTimeout(() => {
    open.style.display = 'none';
    half.style.display = 'block';
  }, 2200);

  // 4. At 3200ms — show invitation + remove half envelope at exact same moment
  setTimeout(() => {
    half.style.display = 'none';
    inviteImg.style.display = 'block';
  }, 3200);

  // 5. Show face
  setTimeout(() => {
    document.getElementById('faceOverlay').style.display = 'flex';
  }, 5000);

  // 6. Tap to remove face
  document.body.addEventListener('click', () => {
    const face = document.getElementById('faceOverlay');
    if (face.style.display === 'flex') {
      face.style.display = 'none';
    }
  });

  // 7. Confetti after 5s
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
