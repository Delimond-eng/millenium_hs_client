<template>
    <teleport to="body">
        <div id="soinsDetailsModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-dialog-right">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4 ">
                        <h5 class="text-white fs-20">Premiers soins sélectionnés !</h5>
                    </div>
                    <div class="modal-body p-4">
                        <div class="live-preview" v-if="details">
                            <!-- Small Tables -->
                            <table class="table table-sm table-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Traitement</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Dosage</th>
                                        <th scope="col">Unité</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in details" :key="index">
                                        <td>{{ data.ps_traitement_libelle }}</td>
                                        <td>{{ data.ps_traitement_type }}</td>
                                        <td>{{ data.ps_traitement_dosage }}</td>
                                        <td>{{ data.ps_traitement_unite }}</td>
                                        <td><button class="btn btn-icon btn-soft-danger btn-sm"><i
                                                    class="ri-delete-bin-3-line"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <div class="d-flex justify-content-end align-items-end mt-2">
                            <button type="button" class="btn btn-light btn-border text-uppercase me-2"
                                @click="$closeBsModal('soinsDetailsModal')">Fermer</button>
                            <!-- <load-button btn-type="button" @click="validDemand()" :loading="loading"
                                class-name="btn btn-success btn-border mt-2 text-uppercase">Valider</load-button> -->
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'PrescriptionDetailsModal',
    data() {
        return {
            loading: false
        }
    },
    props: {
        details: {
            type: Array,
            default: () => []
        }
    },
}
</script>