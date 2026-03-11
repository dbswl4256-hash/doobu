// 리소스 설정
const bgm = new Audio('메세지.mp3'); bgm.loop = true;
const clickSound = new Audio('마우스클릭.mp3');
const flipSound = new Audio('flip.mp3');

// 1. 요술봉 커서 생성 및 동기화
const wand = document.createElement('div');
wand.id = 'magic-wand';
document.body.appendChild(wand);

document.addEventListener('mousemove', (e) => {
    wand.style.left = e.clientX + 'px';
    wand.style.top = e.clientY + 'px';
    createParticle(e.pageX, e.pageY); // 별빛 잔상 생성
});

// 2. 마우스 클릭 사운드 및 효과 강제 적용
document.addEventListener('mousedown', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    wand.style.transform = 'translate(-50%, -50%) scale(1.5)';
});

document.addEventListener('mouseup', () => {
    wand.style.transform = 'translate(-50%, -50%) scale(1)';
});

document.addEventListener('click', () => {
    if (bgm.paused) { bgm.play().catch(() => {}); }
});

// 3. 별빛 잔상 함수
function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 10 + 4;
    p.style.width = size + 'px'; p.style.height = size + 'px';
    p.style.left = x + 'px'; p.style.top = y + 'px';
    document.body.appendChild(p);
    
    setTimeout(() => {
        p.style.transition = '1s cubic-bezier(0.1, 0.5, 0.5, 1)';
        p.style.opacity = '0';
        p.style.transform = `translate(${(Math.random()-0.5)*80}px, ${(Math.random()-0.5)*80}px) scale(0)`;
        setTimeout(() => p.remove(), 1000);
    }, 50);
}

// 4. 눈보라 효과
const canvas = document.getElementById('snow-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    const flakes = Array.from({ length: 80 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 3 + 1, d: Math.random() * 1 }));
    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; ctx.beginPath();
        flakes.forEach(f => { ctx.moveTo(f.x, f.y); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); });
        ctx.fill();
        flakes.forEach(f => { f.y += Math.cos(f.d) + 1 + f.r / 2; f.x += Math.sin(f.d) * 2; if (f.y > h) { f.y = -10; f.x = Math.random() * w; } });
    }
    setInterval(draw, 30);
}

// 5. 갤러리 로직
let galleryIndex = 0;
const images = ["두부0.png", "두부1.png", "두부2.png", "두부3.png", "두부4.png"];
function updateGallery(dir) {
    const img = document.getElementById('gallery-img');
    if (!img) return;
    flipSound.currentTime = 0; flipSound.play();
    galleryIndex = (galleryIndex + dir + images.length) % images.length;
    img.style.opacity = '0';
    setTimeout(() => { 
        img.src = images[galleryIndex]; img.style.opacity = '1'; 
        const info = document.getElementById('page-info');
        if(info) info.innerText = (galleryIndex + 1) + " / " + images.length;
    }, 200);
}