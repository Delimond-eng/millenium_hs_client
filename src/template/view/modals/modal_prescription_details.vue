<template>
    <teleport to="body">
        <div id="prescriptionDetailsModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4 ">
                        <h5 class="text-white fs-20">Préscription des soins médicaux</h5>
                        <div class="d-flex mt-2">
                            <span class="text-white-50 me-2 flex-fill" v-if="detail">Préscrit par : <strong
                                    class="text-white" v-if="detail.heading">{{ detail.heading.agent_nom }} {{
                                        detail.heading.agent_prenom }}</strong></span>
                            <span class="text-white-50 flex-fill" v-if="detail">Patient : <strong class="text-white"
                                    v-if="detail.heading">{{ detail.heading.patient_nom }} {{ detail.heading.patient_prenom
                                    }}</strong></span>
                        </div>
                    </div>
                    <div class="modal-body p-4">
                        <div class="live-preview" v-if="detail">
                            <!-- Small Tables -->
                            <table class="table table-sm table-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Traitement</th>
                                        <th scope="col">Posologie</th>
                                        <th scope="col">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in detail.detail" :key="index">
                                        <td>{{ data.prescription_traitement }}</td>
                                        <td>{{ data.prescription_posologie }}</td>
                                        <td>{{ data.prescription_traitement_type }}</td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <div class="d-flex justify-content-end align-items-end mt-2">
                            <button type="button" class="btn btn-light btn-border text-uppercase me-2"
                                @click="$closeBsModal('prescriptionDetailsModal')">Fermer</button>
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
        detail: {
            type: Array,
            default: () => { }
        }
    },

    methods: {
        /* validDemand() {
            this.loading = true;
            let consultId = this.detail.heading.consult_id;
            this.$store.dispatch('services/validateDemandeExam', consultId).then((res) => {
                console.log(res);
                this.loading = false;
                setTimeout(() => {
                    this.$closeBsModal('examenDetailsModal');
                }, 1000)
            }).catch((e) => {
                this.loading = false;
                console.log(e);
            })
        }, */
    },
}
</script>