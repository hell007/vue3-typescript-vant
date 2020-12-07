import { MutationTree, ActionTree } from 'vuex';
import { fetchPost } from '@/utils/api';

interface UnitState {
  token: string;
  user: any;
}

const state: UnitState = {
  token: '',
  user: {}
};

const mutations: MutationTree<UnitState> = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  }
};

const actions: ActionTree<UnitState, {}> = {
  login({ commit }, form) {
    return new Promise((resolve, reject) => {
      fetchPost('/flep/app/api/sys/login', form)
        .then((response) => {
          if (200 == response.data.status) {
            const user = response.data.body;
            commit('SET_TOKEN', user.token);
            commit('SET_USER', user);
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
