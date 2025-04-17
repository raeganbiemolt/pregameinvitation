
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

  const closed = document.getElementById('envelopeClosed');
  closed.style.transform = 'translateY(-100vh)';
  closed.style.transition = 'transform 1s ease-out';
  setTimeout(() => { closed.style.transform = 'translateY(0)'; }, 100);

  setTimeout(() => {
    closed.style.display = 'none';
    document.getElementById('envelopeOpen').style.display = 'block';
  }, 1200);

  setTimeout(() => {
    document.getElementById('envelopeOpen').style.display = 'none';
    halfEnvelope.style.display = 'block';
  }, 2200);

  setTimeout(() => {
    halfEnvelope.style.display = 'none';
  }, 3199);
  setTimeout(() => {
    inviteImg.style.display = 'block';
    drawConfetti();
  }, 3200);

  setTimeout(() => {
    document.getElementById('faceOverlay').style.display = 'flex';
  }, 5000);

  setTimeout(() => {
    document.getElementById('faceOverlay').style.display = 'none';
  }, 9000);

  setTimeout(() => {
    inviteImg.style.display = 'none';
    wordsImg.style.display = 'block';
  }, 11200);

  document.body.addEventListener('click', () => {
    const face = document.getElementById('faceOverlay');
    if (face && face.style.display === 'flex') {
      face.style.display = 'none';
    } else {
      if (inviteImg.style.display === 'none') {
        inviteImg.style.display = 'block';
        wordsImg.style.display = 'none';
      } else {
        inviteImg.style.display = 'none';
        wordsImg.style.display = 'block';
      }
    }
  });
});
