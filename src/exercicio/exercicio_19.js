/* =========================================
   Exercício 19 — Validação e envio do formulário
   ========================================= */

(function () {
  'use strict';

  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successEl = document.getElementById('form-success');
  const resetBtn  = document.getElementById('reset-btn');

  /* --- Validação individual --- */
  function validateField(field) {
    const input = field.querySelector('input, textarea');
    if (!input) return true;

    let valid = true;

    if (input.required && !input.value.trim()) {
      valid = false;
    } else if (input.type === 'email' && input.value.trim()) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }

    field.classList.toggle('has-error', !valid);
    return valid;
  }

  /* Valida ao sair do campo (:focus lost) */
  form.querySelectorAll('.field').forEach(field => {
    const input = field.querySelector('input, textarea');
    if (!input) return;

    input.addEventListener('blur', () => validateField(field));
    input.addEventListener('input', () => {
      if (field.classList.contains('has-error')) validateField(field);
    });
  });

  /* --- Submit --- */
  form.addEventListener('submit', e => {
    e.preventDefault();

    /* Valida todos os campos */
    const fields  = Array.from(form.querySelectorAll('.field'));
    const allValid = fields.every(f => validateField(f));
    if (!allValid) {
      /* Foca o primeiro campo inválido */
      const first = form.querySelector('.has-error input, .has-error textarea');
      if (first) first.focus();
      return;
    }

    /* Estado de loading */
    submitBtn.classList.add('is-loading');

    /* Simula envio (1.8s) */
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      form.style.display = 'none';
      successEl.classList.add('is-visible');
    }, 1800);
  });

  /* --- Reset --- */
  resetBtn.addEventListener('click', () => {
    form.reset();
    form.querySelectorAll('.field').forEach(f => f.classList.remove('has-error'));
    successEl.classList.remove('is-visible');
    form.style.display = '';

    /* Pequeno delay para a animação de entrada */
    requestAnimationFrame(() => {
      form.querySelector('input')?.focus();
    });
  });

})();
