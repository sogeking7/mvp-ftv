import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import components from './components/UI/index'
import { createManager } from '@vue-youtube/core';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createManager())

components.forEach((component) => {
  app.component(component.name, component)
})

app.mount('#app')
