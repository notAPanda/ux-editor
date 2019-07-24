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
  editing: false,
  disableScale: true
}

export default new Vuex.Store({
  state: {
    canvas: {
      type: 'canvas',
      width: 1024,
      height: 10000,
      marginX: 400,
      marginY: 400,
      selected: false
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
    editElement(state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id),
        {
          ...payload,
          editing: true,
          selected: true,
        }
      ]
    },
    selectElement(state, payload) {
      state.elements = [...state.elements].map(el => {
        if (el.id === payload.id) {
          return {
            ...payload,
            selected: true
          }
        }
        return {
          ...el,
          selected: false
        }
      })
    },
    addToSelectedElements(state, payload) {
      state.elements = [...state.elements].map(el => {
        if (el.id === payload.id) {
          return {
            ...payload,
            selected: true
          }
        }
        return el
      })
    },
    selectElements(state, payload = null) {
      if (payload) {
        state.elements = [
          ...state.elements.filter(element => !doOverlap(payload, element)),
          ...state.elements
            .filter(element => doOverlap(payload, element))
            .map(element => {
              return {
                ...element,
                selected: true
              }
            })
        ]
      }
    },
    clearSelection(state, payload) {
      state.elements = [...state.elements].map(el => ({
        ...el,
        selected: false
      }))
    },
    addElement(state, payload) {
      state.elements = [
        ...state.elements,
        {
          ...state.base[payload.type],
          id: state.elements.length + 1,
          ...payload
        }
      ]
    },
    removeElement(state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id)
      ]
      return null
    },
    updateElement(state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id),
        payload
      ]
      return null
    },
    alignLeftSelectedElements (state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => ({
            ...e,
            x: payload.x
          }))
      ]
    },
    alignTopSelectedElements (state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => ({
            ...e,
            y: payload.y
          }))
      ]
    },
    translateMultipleElements(state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => ({
            ...e,
            x: e.x + payload.x,
            y: e.y + payload.y
          }))
      ]
    }
  },
  actions: {}
})
