const start = new Date('2026-04-22T22:16:00');

function update() {
    const now = new Date();
    const diff = now - start;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    const pad = n => String(n).padStart(2, '0');
    console.log(`${pad(d)}days ${pad(h)}h ${pad(m)}m ${pad(s)}s`);
    document.getElementById('taskbar-clock').textContent = `${pad(d)}days ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

setInterval(update, 1000);
update();
