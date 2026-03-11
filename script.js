const bgm = new Audio('메세지.mp3'); bgm.loop = true;
const clickSound = new Audio('마우스클릭.mp3');
const flipSound = new Audio('flip.mp3');

const wand = document.createElement('div');
wand.id = 'magic-wand';
document.body.appendChild(wand);

document.addEventListener('mousemove', (e) => {
    wand.style.left = e.clientX + 'px';
    wand.style.top = e.clientY + 'px';
    if (Math.random() > 0.8) createParticle(e.pageX, e.pageY);
});

document.addEventListener('mousedown', () => {
    clickSound.currentTime = 0; clickSound.play();
    wand.style.transform = 'translate(-50%, -50%) scale(1.4)';
});
document.addEventListener('mouseup', () => { wand.style.transform = 'translate(-50%, -50%) scale(1)'; });
document.addEventListener('click', () => { if (bgm.paused) { bgm.play().catch(() => {}); } });

function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.width = size + 'px'; p.style.height = size + 'px';
    p.style.left = x + 'px'; p.style.top = y + 'px';
    document.body.appendChild(p);
    setTimeout(() => {
        p.style.transition = '0.5s ease-out';
        p.style.opacity = '0';
        p.style.transform = 'scale(0)';
        setTimeout(() => p.remove(), 500);
    }, 10);
}

const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
canvas.width = w; canvas.height = h;
const flakes = Array.from({ length: 30 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 1, d: Math.random() * 1 }));
function draw() {
    ctx.clearRect(0, 0, w, h); ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; ctx.beginPath();
    flakes.forEach(f => { ctx.moveTo(f.x, f.y); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); }); ctx.fill();
    flakes.forEach(f => { f.y += 1.0; f.x += Math.sin(f.d); if (f.y > h) f.y = -10; });
    requestAnimationFrame(draw);
}
draw();

let galleryIndex = 0;
const images = ["두부0.png", "두부1.png", "두부2.png", "두부3.png", "두부4.png"];
function updateGallery(dir) {
    const img = document.getElementById('gallery-img');
    flipSound.currentTime = 0; flipSound.play();
    galleryIndex = (galleryIndex + dir + images.length) % images.length;
    img.style.opacity = '0.5';
    setTimeout(() => { 
        img.src = images[galleryIndex]; img.style.opacity = '1'; 
        document.getElementById('page-info').innerText = (galleryIndex + 1) + " / " + images.length;
    }, 100);
}

document.querySelectorAll('.side-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});