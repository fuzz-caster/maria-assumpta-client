// Declare vue instance here
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSignal, faTable, faCog, faCube, faTrash, faEllipsisH, faRandom, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faFoursquare, faBuffer, faEmpire } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextAvatar from './components/TextAvatar'

Vue.config.productionTip = false

library.add(faFoursquare, faBuffer, faEmpire, faUserSecret, faTable, faCog, faCube, faTrash, faRandom, faHeart, faSignal, faEllipsisH)
Vue.component('font-awesome-icon', FontAwesomeIcon)
// Custom avatar component
Vue.component('text-avatar', TextAvatar)

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
