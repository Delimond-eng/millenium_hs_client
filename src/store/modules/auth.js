import { post } from "@/http";

/*
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
   * Utilisateur Login
   * @author Dev.GastonDelimond
   * @param {context vuex} context,
   * @param {*} form,
   * @returns HttpResponse
   * */
  async login(context, form) {
    try {
      let { data, status } = await post("/login", form);
      if (status === 200) {
        console.log(JSON.stringify(data.user));
        if (data.errors === undefined) {
          localStorage.clear();
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
   * Utilisateur Login
   * @author Dev.GastonDelimond
   * @param {context vuex} context,
   * @param {*} form,
   * @returns HttpResponse
   * */
  async register(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    form.created_by = user.id;
    try {
      let { data, status } = await post("/users.store", form);
      if (status === 200) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  /**
   * CREATE NEW HOSPITAL, DEFAULT USER ADMIN, AND DEFAULT LOCATION
   * @author Dev.GastonDelimond
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
   * Refresh logged In User
   * @author Dev.GastonDelimond
   * @param {Vuex} commit
   * @returns void
   * */
  async refreshUser({ commit }) {
    let user = localStorage.getItem("user-data");
    let localUserData = JSON.parse(user);
    commit("SET_USER", localUserData);
  },

  /**
   * Log Out
   * @author Dev.GastonDelimond
   * @param {Vuex} commit
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
