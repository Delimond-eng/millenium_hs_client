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
                        <div class="card">
                            <div class="card-body">
                                <div class="row g-2">
                                    <div class="col-sm-6">
                                        <div class="search-box">
                                            <input type="text" class="form-control" v-model="search" id="searchMemberList"
                                                placeholder="Recherche patient, par nom ou par code...">
                                            <i class="ri-search-line search-icon"></i>
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-sm-auto ms-auto">
                                        <div class="list-grid-nav hstack gap-1">
                                            <button class="btn btn-success btn-border addMembers-modal"
                                                @click="$router.push('/home/patient/create')"><i
                                                    class="ri-add-fill me-1 align-bottom"></i> Nouveau patient</button>
                                        </div>
                                    </div>
                                    <!--end col-->
                                </div>
                                <!--end row-->
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="live-preview">
                                    <ul class="nav nav-tabs nav-tabs-custom nav-secondary mb-3" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link py-3 active" @click="tab = 'all'" data-bs-toggle="tab"
                                                id="All" href="#tab-all" role="tab" aria-selected="false" tabindex="-1">
                                                Tous les patients
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link All py-3" @click="tab = 'pending'" data-bs-toggle="tab"
                                                id="Pendings" href="#tab-pendings" role="tab" aria-selected="true">
                                                Fiches en attente <span class="badge bg-danger align-middle ms-1">{{
                                                    pendings.length }}</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active show" role="tabpanel" id="tab-all">
                                            <div class="table-responsive table-card">
                                                <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th scope="col">CODE</th>
                                                            <th scope="col">Nom complet</th>
                                                            <th scope="col">Sexe</th>
                                                            <th scope="col">Date naissance</th>
                                                            <th scope="col">Téléphone</th>
                                                            <th scope="col">Adresse</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col" style="width: 150px;"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in patients" :key="index">
                                                            <td>{{ item.patient_code }}</td>
                                                            <td>{{ item.patient_nom }} {{ item.patient_prenom }}</td>
                                                            <td>{{ item.patient_sexe }}</td>
                                                            <td>{{ item.patient_datenais }}</td>
                                                            <td>{{ item.patient_telephone }}</td>
                                                            <td>{{ item.patient_adresse }}</td>
                                                            <td class="status">
                                                                <span
                                                                    class="badge text-uppercase bg-secondary-subtle text-secondary"
                                                                    v-if="item.details">
                                                                    {{ item.patient_status }}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <button type="button" class="btn btn-sm btn-secondary me-2"
                                                                    @click.prevent="setPatient(item)">Créer fiche</button>
                                                                <button type="button" class="btn btn-sm btn-info me-2">Voir
                                                                    toutes les
                                                                    fiches</button>
                                                                <button type="button" class="btn btn-sm btn-ghost-danger"><i
                                                                        class="ri-delete-bin-3-line"></i></button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <state-empty v-if="patients.length === 0"
                                                    title="Aucune information répertoriée !"
                                                    description="Il n'y a aucun patient dans la liste pour l'instant !"></state-empty>
                                            </div>
                                        </div>
                                        <div class="tab-pane" role="tabpanel" id="tab-pendings">
                                            <div class="table-responsive table-card">
                                                <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                                    <thead class="table-light">
                                                        <tr>
                                                            <th scope="col">CODE</th>
                                                            <th scope="col">Nom complet</th>
                                                            <th scope="col">Sexe</th>
                                                            <th scope="col">Date naissance</th>
                                                            <th scope="col">Téléphone</th>
                                                            <th scope="col">Fiche status</th>
                                                            <th scope="col">Poids</th>
                                                            <th scope="col">Taille</th>
                                                            <th scope="col">Temperature</th>
                                                            <th scope="col">Tension arterielle</th>
                                                            <th scope="col" style="width: 150px;"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in pendings" :key="index">
                                                            <td>{{ item.patient_code }}</td>
                                                            <td>{{ item.patient_nom }} {{ item.patient_prenom }}</td>
                                                            <td>{{ item.patient_sexe }}</td>
                                                            <td>{{ item.patient_datenais }}</td>
                                                            <td>{{ item.patient_telephone }}</td>
                                                            <td class="status">
                                                                <span class="badge text-uppercase" v-if="item.details"
                                                                    :class="item.details[item.details.length - 1].patient_fiche_status.toLowerCase().includes('en attente') ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'">
                                                                    {{ item.details[item.details.length -
                                                                        1].patient_fiche_status }}
                                                                </span>
                                                            </td>

                                                            <td>
                                                                <span v-if="item.details">
                                                                    {{ item.details[item.details.length -
                                                                        1].patient_fiche_poids }}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span v-if="item.details">
                                                                    {{ item.details[item.details.length -
                                                                        1].patient_fiche_taille
                                                                    }}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span v-if="item.details">
                                                                    {{ item.details[item.details.length -
                                                                        1].patient_fiche_temperature }}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span v-if="item.details">
                                                                    {{ item.details[item.details.length -
                                                                        1].patient_fiche_tension_art }}
                                                                </span>
                                                            </td>
                                                            <!-- <td><i class="ri-user-2-line me-1"></i>Lionnel</td> -->
                                                            <td>
                                                                <button type="button" class="btn btn-sm btn-secondary me-2"
                                                                    @click.prevent="setPatient(item)">Nouvelle
                                                                    fiche</button>
                                                                <button type="button" class="btn btn-sm btn-success"
                                                                    @click="$router.push({ name: 'fiche-invoice' })"><i
                                                                        class="ri-printer-line"></i></button>
                                                                <button type="button" class="btn btn-sm btn-ghost-danger"><i
                                                                        class="ri-delete-bin-3-line"></i></button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <state-empty v-if="pendings.length === 0"
                                                    title="Aucune information répertoriée !"
                                                    description="Il n'y a aucune fiche de patient en attente pour l'instant !"></state-empty>
                                            </div>
                                        </div>
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
                @click.prevent="$router.push('/home/patient/create')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PatientListPage",

    data() {
        return {
            tab: 'all',
            search: ''
        }
    },

    methods: {
        /**
         * Set patient in caches
        */
        setPatient(data) {
            localStorage.setItem('current-patient', JSON.stringify(data));
            this.$router.push({ name: 'patient-create' });
        }
    },

    mounted() {
        this.$store.dispatch('services/viewAllPatients');
        this.$store.dispatch('services/viewPatientsPending');
    },
    computed: {
        pendings() {
            if (this.search && this.tab === 'pending') {
                let arr = this.$store.getters['services/GET_PATIENTS_PENDING'];
                let filtered = arr.filter((el) => el.patient_nom.toLowerCase().includes(this.search.toLocaleLowerCase()))
                return filtered;
            }
            else {
                return this.$store.getters['services/GET_PATIENTS_PENDING'];
            }
        },
        patients() {
            if (this.search && this.tab === 'all') {
                let arr = this.$store.getters['services/GET_PATIENTS'];
                let filtered = arr.filter((el) => el.patient_nom.toLowerCase().includes(this.search.toLocaleLowerCase()))
                return filtered;
            }
            else {
                return this.$store.getters['services/GET_PATIENTS'];
            }
        }
    },
}
</script>

<style>
.text-ellipsis {
    text-overflow: ellipsis !important;
}
</style>