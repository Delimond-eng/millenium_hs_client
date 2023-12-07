import LoginScreen from "@/template/view/screens/auth/login";
import HomeMain from "@/template/view/main";

/* Home children/pages */
import Dashboard from "@/template/view/screens/public/home_screen";

/**
 * Config routes pages
 */
import ConfigLocationsPage from "@/template/view/pages/config_manage_pages/location_config_page";
import ConfigExamensPage from "@/template/view/pages/config_manage_pages/examens_config_page";

/**
 * SERVICES
 */
import ServiceManagerPage from "@/template/view/pages/service_manage_pages/service_config_page";
import PharmacieManagerPage from "@/template/view/pages/service_manage_pages/pharmacie_pages/pharmacie_landing_page";

/* patient manage pages */
import PatientCreatePage from "@/template/view/pages/patient_manage_pages/patient_create_page";
import PatientListPage from "@/template/view/pages/patient_manage_pages/patient_list_page";

/* medecin manage pages */
import AgentCreatePage from "@/template/view/pages/agent_manage_pages/agent_create_page";
import AgentListPage from "@/template/view/pages/agent_manage_pages/agent_list_page";

/* consult manage pages */
import ConsultCreatePage from "@/template/view/pages/consult_manage_pages/consult_create_page";
import ConsultListPage from "@/template/view/pages/consult_manage_pages/consults_list_page";

/* prescription manage pages */
import PrescriptionCreatePage from "@/template/view/pages/prescription_manage_pages/presc_create_page";
import PrescriptionListPage from "@/template/view/pages/prescription_manage_pages/presc_list_page";

/* invoices */
import FicheInvoice from "@/template/view/pages/invoices/fiche_medical_invoice";
const routes = [
  {
    path: "/",
    component: LoginScreen,
    name: "login",
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

      /**
       * COnfig routes
       */
      {
        path: "/admin/config/locations",
        component: ConfigLocationsPage,
        name: "config-locations",
      },
      {
        path: "/admin/config/services",
        component: ServiceManagerPage,
        name: "config-services",
      },
      {
        path: "/admin/config/examens",
        component: ConfigExamensPage,
        name: "config-examens",
      },
      {
        path: "/admin/manage/pharmacies",
        component: PharmacieManagerPage,
        name: "manage-pharmacies",
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

      /* medecins routes */
      {
        path: "/home/med/create",
        component: AgentCreatePage,
        name: "med-create",
      },
      {
        path: "/home/meds/list",
        component: AgentListPage,
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
      {
        path: "/home/invoice/fiche",
        component: FicheInvoice,
        name: "fiche-invoice",
      },
    ],
  },
];
export default routes;
