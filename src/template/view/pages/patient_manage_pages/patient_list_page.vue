<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des patients</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="#/home/patient/create"
                                            class="btn btn-success btn-border btn-sm text-white"><i class="ri-add-line"></i>
                                            Création nouveau agent</a></li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">

                        <div class="card">
                            <div class="card-header d-flex justify-content-end">
                                <div class="search-box ms-2">
                                    <input type="text" class="form-control search" placeholder="Recherche patient...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="live-preview">
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
                                                    <th scope="col">Poids</th>
                                                    <th scope="col">Taille</th>
                                                    <th scope="col">Temperature</th>
                                                    <th scope="col">Tension arterielle</th>
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
                                                    <td>{{ item.patient_adresse
                                                    }}</td>
                                                    <td>
                                                        <span v-if="item.details">
                                                            {{ item.details[item.details.length - 1].patient_detail_poids }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span v-if="item.details">
                                                            {{ item.details[item.details.length - 1].patient_detail_taille
                                                            }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span v-if="item.details">
                                                            {{ item.details[item.details.length -
                                                                1].patient_detail_temperature }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span v-if="item.details">
                                                            {{ item.details[item.details.length - 1].patient_tension_art }}
                                                        </span>
                                                    </td>
                                                    <!-- <td><i class="ri-user-2-line me-1"></i>Lionnel</td> -->
                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-sm btn-info me-2">Editer</button>
                                                        <button type="button" class="btn btn-sm btn-light"><i
                                                                class="ri-delete-bin-3-line"></i></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
    computed: {
        patients() {
            return this.$store.getters['services/GET_PATIENTS'];
        }
    },
}
</script>

<style>
.text-ellipsis {
    text-overflow: ellipsis !important;
}
</style>