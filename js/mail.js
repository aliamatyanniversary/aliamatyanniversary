const mailIcon = document.getElementById('mail-icon');
const mailWindow = document.getElementById('mail-window');
const mailClose = document.getElementById('mail-close');
const mailTitlebar = document.getElementById('mail-titlebar');
const floatHearts = document.getElementById('float-hearts');
const floatSun = document.getElementById('float-sun');
const inboxList = document.getElementById('inbox-list');
const mailBadge = document.getElementById('mail-badge');
const inboxView = document.getElementById('inbox-view');
const detailView = document.getElementById('detail-view');
const pwScreen = document.getElementById('mail-pw-screen');
const pwInput = document.getElementById('mail-pw-input');
const pwBtn = document.getElementById('mail-pw-btn');
const pwError = document.getElementById('mail-pw-error');
const detailBack = document.getElementById('detail-back');
const detailFrom = document.getElementById('detail-from');
const detailSubject = document.getElementById('detail-subject');
const detailBody = document.getElementById('detail-body');

const mails = [
  {
    from: 'Matýsek',
    subject: 'Krásný 1 month anniversary ♥',
    snippet: 'Krásný 1 month anniversary, Ali...',
    password: 'wednesdat',
    body: `Krásný 1 month anniversary, Ali. Chtěl bych ti poděkovat za všechny prožité společné chvíle s tebou, děláš mě tím nejšťastnějším chlapečkem na světe. Opravdu pro mě znamenáš, a chci být s tebou už jen do konce života. Už se těším na naše další výročí. :) Love you xx`,
    date: '21. 5.',
    hearts: true,
    sun: false,
  },
  {
    from: 'Matýsek',
    subject: 'Dobré ráno :)',
    snippet: 'Jen jsem chtěl říct...',
    password: 'wednesdat',
    body: `Dobré ráno, slunce moje. Jen jsem chtěl říct že na tebe myslím. xx`,
    date: '23. 5',
    hearts: false,
    sun: true,
  },
    {
    from: 'Matýsek',
    subject: 'YUM note',
    snippet: 'Čauky mňauky po sprše...',
    password: 'wednesdat',
    body: `Čauky mňauky po sprše :3 Tenhle týden jsme oba dva zvádli, sice to bylo neskutečně dlouhé a náročné bez tebe, ale v pondělí se vidíme :) Moc se na tebe těším a myslím na tebe každičkou sekundu. kisskiss`,
    date: '30. 5',
    hearts: true,
    sun: true,
  },
    {
    from: 'Matýsek',
    subject: 'Love letter',
    snippet: 'Náš poslední den...',
    password: 'wednesdat',
    body: `Náš poslední den spolu bude nejhezčí a nejkrásnější, jsem si tím dost jistý. To léto nějak dáme, máme toho hoodně připraveného a já mám pro tebe dva dárky naplánové :) Snad se budou líbit! Missuju tě už teďka. Love you.`,
    date: '16. 6',
    hearts: true,
    sun: true,
  },
];

const readSet = new Set();
let currentMailIndex = null;

function renderInbox() {
  inboxList.innerHTML = '';
  const unread = mails.filter((_, i) => !readSet.has(i)).length;
  mailBadge.textContent = unread;
  mailBadge.style.display = unread > 0 ? '' : 'none';

  mails.forEach((mail, i) => {
    const isRead = readSet.has(i);
    const row = document.createElement('div');
    row.className = 'mail-inbox-row' + (isRead ? ' read' : '');
    row.innerHTML = `
      <span class="mail-inbox-icon">✉</span>
      <div class="mail-inbox-preview">
        <div class="mail-inbox-sender">${mail.from}</div>
        <div class="mail-inbox-subject">${mail.subject}</div>
        <div class="mail-inbox-snippet">${mail.snippet}</div>
      </div>
      <span class="mail-inbox-date">${mail.date}</span>
    `;
    row.addEventListener('click', () => openMail(i));
    inboxList.appendChild(row);
  });
}

