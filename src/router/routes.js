import LoginScreen from "@/template/view/screens/auth/login";
import HomeMain from "@/template/view/main";

/* Home children/pages */
import Dashboard from "@/template/view/screens/public/home_screen";
import PatientCreatePage from "@/template/view/pages/patient_create_page";
import PatientListPage from "@/template/view/pages/patient_list_page";

const routes = [
  {
    path: "/",
    component: LoginScreen,
  },
  {
    path: "/home",
    component: HomeMain,
    redirect: { name: "dash" },
    children: [
      {
        path: "/home/dash",
        component: Dashboard,
        name: "dash",
      },
      {
        path: "/home/patient/create",
        component: PatientCreatePage,
        name: "patient-create",
      },
      {
        path: "/home/patients/list",
        component: PatientListPage,
        name: "patient-list",
      },
    ],
  },
];
export default routes;
