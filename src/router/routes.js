import LoginScreen from "@/template/view/screens/auth/login";
import HomeMain from "@/template/view/main";

/* Home children/pages */
import Dashboard from "@/template/view/screens/public/home_screen";

const routes = [{
        path: "/",
        component: LoginScreen,
    },
    {
        path: "/home",
        component: HomeMain,
        redirect: { name: "dash" },
        children: [{
            path: "/home/dash",
            component: Dashboard,
            name: "dash",
        }, ],
    },
];
export default routes;