function openMail(index) {
  currentMailIndex = index;
  const mail = mails[index];

  if (mail.password) {
    inboxView.style.display = 'none';
    pwScreen.style.display = '';
    detailView.style.display = 'none';
    pwInput.value = '';
    pwInput.style.borderColor = '';
    pwError.style.display = 'none';
  } else {
    showDetail(index);
  }
}

function showDetail(index) {
  const mail = mails[index];
  readSet.add(index);
  inboxView.style.display = 'none';
  pwScreen.style.display = 'none';
  detailView.style.display = '';
  detailFrom.textContent = mail.from;
  detailSubject.textContent = mail.subject;
  detailBody.textContent = mail.body;
  if (mail.hearts) spawnHearts();
  if (mail.sun) spawnSun();
  renderInbox();

}


function checkPw() {
  const mail = mails[currentMailIndex];
  if (pwInput.value === mail.password) {
    showDetail(currentMailIndex);
  } else {
    pwInput.value = '';
    pwInput.style.borderColor = '#e84060';
    pwError.style.display = '';
    setTimeout(() => { pwInput.style.borderColor = ''; pwError.style.display = 'none'; }, 1200);
  }
}

pwBtn.addEventListener('click', checkPw);
pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkPw(); });

detailBack.addEventListener('click', () => {
  detailView.style.display = 'none';
  pwScreen.style.display = 'none';
  inboxView.style.display = '';
  floatHearts.innerHTML = '';
  floatSun.innerHTML = '';

});


mailIcon.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  mailWindow.style.display = mailWindow.style.display === 'block' ? 'none' : 'block';
});

mailClose.addEventListener('click', () => {
  mailWindow.style.display = 'none';
  detailView.style.display = 'none';
  pwScreen.style.display = 'none';
  inboxView.style.display = '';
  floatHearts.innerHTML = '';
  floatSun.innerHTML = '';

});


let mDX = 0, mDY = 0, mDrag = false;
mailTitlebar.addEventListener('mousedown', e => { mDrag = true; mDX = e.clientX - mailWindow.offsetLeft; mDY = e.clientY - mailWindow.offsetTop; });
document.addEventListener('mousemove', e => { if (!mDrag) return; mailWindow.style.left = (e.clientX - mDX) + 'px'; mailWindow.style.top = (e.clientY - mDY) + 'px'; });
document.addEventListener('mouseup', () => mDrag = false);
mailTitlebar.addEventListener('touchstart', e => { const t = e.touches[0]; mDrag = true; mDX = t.clientX - mailWindow.offsetLeft; mDY = t.clientY - mailWindow.offsetTop; }, { passive: true });
document.addEventListener('touchmove', e => { if (!mDrag) return; const t = e.touches[0]; mailWindow.style.left = (t.clientX - mDX) + 'px'; mailWindow.style.top = (t.clientY - mDY) + 'px'; }, { passive: true });
document.addEventListener('touchend', () => mDrag = false);

function spawnHearts() {
  const symbols = ['♥', '♡', '❤', '♥', '♡'];
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.classList.add('fheart');
      h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      h.style.left = (5 + Math.random() * 88) + '%';
      h.style.fontSize = (9 + Math.random() * 24) + 'px';
      h.style.color = ['#e84060', '#f080a0', '#c03050', '#ff90b0'][Math.floor(Math.random() * 4)];
      h.style.animationDelay = (Math.random() * 0.4) + 's';
      floatHearts.appendChild(h);
      setTimeout(() => h.remove(), 5000);
    }, i * 100);
  }
}

function spawnSun() {
  const symbols = ['☼', '𖤓', '꩜', '☀', '✵'];
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.classList.add('fsun');
      h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      h.style.left = (5 + Math.random() * 88) + '%';
      h.style.fontSize = (9 + Math.random() * 24) + 'px';
      h.style.color = ['#e84060', '#f080a0', '#c03050', '#ff90b0'][Math.floor(Math.random() * 4)];
      h.style.animationDelay = (Math.random() * 0.4) + 's';
      floatSun.appendChild(h);
      setTimeout(() => h.remove(), 5000);
    }, i * 100)
  }
}


renderInbox();
