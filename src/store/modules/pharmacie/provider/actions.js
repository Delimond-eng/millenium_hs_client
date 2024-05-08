import { get, post } from "@/http";

export default {
  /**
   * Creation des produits
   */
  async createPharmacie(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacies.create", form);
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
   * Voir toutes les categories pour une pharmacie
   */
  async allConfigs({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    let pharmacie_id = user.pharmacie.id;
    try {
      let { data, status } = await get(
        `/pharmacie.config.all/${hopital_id}/${pharmacie_id}`
      );
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
   * View last stocks info
   * @param data Object
   */
  async viewStockInfo(context, payload) {
    try {
      let { data, status } = await get(
        `/pharmacie.stock.infos/${payload.produit_id}/${payload.pharmacie_id}`
      );
      console.log(JSON.stringify(data));
      if (status === 200) {
        if (data.status === "success") {
          return data.info;
        }
        return null;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  /**
   * View all users
   * @param data Object
   */
  async viewAllUsers({ commit }) {
    try {
      let { data, status } = await get(`/pharmacie.users`);
      console.log(JSON.stringify(data));
      if (status === 200) {
        if (data.status === "success") {
          commit("SET_USERS", data.users);
          return data.users;
        }
        return null;
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

  /**
   * AJouter le prix à un produit
   */
  async addPrice(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.product.addprices", form);
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
   * AJouter le prix à un produit
   */
  async addStock(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.stock.add", form);
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
   * Create operation
   * @param {*} form
   * @param {*} context
   */
  async createOperation(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    form.created_by = user.id;
    try {
      let { data, status } = await post("/pharmacie.operation.create", form);
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
   * Voir tous les produits mises en  vente par une pharmacie
   */
  async viewPharmacieProducts({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let pharmacieId = 2; /* user.pharmacie_id */
    try {
      let { data, status } = await get(`/pharmacie.produits/${pharmacieId}`);
      if (status === 200) {
        commit("SET_SELL_PRODUCTS", data.produits);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  /**
   * voir toutes les categories de produits
   */
  async viewAllCategories({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopitalId = 1; /* user.hopital_id */
    try {
      let { data, status } = await get(`/pharmacie.categories/${hopitalId}`);
      if (status === 200) {
        commit("SET_CATEGORIES", data.categories);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  /**
   * Ajouter un produit au panier
   */
  addToCart({ commit, state }, data) {
    if (data) {
      let item = {
        operation_qte: 1,
        produit_id: data.produit_id,
        produit_libelle: data.produit.produit_libelle,
        produit_prix: parseFloat(data.produit_prix),
        produit_devise: data.produit_prix_devise,
        produit_stocks: data.stock,
      };
      commit("SET_CART", item);
    } else {
      return;
    }
  },

  async checkClient({ commit }, payload) {
    try {
      let pharmacieId = 2;
      let { data, status } = await get(
        `/pharmacie.client/${pharmacieId}/${payload}`
      );
      if (status === 200) {
        commit("SET_CURRENT_CLIENT", data.client);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  async addClient({ commit }, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    form.created_by = 6;
    form.pharmacie_id = 2;
    try {
      let { data, status } = await post("/pharmacie.client.create", form);
      if (status === 200) {
        commit("SET_CURRENT_CLIENT", data.client);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  async createNewSell({ getters, state }) {
    try {
      const cart = getters.GET_CART;
      const client = getters.GET_CURRENT_CLIENT;
      const created_by = 6;
      const pharmacie_id = 2;

      // Préparation des données du formulaire
      const form = {
        cart_datas: cart.map((item) => ({
          ...item,
          created_by: created_by,
          pharmacie_id: pharmacie_id,
          client_id: client ? client.id : null,
        })),
      };

      // Envoi des données au serveur
      const { data, status } = await post("/pharmacie.sell", form);

      // Gestion de la réponse du serveur
      if (status === 200 && data.status !== undefined) {
        // Effacer le panier et les données client actuelles
        state.cart = [];
        state.client = null;
        return data;
      } else {
        return null;
      }
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la création de la vente :", error);
      return null;
    }
  },
};
