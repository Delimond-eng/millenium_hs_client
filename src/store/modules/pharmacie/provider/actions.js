import { get, post } from "@/http";

export default {
  /**
   * Voir toutes les pharmacies pour un hopital
   */
  async allPharmacies() {},

  /**
   * Voir toutes les categories pour une pharmacie
   */
  async allConfigs({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    try {
      let { data, status } = await get(`/pharmacie.config.all/${hopital_id}`);
      if (status === 200) {
        commit("SET_CONFIG", data.datas);
        return data.datas;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  /**
   * Créer un nouveau fournisseur
   * @param {*} form
   */
  async createFournisseur(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.create.fournisseur", form);
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
   * Creation categorie
   */
  async createCategorie(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.create.category", form);
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
   * Creation des types
   */
  async createType(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.create.type", form);
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
   * Creation des unites des produits
   */
  async createUnite(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.create.unite", form);
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
   * Creation des produits
   */
  async createProduct(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.create.product", form);
      if (status === 200) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
};
