document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const links = document.querySelectorAll('.nav-list a');
  
    menuIcon.addEventListener('click', () => {
      sidebar.style.left = sidebar.style.left === '0px' ? '-100%' : '0';
    });
  
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
          behavior: 'smooth'
        });
        sidebar.style.left = '-100%'; // Hide sidebar after clicking a link
      });
    });
  });
  