import store from "@/store";

export default {
  install: (app, opt) => {
    window.Swal = app.config.globalProperties.$swal;

    app.config.globalProperties.$baseURL = location.href.includes(".com")
      ? "http://backend.hospital.milleniumhorizon.com/api"
      : "http://127.0.0.1:8000/api";
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

    app.config.globalProperties.$isAccessMenu = (menuName) => {
      store.dispatch("auth/refreshUser");
      let user = store.getters["auth/GET_USER"];
      let myList = [];
      console.log("user menus", user.menus);
      if (user.menus !== undefined) {
        myList = user.menus.split(",");
      }
      let searchString = menuName.toLowerCase();
      if (myList.find((item) => item.toLowerCase().includes(searchString))) {
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
