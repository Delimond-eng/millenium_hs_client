import { createStore } from "vuex";
import { get } from "@/http";

/*modules imports*/
import auth from "./modules/auth";
import services from "./modules/services";
import labo from "./modules/labo";
import hospitalisation from "./modules/hospitalisation";
import pharmacie from "./modules/pharmacie";

/*Crée un store central global qui permet d'ajouter des tiers modules */

const store = createStore({
  modules: {
    auth: auth,
    services: services,
    labo: labo,
    hospitalisation: hospitalisation,
    pharmacie: pharmacie,
  },

  actions: {},
});

export default store;
