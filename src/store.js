import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedElement: {
      id: null,
      type: null
    },
    canvas: {
      type: 'canvas',
      width: 1024,
      height: 10000
    },
    base: {
      box: {
        type: 'box',
        selected: false,
        x: 0,
        y: 0,
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
    selectElement (state, payload) {
      state.selectedElement = payload
    },
    addElement (state) {
      state.elements = [...state.elements, { ...state.base.box, id: state.elements.length }]
    },
    updateElement (state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id),
        payload
      ]
      state.selectedElement = payload
      return null
    }
  },
  actions: {
  }
})
