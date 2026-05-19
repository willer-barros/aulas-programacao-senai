/* =========================================
   Exercício 18 — Barra de progresso de leitura
   ========================================= */

(function () {
  'use strict';

  const bar    = document.getElementById('progress-bar');
  const header = document.getElementById('site-header');

  function updateProgress() {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollable   = docHeight - windowHeight;

    if (scrollable <= 0) { bar.style.width = '0%'; return; }

    const pct = Math.min((scrollTop / scrollable) * 100, 100);
    bar.style.width = pct + '%';

    /* Adiciona sombra no header após scroll */
    if (scrollTop > 10) {
      header.style.boxShadow = '0 1px 0 rgba(255,255,255,0.05)';
    } else {
      header.style.boxShadow = '';
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

})();
