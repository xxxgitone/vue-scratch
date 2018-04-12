import Vue from 'vue'
import VueScratch from '../../../src/component/vue-scratch.vue'

describe('Vue-Scratch', () => {
  it ('data should be a function', () => {
    expect(typeof VueScratch.data).to.equal('function')
  })
})
