export default {
  SET_CONFIGS: (state, data) => {
    state.configs = data;
  },
  SET_AGENTS: (state, data) => (state.agents = data),
  SET_CODE: (state, data) => (state.rcode = data),
  SET_PATIENTS: (state, data) => (state.patients = data),
  SET_RECENT_PATIENTS: (state, data) => (state.recentpatients = data),
  SET_CONSULTATIONS: (state, data) => (state.consultations = data),
  SET_EMPLACEMENTS: (state, data) => (state.emplacements = data),
  SET_PATIENTS_PENDING: (state, data) => (state.patients_pending = data),
};
