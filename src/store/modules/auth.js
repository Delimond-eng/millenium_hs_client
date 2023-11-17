import { post } from "@/http";

/**
 * Vuex state
 * @returns Object state
 * */
const states = {
  user: null,
};

/**
 * Vuex mutation
 * @returns Object setters
 * */
const setters = {
  SET_USER: (state, data) => (state.user = data),
};

/**
 * Vuex getters
 * @returns Object getters
 * */
const getters = {
  GET_USER: (state) => state.user,
};

/**
 * Vuex actions
 * @returns Object actions
 * */
const actions = {
  /**
   * Login to application
   * @param context vuex context,
   * @param form request formData,
   * @returns HttpResponse
   * */
  async loggedIn(context, form) {},

  /**
   * Refresh logged User
   * @param commit mutator
   * @returns void
   * */
  async refreshLoggedUser({ commit }) {},

  /**
   * Log Out
   * @param commit mutator
   * @returns void
   * */
  async loggedOut({ commit }) {},
};

const auth = {
  namespaced: true,
  state: states,
  mutations: setters,
  getters: getters,
  actions: actions,
};

export default auth;
