import { post } from "@/http";

/**
 * Vuex state
 * @returns Object state
 * */
const states = {
  user: {},
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
  async login(context, form) {
    try {
      let { data, status } = await post("/login", form);
      if (status === 200) {
        if (!data.errors) {
          localStorage.removeItem("user-token");
          localStorage.removeItem("user-data");
          localStorage.setItem("user-token", data.token);
          localStorage.setItem("user-data", JSON.stringify(data.user));
          return data;
        } else {
          return data.errors;
        }
      } else return null;
    } catch (error) {
      return null;
    }
  },

  /**
   * CREATE NEW HOSPITAL, DEFAULT USER ADMIN, AND DEFAULT LOCATION
   * @param {Vuex} context
   * @param {Object} form
   */
  async createHospital(context, form) {
    try {
      let { data, status } = await post("/hospitals.create", form);
      if (status === 200) {
        if (data.status === undefined) {
          localStorage.removeItem("user-data");
          return data;
        } else {
          return data;
        }
      } else return data;
    } catch (error) {
      return null;
    }
  },

  /**
   * Refresh logged User
   * @param commit mutator
   * @returns void
   * */
  async refreshUser({ commit }) {
    let user = localStorage.getItem("user-data");
    let localUserData = JSON.parse(user);
    commit("SET_USER", localUserData);
  },

  /**
   * Log Out
   * @param commit mutator
   * @returns void
   * */
  async loggedOut({ commit }) {
    localStorage.removeItem("user-data");
    console.log(localStorage.getItem("user-data"));
    commit("SET_USER", {});
  },
};

const auth = {
  namespaced: true,
  state: states,
  mutations: setters,
  getters: getters,
  actions: actions,
};

export default auth;
