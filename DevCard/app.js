// ==========================================
// 1. CAMBIAR COLOR DE ACENTO
// ==========================================
function cambiarColor(btn) {
  const color = btn.getAttribute('data-color');
  const rgb   = btn.getAttribute('data-rgb');

  // Aplica el color a toda la página via variables CS

  console.log(color);
  console.log(rgb);
  document.documentElement.style.setProperty('--acento', color);
  document.documentElement.style.setProperty('--acento-rgb', rgb);

  // Actualiza el avatar con el nuevo color
  const seed = 'JOSUE'; // 🔧 cambia esto por tu nombre
  document.getElementById('avatar-img').src =
    `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=${color.replace('#', '')}`;

  // Marca el botón como activo
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
}

// ==========================================
// 2. TOGGLE DARK / LIGHT MODE
// ==========================================
function toggleTema(btn) {
  const html       = document.documentElement;
  const temaActual = html.getAttribute('data-theme');
  const icono      = document.getElementById('tema-icon');
  const texto      = document.getElementById('tema-texto');

  if (temaActual === 'dark') {
    html.setAttribute('data-theme', 'light');
    icono.textContent = '🌙';
    texto.textContent = 'Oscuro';
  } else {
    html.setAttribute('data-theme', 'dark');
    icono.textContent = '☀️';
    texto.textContent = 'Claro';
  }
}

// ==========================================
// 3. CONFETTI AL HACER CLIC EN SEGUIR
// ==========================================
function lanzarConfetti(btn) {
  const acento = getComputedStyle(document.documentElement)
    .getPropertyValue('--acento').trim();

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: [acento, '#ffffff', '#000000'],
    shapes: ['circle', 'square'],
    scalar: 1.2
  });

  btn.textContent = '¡Siguiendo! ✓';
  btn.style.opacity = '0.8';

  setTimeout(() => {
    btn.textContent = '¡Seguir! 🎉';
    btn.style.opacity = '1';
  }, 2500);
}

// ==========================================
// 4. BOTÓN COMPARTIR
// ==========================================
function compartir() {
  if (navigator.share) {
    navigator.share({
      title: 'Mi Dev Card',
      text: '¡Mira mi tarjeta de desarrollador! Hecha en clase de Desarrollo Web 🚀',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.querySelector('.btn-secundario');
      btn.textContent = '¡Copiado! ✓';
      setTimeout(() => btn.textContent = 'Compartir', 2000);
    });
  }
}
