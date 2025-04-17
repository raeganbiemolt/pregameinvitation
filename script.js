
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('animationWrapper').style.display = 'block';

  const music = document.getElementById('partyMusic');
  music.play().catch(err => console.log('Autoplay blocked'));

  const inviteImg = document.querySelector('.invitation-img');
  const halfEnvelope = document.getElementById('envelopeHalf');
  const wordsImg = document.getElementById('wordsImage');
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  // Initial confetti setup (colorful rectangles)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let useDrinks = false;
  let pieces = Array.from({length: 150}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: Math.random() * 8 + 4,
    h: Math.random() * 10 + 4,
    a: Math.random() * Math.PI * 2,
    c: `hsl(${Math.random() * 360}, 100%, 50%)`,
    d: Math.random() * 5 + 2,
    img: null
  }));

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      if (useDrinks && p.img) {
        ctx.drawImage(p.img, -15, -15, 30, 30);
      } else {
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    });
    updateConfetti();
    requestAnimationFrame(drawConfetti);
  }

  function updateConfetti() {
    pieces.forEach(p => {
      p.y += p.d;
      p.a += 0.02;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  // drawConfetti(); // moved to sync with invitation.png

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
    halfEnvelope.style.display = 'block';
  }, 2200);

  // Show invitation + hide half envelope simultaneously
  setTimeout(() => {
    halfEnvelope.style.display = 'none';
  }, 3199);
  setTimeout(() => {
    inviteImg.style.display = 'block';
    drawConfetti();
  }, 3200);

  // Show face overlay
  setTimeout(() => {
    document.getElementById('faceOverlay').style.display = 'flex';
  }, 5000);

  
  // Remove invitation and show words.png in same place at 8 seconds
  setTimeout(() => {
    inviteImg.style.display = 'none';
    wordsImg.style.display = 'block';
    wordsImg.style.position = 'absolute';
    wordsImg.style.left = inviteImg.style.left || '35%';
    wordsImg.style.top = inviteImg.style.top || '50%';
    wordsImg.style.transform = 'translateY(-50%)';
    wordsImg.style.width = inviteImg.style.width;
  }, 11200);


  // Allow manual face removal (optional)
  document.body.addEventListener('click', () => {
    const face = document.getElementById('faceOverlay');
    if (face && face.style.display === 'flex') {
      face.style.display = 'none';
    }
  });
});
