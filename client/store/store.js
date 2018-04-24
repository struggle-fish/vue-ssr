import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true, // 命名空间为 true
        state: {
          text: '1'
        },
        mutations: {
          updateText (state, text) {
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            // getters 所有的 getters
            // rootState 全局 state
            return state.text
          }
        },
        actions: {
          add ({ state, commit }) {
            commit('updateCount', { num: 1440 }, { root: true })
          }
        }
      }
    },
    // 开发环境开启严格模式规范大家书写
    strict: process.env.NODE_ENV !== 'production' // 开启严格模式
  })
}
