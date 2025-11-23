import './style.css';
import { initHub } from './hub';

// Install service-worker for offline PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Launch the hub (game menu + router)
initHub(document.querySelector<HTMLDivElement>('#app')!);
