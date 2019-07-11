import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canvas: {
      width: 1024,
      height: 10000
    },
    base: {
      box: {
        selected: false,
        x: 100,
        y: 100,
        scaleX: 1,
        scaleY: 1,
        width: 100,
        height: 100,
        angle: 0,
        classPrefix: 'box',
        text: '',
        styles: {
          background: 'linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)'
        },
        disableScale: true
      }
    },
    elements: []
  },
  mutations: {
    addElement (state) {
      state.elements = [...state.elements, { ...state.base.box, id: state.elements.length }]
    },
    updateElement (state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id),
        payload
      ]
    }
  },
  actions: {

  }
})
