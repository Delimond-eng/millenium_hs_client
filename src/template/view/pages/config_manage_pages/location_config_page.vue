<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Configuration</h4>
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
                                <h5 class="card-title flex-grow-1 mb-0">Hôpital Emplacements</h5>
                                <div class="d-flex gap-1 flex-wrap">

                                    <button type="button" @click="$showBsModal('emplacementCreateModal')"
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
                                                    <th class="sort" data-sort="name" scope="col">Designation
                                                        emplacement</th>
                                                    <th class="sort" data-sort="name" scope="col">Adresse</th>
                                                    <th class="sort" data-sort="name" scope="col">Status</th>
                                                    <th scope="col">actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="list form-check-all">
                                                <tr v-for="(item, index) in emplacements" :key="index">
                                                    <td class="name">{{ item.hopital_emplacement_libelle }}</td>
                                                    <td class="createBy">{{ item.hopital_emplacement_adresse }}</td>
                                                    <td class="status"><span
                                                            class="badge bg-info-subtle text-info">actif</span></td>
                                                    <td>
                                                        <button class="btn btn-soft-info btn-sm dropdown" type="button">
                                                            <i class="ri-share-forward-box-fill align-middle"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="noresult" v-show="emplacements.length === 0">
                                            <div class="text-center">
                                                <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                                    colors="primary:#121331,secondary:#08a88a"
                                                    style="width:75px;height:75px"></lord-icon>
                                                <h5 class="mt-2">Desolé! Aucun resultat trouvé !</h5>
                                                <p class="text-muted mb-0">Veuillez créer les emplacements pour cet hôpital
                                                    !</p>
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
    <emplacement-create-modal />
</template>

<script>
import emplacementCreateModal from "../../modals/modal_create_emplacement"
export default {
    name: 'LocationConfigPage',
    components: {
        emplacementCreateModal,
    },
    mounted() {
        this.$store.dispatch('services/viewAllEmplacements')
    },
    computed: {
        emplacements() {
            return this.$store.getters['services/GET_EMPLACEMENTS'];
        }
    },
}
</script>