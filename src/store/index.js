import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    score: 0,
    me: null,
    computer: null,
  },

  mutations: {
    INIT_STATE(state) {
      state.me = null;
      state.computer = null;
    },

    SET_ME(state, value) {
      state.me = value;
    },

    SET_COMPUTER(state, value) {
      state.computer = value;
    },

    SET_SCORE(state, score) {
      state.score = score;
    },
  },

  actions: {
    initState({ commit }) {
      commit('INIT_STATE');
      if (localStorage.getItem('score')) {
        commit('SET_SCORE', Number(localStorage.getItem('score')));
      } else commit('SET_SCORE', 0);
    },

    setScore({ commit }, score) {
      commit('SET_SCORE', score);
      localStorage.setItem('score', score);
    },
  },

  getters: {
    getScore(state) {
      if (localStorage.getItem('score')) return localStorage.getItem('score');
      return state.score;
    },
  },
});
