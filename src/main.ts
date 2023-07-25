import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router/router'
import ComponentB from './components/ComponentB.vue'

const app = createApp(App)
app.component('ComponentB', ComponentB) // TODO: pr mount API should async
app.use(router).mount('#app') 