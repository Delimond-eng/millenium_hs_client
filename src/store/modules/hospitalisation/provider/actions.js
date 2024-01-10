import { get, post } from "@/http";
export default {
  /**
   * Créer un nouveau labo
   * @author Dev.GastonDelimond
   * @param {Vuex} context
   * @param {*} form
   * @returns HttpResponse
   */
  async createLabo(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    form.hopital_id = hopital_id;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/labo.create", form);
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
   * Voir les labo de l'hopital
   * @author Dev.GastonDelimond
   * @param {Vuex} context
   * @param {*} form
   * @returns HttpResponse
   */
  async viewAllDatas({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let emplacementId = user.hopital.emplacement.id;
    try {
      let { data, status } = await get(
        `/hospitalisations.all/${emplacementId}`
      );
      if (status === 200) {
        commit("SET_ALL_DATAS", data);
        return data;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
