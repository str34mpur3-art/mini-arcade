export function memory(root: HTMLElement): void {
  const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭'];
  const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  let first: number | null = null;
  let lock = false;

  function render() {
    root.innerHTML = `
      <h2>Memory Match</h2>
      <div class="memory-grid">${cards.map((c, i) =>
        `<button class="card" data-i="${i}">?</button>`).join('')}</div>
      <p>Find all pairs!</p>
    `;
    root.querySelectorAll('.card').forEach(btn =>
      btn.addEventListener('click', flip)
    );
  }

  function flip(e: Event) {
    const btn = e.target as HTMLButtonElement;
    const i = Number(btn.dataset.i);
    if (lock || btn.textContent !== '?') return;
    btn.textContent = cards[i];
    if (first === null) { first = i; return; }
    lock = true;
    if (cards[first] === cards[i]) {
      first = null; lock = false;
    } else {
      setTimeout(() => {
        (root.querySelectorAll('.card')[first!] as HTMLButtonElement).textContent = '?';
        btn.textContent = '?';
        first = null; lock = false;
      }, 800);
    }
  }

  render();
}
