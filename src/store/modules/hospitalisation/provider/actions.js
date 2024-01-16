import { get, post } from "@/http";
export default {
  /**
   * Créer un nouveau lit
   * @author Dev.GastonDelimond
   * @param {Vuex} context
   * @param {*} form
   * @returns HttpResponse
   */
  async addBed(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let emplacementId = user.hopital.emplacement.id;
    form.hopital_emplacement_id = emplacementId;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/lit.create", form);
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
   *Créer une nouvelle hospitalisation
   * @author Dev.GastonDelimond
   * @param {Vuex} context
   * @param {*} form
   * @returns HttpResponse
   */
  async addHospitalisation(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let emplacementId = user.hopital.emplacement.id;
    form.hopital_emplacement_id = emplacementId;
    form.created_by = user.id;
    try {
      let { data, status } = await post("/hospitalisation.create", form);
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
   *Effectuer un transfert de lit
   * @author Dev.GastonDelimond
   * @param {Vuex} context
   * @param {*} form
   * @returns HttpResponse
   */
  async transfererLit(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let emplacementId = user.hopital.emplacement.id;
    form.hopital_emplacement_id = emplacementId;
    form.created_by = user.id;
    try {
      let { data, status } = await post(
        "/hospitalisation.make.transfert",
        form
      );
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
  async viewAllDatas({ commit, dispatch }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let emplacementId = user.hopital.emplacement.id;
    try {
      dispatch("services/triggerLoading", true);
      let { data, status } = await get(
        `/hospitalisations.all/${emplacementId}`
      );
      dispatch("services/triggerLoading", false);
      if (status === 200) {
        commit("SET_ALL_DATAS", data);
        return data;
      } else return [];
    } catch (error) {
      console.log(error);
      dispatch("services/triggerLoading", false);
      return [];
    }
  },
};
