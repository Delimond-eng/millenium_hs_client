import LoadButton from "./src/load_button";
import LoadState from "./src/load_state";
import BsToast from "./src/alert_message";
import StateEmpty from "./src/state_empty";
import SVGLoading from "./src/loading_svg";
import Loader from "./src/loader";
import CustomDatatable from "./src/custom_datatable.vue";
import QrcodeBuilder from "./src/qrcode_builder.vue";
import AutoComplete from "./src/autocomplete.vue";
import CustomSelect2 from "./src/custom_select2.vue";
export default {
  install: (app, opt) => {
    app.component("load-button", LoadButton);
    app.component("load-state", LoadState);
    app.component("bs-toast", BsToast);
    app.component("svg-loading", SVGLoading);
    app.component("loader", Loader);
    app.component("state-empty", StateEmpty);
    app.component("custom-table", CustomDatatable);
    app.component("qrcode-builder", QrcodeBuilder);
    app.component("autocomplete", AutoComplete);
    app.component("select2", CustomSelect2);
  },
};
