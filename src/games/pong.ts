export function pong(root: HTMLElement): void {
  const W = 480, H = 320, P = 10, B = 8;
  let ball = { x: W / 2, y: H / 2, dx: 4, dy: 3 };
  let p1 = { y: H / 2 - 40 }, p2 = { y: H / 2 - 40 }, score = { p1: 0, p2: 0 };

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  root.innerHTML = '<h2>Pong</h2>';
  root.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#0ff';
    ctx.fillRect(P, p1.y, P, 80);
    ctx.fillRect(W - 2 * P, p2.y, P, 80);
    ctx.fillRect(ball.x - B / 2, ball.y - B / 2, B, B);
    ctx.fillText(`${score.p1}  ${score.p2}`, W / 2 - 20, 20);
  }

  function loop() {
    ball.x += ball.dx; ball.y += ball.dy;
    if (ball.y <= 0 || ball.y >= H) ball.dy *= -1;
    if (ball.x <= 2 * P && ball.y > p1.y && ball.y < p1.y + 80) ball.dx *= -1;
    if (ball.x >= W - 2 * P && ball.y > p2.y && ball.y < p2.y + 80) ball.dx *= -1;
    if (ball.x < 0) { score.p2++; ball = { x: W / 2, y: H / 2, dx: 4, dy: 3 }; }
    if (ball.x > W) { score.p1++; ball = { x: W / 2, y: H / 2, dx: -4, dy: 3 }; }
    draw();
    requestAnimationFrame(loop);
  }

  canvas.addEventListener('mousemove', e => p1.y = e.offsetY - 40);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') p2.y -= 20;
    if (e.key === 'ArrowDown') p2.y += 20;
  });

  draw();
  loop();
}
