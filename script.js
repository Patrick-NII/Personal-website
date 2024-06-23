import Swup from 'swup';
import SwupFadeTheme from '@swup/fade-theme';
import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', () => {
  const swup = new Swup({
    plugins: [new SwupFadeTheme()]
  });

  const menuIcon = document.getElementById('menu-icon');
  const icons = document.querySelectorAll('.nav-list a i');

  const sections = document.querySelectorAll('section, header');

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

  swup.on('contentReplaced', () => {
    const newHeroTitle = document.querySelector('.hero h1');
    if (newHeroTitle) {
      newHeroTitle.classList.remove('fade-in');
      setTimeout(() => {
        newHeroTitle.classList.add('fade-in');
      }, 100);
    }

    updateIconColors();
  });

  window.addEventListener('scroll', updateIconColors);

  updateIconColors();

  // Configuration de l'effet de curseur
  const cursor = d3.select('body')
    .append('div')
    .attr('class', 'custom-cursor')
    .style('position', 'absolute')
    .style('width', '10px')
    .style('height', '10px')
    .style('background-color', '#000')
    .style('border-radius', '50%')
    .style('pointer-events', 'none');

  document.addEventListener('mousemove', (event) => {
    cursor.style('transform', `translate(${event.clientX}px, ${event.clientY}px)`);
  });
});
