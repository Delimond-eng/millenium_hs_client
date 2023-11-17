import { createStore } from "vuex";
import { get } from "@/http";

/*modules imports*/
import auth from "./modules/auth";

/*Crée un store central global qui permet d'ajouter des tiers modules */

const store = createStore({
  modules: {
    auth: auth,
  },

  actions: {},
});

export default store;
