import { getFirstFocusableNode } from '@mrolaolu/helpers'
import { SECTION_SELECTOR, CURRENT_SECTION, NAVIGATION_ID } from './constants'
import { isMotionReduced } from '@saucedrip/core/helpers'

export * from '@saucedrip/core/helpers'

export function goToSection(store, opts) {
  // ... (le reste de votre fonction existante)
}

export const [getSections] = [
  () => Array.from(document.querySelectorAll(SECTION_SELECTOR)),
]

function smoothScroll(scrollTargetY, speed = 1000) {
  // ... (le reste de votre fonction existante)
}

export function updateIconColors(currentSection) {
  const menuIcon = document.getElementById('menu-icon')
  const icons = document.querySelectorAll('.nav-list a i')
  const sectionElem = document.querySelector(`[data-section='${currentSection}']`)
  const bgColor = window.getComputedStyle(sectionElem).backgroundColor

  if (bgColor === 'rgb(67, 0, 151)') { // #430097
    menuIcon.classList.add('menu-icon-light')
    menuIcon.classList.remove('menu-icon-dark')
    icons.forEach(icon => {
      icon.classList.add('icon-light')
      icon.classList.remove('icon-dark')
    })
  } else if (bgColor === 'rgb(240, 240, 240)') { // #f0f0f0
    menuIcon.classList.add('menu-icon-dark')
    menuIcon.classList.remove('menu-icon-light')
    icons.forEach(icon => {
      icon.classList.add('icon-dark')
      icon.classList.remove('icon-light')
    })
  }
}
