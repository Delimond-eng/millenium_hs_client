<template>
    <div class="main-content">

        <div class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <img src="assets/images/companies/emplacement.png" style="height: 30px;" class="me-2"
                                    alt="emplacement icon">
                                <h4 class="fs-16 fw-bold mb-1 text-uppercase" v-if="user.hopital">
                                    <span v-if="user.hopital.emplacement">{{
                                        user.hopital.emplacement.hopital_emplacement_libelle }}</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="h-100">
                            <div class="row mb-3 pb-1">
                                <div class="col-12">
                                    <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                                        <div class="flex-grow-1">

                                            <h4 class="fs-16 mb-1">Bonjour, {{ user.name }}</h4>
                                            <p class="text-muted mb-0">Votre tableau de bord pour vous guider à bien
                                                travailler.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-3 col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="dropdown float-end">
                                                <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <span class="text-muted fs-18"><i
                                                            class="mdi mdi-dots-vertical"></i></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a class="dropdown-item" href="#/home/patient/create"> <i
                                                            class="ri-add-line me-1"></i>
                                                        Nouveau patient</a>
                                                    <a class="dropdown-item" href="#/home/patients/list"><i
                                                            class="ri-list-check-2 me-1"></i>Liste des patients</a>
                                                </div>
                                            </div>
                                            <div class="mb-2 pb-2">
                                                <img src="assets/images/companies/patient_1.png" alt="" class="avatar-sm">
                                            </div>
                                            <h6 class="fs-15 fw-semibold">0 </h6>
                                            <p class="text-muted mb-0"><i class="ri-wheelchair-line align-bottom"></i>
                                                Nombre des patients</p>

                                        </div>
                                    </div>
                                </div>


                                <div class="col-xl-3 col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="dropdown float-end">
                                                <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <span class="text-muted fs-18"><i
                                                            class="mdi mdi-dots-vertical"></i></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a class="dropdown-item" href="#/home/med/create"> <i
                                                            class="ri-add-line me-1"></i>
                                                        Nouveau médecin</a>
                                                    <a class="dropdown-item" href="#/home/meds/list"><i
                                                            class="ri-list-check-2 me-1"></i>Liste des médecin</a>
                                                </div>
                                            </div>
                                            <div class="mb-2 pb-2">
                                                <img src="assets/images/companies/doctor.png" alt="" class="avatar-sm">
                                            </div>
                                            <h6 class="fs-15 fw-semibold">0</h6>
                                            <p class="text-muted mb-0"><i class=" ri-user-2-line align-bottom"></i>
                                                Nombre des médecins</p>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="dropdown float-end">
                                                <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <span class="text-muted fs-18"><i
                                                            class="mdi mdi-dots-vertical"></i></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a class="dropdown-item" href="#/home/prescription/create"> <i
                                                            class="ri-add-line me-1"></i>
                                                        Nouvelle préscription</a>
                                                    <a class="dropdown-item" href="#/home/prescription/create"><i
                                                            class="ri-list-check-2 me-1"></i>Liste des préscriptions</a>
                                                </div>
                                            </div>
                                            <div class="mb-2 pb-2">
                                                <img src="assets/images/companies/prescription.png" alt=""
                                                    class="avatar-sm">
                                            </div>
                                            <h6 class="fs-15 fw-semibold">0</h6>
                                            <p class="text-muted mb-0"><i class="bx bxs-first-aid align-bottom"></i>
                                                Préscriptions en cours</p>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="dropdown float-end">
                                                <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <span class="text-muted fs-18"><i
                                                            class="mdi mdi-dots-vertical"></i></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a class="dropdown-item" href="#/home/consult/create"> <i
                                                            class="ri-add-line me-1"></i>
                                                        Nouvelle consultation</a>
                                                    <a class="dropdown-item" href="#/home/consults/list"><i
                                                            class="ri-list-check-2 me-1"></i>Liste des consultations</a>
                                                </div>
                                            </div>
                                            <div class="mb-2 pb-2">
                                                <img src="assets/images/companies/consult.png" alt="" class="avatar-sm">
                                            </div>
                                            <h6 class="fs-15 fw-semibold">0 </h6>
                                            <p class="text-muted mb-0"><i class="ri-stethoscope-line align-bottom"></i>
                                                Consultations journalières</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card checkout-tab">

                                <div class="card-body">
                                    <div class="step-arrow-nav mt-n3 mx-n3 mb-3">
                                        <ul class="nav nav-pills nav-justified custom-nav" role="tablist">
                                            <li class="nav-item active" role="presentation">
                                                <button class="nav-link p-3 active" id="pills-bill-info-tab"
                                                    data-bs-toggle="pill" data-bs-target="#pills-bill-info" type="button"
                                                    role="tab" aria-controls="pills-bill-info" aria-selected="true">Demandes
                                                    des examens <span class="badge badge-gradient-danger">{{ examens.length
                                                    }}</span> </button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link p-3" id="pills-bill-address-tab"
                                                    data-bs-toggle="pill" data-bs-target="#pills-bill-address" type="button"
                                                    role="tab" aria-controls="pills-bill-address"
                                                    aria-selected="false">Patients en attente</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link p-3" id="pills-bill-address-tab"
                                                    data-bs-toggle="pill" data-bs-target="#pills-bill-address" type="button"
                                                    role="tab" aria-controls="pills-bill-address"
                                                    aria-selected="false">Rendez-vous journaliers</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="pills-bill-info" role="tabpanel"
                                            aria-labelledby="pills-bill-info-tab">

                                            <div class="table-responsive">
                                                <table class="table align-middle mb-0">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Patient</th>
                                                            <th scope="col">Médecin</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <!-- <tr>
                                                            <td><a href="#" class="fw-semibold">#VZ2110</a></td>
                                                            <td>10 Oct, 14:47</td>
                                                            <td>Mastering the grid</td>
                                                            <td>Gaston delimond</td>
                                                            <td class="text-success"><i
                                                                    class="ri-checkbox-circle-line fs-17 align-middle"></i>
                                                                Paid
                                                            </td>
                                                            <td>

                                                                <button class="btn btn-soft-warning btn-sm me-1"> <i
                                                                        class="ri-refresh-line"></i>Invalider</button>
                                                                <button class="btn btn-soft-info btn-sm"> <i
                                                                        class="ri-eye-line"></i> Voir
                                                                    examens</button>
                                                            </td>
                                                        </tr> -->
                                                        <tr v-for="(data, index) in examens" :key="index">

                                                            <td>{{ data.consult_examen_create_At }}</td>
                                                            <td>{{ data.patient_nom }}</td>
                                                            <td>{{ data.agent_nom }}</td>
                                                            <td class="text-warning"><i
                                                                    class="ri-time-line fs-17 align-middle"></i> {{
                                                                        data.consult_examen_status }}
                                                            </td>
                                                            <td>
                                                                <button :disabled="loaded === data.consult_id"
                                                                    class="btn btn-soft-success btn-load btn-sm me-1"
                                                                    @click.prevent="validDemand(data.consult_id)">
                                                                    <span>Valider</span>
                                                                </button>
                                                                <button class="btn btn-soft-info btn-sm"
                                                                    @click.prevent="showDetail(data)"> <i
                                                                        class="ri-eye-line"></i>
                                                                    Voir
                                                                    examens</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <state-empty v-if="examens.length === 0"
                                                    title="Aucun informations répertorié !" :expanded="false"
                                                    description="Il y a aucun examen en attente !"></state-empty>
                                            </div>
                                            <!--  <div class="table-responsive">
                                                <table class="table align-middle mb-0">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th scope="col">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value=""
                                                                        id="responsivetableCheck">
                                                                    <label class="form-check-label"
                                                                        for="responsivetableCheck"></label>
                                                                </div>
                                                            </th>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Patient</th>
                                                            <th scope="col">Médecin</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><a href="#" class="fw-semibold">#VZ2110</a></td>
                                                            <td>10 Oct, 14:47</td>
                                                            <td>Mastering the grid</td>
                                                            <td>$9.98</td>
                                                            <td class="text-success"><i
                                                                        class="ri-checkbox-circle-line fs-17 align-middle"></i>
                                                                    Paid</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value=""
                                                                        id="responsivetableCheck02">
                                                                    <label class="form-check-label"
                                                                        for="responsivetableCheck02"></label>
                                                                </div>
                                                            </th>
                                                            <td><a href="#" class="fw-semibold">#VZ2109</a></td>
                                                            <td>17 Oct, 02:10</td>
                                                            <td class="text-success"><i
                                                                    class="ri-checkbox-circle-line fs-17 align-middle"></i>
                                                                Paid</td>
                                                            <td>
                                                                <div class="d-flex gap-2 align-items-center">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-4.jpg" alt=""
                                                                            class="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div class="flex-grow-1">
                                                                        Jackson Graham
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>Splashify</td>
                                                            <td>$270.60</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value=""
                                                                        id="responsivetableCheck03">
                                                                    <label class="form-check-label"
                                                                        for="responsivetableCheck03"></label>
                                                                </div>
                                                            </th>
                                                            <td><a href="#" class="fw-semibold">#VZ2108</a></td>
                                                            <td>26 Oct, 08:20</td>
                                                            <td class="text-primary"><i
                                                                    class="ri-refresh-line fs-17 align-middle"></i> Refunded
                                                            </td>
                                                            <td>
                                                                <div class="d-flex gap-2 align-items-center">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-5.jpg" alt=""
                                                                            class="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div class="flex-grow-1">
                                                                        Lauren Trujillo
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>Wireframing Kit for Figma</td>
                                                            <td>$145.42</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value=""
                                                                        id="responsivetableCheck04">
                                                                    <label class="form-check-label"
                                                                        for="responsivetableCheck04"></label>
                                                                </div>
                                                            </th>
                                                            <td><a href="#" class="fw-semibold">#VZ2107</a></td>
                                                            <td>02 Nov, 04:52</td>
                                                            <td class="text-danger"><i
                                                                    class="ri-close-circle-line fs-17 align-middle"></i>
                                                                Cancel</td>
                                                            <td>
                                                                <div class="d-flex gap-2 align-items-center">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-6.jpg" alt=""
                                                                            class="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div class="flex-grow-1">
                                                                        Curtis Weaver
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>Wireframing Kit for Figma</td>
                                                            <td>$170.68</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value=""
                                                                        id="responsivetableCheck05">
                                                                    <label class="form-check-label"
                                                                        for="responsivetableCheck05"></label>
                                                                </div>
                                                            </th>
                                                            <td><a href="#" class="fw-semibold">#VZ2106</a></td>
                                                            <td>10 Nov, 07:20</td>
                                                            <td class="text-success"><i
                                                                    class="ri-checkbox-circle-line fs-17 align-middle"></i>
                                                                Paid</td>
                                                            <td>
                                                                <div class="d-flex gap-2 align-items-center">
                                                                    <div class="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-1.jpg" alt=""
                                                                            class="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div class="flex-grow-1">
                                                                        Jason schuller
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>Splashify</td>
                                                            <td>$350.87</td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot class="table-light">
                                                        <tr>
                                                            <td colspan="6">Total</td>
                                                            <td>$947.55</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div> -->
                                        </div>
                                        <div class="tab-pane fade" id="pills-bill-address" role="tabpanel"
                                            aria-labelledby="pills-bill-address-tab">


                                        </div>
                                        <div class="tab-pane fade" id="pills-payment" role="tabpanel"
                                            aria-labelledby="pills-payment-tab">

                                        </div>

                                        <div class="tab-pane fade" id="pills-finish" role="tabpanel"
                                            aria-labelledby="pills-finish-tab">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        © Millenium HS
                    </div>
                    <div class="col-sm-6">
                        <div class="text-sm-end d-none d-sm-block">
                            &copy; Powered by Millenium Horizon
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <examen-details-modal :detail="selectedExamConsult" />
</template>

