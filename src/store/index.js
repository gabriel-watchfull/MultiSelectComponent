import Vue from 'vue';
import Vuex from 'vuex';

import multiselect from './multiselect';
import users from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    multiselect,
    users,
  },
});