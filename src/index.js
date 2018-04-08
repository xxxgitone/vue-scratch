import VueScratch from './component/vue-scratch.vue'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vue-scratch', VueScratch)
}

export default VueScratch
