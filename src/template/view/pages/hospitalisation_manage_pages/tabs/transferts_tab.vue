<template>
    <div id="transferts" role="tabpanel">
        <div class="row">
            <div class="col-12 col-md-12 mb-2">
                <div class=" d-sm-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="mb-sm-0 text-uppercase fw-semibold">Rapport des transferts des patients<sup
                                class="text-danger text-lowercase fw-normal"></sup>
                        </h5>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="table-responsive table-card text-center mt-2">
                    <table class="table align-middle table-nowrap table-striped-columns mb-0 mt-2">
                        <thead class="table-light">
                            <tr>
                                <th scope="col">Date création</th>
                                <th scope="col">Date & heure transfert</th>
                                <!-- <th scope="col">Raison d'admission</th> -->
                                <th scope="col">Numéro lit origine</th>
                                <th scope="col">Numéro lit destination</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Responsable</th>
                                <th scope="col">Créé par</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in datas.transferts" :key="index">
                                <td>{{ data.transfert_created_At }}</td>
                                <td>{{ data.transfert_date_heure }}</td>
                                <!--  <td>{{ data.hospitalisation_raison_admission }}</td> -->
                                <td><span v-if="data.origine">{{ data.origine.lit_numero }}</span></td>
                                <td><span v-if="data.destination">{{ data.destination.lit_numero }}</span></td>

                                <td><span v-if="data.hospitalisation.patient"><span class="fw-medium">{{
                                    data.hospitalisation.patient.patient_code }}</span>
                                        {{ data.hospitalisation.patient.patient_nom }}
                                        {{ data.hospitalisation.patient.patient_prenom }}</span></td>
                                <td><span v-if="data.hospitalisation.agent"><span class="fw-medium">{{
                                    data.hospitalisation.agent.agent_code }}</span>
                                        {{ data.hospitalisation.agent.agent_nom }}
                                        {{ data.hospitalisation.agent.agent_prenom }}</span></td>
                                <td>
                                    <button class="btn btn-soft-danger btn-sm btn-icon">
                                        <!-- <svg-loading v-if="loadedDetail === data.consult_id" color="#0C8BCF"
                                            size="18"></svg-loading> -->
                                        <i class="ri-delete-bin-3-line"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <state-empty v-if="datas.transferts === undefined || datas.transferts.length === 0"
                        title="Pas de données disponible !" description="Aucun transfert répertorié !"></state-empty>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TransfertsTab",

    computed: {
        datas() {
            return this.$store.getters['hospitalisation/GET_ALL_DATAS'];
        }
    },
}
</script>