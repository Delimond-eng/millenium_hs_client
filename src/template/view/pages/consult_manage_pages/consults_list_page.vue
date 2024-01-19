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
                                                    <td>{{ consult.consult_create_At }}
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
                                                        <button type="button"
                                                            class="btn btn-sm btn-border me-1 btn-secondary"><i
                                                                class="ri-edit-line"></i>Editer</button>
                                                        <button type="button" class="btn btn-sm btn-info btn-border me-1"
                                                            @click="selectedConsult = consult; $showBsModal('detailsModal')">Voir
                                                            détails</button>
                                                        <button type="button" class="btn btn-sm btn-border btn-light"><i
                                                                class="ri-delete-bin-3-line"></i></button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                        <state-empty v-if="consultations.length === 0"
                                            title="Aucune information répertoriée !"
                                            description="Aucune consultation répertoriée !"></state-empty>
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

    <!-- modal consult details view -->
    <consult-details-modal :selected-consult="selectedConsult" />
</template>

<script>
import consultDetailsModal from '../../modals/modal_consult_details'
export default {
    name: "ConsulstList",
    components: {
        consultDetailsModal,
    },

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