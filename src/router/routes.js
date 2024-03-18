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
import PremierSoinsListPage from "@/template/view/pages/urgence_manage_pages/premier_soins_list";
import TransfertPatientPage from "@/template/view/pages/transfert_manage_pages/home_view";

/**
 * Facturations & paiements
 */
import FacturesListPage from "@/template/view/pages/facturations_manage_pages/factures_list_page";
import FactureCreatePage from "@/template/view/pages/facturations_manage_pages/facture_create_page";

/**
 * Parteners managements
 */
import PartenersViewPage from "@/template/view/pages/partener_manage_pages/partener_list_page";

/**
 * Pharmacie manage
 */
import PharmacieCreate from "@/template/view/pages/pharmacie_module_pages/pharmacie_create.vue";
import PharmacieUsersManage from "@/template/view/pages/pharmacie_module_pages/users_manage.vue";
import PharmacieFournisseurManage from "@/template/view/pages/pharmacie_module_pages/fournisseurs_manage.vue";
import PharmacieCreateCategories from "@/template/view/pages/pharmacie_module_pages/categorie_create.vue";
import PharmacieCreateProducts from "@/template/view/pages/pharmacie_module_pages/product_create.vue";
import PharmacieOperationLanding from "@/template/view/pages/pharmacie_module_pages/operations_landing.vue";
import PharmacieOperationViewer from "@/template/view/pages/pharmacie_module_pages/operations_viewer.vue";
import ApprovisionnementCreate from "@/template/view/pages/pharmacie_module_pages/subpages/approv_create.vue";
import TransfertCreate from "@/template/view/pages/pharmacie_module_pages/subpages/transfert_create.vue";
import ClassementCreate from "@/template/view/pages/pharmacie_module_pages/subpages/classement_create.vue";
import RetourCreate from "@/template/view/pages/pharmacie_module_pages/subpages/retour_produit_create.vue";

//Pharmacie Home Seller Routes
import PharmacieHomeSellerApp from "./pharmacie_seller_app";

//DataTable Test
import DatatablesNet from "@/template/view/pages/datatables.net.vue";

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
      {
        path: "/home/datatables.net",
        component: DatatablesNet,
        name: "datatable-route",
      },

      {
        path: "/home/transferts",
        component: TransfertPatientPage,
        name: "transferts-route",
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

      /**
       * Pharmacie module manage
       */
      {
        path: "/pharmacie/users/manage",
        component: PharmacieUsersManage,
        name: "pharma-users-manage",
      },
      {
        path: "/pharmacie/fournisseurs/manage",
        component: PharmacieFournisseurManage,
        name: "pharma-fournisseurs-manage",
      },
      {
        path: "/pharmacie/create/product",
        component: PharmacieCreateProducts,
        name: "pharma-create-product",
      },
      {
        path: "/pharmacie/create",
        component: PharmacieCreate,
        name: "pharma-create",
      },
      {
        path: "/pharmacie/create/category",
        component: PharmacieCreateCategories,
        name: "pharma-create-category",
      },
      {
        path: "/pharmacie/operations",
        component: PharmacieOperationLanding,
        name: "pharma-operations",
        redirect: { name: "approv-route" },
        children: [
          {
            path: "/pharmacie/operations/approvisionnement",
            component: ApprovisionnementCreate,
            name: "approv-route",
          },
          {
            path: "/pharmacie/operations/transfert",
            component: TransfertCreate,
            name: "transfert-route",
          },
          {
            path: "/pharmacie/operations/classement",
            component: ClassementCreate,
            name: "classement-route",
          },
          {
            path: "/pharmacie/operations/retour",
            component: RetourCreate,
            name: "retour-route",
          },
        ],
      },
      {
        path: "/pharmacie/operations/viewer",
        component: PharmacieOperationViewer,
        name: "pharma-operation-viewer-route",
      },
      /**
       * End Pharmacie
       */

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
      {
        path: "/home/premiers_soins/list",
        component: PremierSoinsListPage,
        name: "premiers-soins-list",
      },
      {
        path: "/home/facture/create",
        component: FactureCreatePage,
        name: "facture-create-route",
      },
      {
        path: "/home/factures/list",
        component: FacturesListPage,
        name: "factures-list-route",
      },
      {
        path: "/admin/config/partener",
        component: PartenersViewPage,
        name: "partener-view-route",
      },
    ],
  },
  ...PharmacieHomeSellerApp,
];
export default routes;
