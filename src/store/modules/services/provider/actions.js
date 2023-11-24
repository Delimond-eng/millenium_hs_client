import { get, post } from "@/http";

export default {
  /**
   * GET UNIQUE ALPHANUMERIC CODE
   */
  async showCode() {
    let { data, status } = await get("/code");
    if (status === 200) {
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
        console.log(JSON.stringify(data));
        commit("SET_AGENTS", data.agents);
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
