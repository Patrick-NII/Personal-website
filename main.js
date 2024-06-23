import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

// Importer les composants
import * as components from './components'

const app = createApp(App)

// Enregistrer les composants globalement
for (let componentName in components) {
  app.component(componentName, components[componentName])
}

// Utiliser le store Vuex
app.use(store)

// Monter l'application
app.mount('#app')
