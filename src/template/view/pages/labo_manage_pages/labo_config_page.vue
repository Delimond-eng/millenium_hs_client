<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des laboratoires</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="me-2"><a href="javascript:void(0)"
                                            class="btn btn-secondary btn-sm btn-border"
                                            @click="$showBsModal('laboCreateModal')"><i class="ri-add-line me-1"></i>
                                            Ajouter nouveau
                                            labo</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->

                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive table-card">
                                    <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Adresse</th>
                                                <th scope="col">Contact</th>
                                                <th scope="col">Emplacement</th>

                                                <th scope="col" style="width: 150px;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in labos" :key="index">
                                                <td>{{ item.labo_nom }}</td>
                                                <td>{{ item.labo_adresse }} </td>

                                                <td>{{ item.labo_telephone }}</td>
                                                <td><span v-if="item.emplacement">{{
                                                    item.emplacement.hopital_emplacement_libelle }}</span>
                                                </td>

                                                <td>
                                                    <button type="button" class="btn btn-sm btn-info me-2">Editer</button>
                                                    <button type="button" class="btn btn-sm btn-ghost-danger text-danger"><i
                                                            class="ri-delete-bin-3-line"></i></button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <state-empty v-if="labos.length === 0" title="Aucune information répertoriée !"
                                        description="Veuillez créer les laboratoires dans le système pour cette établissement !"></state-empty>
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
    <labos-create-modal />
</template>

<script>
import labosCreateModal from "./modals/labos_create_modal"
export default {
    name: 'LaboConfigPage',
    components: {
        labosCreateModal
    },
    mounted() {
        this.$store.dispatch('labo/viewLabos');
    },

    computed: {
        labos() {
            return this.$store.getters['labo/GET_LABOS']
        }
    },
}
</script>