document.addEventListener('DOMContentLoaded', () => {
  // Crée un observateur d'intersection pour animer les sections lorsqu'elles apparaissent dans le viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in'); // Ajoute la classe 'fade-in' pour animer l'apparition
      }
    });
  }, {
    threshold: 0.1 // Seuil d'intersection, ici 10% de l'élément doit être visible
  });

  // Sélectionne toutes les sections avec la classe 'v-slider-bloc' et les observe
  document.querySelectorAll('.v-slider-bloc').forEach((section) => {
    observer.observe(section);
  });

  // Sélectionne le conteneur principal pour la détection de la molette
  const container = document.querySelector('.container');
  let scrollTimeout;

  container.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = event.deltaY;

    // Cancel any previous scroll animations
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Smooth scrolling using requestAnimationFrame
    const start = container.scrollTop;
    const end = start + delta;
    const duration = 600; // Adjust duration for smoothness
    let startTime = null;

    function smoothScroll(timestamp) {
      if (!startTime) startTime = timestamp;
      const timeElapsed = timestamp - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      container.scrollTop = start + (end - start) * easeInOutQuad(progress);

      if (timeElapsed < duration) {
        requestAnimationFrame(smoothScroll);
      }
    }

    requestAnimationFrame(smoothScroll);

    // Allow scroll snapping after the animation ends
    scrollTimeout = setTimeout(() => {
      container.style.scrollSnapType = 'y mandatory';
    }, duration + 100);
  });

  // Easing function for smooth scrolling
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // Sélectionne l'icône du menu hamburger
  const menuIcon = document.getElementById('menu-icon');
  // Sélectionne le menu qui sera affiché/masqué
  const menu = document.querySelector('.menu');
  // Sélectionne toutes les icônes dans la liste de navigation
  const icons = document.querySelectorAll('.nav-list a i');
  // Sélectionne toutes les sections à observer pour le changement de couleur de l'icône du menu
  const sections = document.querySelectorAll('.v-slider-bloc');

  // Ajoute un gestionnaire d'événements pour le clic sur l'icône du menu
  menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show'); // Affiche ou masque le menu
    menuIcon.classList.toggle('open'); // Change l'icône du menu
  });

  // Fonction pour mettre à jour les couleurs des icônes en fonction de la section visible
  const updateIconColors = () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        const bgColor = window.getComputedStyle(section).backgroundColor;
        if (bgColor === 'rgb(67, 0, 151)') { // #430097
          menuIcon.classList.add('menu-icon-light');
          menuIcon.classList.remove('menu-icon-dark');
          icons.forEach(icon => {
            icon.classList.add('icon-light');
            icon.classList.remove('icon-dark');
          });
        } else if (bgColor === 'rgb(240, 240, 240)') { // #f0f0f0
          menuIcon.classList.add('menu-icon-dark');
          menuIcon.classList.remove('menu-icon-light');
          icons.forEach(icon => {
            icon.classList.add('icon-dark');
            icon.classList.remove('icon-light');
          });
        }
      }
    });
  };

  // Ajoute un gestionnaire d'événements pour la mise à jour des couleurs des icônes lors du défilement
  window.addEventListener('scroll', updateIconColors);
  updateIconColors(); // Appelle la fonction immédiatement pour initialiser les couleurs

  // Ferme le menu lorsque l'on clique à l'extérieur de celui-ci
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
      menu.classList.remove('show'); // Masque le menu
      menuIcon.classList.remove('open'); // Réinitialise l'icône du menu
    }
  });
});
