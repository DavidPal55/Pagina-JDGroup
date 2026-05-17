/* Strip marquee */
const words = ['Pintura interior', 'Pintura exterior', 'Garantía 2 años', 'Sin subcontratos', 'Presupuesto gratis', 'Materiales premium', 'Plazos cumplidos', 'Texturas'];
const si = document.getElementById('stripInner');
[...words, ...words].forEach(w => {
    const s = document.createElement('span'); s.className = 'strip-item';
    s.innerHTML = w + '<span class="strip-dot"></span>'; si.appendChild(s);
});

/* Scroll reveal */
const els = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(e => {
    e.forEach(el => { if (el.isIntersecting) { el.target.classList.add('on'); obs.unobserve(el.target); } });
}, { threshold: 0.1 });
els.forEach((el, i) => obs.observe(el));

/* Stagger */
document.querySelectorAll('.svc.reveal').forEach((el, i) => el.style.transitionDelay = (i * 70) + 'ms');
document.querySelectorAll('.pstep.reveal').forEach((el, i) => el.style.transitionDelay = (i * 80) + 'ms');
document.querySelectorAll('.testi.reveal').forEach((el, i) => el.style.transitionDelay = (i * 80) + 'ms');

/* Form */
document.getElementById('mainForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.form-btn');
    btn.textContent = 'Enviando...'; btn.style.opacity = '.6';
    setTimeout(() => { btn.style.display = 'none'; document.getElementById('formOk').style.display = 'block'; }, 900);
});