<script>
import examenDetailsModal from "../../modals/modal_examen_details"
export default {
    components: {
        examenDetailsModal
    },
    data() {
        return {
            loaded: '',
            loadedDetail: '',
            selectedExamConsult: null,
        }
    },
    mounted() {
        this.$store.dispatch('services/viewAllConsultsExamens');
    },

    methods: {
        validDemand(id) {
            this.loaded = id;
            this.$store.dispatch('services/validateDemandeExam', id).then((res) => {
                this.loaded = "";
            }).catch((e) => {
                this.loaded = "";
                console.log(e);
            })
        },

        showDetail(data) {
            this.loadedDetail = data.consult_id;
            this.$store.dispatch('services/showExamDetails', data.consult_id).then((res) => {
                this.loadedDetail = "";
                let detail = {
                    heading: data,
                    detail: res.detail
                };
                this.selectedExamConsult = detail;
                console.log(JSON.stringify(this.selectedExamConsult));
                this.$showBsModal('examenDetailsModal');
            }).catch((e) => {
                this.loadedDetail = "";
                console.log(e);
            })
        }
    },

    computed: {
        user() {
            return this.$store.getters['auth/GET_USER'];
        },
        examens() {
            return this.$store.getters['services/GET_ALL_EXAMENS']
        }
    },
}
</script>