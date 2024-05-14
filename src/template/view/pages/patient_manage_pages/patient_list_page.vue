<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Gestion patients</h4>
            </div>
          </div>
        </div>
        <!-- end page title -->
        <div class="row">
          <div class="col-md-12">
            <div class="step-arrow-nav bg-white shadow-sm mb-2 p-2">
              <ul class="nav nav-pills custom-nav" role="tablist">
                <li class="nav-item active" role="presentation">
                  <button class="nav-link p-3 active" @click="tab = 'all'" id="all-tab" data-bs-toggle="pill"
                    data-bs-target="#tab-all" type="button" role="tab" aria-controls="all" aria-selected="true">
                    Tous les patients
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link p-3" id="tab-pendings-tab" @click="tab = 'pending'" data-bs-toggle="pill"
                    data-bs-target="#tab-pendings" type="button" role="tab" aria-controls="tab-pendings"
                    aria-selected="false">
                    Patients en attente
                    <span class="badge bg-danger align-middle ms-1">{{
                    pendings.length
                  }}</span>
                  </button>
                </li>
              </ul>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane active show w-100" role="tabpanel" id="tab-all">
                    <custom-table v-if="isEmplacementDefined"
                      :api-url="`/patients.all/${$user().hopital.emplacement.id}`" :columns="dataTableColumns"
                      :data-src="'patients'" ref="customTablePatients" :action-buttons="actionButtons"
                      @actionButtonClick="handleActionButtonClick" />
                  </div>
                  <div class="tab-pane w-100" role="tabpanel" id="tab-pendings">
                    <custom-table v-if="isEmplacementDefined"
                      :api-url="`/patients.pending/${$user().hopital.emplacement.id}`" :columns="dataTableColumns2"
                      :data-src="'patients'" ref="customTablePatients2" :action-buttons="actionButtons2"
                      @actionButtonClick="handleActionButtonClick2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">© Millenium HS</div>
          <div class="col-sm-6">
            <div class="text-sm-end d-none d-sm-block">
              &copy; Powered by Millenium Horizon
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="customizer-setting d-block">
      <div class="btn-success text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
        @click.prevent="$router.push('/home/patient/create')">
        <i class="ri-add-line fs-22"></i>
      </div>
    </div>
  </div>
  <patient-card-print :data="selectedPatient" />
  <signe-vitaux-modal :detail="signes" />
</template>
<script>
import PatientCardPrint from "../invoices/patient_medical_card";
import signeVitauxModal from "@/template/view/pages/patient_manage_pages/modals/signe_vitaux_modal.vue";
export default {
  name: "PatientListPage",
  components: {
    PatientCardPrint,
    signeVitauxModal,
  },
  data() {
    return {
      tab: "all",
      search: "",
      selectedPatient: null,
      signes: null,
      dataTableColumns: [
        { data: "patient_code", title: "Code" },
        {
          data: null,
          title: "Nom complet",
          render: function (data, type, row) {
            // Concaténer les valeurs de agent_nom et agent_prenom
            return row.patient_nom + " " + row.patient_prenom;
          },
        },
        { data: "patient_sexe", title: "Sexe" },
        { data: "patient_datenais", title: "Date naissance" },
        { data: "patient_telephone", title: "Téléphone" },
      ],
      actionButtons: [
        {
          label: '<i class="ri-edit-2-line"></i>',
          class: "btn-secondary me-1",
          key: "edit",
        },
        {
          label: '<i class="ri-time-line me-1"></i>Nouvelle visite',
          class: "btn-success me-1",
          key: "new",
        },
        { label: "Imprimer carte", class: "btn-outline-secondary me-1", key: "print" },
        {
          label: '<i class="ri-delete-bin-3-line"></i>',
          class: "btn-soft-danger me-1",
          key: "delete",
        },
      ],
      dataTableColumns2: [
        { data: "patient_code", title: "Code" },
        {
          data: null,
          title: "Nom complet",
          render: function (data, type, row) {
            // Concaténer les valeurs de agent_nom et agent_prenom
            return row.patient_nom + " " + row.patient_prenom;
          },
        },
        { data: "patient_sexe", title: "Sexe" },
        { data: "patient_datenais", title: "Date naissance" },
        { data: "patient_telephone", title: "Téléphone" },
      ],
      actionButtons2: [
        { label: "Voir signes vitaux", class: "btn-secondary me-1", key: "view" },
        { label: "Consulter", class: "btn-info me-1", key: "consult" },
        {
          label: '<i class="ri-delete-bin-3-line"></i>',
          class: "btn-soft-danger me-1",
          key: "delete",
        },
      ],
    };
  },

  methods: {
    /**
     * Set patient in caches
     */
    setPatient(data) {
      localStorage.setItem("current-patient", JSON.stringify(data));
      this.$router.push({ name: "patient-create" });
    },

    handleActionButtonClick(payload) {
      switch (payload.key) {
        case "print":
          this.selectedPatient = payload.data;
          setTimeout(() => {
            window.print();
          }, 1000);
          break;
        case "details":
          break;
        default:
          break;
      }
    },
    handleActionButtonClick2(payload) {
      switch (payload.key) {
        case "view":
          this.signes = payload.data.details[payload.data.details.length - 1];
          this.$showBsModal("patientSignesVitauxModal");
          break;
        case "details":
          break;
        default:
          break;
      }
    },
  },

  mounted() {
    this.$store.dispatch("services/viewAllPatients");
    this.$store.dispatch("services/viewPatientsPending");
  },
  computed: {
    pendings() {
      if (this.search && this.tab === "pending") {
        let arr = this.$store.getters["services/GET_PATIENTS_PENDING"];
        let filtered = arr.filter((el) =>
          el.patient_nom.toLowerCase().includes(this.search.toLocaleLowerCase())
        );
        return filtered;
      } else {
        return this.$store.getters["services/GET_PATIENTS_PENDING"];
      }
    },
    patients() {
      return this.$store.getters["services/GET_PATIENTS"];
    },
    isEmplacementDefined() {
      return (
        this.$user().hopital !== undefined &&
        this.$user().hopital.emplacement !== undefined
      );
    },
  },
};
</script>

<style>
.text-ellipsis {
  text-overflow: ellipsis !important;
}
</style>
