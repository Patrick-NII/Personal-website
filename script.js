document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-list a');
  
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });
  