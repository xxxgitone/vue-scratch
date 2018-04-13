import Vue from 'vue'
import VueScratch from '../../../src/component/vue-scratch.vue'

describe('Vue-Scratch', () => {

  it('renders the correct width and height', () => {
    const Constructor = Vue.extend(VueScratch)
    const vm = new Constructor({
      propsData: {
        coverWidth: 300,
        coverHeight: 200
      }
    }).$mount()

    expect(vm.$el.style.width).to.be.equal('300px')
    expect(vm.$el.style.height).to.be.equal('200px')
    expect(vm.$refs.canvas.getAttribute('width')).to.be.equal('300')
    expect(vm.$refs.canvas.getAttribute('height')).to.be.equal('200')
  })
})
