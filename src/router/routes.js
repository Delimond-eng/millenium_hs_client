import LoginScreen from "@/template/view/screens/auth/login";
import HomeMain from "@/template/view/main";

/* Home children/pages */
import Dashboard from "@/template/view/screens/public/home_screen";

/* patient manage pages */
import PatientCreatePage from "@/template/view/pages/patient_manage_pages/patient_create_page";
import PatientListPage from "@/template/view/pages/patient_manage_pages/patient_list_page";
import PatientAssignPage from "@/template/view/pages/patient_manage_pages/patient_assign_page";

/* medecin manage pages */
import MedCreatePage from "@/template/view/pages/medecin_manage_pages/med_create_page";
import MedListPage from "@/template/view/pages/medecin_manage_pages/med_list_page";

/* consult manage pages */
import ConsultCreatePage from "@/template/view/pages/consult_manage_pages/consult_create_page";
import ConsultListPage from "@/template/view/pages/consult_manage_pages/consults_list_page";

/* prescription manage pages */
import PrescriptionCreatePage from "@/template/view/pages/prescription_manage_pages/presc_create_page";
import PrescriptionListPage from "@/template/view/pages/prescription_manage_pages/presc_list_page";
const routes = [
  {
    path: "/",
    component: LoginScreen,
  },
  {
    path: "/home",
    component: HomeMain,
    name: "home",
    redirect: { name: "dash" },
    children: [
      {
        path: "/home/dash",
        component: Dashboard,
        name: "dash",
      },

      /* patient routes */
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
      {
        path: "/home/patients/assign",
        component: PatientAssignPage,
        name: "patient-assign",
      },

      /* medecins routes */
      {
        path: "/home/med/create",
        component: MedCreatePage,
        name: "med-create",
      },
      {
        path: "/home/meds/list",
        component: MedListPage,
        name: "med-list",
      },

      /* consult manage page */
      {
        path: "/home/consult/create",
        component: ConsultCreatePage,
        name: "consult-create",
      },
      {
        path: "/home/consults/list",
        component: ConsultListPage,
        name: "consult-list",
      },

      /* prescription routes */
      {
        path: "/home/prescription/create",
        component: PrescriptionCreatePage,
        name: "prescription-create",
      },
      {
        path: "/home/prescriptions/list",
        component: PrescriptionListPage,
        name: "prescriptions-list",
      },
    ],
  },
];
export default routes;
