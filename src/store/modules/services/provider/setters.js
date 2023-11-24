export default {
  SET_CONFIGS: (state, data) => {
    state.configs = data;
    state.agents = data;
  },
  SET_AGENTS: (state, data) => (state.agents = data),
};
