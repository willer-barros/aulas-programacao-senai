/* =========================================
   Exercício 17 — Galeria Visual
   Módulos: Filter + Lightbox com navegação
   ========================================= */

(function () {
  'use strict';

  /* --- Referências DOM --- */
  const gallery      = document.getElementById('gallery');
  const cards        = Array.from(gallery.querySelectorAll('.card'));
  const filterBtns   = Array.from(document.querySelectorAll('.filter-btn'));
  const visibleCount = document.getElementById('visible-count');

  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbTag     = document.getElementById('lb-tag');
  const lbTitle   = document.getElementById('lb-title');
  const lbAuthor  = document.getElementById('lb-author');
  const lbCurrent = document.getElementById('lb-current');
  const lbTotal   = document.getElementById('lb-total');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  const lbBdrop   = document.getElementById('lb-backdrop');

  /* --- Estado --- */
  let activeFilter = 'all';
  let visibleCards = [...cards];
  let lbIndex      = 0;

  /* =========================================
     MÓDULO: FILTER
     ========================================= */

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter === activeFilter) return;
      activeFilter = filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const next = [];

      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;

        if (matches) {
          next.push(card);
          /* Garante que o card esteja visível antes de remover .is-hiding */
          card.style.removeProperty('display');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.remove('is-hiding');
            });
          });
        } else {
          card.classList.add('is-hiding');
          card.addEventListener('transitionend', function hide(e) {
            if (e.propertyName !== 'opacity') return;
            card.style.display = 'none';
            card.removeEventListener('transitionend', hide);
          });
        }
      });

      visibleCards = next;
      visibleCount.textContent = next.length;
    });
  });

  /* =========================================
     MÓDULO: LIGHTBOX
     ========================================= */

  function openLightbox(index) {
    lbIndex = index;
    const card = visibleCards[index];

    lbImg.src               = card.querySelector('img').src;
    lbTag.textContent       = card.querySelector('.card-tag').textContent;
    lbTitle.textContent     = card.dataset.title;
    lbAuthor.textContent    = 'Por ' + card.dataset.author;
    lbCurrent.textContent   = index + 1;
    lbTotal.textContent     = visibleCards.length;

    lbPrev.disabled = index === 0;
    lbNext.disabled = index === visibleCards.length - 1;

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    const next = lbIndex + dir;
    if (next < 0 || next >= visibleCards.length) return;

    lbImg.style.opacity = '0';
    setTimeout(() => {
      openLightbox(next);
      lbImg.style.opacity = '1';
    }, 200);
  }

  /* Abrir ao clicar no card */
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const index = visibleCards.indexOf(card);
      if (index !== -1) openLightbox(index);
    });
  });

  /* Controles do lightbox */
  lbClose.addEventListener('click', closeLightbox);
  lbBdrop.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => navigateLightbox(-1));
  lbNext.addEventListener('click',  () => navigateLightbox(+1));

  /* Teclado: Escape, setas */
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(+1);
  });

})();
