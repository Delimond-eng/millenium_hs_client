export default {
  SET_CONFIGS: (state, data) => {
    state.configs = data;
    state.agents = data;
  },
  SET_AGENTS: (state, data) => (state.agents = data),
  SET_CODE: (state, data) => (state.rcode = data),
  SET_PATIENTS: (state, data) => (state.patients = data),
};
