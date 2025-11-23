export function hangman(root: HTMLElement): void {
  const words = ['REACT', 'VITE', 'ARCADE', 'MOBILE', 'GITHUB'];
  const pick = words[Math.floor(Math.random() * words.length)];
  let guessed = new Set<string>();
  let fails = 0;

  function render() {
    const display = pick.split('').map(ch => (guessed.has(ch) ? ch : '_')).join(' ');
    const wrong = Array.from(guessed).filter(ch => !pick.includes(ch)).join(' ');
    root.innerHTML = `
      <h2>Hangman</h2>
      <p>${display}</p>
      <p>Wrong: ${wrong}</p>
      <p>Fails: ${fails}/6</p>
      <input id="letter" maxlength="1" placeholder="Guess a letter" />
      <button id="guess">Guess</button>
    `;
    root.querySelector<HTMLInputElement>('#letter')!.focus();
    root.querySelector('#guess')!.addEventListener('click', guess);
    root.querySelector('#letter')!.addEventListener('keyup', e => {
      if (e.key === 'Enter') guess();
    });
  }

  function guess() {
    const inp = root.querySelector<HTMLInputElement>('#letter')!;
    const ch = inp.value.toUpperCase();
    if (!ch || guessed.has(ch)) return;
    guessed.add(ch);
    if (!pick.includes(ch)) fails++;
    render();
    if (pick.split('').every(c => guessed.has(c))) {
      root.innerHTML += '<p><strong>You win!</strong></p>';
    } else if (fails >= 6) {
      root.innerHTML += `<p><strong>Game over!</strong> Word was ${pick}</p>`;
    }
    inp.value = '';
    root.querySelector<HTMLInputElement>('#letter')!.focus();
  }

  render();
}
