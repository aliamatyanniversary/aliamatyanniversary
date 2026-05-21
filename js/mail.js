const mailIcon = document.getElementById('mail-icon');
const mailWindow = document.getElementById('mail-window');
const mailClose = document.getElementById('mail-close');
const mailTitlebar = document.getElementById('mail-titlebar');
const pwInput = document.getElementById('mail-pw-input');
const pwBtn = document.getElementById('mail-pw-btn');
const pwScreen = document.getElementById('mail-pw-screen');
const mailLetter = document.getElementById('mail-letter');
const closeLetter = document.getElementById('mail-close-letter');
const floatHearts = document.getElementById('float-hearts');

const PASSWORD = 'wednesdat';

mailIcon.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  if (mailWindow.style.display === 'block') {
    mailWindow.style.display = 'none';
  } else {
    mailWindow.style.display = 'block';
  }
});
mailClose.addEventListener('click', () => {
  mailWindow.style.display = 'none';
  resetMail();
});

// drag
let mDX=0,mDY=0,mDrag=false;
mailTitlebar.addEventListener('mousedown',e=>{mDrag=true;mDX=e.clientX-mailWindow.offsetLeft;mDY=e.clientY-mailWindow.offsetTop;});
document.addEventListener('mousemove',e=>{if(!mDrag)return;mailWindow.style.left=(e.clientX-mDX)+'px';mailWindow.style.top=(e.clientY-mDY)+'px';});
document.addEventListener('mouseup',()=>mDrag=false);

function checkPw() {
  if (pwInput.value === PASSWORD) {
    pwScreen.style.display = 'none';
    mailLetter.classList.add('visible');
    spawnHearts();
  } else {
    pwInput.value = '';
    pwInput.style.borderColor = '#e84060';
    setTimeout(()=>pwInput.style.borderColor='',600);
  }
}

pwBtn.addEventListener('click', checkPw);
pwInput.addEventListener('keydown', e => { if(e.key==='Enter') checkPw(); });

closeLetter.addEventListener('click', resetMail);

function resetMail() {
  pwScreen.style.display = '';
  mailLetter.classList.remove('visible');
  pwInput.value = '';
  floatHearts.innerHTML = '';
}

function spawnHearts() {
  const symbols = ['♥','♡','❤','♥','♡'];
  for (let i=0;i<14;i++) {
    setTimeout(()=>{
      const h=document.createElement('span');
      h.classList.add('fheart');
      h.textContent=symbols[Math.floor(Math.random()*symbols.length)];
      h.style.left=(5+Math.random()*88)+'%';
      h.style.fontSize=(9+Math.random()*12)+'px';
      h.style.color=['#e84060','#f080a0','#c03050','#ff90b0'][Math.floor(Math.random()*4)];
      h.style.animationDelay=(Math.random()*0.8)+'s';
      floatHearts.appendChild(h);
      setTimeout(()=>h.remove(),3000);
    },i*100);
  }
}

// touch drag
mailTitlebar.addEventListener('touchstart', e => {
  const t = e.touches[0];
  mDrag=true; mDX=t.clientX-mailWindow.offsetLeft; mDY=t.clientY-mailWindow.offsetTop;
}, {passive:true});
document.addEventListener('touchmove', e => {
  if(!mDrag)return;
  const t=e.touches[0];
  mailWindow.style.left=(t.clientX-mDX)+'px';
  mailWindow.style.top=(t.clientY-mDY)+'px';
}, {passive:true});
document.addEventListener('touchend', ()=>mDrag=false);