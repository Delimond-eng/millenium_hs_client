import states from "./provider/states";
import setters from "./provider/setters";
import getters from "./provider/getters";
import actions from "./provider/actions";

const pharmacieModule = {
  namespaced: true,
  state: states,
  mutations: setters,
  getters: getters,
  actions: actions,
};

export default pharmacieModule;
