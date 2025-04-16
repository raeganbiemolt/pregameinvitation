
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
  }, 3200);

  // Show face overlay
  setTimeout(() => {
    document.getElementById('faceOverlay').style.display = 'flex';
  }, 5000);

  // Remove face after 5s, slide invite, show words, and start drink confetti
  setTimeout(() => {
    const face = document.getElementById('faceOverlay');
    if (face) face.style.display = 'none';
    inviteImg.classList.add('slide-left');
    wordsImg.style.display = 'block';
    startDrinkConfetti();
  }, 10000);

  // Tap to remove face manually if needed
  document.body.addEventListener('click', () => {
    const face = document.getElementById('faceOverlay');
    if (face.style.display === 'flex') {
      face.style.display = 'none';
    }
  });

  // Switch to falling drinks confetti
  function startDrinkConfetti() {
    const bottles = ["/drink1.png"];
    const bottleCount = 40;
    const pieces = Array.from({length: bottleCount}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      d: Math.random() * 3 + 2,
      img: new Image()
    }));

    pieces.forEach(p => {
      p.img.src = bottles[Math.floor(Math.random() * bottles.length)];
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.drawImage(p.img, p.x, p.y, 30, 30);
      });
      update();
      requestAnimationFrame(draw);
    }

    function update() {
      pieces.forEach(p => {
        p.y += p.d;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
      });
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }
});
