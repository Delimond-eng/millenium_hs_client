<template>
    <teleport to="body">
        <div id="examenDetailsModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4 ">
                        <h5 class="text-white fs-20">Demande des examens médicaux</h5>
                        <div class="d-flex mt-2">
                            <span class="text-white-50 me-2 flex-fill" v-if="detail">Préscrit par : <strong
                                    class="text-white" v-if="detail.heading">{{ detail.heading.agent_nom }}</strong></span>
                            <span class="text-white-50 flex-fill" v-if="detail">Patient : <strong class="text-white"
                                    v-if="detail.heading">{{ detail.heading.patient_nom }}</strong></span>
                        </div>
                    </div>
                    <div class="modal-body p-4">
                        <div class="live-preview">
                            <ul class="list-group" v-if="detail">
                                <li v-for="(data, index) in detail.detail" :key="index" class="list-group-item"><i
                                        class="mdi mdi-check-bold align-middle lh-1 me-2"></i><span v-if="data.examen"> {{
                                            data.examen.examen_labo_libelle }}</span></li>
                            </ul>
                        </div>
                        <div class="d-flex justify-content-end align-items-end">
                            <button type="button" class="btn btn-light btn-border mt-2 text-uppercase me-2"
                                @click="$closeBsModal('examenDetailsModal')">Fermer</button>
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
    name: 'ExamenDetailsModal',
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