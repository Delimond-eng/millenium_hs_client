<template>
    <teleport to="body">
        <div id="laboViewModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Liste des laboratoires</h5>
                        <p class="text-white-50">Vous pouvez manager vos laboratoires ici !</p>
                    </div>
                    <div class="modal-body  p-4">
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
                                            item.emplacement.hopital_emplacement_libelle }}</span></td>

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

                        <div class="row mt-4">
                            <div class="col-md-12">
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="$closeBsModal('laboViewModal')"
                                        class="btn btn-light btn-border btn-lg text-uppercase">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'LaboListModal',
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