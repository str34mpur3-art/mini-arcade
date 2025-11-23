export function breakout(root: HTMLElement): void {
  const W = 480, H = 320, PAD = 70, BRICK_W = 48, BRICK_H = 20, MARGIN = 2;
  const bricks: { x: number; y: number; alive: boolean }[] = [];
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 10; col++)
      bricks.push({ x: col * (BRICK_W + MARGIN), y: row * (BRICK_H + MARGIN) + 40, alive: true });

  let paddle = { x: W / 2 - PAD / 2, y: H - 30 };
  let ball = { x: W / 2, y: H / 2, dx: 3, dy: -3 };
  let score = 0;

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  root.innerHTML = '<h2>Breakout</h2>';
  root.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  function draw() {
    ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#f43';
    bricks.filter(b => b.alive).forEach(b => ctx.fillRect(b.x, b.y, BRICK_W, BRICK_H));
    ctx.fillStyle = '#0ff'; ctx.fillRect(paddle.x, paddle.y, PAD, 8);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillText(`Score: ${score}`, 8, 24);
  }

  function loop() {
    ball.x += ball.dx; ball.y += ball.dy;
    if (ball.x <= 6 || ball.x >= W - 6) ball.dx *= -1;
    if (ball.y <= 6) ball.dy *= -1;
    if (ball.y >= H) { alert('Game Over – refresh to retry'); return; }
    if (ball.y >= paddle.y - 6 && ball.x > paddle.x && ball.x < paddle.x + PAD) ball.dy *= -1;
    bricks.filter(b => b.alive).forEach(b => {
      if (ball.x > b.x && ball.x < b.x + BRICK_W && ball.y > b.y && ball.y < b.y + BRICK_H) {
        b.alive = false; ball.dy *= -1; score++;
      }
    });
    if (bricks.every(b => !b.alive)) { alert('You cleared the wall!'); return; }
    draw();
    requestAnimationFrame(loop);
  }

  canvas
