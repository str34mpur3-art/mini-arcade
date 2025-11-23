export function snake(root: HTMLElement): void {
  const scale = 20, rows = 20, cols = 20;
  let dir = { x: 1, y: 0 }, snake = [{ x: 10, y: 10 }], food = randFood(), running = true;

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = scale * rows;
  root.innerHTML = '<h2>Snake</h2>';
  root.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  function randFood() {
    let f;
    do f = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    while (snake.some(s => s.x === f.x && s.y === f.y));
    return f;
  }

  function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    snake.forEach(p => ctx.fillRect(p.x * scale, p.y * scale, scale - 2, scale - 2));
    ctx.fillStyle = '#f43';
    ctx.fillRect(food.x * scale, food.y * scale, scale - 2, scale - 2);
  }

  function step() {
    if (!running) return;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || snake.some(s => s.x === head.x && s.y === head.y)) {
      running = false;
      alert('Game Over – refresh to retry');
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) food = randFood(); else snake.pop();
    draw();
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dir.y === 0) dir = { x: 0, y: -1 };
    if (e.key === 'ArrowDown' && dir.y === 0) dir = { x: 0, y: 1 };
    if (e.key === 'ArrowLeft' && dir.x === 0) dir = { x: -1, y: 0 };
    if (e.key === 'ArrowRight' && dir.x === 0) dir = { x: 1, y: 0 };
  });

  draw();
  setInterval(step, 120);
}
