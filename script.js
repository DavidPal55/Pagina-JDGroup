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

/* Form — Price Calculator */
document.getElementById('mainForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const paintSelect = document.getElementById('paintBrand');
    const workSelect = document.getElementById('workType');
    const sqInput = document.getElementById('sqMeters');
    const resultDiv = document.getElementById('calcResult');
    const priceEl = document.getElementById('resultPrice');
    const breakdownEl = document.getElementById('resultBreakdown');

    // Clear previous errors
    document.querySelectorAll('.field.error').forEach(f => f.classList.remove('error'));

    // Validate
    let hasError = false;
    if (!paintSelect.value) { paintSelect.closest('.field').classList.add('error'); hasError = true; }
    if (!workSelect.value) { workSelect.closest('.field').classList.add('error'); hasError = true; }
    if (!sqInput.value || sqInput.value <= 0) { sqInput.closest('.field').classList.add('error'); hasError = true; }
    if (hasError) return;

    const precioPorLitro = parseFloat(paintSelect.value); // valor de la marca de pintura x litro
    const multiplicadorTrabajo = parseFloat(workSelect.value); // valor de la mano de obra
    const metros = parseFloat(sqInput.value); // metros cuadrados elegidos

    // Fórmula: ~0.15 litros por m² (rendimiento promedio), 2 manos
    const litrosPorM2 = 4;
    const litrosNecesarios = metros / litrosPorM2;
    const costoMaterial = litrosNecesarios * precioPorLitro;

    // Mano de obra base: $2500/m² (modificable)
    const costoManoDeObra = metros * multiplicadorTrabajo;

    const total = costoMaterial + costoManoDeObra;

    // Format number with thousand separators
    const fmt = (n) => Math.round(n).toLocaleString('es-AR');

    // Get selected text labels
    const pinturaLabel = paintSelect.options[paintSelect.selectedIndex].text.split(' — ')[0];
    const trabajoLabel = workSelect.options[workSelect.selectedIndex].text;

    // Animate price
    priceEl.textContent = '$' + fmt(total);

    // Breakdown
    breakdownEl.innerHTML = `
        <div class="breakdown-row">
            <span class="breakdown-label">Pintura (${pinturaLabel})</span>
            <span class="breakdown-value">$${fmt(costoMaterial)}</span>
        </div>
        <div class="breakdown-row">
            <span class="breakdown-label">${fmt(litrosNecesarios)} litros × $${fmt(precioPorLitro)}/lt</span>
        </div>
        <div class="breakdown-row">
            <span class="breakdown-label">Mano de obra (${trabajoLabel})</span>
            <span class="breakdown-value">$${fmt(costoManoDeObra)}</span>
        </div>
        <div class="breakdown-row">
            <span class="breakdown-label">Superficie</span>
            <span class="breakdown-value">${metros} m²</span>
        </div>
    `;

    // Show result with re-trigger animation
    resultDiv.classList.remove('show');
    void resultDiv.offsetWidth; // force reflow
    resultDiv.classList.add('show');

    // Scroll into view
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});