import { get, post } from "@/http";

export default {
  /**
   * GET UNIQUE ALPHANUMERIC CODE
   */
  async showCode({ commit }) {
    let { data, status } = await get("/code");
    if (status === 200) {
      commit("SET_CODE", data.code);
      return data.code;
    }
    return "";
  },
  /**
   * Afficher les options de la configuration !
   */
  async showConfigs({ commit }) {
    try {
      let { data, status } = await get("/configs.all");
      if (status === 200) {
        commit("SET_CONFIGS", data.configs);
      } else return {};
    } catch (error) {
      return {};
    }
  },

  /**
   * Afficher la liste de tous les agents
   */
  async viewAllAgents({ commit }) {
    try {
      let { data, status } = await get("/agents.all");
      if (status === 200) {
        commit("SET_AGENTS", data.agents);
        return data.agents;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  /**
   * CREATE NEW OR OLD PATIENT
   */
  async createPatient(context, form) {
    try {
      let { data, status } = await post("/patients.create", form);
      console.log(data);
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
   * GET PATIENTS LIST
   */
  async viewAllPatients({ commit }) {
    try {
      let { data, status } = await get("/patients.all");
      if (status === 200) {
        commit("SET_PATIENTS", data.patients);
        return data.patients;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async showPatient(context, id) {
    try {
      let { data, status } = await get(`/patient.show/${id}`);
      if (status === 200) {
        return data.patient;
      } else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
