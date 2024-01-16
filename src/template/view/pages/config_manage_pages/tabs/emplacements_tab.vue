<template>
    <div role="tabpanel">
        <div class="card">
            <div class="card-body">
                <div class="card-body">
                    <!-- Tab panes -->
                    <div class="row">
                        <div class="col-md-12">
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
                                            <td class="status"><span class="badge bg-info-subtle text-info">actif</span>
                                            </td>
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
                </div>
            </div>
        </div>

        <div class="customizer-setting d-block">
            <div class="btn-secondary text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$showBsModal('emplacementCreateModal')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
    <emplacement-create-modal />
</template>

<script>
import emplacementCreateModal from "../modals/modal_create_emplacement"
export default {
    name: 'Emplacements-tab',
    components: {
        emplacementCreateModal
    },

    computed: {
        emplacements() {
            return this.$store.getters['services/GET_EMPLACEMENTS'];
        }
    },
}
</script>