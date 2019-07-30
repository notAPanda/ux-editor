import Vue from "vue";
import Vuex from "vuex";
import Chance from "chance";

import { doOverlap } from "@/helpers/select";
import { minMax } from "./helpers/point-finder";

Vue.use(Vuex);

export const chance = new Chance();

const defaults = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  angle: 0,
  selected: false,
  editing: false,
  disableScale: true
};

export default new Vuex.Store({
  state: {
    canvas: {
      type: "canvas",
      width: 1024,
      height: 10000,
      marginX: 400,
      marginY: 400,
      selected: false
    },
    base: {
      oval: {
        ...defaults,
        type: "oval",
        classPrefix: "oval",
        text: "",
        styles: {
          background: "rgba(220, 220, 220, 1)",
          "border-radius": "50%",
          opacity: 1,
          "mix-blend-mode": "normal",
          "border-width": 0,
          "border-color": "rgba(50, 50, 50, 1)",
          "border-style": "solid",
          "z-index": 1,
          "box-shadow": "none"
        }
      },
      line: {
        ...defaults,
        height: 1,
        type: "line",
        classPrefix: "line",
        text: "",
        styles: {
          background: "rgba(220, 220, 220, 1)",
          opacity: 1,
          "mix-blend-mode": "normal",
          "z-index": 1
        }
      },
      text: {
        ...defaults,
        type: "text",
        classPrefix: "text",
        text: "<p>Text...</p>",
        height: 25,
        styles: {
          color: "rgba(50, 50, 50, 1)",
          "font-style": "normal",
          "font-weight": "normal",
          "text-align": "left",
          "font-size": "20px",
          opacity: 1,
          "mix-blend-mode": "normal",
          "z-index": 2
        }
      },
      box: {
        ...defaults,
        type: "box",
        classPrefix: "box",
        text: "",
        styles: {
          background: "rgba(220, 220, 220, 1)",
          "border-radius": 0,
          "border-width": 0,
          "border-color": "rgba(50, 50, 50, 1)",
          "border-style": "solid",
          opacity: 1,
          "mix-blend-mode": "normal",
          "z-index": 1,
          "box-shadow": "none"
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
          selected: true
        }
      ];
    },
    selectElement(state, payload) {
      state.elements = [...state.elements].map(el => {
        if (el.id === payload.id) {
          return {
            ...payload,
            selected: true
          };
        }
        return {
          ...el,
          selected: false
        };
      });
    },
    addToSelectedElements(state, payload) {
      state.elements = [...state.elements].map(el => {
        if (el.id === payload.id) {
          return {
            ...payload,
            selected: true
          };
        }
        return el;
      });
    },
    selectElements(state, payload = null) {
      if (payload && payload.width * payload.height > 100) {
        state.elements = [
          ...state.elements
            .filter(element => !doOverlap(payload, element))
            .map(element => ({
              ...element,
              selected: false
            })),
          ...state.elements
            .filter(element => doOverlap(payload, element))
            .map(element => ({
              ...element,
              selected: true
            }))
        ];
      }
    },
    clearSelection(state) {
      state.elements = [...state.elements].map(el => ({
        ...el,
        selected: false
      }));
    },
    addElement(state, payload) {
      state.elements = [
        ...[...state.elements].map(e => ({ ...e, selected: false })),
        {
          ...state.base[payload.type],
          styles: {
            ...state.base[payload.type].styles,
            "z-index": state.elements.length + 5
          },
          selected: true,
          ...payload,
          id: chance.hash()
        }
      ];
    },
    addElements(state, payload) {
      state.elements = [
        ...[...state.elements].map(e => ({ ...e, selected: false })),
        ...payload
      ];
    },
    removeElement(state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id)
      ];
      return null;
    },
    removeElements(state, payload) {
      const ids = [...payload.map(el => el.id)];
      state.elements = [
        ...state.elements.filter(element => !ids.includes(element.id))
      ];
      return null;
    },
    updateElement(state, payload) {
      state.elements = [
        ...state.elements.filter(element => element.id !== payload.id),
        payload
      ];
      return null;
    },
    updateElements(state, payload) {
      state.elements = [
        ...state.elements.filter(element => !element.selected),
        ...payload
      ];
      return null;
    },
    alignLeftSelectedElements(state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => {
            let xmin = minMax(e).xmin;
            return {
              ...e,
              x: payload.x + (e.x - xmin)
            };
          })
      ];
    },
    alignTopSelectedElements(state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => {
            let ymin = minMax(e).ymin;
            return {
              ...e,
              y: payload.y + (e.y - ymin)
            };
          })
      ];
    },
    alignRightSelectedElements(state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => {
            let xmax = minMax(e).xmax;
            return {
              ...e,
              x: payload.x + (e.x - xmax)
            };
          })
      ];
    },
    alignBottomSelectedElements(state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => {
            let ymax = minMax(e).ymax;
            return {
              ...e,
              y: payload.y + (e.y - ymax)
            };
          })
      ];
    },
    alignCenterSelectedElements(state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => {
            let mm = minMax(e);
            let center = (mm.xmin + mm.xmax) / 2;
            return {
              ...e,
              x: payload.x + (e.x - center)
            };
          })
      ];
    },
    alignMiddleSelectedElements(state, payload) {
      state.elements = [
        ...state.elements.filter(e => !e.selected),
        ...state.elements
          .filter(e => e.selected)
          .map(e => {
            let mm = minMax(e);
            let center = (mm.ymin + mm.ymax) / 2;
            return {
              ...e,
              y: payload.y + (e.y - center)
            };
          })
      ];
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
      ];
    }
  },
  actions: {}
});
