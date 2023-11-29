<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des consultations</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="card">
                    <div class="card-body">
                        <div class="row g-2">
                            <div class="col-sm-6">
                                <div class="search-box">
                                    <input type="text" class="form-control" id="searchMemberList"
                                        placeholder="Recherche médecin ou patient ...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <!--end col-->
                            <div class="col-sm-auto ms-auto">
                                <div class="list-grid-nav hstack gap-1">

                                    <!--
                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1" style="">
                                    <li><a class="dropdown-item" href="#">All</a></li>
                                    <li><a class="dropdown-item" href="#">Last Week</a></li>
                                    <li><a class="dropdown-item" href="#">Last Month</a></li>
                                    <li><a class="dropdown-item" href="#">Last Year</a></li>
                                  </ul>
                                  -->
                                    <button class="btn btn-success btn-border addMembers-modal"
                                        @click="$router.push('/home/consult/create')"><i
                                            class="ri-add-fill me-1 align-bottom"></i> Consultez les patients</button>
                                </div>
                            </div>
                            <!--end col-->
                        </div>
                        <!--end row-->
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">

                        <div class="card">

                            <div class="card-body">
                                <div class="live-preview">
                                    <div class="table-responsive table-card">
                                        <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Patient nom complet</th>
                                                    <th scope="col">Patient code</th>
                                                    <th scope="col">Consultation motif</th>
                                                    <th scope="col">Médecin</th>
                                                    <th scope="col" style="width: 150px;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(consult, index) in consultations" :key="index">
                                                    <td>{{ formatDate(consult.consult_create_At) }}
                                                    </td>
                                                    <td><span v-if="consult.patient">{{ consult.patient.patient_nom }} {{
                                                        consult.patient.patient_prenom }}</span></td>
                                                    <td> <span v-if="consult.patient">{{ consult.patient.patient_code
                                                    }}</span> </td>
                                                    <td style="text-overflow: ellipsis;">{{ consult.consult_libelle }}</td>
                                                    <td><span v-if="consult.agent"><i class="ri-user-2-line me-1"></i>{{
                                                        consult.agent.agent_nom }} {{
        consult.agent.agent_prenom }}</span></td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-info btn-border me-2"
                                                            @click="selectedConsult = consult; $showBsModal('detailsModal')">Voir
                                                            détails</button>
                                                        <button type="button" class="btn btn-sm btn-border btn-light"><i
                                                                class="ri-delete-bin-3-line"></i></button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> <!-- end col -->


                </div>

            </div>
            <!-- container-fluid -->
        </div>
        <!-- End Page-content -->

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

        <div class="customizer-setting d-block">
            <div class="btn-success text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$router.push('/home/consult/create')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>

    <teleport to="body">
        <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header p-3">
                        <h5 class="modal-title text-uppercase" id="exampleModalLabel">Consultation détails</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="table-card p-4">
                        <table class="table mb-0">
                            <tbody>
                                <tr>
                                    <td class="fw-medium text-uppercase">Patient code & nom complet</td>
                                    <td class="fw-bold" v-if="selectedConsult"> <span v-if="selectedConsult.patient"><span
                                                class="text-primary text-decoration-underline">{{
                                                    selectedConsult.patient.patient_code }} </span> {{
        selectedConsult.patient.patient_nom }} {{ selectedConsult.patient.patient_prenom
    }}</span></td>
                                </tr>
                                <tr>
                                    <td class="fw-medium text-uppercase">Médecin</td>
                                    <td class="fw-bold" v-if="selectedConsult"> <span v-if="selectedConsult.agent"><span
                                                class="text-primary text-decoration-underline">{{
                                                    selectedConsult.agent.agent_matricule }} </span> {{
        selectedConsult.agent.agent_nom }} {{ selectedConsult.agent.agent_prenom
    }}</span></td>
                                </tr>
                                <tr>
                                    <td class="fw-medium">Date et heure</td>
                                    <td v-if="selectedConsult">{{ formatDate(selectedConsult.consult_create_At) }}</td>
                                </tr>
                                <tr>
                                    <td class="fw-medium">Motif</td>
                                    <td v-if="selectedConsult">{{ selectedConsult.consult_libelle }}</td>
                                </tr>
                                <tr>
                                    <td class="fw-medium">Diagnostic</td>
                                    <td v-if="selectedConsult">{{ selectedConsult.consult_diagnostic }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <!--end table-->
                    </div>
                    <div class="m-4" v-if="selectedConsult">
                        <!--  <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Consultation détails</h6>
                        <div class="border border-dashed border-primary mb-3"></div> -->
                        <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Consultation prescriptions</h6>
                        <div class="border border-dashed border-primary mb-3"></div>
                        <!-- Small Tables -->
                        <table class="table table-sm table-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Traitement</th>
                                    <th scope="col">Posologie</th>
                                    <th scope="col">Type</th>
                                </tr>
                            </thead>
                            <tbody v-if="selectedConsult.prescriptions">
                                <tr v-for="(p, index) in selectedConsult.prescriptions" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ p.prescription_traitement }}</td>
                                    <td>{{ p.prescription_posologie }}</td>
                                    <td>{{ p.prescription_traitement_type }}</td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: "ConsulstList",

    data() {
        return {
            selectedConsult: null
        }
    },
    computed: {
        consultations() {
            return this.$store.getters['services/GET_CONSULTATIONS']
        }
    },

    mounted() {
        this.$store.dispatch('services/viewAllConsults');
    },

    methods: {
        formatDate(timestamp) {
            // Créer un nouvel objet Date avec le timestamp (en millisecondes)
            let date = new Date(timestamp * 1000);
            let year = date.getFullYear();
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);
            let hours = ("0" + date.getHours()).slice(-2);
            let minutes = ("0" + date.getMinutes()).slice(-2);
            let seconds = ("0" + date.getSeconds()).slice(-2);
            let formattedDate = ` ${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            return formattedDate;

        }
    },
}
</script>