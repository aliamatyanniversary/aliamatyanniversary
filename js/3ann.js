document.addEventListener('DOMContentLoaded', () => {
    const annIcon = document.getElementById('anniversary-icon');
    const annWin = document.getElementById('anniversary-window');
    const annClose = document.getElementById('anniversary-close');
    const annTitlebar = document.getElementById('anniversary-titlebar');
    const annBtn = document.getElementById('anniversary-hearts-box');

    if (annIcon && annWin) {
        annIcon.addEventListener('click', (e) => {
            e.preventDefault();
            annWin.style.display = annWin.style.display === 'block' ? 'none' : 'block';
            annWin.style.zIndex = 150;
        });
    }

    if (annClose && annWin) {
        annClose.addEventListener('click', () => {
            annWin.style.display = 'none';
        });
    }

    if (annBtn) {
        annBtn.addEventListener('click', celebrate3Months);
    }

    if (annTitlebar && annWin) {
        let aDX = 0, aDY = 0, aDrag = false;
        annTitlebar.addEventListener('mousedown', e => {
            aDrag = true;
            aDX = e.clientX - annWin.offsetLeft;
            aDY = e.clientY - annWin.offsetTop;
        });
        document.addEventListener('mousemove', e => {
            if (!aDrag) return;
            annWin.style.left = (e.clientX - aDX) + 'px';
            annWin.style.top = (e.clientY - aDY) + 'px';
        });
        document.addEventListener('mouseup', () => aDrag = false);

        annTitlebar.addEventListener('touchstart', e => {
            const t = e.touches[0];
            aDrag = true;
            aDX = t.clientX - annWin.offsetLeft;
            aDY = t.clientY - annWin.offsetTop;
        }, { passive: true });
        document.addEventListener('touchmove', e => {
            if (!aDrag) return;
            const t = e.touches[0];
            annWin.style.left = (t.clientX - aDX) + 'px';
            annWin.style.top = (t.clientY - aDY) + 'px';
        }, { passive: true });
        document.addEventListener('touchend', () => aDrag = false);
    }
});

function celebrate3Months() {
    const msg = document.getElementById('anniversary-surprise-msg');
    if (msg) {
        msg.style.display = 'block';
    }

    const container = document.getElementById('anniversary-float-hearts');
    if (!container) return;

    container.style.zIndex = '100';
    container.style.pointerEvents = 'none';

    const symbols = ['💖', '💕', '💗', '✨', '🌸', '❤️', '🌟', '💖', '💌'];
    
    for (let i = 0; i < 36; i++) {
        setTimeout(() => {
            const h = document.createElement('span');
            h.classList.add('fheart');
            h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            h.style.left = (4 + Math.random() * 88) + '%';
            h.style.fontSize = (14 + Math.random() * 22) + 'px';
            h.style.animationDelay = (Math.random() * 0.3) + 's';
            container.appendChild(h);
            setTimeout(() => h.remove(), 3500);
        }, i * 60);
    }
}
