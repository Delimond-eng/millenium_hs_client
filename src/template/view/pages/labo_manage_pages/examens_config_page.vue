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
                                <ol class="breadcrumb m-0">
                                    <li class="me-2"><a href="javascript:void(0)"
                                            class="btn btn-secondary btn-sm btn-border"
                                            @click="$showBsModal('examensCreateModal')"><i class="ri-add-line me-1"></i>
                                            Ajouter nouveau examen</a>
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
                                <custom-table v-if="isHopitalDefined"
                                    :api-url="`http://127.0.0.1:8000/api/configs.all/${$user().hopital.id}`"
                                    :columns="dataTableColumns" :data-src="'configs.examens'" ref="customTableExamens"
                                    :action-buttons="actionButtons" />
                                <!-- <div class="table-responsive table-card mb-3">
                                    <table class="table align-middle table-nowrap mb-0">
                                        <thead class="table-secondary">
                                            <tr>
                                                <th class="sort" data-sort="name" scope="col">Libellé</th>
                                                <th class="sort" data-sort="name" scope="col">Prix</th>
                                                <th class="sort" data-sort="name" scope="col">Devise</th>
                                                <th class="sort" data-sort="name" scope="col">Resultat type</th>
                                                <th class="sort" data-sort="name" scope="col">Labo</th>
                                                <th class="sort" data-sort="name" scope="col">Emplacement</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody class="list form-check-all">
                                            <tr v-for="(item, index) in configs.examens" :key="index">
                                                <td class="name">{{ item.examen_labo_libelle }}</td>
                                                <td class="createBy">{{ item.examen_labo_prix }}</td>
                                                <td class="createBy">{{ item.examen_labo_prix_devise }}</td>
                                                <td class="createBy">{{ item.examen_resultat_type }}</td>
                                                <td class="createBy"><span v-if="item.labo">{{ item.labo.labo_nom }}</span>
                                                </td>
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
                                    <state-empty v-if="configs.examens === undefined || configs.examens.length === 0"
                                        title="Aucune information répertoriée !"
                                        description="Veuillez créer les laboratoires dans le système pour cette établissement !"></state-empty>
                                </div> -->
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
    <examen-create-modal @reload="$refs.customTableExamens.reloadData()" />
</template>

<script>
import ExamenCreateModal from "./modals/examen_config_add_modal"
export default {
    name: 'ExamensConfigPage',
    data() {
        return {
            dataTableColumns: [
                { data: 'examen_labo_libelle', title: "Libelle examen" },
                { data: 'examen_labo_prix', title: 'Prix' },
                { data: 'examen_labo_prix_devise', title: 'devise' },
                { data: 'examen_resultat_type', title: 'Type de resultat' },
                { data: 'labo.labo_nom', title: 'Laboratoire' },
                { data: 'emplacement.hopital_emplacement_libelle', title: 'Emplacement' }
            ],
            actionButtons: [
                { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
                { label: '<i class="ri-edit-2-line"></i>', class: 'btn-soft-secondary', key: 'edit' },
            ],
        }
    },
    components: {
        ExamenCreateModal,
    },

    mounted() {
        this.$store.dispatch('services/showConfigs')
        this.$store.dispatch('labo/viewLabos');
    },
    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
        isHopitalDefined() {
            return this.$user().hopital !== undefined;
        },

    },
}
</script>