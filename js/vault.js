// js/vault.js
// Handles the Gravity Falls Journal 18 Vault window, passcode validation,
// unicorn/cat/dog floating celebration, and redirecting to the birthday portal.

document.addEventListener('DOMContentLoaded', () => {
  const journalIcon = document.getElementById('journal-icon');
  const vaultWindow = document.getElementById('vault-window');
  const vaultClose = document.getElementById('vault-close');
  const vaultTitlebar = document.getElementById('vault-titlebar');

  const pwScreen = document.getElementById('vault-pw-screen');
  const pwInput = document.getElementById('vault-pw-input');
  const pwBtn = document.getElementById('vault-pw-btn');
  const pwError = document.getElementById('vault-pw-error');

  const unlockedView = document.getElementById('vault-unlocked-view');
  const floatBalloons = document.getElementById('float-balloons');

  // Dragging logic
  let dragging = false;
  let offsetX = 0, offsetY = 0;

  const startDrag = (clientX, clientY) => {
    dragging = true;
    const rect = vaultWindow.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  };

  const moveDrag = (clientX, clientY) => {
    if (!dragging) return;
    vaultWindow.style.left = (clientX - offsetX) + 'px';
    vaultWindow.style.top = (clientY - offsetY) + 'px';
  };

  const endDrag = () => { dragging = false; };

  if (vaultTitlebar && vaultWindow) {
    vaultTitlebar.addEventListener('mousedown', (e) => {
      startDrag(e.clientX, e.clientY);
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);

    vaultTitlebar.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchend', endDrag);
  }

  // Open/Close behavior
  if (journalIcon && vaultWindow) {
    journalIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      vaultWindow.style.display = 'block';
      vaultWindow.style.zIndex = 200; // bring to front
      
      // Reset views
      pwScreen.style.display = 'block';
      unlockedView.style.display = 'none';
      pwInput.value = '';
      pwError.style.display = 'none';
      pwInput.style.borderColor = '';
    });
  }

  if (vaultClose && vaultWindow) {
    vaultClose.addEventListener('click', () => {
      vaultWindow.style.display = 'none';
      if (floatBalloons) floatBalloons.innerHTML = '';
    });
  }

  // Passcode verification helper (normalizes diacritics and checks for "rehor")
  function cleanInput(str) {
    return str
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // removes Czech diacritic marks (e.g. ř -> r, ž -> z, š -> s, etc.)
  }

  function checkPassword() {
    const entered = cleanInput(pwInput.value);
    if (entered === 'rehor') {
      // Success triggers confetti and floating animals
      pwScreen.style.display = 'none';
      unlockedView.style.display = 'block';
      spawnCelebration();
      
      // Redirect to birthday.html after 2.2 seconds of celebration
      setTimeout(() => {
        window.location.href = 'birthday.html';
      }, 2200);
    } else {
      pwInput.value = '';
      pwInput.style.borderColor = '#e84060';
      pwError.style.display = 'block';
      setTimeout(() => {
        pwInput.style.borderColor = '';
        pwError.style.display = 'none';
      }, 1500);
    }
  }

  if (pwBtn && pwInput) {
    pwBtn.addEventListener('click', checkPassword);
    pwInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkPassword();
    });
  }

  // Confetti, unicorns, cats, and dogs celebration spawning on unlocking
  function spawnCelebration() {
    if (!floatBalloons) return;
    floatBalloons.innerHTML = '';
    
    // Confetti colors
    const colors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#53d769', '#ffcc00', '#ff9100', '#ffb5a7', '#ff5c8a'];
    // Animal emojis
    const animals = ['🦄', '🐱', '🐶', '🦄', '🐈', '🐕', '🐩', '🦄', '💖', '✨', '🎈'];
    
    const count = 45;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const item = document.createElement('span');
        
        // Randomly decide if it's a color block (confetti) or animal emoji
        if (Math.random() > 0.4) {
          // Confetti
          item.classList.add('fballoon'); // we can reuse the floating container class or styling
          const color = colors[Math.floor(Math.random() * colors.length)];
          item.style.backgroundColor = color;
          item.style.setProperty('--balloon-color', color);
          item.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
          const size = 10 + Math.random() * 12;
          item.style.width = size + 'px';
          item.style.height = size + 'px';
        } else {
          // Animal/Heart emoji
          item.classList.add('fballoon');
          item.style.background = 'transparent';
          item.style.border = 'none';
          item.style.fontSize = (18 + Math.random() * 14) + 'px';
          item.innerHTML = animals[Math.floor(Math.random() * animals.length)];
          // Remove balloon knot indicator styling
          item.style.setProperty('--balloon-color', 'transparent');
          item.classList.add('emoji-celebration');
        }

        item.style.left = (2 + Math.random() * 95) + '%';
        item.style.animationDelay = (Math.random() * 0.4) + 's';
        item.style.zIndex = 300;

        floatBalloons.appendChild(item);
        
        // Remove item after animation completes
        setTimeout(() => item.remove(), 5000);
      }, i * 45);
    }
  }
});