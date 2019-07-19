import Vue from 'vue'
import Vuex from 'vuex'

import { doOverlap } from '@/helpers/select'

Vue.use(Vuex)

const defaults = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  angle: 0,
  selected: false,
  disableScale: true
}

export default new Vuex.Store({
  state: {
    selectedElement: {
      id: null,
      type: null
    },
    selectedElements: [],
    canvas: {
      type: 'canvas',
      width: 1024,
      height: 10000,
      'marginX': 500,
      'marginY': 100
    },
    base: {
      oval: {
        ...defaults,
        type: 'oval',
        classPrefix: 'oval',
        text: '',
        styles: {
          background: '#0FF0B3',
          'border-radius': '50%',
          opacity: 100,
          'mix-blend-mode': 'normal'
        }
      },
      line: {
        ...defaults,
        height: 1,
        type: 'line',
        classPrefix: 'line',
        text: '',
        styles: {
          background: '#0FF0B3',
          opacity: 100,
          'mix-blend-mode': 'normal'
        }
      },
      text: {
        ...defaults,
        type: 'text',
        classPrefix: 'text',
        text: 'Text...',
        height: 25,
        styles: {
          opacity: 100,
          'mix-blend-mode': 'normal',
          'font-size': '20px'
        }
      },
      box: {
        ...defaults,
        type: 'box',
        classPrefix: 'box',
        text: '',
        styles: {
          background: '#0FF0B3',
          'border-radius': 0,
          opacity: 100,
          'mix-blend-mode': 'normal'
        }
      }
    },
    elements: []
  },
  mutations: {
    selectElement (state, payload) {
      state.selectedElements = [payload]
    },
    addToSelectedElements (state, payload) {
      state.selectedElements = [...state.selectedElements, payload]
    },
    selectElements (state, payload = null) {
      if (payload) {
        state.selectedElements = [
          ...state.elements.filter(element => doOverlap(payload, element)).map(element => {
            return {
              ...element,
              selected: 1
            }
          })
        ]
      } else {
        state.selectedElements = []
      }
    },
    clearSelection (state, payload) {
      state.selectedElements = [payload]
    },
    addElement (state, payload) {
      state.elements = [...state.elements, { ...state.base[payload], id: state.elements.length + 1 }]
    },
    removeElement (state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id)
      ]
      return null
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
