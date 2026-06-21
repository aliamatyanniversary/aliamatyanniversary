// js/easter.js
// Handles the Recycle Bin window and the hidden Easter Egg icon.
// Self-contained: makes its own windows draggable so it doesn't
// depend on however mail.js/music.js implemented dragging.

document.addEventListener('DOMContentLoaded', () => {

  
    function openWindow(win) {
      win.style.display = 'block';
      win.style.zIndex = 200;
    }
  
    function closeWindow(win) {
      win.style.display = 'none';
    }
  
    function makeDraggable(win, handle) {
      let dragging = false;
      let offsetX = 0, offsetY = 0;
  
      const start = (clientX, clientY) => {
        dragging = true;
        const rect = win.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
      };
  
      const move = (clientX, clientY) => {
        if (!dragging) return;
        win.style.left = (clientX - offsetX) + 'px';
        win.style.top = (clientY - offsetY) + 'px';
      };
  
      const end = () => { dragging = false; };
  
      handle.addEventListener('mousedown', (e) => {
        start(e.clientX, e.clientY);
        e.preventDefault();
      });
      document.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
      document.addEventListener('mouseup', end);
  
      handle.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        start(t.clientX, t.clientY);
      });
      document.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        move(t.clientX, t.clientY);
      });
      document.addEventListener('touchend', end);
    }
    
    const recycleIcon = document.getElementById('recycle-icon');
    const recycleWindow = document.getElementById('recycle-window');
    const recycleClose = document.getElementById('recycle-close');
    const recycleTitlebar = document.getElementById('recycle-titlebar');
  
    if (recycleIcon && recycleWindow) {
      recycleIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openWindow(recycleWindow);
      });
      recycleClose.addEventListener('click', () => closeWindow(recycleWindow));
      makeDraggable(recycleWindow, recycleTitlebar);
    }
  
    const EGG_CLICKS_NEEDED = 7;
  
    const EGG_MESSAGE = "you found it. two months in and i'd still click this icon a hundred times if it meant finding you at the end. happy anniversary - maty <3";
  
    const eggIcon = document.getElementById('egg-icon');
    const eggWindow = document.getElementById('egg-window');
    const eggClose = document.getElementById('egg-close');
    const eggTitlebar = document.getElementById('egg-titlebar');
    const eggMessageEl = document.getElementById('egg-message');
    const eggConfetti = document.getElementById('egg-confetti');
  
    let eggClickCount = 0;
  
    function spawnConfetti() {
      if (!eggConfetti) return;
      const symbols = ['&#128155;', '&#10024;', '&#128171;', '&#129655;'];
      for (let i = 0; i < 18; i++) {
        const span = document.createElement('span');
        span.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = Math.random() * 90 + '%';
        span.style.animationDelay = (Math.random() * 0.6) + 's';
        span.style.fontSize = (10 + Math.random() * 10) + 'px';
        eggConfetti.appendChild(span);
        setTimeout(() => span.remove(), 2200);
      }
    }
  
    if (eggIcon && eggWindow) {
      eggIcon.addEventListener('click', (e) => {
        e.preventDefault();
        eggClickCount++;
  
        if (eggClickCount < EGG_CLICKS_NEEDED) {
          eggIcon.classList.remove('egg-shake');
          void eggIcon.offsetWidth;
          eggIcon.classList.add('egg-shake');
          return;
        }
  
        // reveal!
        eggMessageEl.textContent = EGG_MESSAGE;
        openWindow(eggWindow);
        spawnConfetti();
        eggClickCount = 0;
      });
  
      eggClose.addEventListener('click', () => closeWindow(eggWindow));
      makeDraggable(eggWindow, eggTitlebar);
    }
  
  });