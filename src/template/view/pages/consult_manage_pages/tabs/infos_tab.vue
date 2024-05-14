<template>
    <div class="tab-pane fade active show" id="custom-v-pills-home" role="tabpanel"
        aria-labelledby="custom-v-pills-home-tab">
        <div>
            <div class="d-flex justify-content-between mt-3 align-items-center align-content-center"
                v-if="selectedPatient">
                <h6 class="fs-14 text-primary fw-bold">Infos récentes du patient</h6>
                <!-- <button class="btn btn-info btn-border btn-sm"> <i
                                                                class="ri-folder-5-line "></i> Voir le parcours du
                                                            patient</button> -->
                <div class="d-flex align-content-end align-items-center" v-if="selectedPatient">
                    <span class="me-1">N° Jeton :</span>
                    <span class="fw-bold text-primary fs-17">{{
                    selectedPatient.patient_code_appel
                }}</span>
                </div>
            </div>
            <div class="border-1 border-bottom mb-2" v-if="selectedPatient"></div>
            <div class="row" v-if="selectedPatient">
                <div class="col-md-6">
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <tbody class="text-black">
                                <tr>
                                    <th scope="row" style="width: 200px">Nom complet</th>
                                    <td>
                                        {{ selectedPatient.patient_nom }} {{ selectedPatient.patient_prenom }}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Sexe</th>
                                    <td>{{ selectedPatient.patient_sexe }}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Téléphone</th>
                                    <td>{{ selectedPatient.patient_telephone }}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Contact d'urgence</th>
                                    <td>{{ selectedPatient.patient_contact_urgence }}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Adresse</th>
                                    <td>{{ selectedPatient.patient_adresse }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <tbody class="text-black">
                                <tr>
                                    <th scope="row">Age</th>
                                    <td>
                                        {{
                    selectedPatient.details[selectedPatient.details.length - 1]
                        .patient_sv_age
                }}
                                        ans
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Taille</th>
                                    <td>
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                            .patient_sv_taille
                    }}
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                            .patient_sv_taille_unite
                    }}
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Poids</th>
                                    <td>
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                            .patient_sv_poids
                    }}
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                            .patient_sv_poids_unite
                    }}
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Temperature</th>
                                    <td>
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                            .patient_sv_temperature
                    }}
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                            .patient_sv_temperature_unite
                    }}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Tension arterielle</th>
                                    <td>
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                            .patient_sv_tension_art
                    }}
                                        {{
                        selectedPatient.details[selectedPatient.details.length - 1]
                                        .patient_sv_tension_art_unite
                                        }}
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Fréquence cardiaque</th>
                                    <td>
                                        {{
                                        selectedPatient.details[selectedPatient.details.length - 1]
                                        .patient_sv_freq_cardio
                                        }}
                                        {{
                                        selectedPatient.details[selectedPatient.details.length - 1]
                                        .patient_sv_freq_cardio_unite
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-12">
                    <button type="button" class="btn btn-secondary btn-border btn-label mt-2 right nexttab nexttab"
                        @click.prevent="triggerNext">
                        <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Procèder
                        à la consultation
                    </button>
                </div>
            </div>
            <state-empty v-else title="Sélection patient !"
                description="Veuillez sélectionner un patient dans la liste pour commencer la consultation !"></state-empty>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectedPatient: {
            type: Object,
            default: () => { },
        },
    },

    methods: {
        triggerNext() {
            $("#consultations-tab").click();
        },
    },
};
</script>
