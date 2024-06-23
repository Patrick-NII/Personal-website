import { getFirstFocusableNode } from '@mrolaolu/helpers'
import { SECTION_SELECTOR, CURRENT_SECTION, NAVIGATION_ID } from './constants'

export function goToSection(store, opts) {
  let { node: sectionNode, modifier, smooth = true, focus = true } = opts

  if (!sectionNode) return
  const sections = getSections()
  const app = document.getElementById('app')

  const getSectionId = () => sectionNode.dataset.section
  const curSectionIndex = sections.findIndex(({ dataset }) => {
    return dataset.section === getSectionId()
  })

  const findSection = (idx = 0) => sections[curSectionIndex + idx]
  if (modifier == 'next') {
    sectionNode = findSection(1)
  } else if (modifier == 'previous') {
    sectionNode = findSection(-1)
  }

  if (!sectionNode) return
  setTimeout(() => {
    sectionNode.classList.add('scrolled')
  }, 1000)

  if (smooth) smoothScroll(sectionNode.offsetTop)
  else scrollTo(0, sectionNode.offsetTop)

  setTimeout(() => {
    store && store.commit(CURRENT_SECTION, getSectionId())
    app.dataset[CURRENT_SECTION] = getSectionId()

    if (focus) {
      const navigationEl = document.getElementById(NAVIGATION_ID)
      const nodeToFocus = !getFirstFocusableNode(sectionNode)
        ? getFirstFocusableNode(navigationEl)
        : sectionNode

      if (nodeToFocus === null) return
      nodeToFocus.focus()
    }
  }, 200)
}

export const [getSections] = [
  () => Array.from(document.querySelectorAll(SECTION_SELECTOR)),
]

function smoothScroll(scrollTargetY, speed = 1000) {
  let currentTime = 0
  const scrollY = pageYOffset || document.documentElement.scrollTop
  const derivedSpeed = speed

  const time = Math.max(
    0.1,
    Math.min(Math.abs(scrollY - scrollTargetY) / derivedSpeed, 0.8)
  )

  const easeInOutCubic = pos => {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3)
    return 0.5 * (Math.pow(pos - 2, 3) + 2)
  }

  function runAnimation() {
    currentTime += 1 / 60

    let p = currentTime / time
    let t = easeInOutCubic(p)

    if (p < 1) {
      requestAnimationFrame(runAnimation)

      scrollTo(0, scrollY + (scrollTargetY - scrollY) * t)
    } else {
      scrollTo(0, scrollTargetY)
    }
  }

  runAnimation()
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
