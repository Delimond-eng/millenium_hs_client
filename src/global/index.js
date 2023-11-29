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

    app.config.globalProperties.formatDate = (timestamp) => {
      // Créer un nouvel objet Date avec le timestamp (en millisecondes)
      let date = new Date(timestamp * 1000);
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      let hours = ("0" + date.getHours()).slice(-2);
      let minutes = ("0" + date.getMinutes()).slice(-2);
      let seconds = ("0" + date.getSeconds()).slice(-2);
      let formattedDate = ` ${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    };

    app.config.globalProperties.$closeBsModal = (modalId) => {
      $(`#${modalId}`).modal("hide");
    };
    app.config.globalProperties.$showBsModal = (modalId) => {
      $(`#${modalId}`).modal("show");
    };
  },
};
