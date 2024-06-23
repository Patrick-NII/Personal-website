document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-list a');
    const heroTitle = document.querySelector('.hero h1');
  
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
        });
  
        if (targetId === 'home') {
          heroTitle.classList.remove('fade-in');
          setTimeout(() => {
            heroTitle.classList.add('fade-in');
          }, 100);
        }
      });
    });
  });
  