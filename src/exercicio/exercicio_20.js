/* =========================================
   Exercício 20 — Toggle mensal/anual com animação de preço
   ========================================= */

(function () {
  'use strict';

  const toggleBtn  = document.getElementById('billing-toggle');
  const lblMonthly = document.getElementById('lbl-monthly');
  const lblAnnual  = document.getElementById('lbl-annual');
  const amounts    = Array.from(document.querySelectorAll('.price-amount'));

  let isAnnual = false;

  /* --- Atualiza os preços com fade --- */
  function updatePrices() {
    amounts.forEach(el => {
      el.classList.add('is-changing');

      setTimeout(() => {
        const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
        el.textContent = val;
        el.classList.remove('is-changing');
      }, 150);
    });
  }

  /* --- Atualiza labels ativos --- */
  function updateLabels() {
    lblMonthly.classList.toggle('is-active', !isAnnual);
    lblAnnual.classList.toggle('is-active', isAnnual);
  }

  /* --- Toggle --- */
  toggleBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggleBtn.setAttribute('aria-checked', String(isAnnual));
    updatePrices();
    updateLabels();
  });

  /* Estado inicial */
  lblMonthly.classList.add('is-active');

})();
