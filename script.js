// Soft Fireworks Script
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.life = 100;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.03;
    this.life -= 1;
  }
  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.life / 100;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let fireworks = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const colors = ['#ffcc33', '#ffd700', '#ffa07a', '#ff6699', '#aaffff'];
  for (let i = 0; i < 50; i++) {
    fireworks.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) fireworks.splice(i, 1);
  });
}

setInterval(createFirework, 900);
animate();
