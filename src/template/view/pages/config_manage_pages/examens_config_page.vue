<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Configuration examens médicaux</h4>
                            <div class="page-title-right">

                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->

                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header d-flex align-items-center">
                                <h5 class="card-title flex-grow-1 mb-0">Examens médicaux configurés</h5>
                                <div class="d-flex gap-1 flex-wrap">

                                    <button type="button" @click="$showBsModal('examensCreateModal')"
                                        class="btn btn-success btn-border create-btn"><i
                                            class="ri-add-line align-bottom me-1"></i>
                                        Ajouter</button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div>
                                    <div class="table-responsive table-card mb-3">
                                        <table class="table align-middle table-nowrap mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="sort" data-sort="name" scope="col">Libellé</th>
                                                    <th class="sort" data-sort="name" scope="col">Prix</th>
                                                    <th class="sort" data-sort="name" scope="col">Devise</th>
                                                    <th class="sort" data-sort="name" scope="col">Emplacement</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="list form-check-all">
                                                <tr v-for="(item, index) in configs.examens" :key="index">
                                                    <td class="name">{{ item.examen_labo_libelle }}</td>
                                                    <td class="createBy">{{ item.examen_labo_prix }}</td>
                                                    <td class="createBy">{{ item.examen_labo_prix_devise }}</td>
                                                    <td class="createBy"><span v-if="item.emplacement">{{
                                                        item.emplacement.hopital_emplacement_libelle }}</span></td>
                                                    <td>
                                                        <button class="btn btn-soft-info btn-sm dropdown" type="button">
                                                            <i class="ri-share-forward-box-fill align-middle"></i>
                                                        </button>
                                                        <button class="btn btn-ghost-danger btn-sm dropdown" type="button">
                                                            <i class="ri-delete-bin-line align-middle"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div v-if="configs.examns">
                                            <div class="noresult" v-if="configs.examens.length === 0">
                                                <div class="text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                                        colors="primary:#121331,secondary:#08a88a"
                                                        style="width:75px;height:75px"></lord-icon>
                                                    <h5 class="mt-2">Desolé! Aucun resultat trouvé !</h5>
                                                    <p class="text-muted mb-0">Veuillez créer les examens médicaux !
                                                        !</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->
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
    </div>
    <examen-create-modal />
</template>

<script>
import ExamenCreateModal from "./modals/examen_config_add_modal"
export default {
    name: 'ExamensConfigPage',
    components: {
        ExamenCreateModal,
    },
    mounted() {
        this.$store.dispatch('services/showConfigs')
        this.$store.dispatch('labo/viewLabos')
    },
    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        }

    },
}
</script>