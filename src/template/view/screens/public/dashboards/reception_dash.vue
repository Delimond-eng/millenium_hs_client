<template>
  <div class="row">
    <div class="col">
      <div class="h-100">
        <div class="row mb-3 pb-1">
          <div class="col-12">
            <div v-if="user" class="d-flex align-items-lg-center flex-lg-row flex-column">
              <div class="flex-grow-1">
                <h4 class="fs-16 mb-1 fw-bold">
                  Bienvenue <br />
                  <small class="text-uppercase"><span v-if="user.role" class="text-secondary-emphasis">{{
                    user.role.role
                  }}</span>
                    {{ user.name }}</small>
                </h4>
                <p class="text-muted mb-0">
                  Votre tableau de bord pour vous guider à bien travailler.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-xl-3 col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="dropdown float-end">
                  <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="#/home/patient/create">
                      <i class="ri-add-line me-1"></i> Nouveau patient</a>
                    <a class="dropdown-item" href="#/home/patients/list"><i class="ri-list-check-2 me-1"></i>Liste des
                      patients</a>
                  </div>
                </div>
                <div class="mb-2 pb-2">
                  <img src="assets/images/companies/patient_1.png" alt="" class="avatar-sm" />
                </div>
                <h6 class="fs-15 fw-semibold">0</h6>
                <p class="text-muted mb-0">
                  <i class="ri-wheelchair-line align-bottom"></i> Nombre des patients
                </p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="dropdown float-end">
                  <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="#/home/prescription/create"><i class="ri-list-check-2 me-1"></i>Voir
                      toutes préscriptions</a>
                  </div>
                </div>
                <div class="mb-2 pb-2">
                  <img src="assets/images/companies/prescription.png" alt="" class="avatar-sm" />
                </div>
                <h6 class="fs-15 fw-semibold">0</h6>
                <p class="text-muted mb-0">
                  <i class="bx bxs-first-aid align-bottom"></i> Préscriptions en cours
                </p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="mb-2 pb-2">
                  <img src="assets/images/companies/consult.png" alt="" class="avatar-sm" />
                </div>
                <h6 class="fs-15 fw-semibold">0</h6>
                <p class="text-muted mb-0">
                  <i class="ri-stethoscope-line align-bottom"></i> Consultations
                  journalières
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="step-arrow-nav mt-n3 mb-2 bg-white shadow-sm">
          <ul class="nav nav-pills nav-justified bg-white custom-nav" role="tablist">
            <li class="nav-item active" role="presentation">
              <button class="nav-link p-3 active" id="pills-bill-info-tab" data-bs-toggle="pill"
                data-bs-target="#pills-bill-info" type="button" role="tab" aria-controls="pills-bill-info"
                aria-selected="true">
                Demandes des examens
                <span class="badge bg-danger align-middle ms-1">{{
                  examens.length
                }}</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link p-3" id="patient-pending-tab" data-bs-toggle="pill"
                data-bs-target="#patient-pending" type="button" role="tab" aria-controls="patient-pending-tab"
                aria-selected="false">
                Patients en attente
                <span class="badge bg-danger align-middle ms-1">{{
                  pendings.length
                }}</span>
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button class="nav-link p-3" id="rdv-tab" data-bs-toggle="pill" data-bs-target="#schedules" type="button"
                role="tab" aria-controls="rdv" aria-selected="false">
                Rendez-vous journaliers
                <span class="badge bg-danger align-middle ms-1">{{
                  schedules.length
                }}</span>
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button class="nav-link p-3" id="prescription_tab-btn" data-bs-toggle="pill"
                data-bs-target="#prescription-tab" type="button" role="tab" aria-controls="pills-bill-address"
                aria-selected="false">
                Prescriptions en attente<span class="badge bg-danger align-middle ms-1">{{
                  prescriptions.length
                }}</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="card checkout-tab" v-if="user">
          <div class="card-body" v-if="user.agent_id !== 0">
            <div class="tab-content">
              <pending-examens-tab></pending-examens-tab>
              <pending-patients-tab></pending-patients-tab>
              <schedules-tab></schedules-tab>
              <pending-prescriptions-tab></pending-prescriptions-tab>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PendingExamensTab from "../tabs/examens_demande_view_tab";
import PendingPrescriptionsTab from "../tabs/prescriptions_demande_view_tab";
import PendingPatientsTab from "../tabs/patients_pending_view_tab";
import SchedulesTab from "../tabs/schedules_view_tab";

export default {
  components: {
    PendingExamensTab,
    PendingPrescriptionsTab,
    PendingPatientsTab,
    SchedulesTab,
  },
  data() {
    return {
      loaded: "",
      loadedDetail: "",
      selectedExamConsult: null,
      selectedPrescription: null,
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("services/viewAllConsultsExamens"),
      this.$store.dispatch("services/viewPatientsPending"),
      this.$store.dispatch("services/viewAllLaboExamensPendings"),
      this.$store.dispatch("services/viewAllPrescriptionsPendings"),
      this.$store.dispatch("services/viewSchedules")
    ]);

  },

  methods: {
    setPatient(data) {
      localStorage.setItem("current-patient", JSON.stringify(data));
      this.$router.push({ name: "patient-create" });
    },
  },

  computed: {
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
    examens() {
      return this.$store.getters["services/GET_ALL_EXAMENS"];
    },
    pendings() {
      return this.$store.getters["services/GET_PATIENTS_PENDING"];
    },
    prescriptions() {
      return this.$store.getters["services/GET_PENDING_PRESCRIPTIONS"];
    },
    schedules() {
      return this.$store.getters["services/GET_SCHEDULES"];
    },
  },
};
</script>
