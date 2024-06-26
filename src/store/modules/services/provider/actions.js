import {get, post } from "@/http";

export default {
    triggerLoading({ commit }, val) {
        commit("SET_LOADING", val);
    },

    /**
     * Envoie un code unique pour le patient
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @returns HttpResponse
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
     * Afficher les differentes configurations(roles, services, grades, fonctions...)
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @returns HttpResponse
     */
    async showConfigs({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let hostoId = user.hopital.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/configs.all/${hostoId}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_CONFIGS", data.configs);
            } else return {};
        } catch (error) {
            dispatch("triggerLoading", false);
            return {};
        }
    },

    /**
     * Afficher la liste des emplacements
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @returns HttpResponse
     */
    async viewAllEmplacements({ commit, dispatch }) {
        try {
            let user = JSON.parse(localStorage.getItem("user-data"));
            let hopitalId = user.hopital.id;
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/emplacements.all/${hopitalId}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_EMPLACEMENTS", data.emplacements);
                return data.emplacements;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    /**
     * Créer un emplacement pour un hopital
     * @author Dev.GastonDelimond
     * @param {Vuex} context
     * @param {*} form
     * @returns HttpResponse
     */
    async createEmplacement(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.created_by = user.id;
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
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @returns HttpResponse
     */
    async viewAllAgents({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let hostoId = user.hopital.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/agents.all/${hostoId}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_AGENTS", data.agents);
                return data.agents;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    /**
     * CREATE NEW AGENT
     * @author Dev.GastonDelimond
     * @param {*} context
     * @param {*} form
     * @returns
     */
    async createAgent(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let hostoId = user.hopital.id;
        form.created_by = user.id;
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
     * Creation d'un nouveau patient
     * @author Dev.GastonDelimond
     * @param {*} context
     * @param {*} form
     * @returns HttpResponse
     */
    async createPatient(context, form) {
        console.log(JSON.stringify(form));
        let user = JSON.parse(localStorage.getItem("user-data"));
        let hostoId = user.hopital.id;
        let locationId = user.hopital.emplacement.id;
        form.hopital_id = hostoId;
        form.emplacement_id = locationId;
        form.created_by = user.id;
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
     * Afficher la liste de tous les patients
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @returns HttpResponse
     */
    async viewAllPatients({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        //let hostoId = user.hopital.id;
        let locationId = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/patients.all/${locationId}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_PATIENTS", data.patients);
                return data.patients;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    /**
     * Afficher les patients en attente de consultation
     * @author Dev.GastonDelimond
     * @param {Vuex} commit
     * @returns HttpResponse
     * */
    async viewPatientsPending({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let agentId = user.agent_id;
        /* let hostoId = user.hopital.id; */
        let locationId = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/patients.pending/${locationId}`);
            dispatch("triggerLoading", false);
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
     * Afficher les patients sous traitements
     * @author Dev.GastonDelimond
     * @param {Vuex} commit
     * @returns HttpResponse
     * */
    async viewPatientsSousTraitement({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let agentId = user.agent_id;
        /* let hostoId = user.hopital.id; */
        let locationId = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/patients.sous_traitement/${locationId}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_PATIENTS_SOUS_TRAITEMENT", data.patients);
                return data.patients;
            } else return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    /**
     * Afficher la liste des patients recents
     * @author Dev.GastonDelimond
     * @param {Vuex} commit
     * @returns HttpResponse
     * */
    async viewRecentPatients({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let locationId = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/patients.all/${locationId}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_RECENT_PATIENTS", data.patients);
                return data.patients;
            } else return [];
        } catch (error) {
            dispatch("triggerLoading", false);
            console.log(error);
            return [];
        }
    },

    /**
     * Afficher un patient spécifique
     * @author Dev.GastonDelimond
     * @param {*} context
     * @param {*} id
     * @returns HttpResponse
     */
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

    /**
     * Créer une nouvelle consultation
     * @author Dev.GastonDelimond
     * @param {*} context
     * @param {*} form
     * @returns HttpResponse
     */
    async saveConsult(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.hopital_id = user.hopital.id;
        form.emplacement_id = user.hopital.emplacement.id;
        form.created_by = user.id;
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

    /**
     * Ajouter les prescriptions
     * @author Dev.GastonDelimond
     * @param {*} context
     * @param {*} form
     * @returns HttpResponse
     */
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
     * Ajouter les examens à une consultation en cours
     * @author Dev.GastonDelimond
     * @param {*} context
     * @param {*} form
     * @returns HttpResponse
     */
    async addExamens(context, form) {
        let formData = {
            examens: form,
        };
        try {
            let { data, status } = await post(`/examens.add`, formData);
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
     * AJOUTE UNE CONFIGURATION SUR PLUSIEURS NIVEAUX
     * @author Dev.GastonDelimond
     * @param {*} context
     * @param {*} form
     * @returns HttpResponse
     */
    async addConfig(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.hopital_id = user.hopital.id;
        form.created_by = user.id;
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
            case "roles":
                url = "/configs.roles";
                break;
            case "examens":
                url = "/configs.examens";
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

    /**
     * Config fonction
     * @param form
     * @returns HttpResponse
     */
    async addFonctions(context, form) {
        try {
            let { data, status } = await post("/configs.fonctions", form);
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
     * Config facturations
     * @param form
     * @return HttpResponse
     */
    async configFacturation(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.hopital_id = user.hopital.id;
        form.created_by = user.id;
        try {
            let { data, status } = await post("/configs.facturations", form);
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
     * View patient medical Docs
     * @param patientId
     * @return HttpResponse
     */
    async viewMedicDocs({ commit }, patientID) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let hopitalID = user.hopital.id;
        try {
            let { data, status } = await get(
                `/medical.docs/${patientID}/${hopitalID}`
            );
            if (status === 200) {
                commit("SET_PATIENT_DOCS", data.dossiers);
                return data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },

    async viewFacturations({ commit, dispatch }, key) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let emplacement_id = user.hopital.emplacement.id;
        try {
            if (key === "all") {
                dispatch("triggerLoading", true);
                let { data, status } = await get(
                    `/configs.facturations/all/${user.hopital.id}`
                );
                dispatch("triggerLoading", false);
                if (status === 200) {
                    commit("SET_ALL_FACTURATIONS", data.results);
                    return data.results;
                } else return [];
            } else {
                dispatch("triggerLoading", true);
                let { data, status } = await get(
                    `/configs.facturations/emplacement/${emplacement_id}`
                );
                dispatch("triggerLoading", false);
                if (status === 200) {
                    commit("SET_SITE_FACTURATIONS", data.results);
                    return data.results;
                } else return [];
            }
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },
    /**
     * Afficher la liste des consultations pour un emplacements
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @param {*} form
     * @returns HttpResponse
     */
    async viewAllConsults({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let hopital_id = user.hopital.id;
        let emplacement_id = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/consultations.all/${emplacement_id}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_CONSULTATIONS", data.consultations);
                return data.consultations;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    async viewAllConsultsExamens({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let emplacement_id = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/consult.examens/${emplacement_id}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_ALL_EXAMENS", data.examens);
                return data.examens;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    async viewAllLaboExamensPendings({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let emplacement_id = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/labo.examens/${emplacement_id}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_LABO_EXAMENS", data.examens);
                return data.examens;
            } else return [];
        } catch (error) {
            dispatch("triggerLoading", false);
            console.log(error);
            return [];
        }
    },

    async viewAllPrescriptionsPendings({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let emplacement_id = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(
                `/prescriptions.pending/${emplacement_id}`
            );
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_PENDING_PRESCRIPTIONS", data.prescriptions);
                return data.prescriptions;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    /**
     * Créer une nouvelle pharmacie
     * @author Dev.GastonDelimond
     * @param {Vuex} context
     * @param {*} form
     * @returns HttpResponse
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
     * Voir la liste de toutes les pharmacies pour un hopital
     * @author Dev.GastonDelimond
     * @param {Vuex} context
     * @returns HttpResponse
     */

    async viewAllPharmacies({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let hopital_id = user.hopital.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/pharmacies.all/${hopital_id}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_PHARMAS", data.pharmacies);
                return data.pharmacies;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    /**
     * Voir la liste de toutes les pharmacies pour un emplacement lié à un hopital
     * @author Dev.GastonDelimond
     * @param {Vuex} context
     * @returns HttpResponse
     */
    async viewAllPharmaciesByEmplacement({ commit }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let emplacement_id = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(
                `/pharmacies.emplacement/${emplacement_id}`
            );
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_EMPLACEMENT_PHARMAS", data.pharmacies);
                return data.pharmacies;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    /**
     * Afficher la liste des examens pour un emplacements
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @returns HttpResponse
     */
    async viewAllExamens({ commit, dispatch }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let emplacement_id = user.hopital.emplacement.id;
        try {
            dispatch("triggerLoading", true);
            let { data, status } = await get(`/examens.all/${emplacement_id}`);
            dispatch("triggerLoading", false);
            if (status === 200) {
                commit("SET_EXAMENS", data.examens);
                return data.examens;
            } else return [];
        } catch (error) {
            console.log(error);
            dispatch("triggerLoading", false);
            return [];
        }
    },

    /**
     * Valider une demande des examens en cours
     * @author Dev.GastonDelimond
     * @param {*} commit
     * @returns HttpResponse
     */

    async validateDemandeExam({ dispatch }, consult_id) {
        try {
            let { data, status } = await post(`/examen.validate/${consult_id}`);
            if (status === 200) {
                dispatch("viewAllConsultsExamens");
                return data;
            } else null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async validatePrescription({ dispatch }, consult_id) {
        try {
            let { data, status } = await post(`/prescription.validate/${consult_id}`);
            if (status === 200) {
                dispatch("viewAllPrescriptionsPendings");
                return data;
            } else null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async showExamDetails(context, consult_id) {
        try {
            let { data, status } = await get(`/examen.detail/${consult_id}`);
            if (status === 200) {
                return data;
            } else null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async showPrescriptionDetails(context, consult_id) {
        try {
            let { data, status } = await get(`/prescription.details/${consult_id}`);
            if (status === 200) {
                return data;
            } else null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    /**
     * Créer un rendez-vous medical
     * @author Dev.GastonDelimond
     * @param {Vuex} context
     * @param {*} form
     * @returns HttpResponse
     */
    async createSchedule(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.hopital_emplacement_id = user.hopital.emplacement.id;
        form.created_by = user.id;
        try {
            let { data, status } = await post("/schedule.create", form);
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
     * Voir les rendez-vous medicaux
     * @author Dev.GastonDelimond
     * @param {Vuex} context
     * @param {*} form
     * @returns HttpResponse
     */
    async viewSchedules({ commit }) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        let emplacement_id = user.hopital.emplacement.id;
        try {
            let { data, status } = await get(`/schedules.all/${emplacement_id}`);
            if (status === 200) {
                commit("SET_SCHEDULES", data.schedules);
                return data.schedules;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },

    /**
     * Creation des premiers soins administrés
     * @param {Vuex} context,
     * @param {*} form
     * @returns HttpResponse
     */
    async createPremiersoins(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.hopital_emplacement_id = user.hopital.emplacement.id;
        form.agent_id = user.agent_id;
        form.created_by = user.id;
        try {
            let { data, status } = await post("/premiersoins.create", form);
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
     * Voir le dossier medical
     */
    async viewPatientDoc({ commit }, patientId) {
        try {
            let { data, status } = await get(`/patient.story/${patientId}`);
            console.log(JSON.stringify(data.result));
            if (status === 200) {
                commit("SET_PATIENT_DOC", data.result);
                return data.result;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },

    /**
     * Créer le transfert d'un patient
     */
    async createTransfert(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.hopital_emplacement_id = user.hopital.emplacement.id;
        form.agent_id = user.agent_id;
        form.created_by = user.id;
        try {
            let { data, status } = await post("/transfert.create", form);
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
     * Créer le paiement
     */
    async createPaiement(context, form) {
        let user = JSON.parse(localStorage.getItem("user-data"));
        form.hopital_id = user.hopital.id;
        form.hopital_emplacement_id = user.hopital.emplacement.id;
        form.created_by = user.id;
        try {
            let { data, status } = await post("/paiement.create", form);
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
     * Voir les traitements pour un patient dont la consultation est en cours
     */
    async showTraitements(context, payload) {
        try {
            let { data, status } = await get(`/traitements.show/${payload}`);
            if (status === 200) {
                return data.prescriptions;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    },

    /**
     * Create suivi patient
     */
    async createSuivi(context, form) {
        try {
            let { data, status } = await post("/traitements.make", form);
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