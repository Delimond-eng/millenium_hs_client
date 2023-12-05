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
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hostoId = user.hopital.id;
    try {
      let { data, status } = await get(`/configs.all/${hostoId}`);
      if (status === 200) {
        commit("SET_CONFIGS", data.configs);
      } else return {};
    } catch (error) {
      return {};
    }
  },

  /**
   * Afficher la liste des emplacements
   */
  async viewAllEmplacements({ commit }) {
    try {
      let user = JSON.parse(localStorage.getItem("user-data"));
      let hopitalId = user.hopital.id;
      let { data, status } = await get(`/emplacements.all/${hopitalId}`);
      if (status === 200) {
        commit("SET_EMPLACEMENTS", data.emplacements);
        return data.emplacements;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  /**
   * CREATE EMPLACEMENTS
   */
  async createEmplacement(context, form) {
    try {
      let { data, status } = await post("/emplacements.create", form);
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
   * Afficher la liste de tous les agents
   */
  async viewAllAgents({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hostoId = user.hopital.id;
    try {
      let { data, status } = await get(`/agents.all/${hostoId}`);
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
   * CREATE NEW AGENT
   * @param {*} context
   * @param {*} form
   * @returns
   */
  async createAgent(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hostoId = user.hopital.id;
    /* let locationId = user.hopital.emplacement.id; */
    form.hopital_id = hostoId;
    try {
      let { data, status } = await post("/agents.create", form);
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
   * CREATE NEW OR OLD PATIENT
   */
  async createPatient(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hostoId = user.hopital.id;
    let locationId = user.hopital.emplacement.id;
    form.hopital_id = hostoId;
    form.emplacement_id = locationId;
    try {
      let { data, status } = await post("/patients.create", form);
      console.log("new", data);
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
    let user = JSON.parse(localStorage.getItem("user-data"));
    //let hostoId = user.hopital.id;
    let locationId = user.hopital.emplacement.id;
    try {
      let { data, status } = await get(`/patients.all/${locationId}`);
      if (status === 200) {
        commit("SET_PATIENTS", data.patients);
        return data.patients;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  /**
   * Voir les patients assignés à un médecins
   * */
  async viewPatientsPending({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let agentId = user.agent_id;
    /* let hostoId = user.hopital.id; */
    let locationId = user.hopital.emplacement.id;
    try {
      let { data, status } = await get(`/patients.pending/${locationId}`);
      if (status === 200) {
        commit("SET_PATIENTS_PENDING", data.patients);
        return data.patients;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  /**
   * GET RECENT PATIENTS LIST
   * */
  async viewRecentPatients({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let locationId = user.hopital.emplacement.id;
    try {
      let { data, status } = await get(`/patients.all/${locationId}`);
      if (status === 200) {
        commit("SET_RECENT_PATIENTS", data.patients);
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

  async assignPatient(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    form.hopital_id = user.hopital.id;
    form.emplacement_id = user.hopital.emplacement.id;
    try {
      let { data, status } = await post("/patients.assign", form);
      console.log("new", data);
      if (status === 200) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  async saveConsult(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    form.hopital_id = user.hopital.id;
    form.emplacement_id = user.hopital.emplacement.id;
    try {
      let { data, status } = await post("/consultations.create", form);
      if (status === 200) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  async addPrescriptions(context, form) {
    try {
      let { data, status } = await post("/prescriptions.add", form);
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
   * CREATE EMPLACEMENTS
   */
  async addConfig(context, form) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    form.hopital_id = user.hopital.id;
    let key = form.key;
    let url = "";
    switch (key) {
      case "services":
        url = "/configs.services";
        break;
      case "fonctions":
        url = "/configs.fonctions";
        break;
      case "grades":
        url = "/configs.grades";
        break;
    }
    try {
      let { data, status } = await post(url, form);
      if (status === 200) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  async viewAllConsults({ commit }) {
    let user = JSON.parse(localStorage.getItem("user-data"));
    let hopital_id = user.hopital.id;
    let emplacement_id = user.hopital.emplacement.id;
    try {
      let { data, status } = await get(
        `/consultations.all/${hopital_id}/${emplacement_id}`
      );
      if (status === 200) {
        commit("SET_CONSULTATIONS", data.consultations);
        return data.consultations;
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
