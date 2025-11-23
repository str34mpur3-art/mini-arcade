export function ticTacToe(root: HTMLElement): void {
  let board = Array(9).fill('');
  let player = 'X';

  function render() {
    root.innerHTML = `
      <h2>Tic-Tac-Toe</h2>
      <div class="grid">${board.map((c, i) =>
        `<button class="cell" data-i="${i}">${c}</button>`).join('')}</div>
      <p id="status">Player ${player}</p>
      <button id="reset">Reset</button>
    `;
    root.querySelectorAll('.cell').forEach(btn =>
      btn.addEventListener('click', handleMove)
    );
    root.querySelector('#reset')!.addEventListener('click', () => {
      board = Array(9).fill('');
      player = 'X';
      render();
    });
  }

  function handleMove(e: Event) {
    const i = Number((e.target as HTMLButtonElement).dataset.i);
    if (board[i]) return;
    board[i] = player;
    player = player === 'X' ? 'O' : 'X';
    render();
    const winner = calcWinner();
    if (winner) root.querySelector('#status')!.textContent = `${winner} wins!`;
  }

  function calcWinner(): string | null {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a,b,c] of lines)
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    return board.includes('') ? null : 'Draw';
  }

  render();
}
