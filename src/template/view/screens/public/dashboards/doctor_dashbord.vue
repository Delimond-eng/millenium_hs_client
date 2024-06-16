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
                                    <small class="text-uppercase"><span v-if="user.role"
                                            class="text-secondary-emphasis">{{
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

                <div class="row mb-2">
                    <div class="col-xl-12">
                        <div class="card crm-widget">
                            <div class="card-body p-0">
                                <div class="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">
                                    <!-- end col -->
                                    <div class="col">
                                        <div class="mt-3 mt-md-0 py-4 px-3">
                                            <h5 class="text-muted text-uppercase fs-13">Nb des patients</h5>
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <i class="ri-group-2-line display-6 text-secondary"></i>
                                                </div>
                                                <div class="flex-grow-1 ms-3">
                                                    <h2 class="mb-0">
                                                        <span class="counter-value">00</span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                    <div class="col">
                                        <div class="mt-3 mt-md-0 py-4 px-3">
                                            <h5 class="text-muted text-uppercase fs-13">
                                                Patients en attente de consultation
                                            </h5>
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <i class="bx bx-body display-6 text-warning"></i>
                                                </div>
                                                <div class="flex-grow-1 ms-3">
                                                    <h2 class="mb-0">
                                                        <span class="counter-value">00</span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                    <div class="col">
                                        <div class="mt-3 mt-lg-0 py-4 px-3">
                                            <h5 class="text-muted text-uppercase fs-13">
                                                Mes consultations journalières
                                            </h5>
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <i class="ri-stethoscope-fill display-6 text-secondary"></i>
                                                </div>
                                                <div class="flex-grow-1 ms-3">
                                                    <h2 class="mb-0">
                                                        <span class="counter-value">00</span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                    <div class="col">
                                        <div class="mt-3 mt-lg-0 py-4 px-3">
                                            <h5 class="text-muted text-uppercase fs-13">
                                                Mes rendez-vous journaliers
                                            </h5>
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <i class="ri-calendar-2-line display-6 text-primary"></i>
                                                </div>
                                                <div class="flex-grow-1 ms-3">
                                                    <h2 class="mb-0">
                                                        <span class="counter-value">00</span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->

                                    <!-- end col -->
                                    <div class="col">
                                        <div class="mt-3 mt-lg-0 py-4 px-3">
                                            <h5 class="text-muted text-uppercase fs-13">
                                                Mes demandes d'examens
                                            </h5>
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <i class="ri-microscope-line display-6 text-info-emphasis"></i>
                                                </div>
                                                <div class="flex-grow-1 ms-3">
                                                    <h2 class="mb-0">
                                                        <span class="counter-value">00</span>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                </div>
                                <!-- end row -->
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->
                    </div>
                </div>

                <div class="step-arrow-nav mt-n3 mb-2 bg-white shadow-sm">
                    <ul class="nav nav-pills nav-justified bg-white custom-nav" role="tablist">
                        <li class="nav-item active" role="presentation">
                            <button class="nav-link p-3 active" id="pills-bill-info-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-bill-info" type="button" role="tab"
                                aria-controls="pills-bill-info" aria-selected="true">
                                Demandes des examens
                                <span class="badge bg-danger align-middle ms-1">{{
                                    examens.length
                                    }}</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link p-3" id="patient-pending-tab" data-bs-toggle="pill"
                                data-bs-target="#patient-pending" type="button" role="tab"
                                aria-controls="patient-pending-tab" aria-selected="false">
                                Patients en attente
                                <span class="badge bg-danger align-middle ms-1">{{
                                    pendings.length
                                    }}</span>
                            </button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link p-3" id="rdv-tab" data-bs-toggle="pill" data-bs-target="#schedules"
                                type="button" role="tab" aria-controls="rdv" aria-selected="false">
                                Rendez-vous journaliers
                                <span class="badge bg-danger align-middle ms-1">{{
                                    schedules.length
                                    }}</span>
                            </button>
                        </li>

                        <!-- <li class="nav-item" role="presentation">
                            <button class="nav-link p-3" id="prescription_tab-btn" data-bs-toggle="pill"
                                data-bs-target="#prescription-tab" type="button" role="tab"
                                aria-controls="pills-bill-address" aria-selected="false">
                                Prescriptions en attente<span class="badge bg-danger align-middle ms-1">{{
                                            prescriptions.length
                                        }}</span>
                            </button>
                        </li> -->
                    </ul>
                </div>

                <div class="card checkout-tab">
                    <div class="card-body">
                        <div class="tab-content">
                            <pending-examens-tab></pending-examens-tab>
                            <pending-patients-tab></pending-patients-tab>
                            <schedules-tab></schedules-tab>
                            <!-- <pending-prescriptions-tab></pending-prescriptions-tab> -->
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
        await this.loadData();
    },
    methods: {
        async loadData() {
            await Promise.all([
                this.$store.dispatch("services/viewAllConsultsExamens"),
                this.$store.dispatch("services/viewPatientsPending"),
                this.$store.dispatch("services/viewAllLaboExamensPendings"),
                this.$store.dispatch("services/viewAllPrescriptionsPendings"),
                this.$store.dispatch("services/viewSchedules"),
            ]);
        },
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