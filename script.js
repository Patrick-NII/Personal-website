document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.v-slider-bloc').forEach((section) => {
    observer.observe(section);
  });

  const menuIcon = document.getElementById('menu-icon');
  const icons = document.querySelectorAll('.nav-list a i');
  const sections = document.querySelectorAll('.v-slider-bloc');

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

  window.addEventListener('scroll', updateIconColors);
  updateIconColors();
});


