import LoadButton from "./src/load_button";
export default {
  install: (app, opt) => {
    app.component("load-button", LoadButton);
  },
};
