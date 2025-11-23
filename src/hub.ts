import { ticTacToe } from './games/tic-tac-toe';
import { memory } from './games/memory';
import { snake } from './games/snake';
import { pong } from './games/pong';
import { hangman } from './games/hangman';
import { breakout } from './games/breakout';

const games = [
  { id: 'tictactoe', name: 'Tic-Tac-Toe', fn: ticTacToe },
  { id: 'memory', name: 'Memory Match', fn: memory },
  { id: 'snake', name: 'Snake', fn: snake },
  { id: 'pong', name: 'Pong', fn: pong },
  { id: 'hangman', name: 'Hangman', fn: hangman },
  { id: 'breakout', name: 'Breakout', fn: breakout },
];

export function initHub(root: HTMLElement): void {
  root.innerHTML = `
    <h1>Mini Arcade</h1>
    <div id="menu" class="menu">
      ${games.map(g => `<button data-game="${g.id}">${g.name}</button>`).join('')}
    </div>
    <div id="screen"></div>
  `;
  const screen = root.querySelector<HTMLDivElement>('#screen')!;
  root.querySelectorAll('.menu button').forEach(btn =>
    btn.addEventListener('click', () => {
      const game = games.find(g => g.id === btn.dataset.game)!;
      screen.innerHTML = '';
      game.fn(screen);
    })
  );
}
