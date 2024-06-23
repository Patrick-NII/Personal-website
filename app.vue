<template>
  <ThemeProvider id="app" :theme="theme">
    <SkipLink to="#section-nav" />
    <Header :compact="isPortrait ? false : isHeaderCompact" :currentSection="currentSection" />
    <Navigation />
    <Home />
    <Footer :currentSection="currentSection" />
  </ThemeProvider>
</template>

<script>
import { mapState } from 'vuex'
import { ThemeProvider } from 'vue-styled-components'
import Header from './Header.vue'
import Navigation from './Navigation.vue'
import Home from './Home.vue'
import Footer from './Footer.vue'
import { updateIconColors } from './helpers'
import { CURRENT_SECTION, HEADER_COMPACT } from './constants'

export default {
  computed: {
    ...mapState([CURRENT_SECTION, HEADER_COMPACT])
  },
  mounted() {
    updateIconColors(this.currentSection)
  },
  watch: {
    currentSection(newSection) {
      updateIconColors(newSection)
    }
  }
}
</script>

<style>
/* Votre style ici */
</style>
