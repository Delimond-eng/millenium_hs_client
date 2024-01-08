import LoadButton from "./src/load_button";
import LoadState from "./src/load_state";
import BsToast from "./src/alert_message";
import StateEmpty from "./src/state_empty";
import SVGLoading from "./src/loading_svg";
export default {
    install: (app, opt) => {
        app.component("load-button", LoadButton);
        app.component("load-state", LoadState);
        app.component("bs-toast", BsToast);
        app.component("svg-loading", SVGLoading);
        app.component("state-empty", StateEmpty);
    },
};