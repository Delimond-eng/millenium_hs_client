import LoginScreen from "@/template/view/screens/auth/login";
import HomeMain from "@/template/view/main";

/* Home children/pages */
import Dashboard from "@/template/view/screens/public/home_screen";
import HomeModule from "@/template/view/screens/public/home_modules";

/**
 * Config routes pages
 */
import ConfigExamensPage from "@/template/view/pages/labo_manage_pages/examens_config_page.vue";
import ConfigLabosPage from "@/template/view/pages/labo_manage_pages/labo_config_page.vue";

/**
 * SERVICES
 */
import ServiceManagerPage from "@/template/view/pages/service_manage_pages/service_config_page";
import PharmacieManagerPage from "@/template/view/pages/service_manage_pages/pharmacie_pages/pharmacie_landing_page";

/* patient manage pages */
import PatientCreatePage from "@/template/view/pages/patient_manage_pages/patient_create_page";
import PatientListPage from "@/template/view/pages/patient_manage_pages/patient_list_page";
import PatientDocMedPage from "@/template/view/pages/consult_manage_pages/patient_doc_med_page";

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

/*Hospitalisation manage*/
import HospitalisationHome from "@/template/view/pages/hospitalisation_manage_pages/home_view";
import BedTab from "@/template/view/pages/hospitalisation_manage_pages/tabs/beds_tab";
import FacturationTab from "@/template/view/pages/hospitalisation_manage_pages/tabs/facturation_tab";
import HospitalisationTab from "@/template/view/pages/hospitalisation_manage_pages/tabs/hospitalisations_tab";
import TransfertTab from "@/template/view/pages/hospitalisation_manage_pages/tabs/transferts_tab";
import SettingTab from "@/template/view/pages/hospitalisation_manage_pages/tabs/config_tab";

//Config or Setting App Routes
import ConfigHome from "@/template/view/pages/config_manage_pages/home_view";
import EmplacementsTab from "@/template/view/pages/config_manage_pages/tabs/emplacements_tab";
import ServicesTab from "@/template/view/pages/config_manage_pages/tabs/services_tab";
import FonctionsTab from "@/template/view/pages/config_manage_pages/tabs/fonctions_tab";
import FacturationsTab from "@/template/view/pages/config_manage_pages/tabs/facturations_tab";

/**
 * Pages qui gerent le cas d'urgence
 */
import PremierSoinsPage from "@/template/view/pages/urgence_manage_pages/premier_soins_page";
const routes = [
  {
    path: "/",
    component: LoginScreen,
    name: "login",
  },
  {
    path: "/home/modules",
    component: HomeModule,
    name: "modules",
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
        path: "/admin/labo/config/examens",
        component: ConfigExamensPage,
        name: "admin-config-examens",
      },
      {
        path: "/admin/labo/config",
        component: ConfigLabosPage,
        name: "admin-config-labos",
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

      {
        path: "/home/patients/docs",
        component: PatientDocMedPage,
        name: "patient-docs",
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
      {
        path: "/home/hospitalisations.manage",
        component: HospitalisationHome,
        name: "hospitalisation-home",
        redirect: { name: "bed-tab" },
        children: [
          {
            path: "",
            component: BedTab,
            name: "bed-tab",
          },
          {
            path: "/home/hospitalisations.manage/hospitalisations",
            component: HospitalisationTab,
            name: "hospitalisation-tab",
          },
          {
            path: "/home/hospitalisations.manage/hospitalisations",
            component: TransfertTab,
            name: "transfert-tab",
          },
          {
            path: "/home/hospitalisations.manage/facturations",
            component: FacturationTab,
            name: "facturation-tab",
          },
          {
            path: "/home/hospitalisations.manage/settings",
            component: SettingTab,
            name: "setting-tab",
          },
        ],
      },
      {
        path: "/admin/config/all",
        component: ConfigHome,
        name: "settings-app",
        redirect: { name: "emplacements-config-tab" },
        children: [
          {
            path: "",
            component: EmplacementsTab,
            name: "emplacements-config-tab",
          },
          {
            path: "/admin/config/services",
            component: ServicesTab,
            name: "services-config-tab",
          },
          {
            path: "/admin/config/fonctions",
            component: FonctionsTab,
            name: "fonctions-config-tab",
          },
          {
            path: "/admin/config/facturations",
            component: FacturationsTab,
            name: "facturations-config-tab",
          },
        ],
      },
      {
        path: "/home/premiers_soins",
        component: PremierSoinsPage,
        name: "premiers-soins",
      },
    ],
  },
];
export default routes;
