import store from "@/store";

export default {
  install: (app, opt) => {
    window.Swal = app.config.globalProperties.$swal;

    app.config.globalProperties.$hasPermission = (key) => {
      let user = store.getters["auth/GET_USER"];
      if (
        user.role.role.toLocaleLowerCase().includes(key.toLocaleLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    };
    app.config.globalProperties.$user = () => store.getters["auth/GET_USER"];
  },
};
