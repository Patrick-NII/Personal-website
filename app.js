import Vue from 'vue'
import { ThemeProvider } from 'vue-styled-components'

// Global styles
import '@saucedrip/core/normalize-css'
import './global-styles'

// Vuex state mapping
import { mapState } from 'vuex'
import { theme } from './theme'
import { CURRENT_SECTION, HEADER_COMPACT } from './constants'

// Components
import Home from './home'
import Header from './Header'
import Footer from './Footer'
import { updateIconColors } from './helpers'

export default Vue.component('App', {
  computed: mapState([
    CURRENT_SECTION,
    HEADER_COMPACT,
  ]),

  render() {
    return (
      <ThemeProvider id="app" theme={theme}>
        <SkipLink to="#section-nav" />
        <Header
          compact={this.isPortrait ? false : this.isHeaderCompact}
          currentSection={this.currentSection}
          store={this.$store}
        />
        <Home />
        <Footer currentSection={this.currentSection} />
      </ThemeProvider>
    )
  },

  mounted() {
    updateIconColors(this.currentSection)
  },

  watch: {
    currentSection(newSection) {
      updateIconColors(newSection)
    }
  }
})
