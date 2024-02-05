<template>
    <div class="tab-pane fade" id="patient-pending" role="tabpanel">
        <div class="row">
            <div class="col-md-12">
                <custom-table v-if="isEmplacementDefined" :api-url="`/patients.pending/${$user().hopital.emplacement.id}`"
                    :columns="dataTableColumns" :data-src="'patients'" ref="customTablePatients2"
                    :action-buttons="actionButtons" @actionButtonClick="handleActionButtonClick" />
            </div>
        </div>
    </div>
    <!--  <examen-details-modal :detail="selectedExamConsult" /> -->
    <signe-vitaux-modal :detail="signes" />
</template>
<script>
import examenDetailsModal from "../../../modals/modal_examen_details";
import signeVitauxModal from "@/template/view/pages/patient_manage_pages/modals/signe_vitaux_modal.vue";
export default {
    name: "ExamensDemandeTab",
    components: {
        examenDetailsModal,
        signeVitauxModal,
    },
    data() {
        return {
            dataTableColumns: [
                { data: "patient_code", title: "Code" },
                {
                    data: null,
                    title: "Nom complet",
                    render: function (data, type, row) {
                        // Concaténer les valeurs de agent_nom et agent_prenom
                        return row.patient_nom + " " + row.patient_prenom;
                    },
                },
                { data: "patient_sexe", title: "Sexe" },
                { data: "patient_datenais", title: "Date naissance" },
                { data: "patient_telephone", title: "Téléphone" },
            ],
            actionButtons: [
                {
                    label: "Voir signes vitaux",
                    class: "btn-secondary me-1",
                    key: "view",
                    tooltip: "Voir signes vitaux du patient !",
                },
                {
                    label: '<i class="ri-check-double-fill"></i>',
                    class: "btn-success me-1",
                    tooltip: "Validation patient en cours !",
                    key: "validate",
                },
                {
                    label: '<i class="ri-delete-bin-3-line"></i>',
                    class: "btn-soft-danger me-1",
                    tooltip: "Suppression patient en cours !",
                    key: "delete",
                },
            ],
            selectedPatient: null,
            signes: null,
        };
    },

    methods: {
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case "validate":
                    Swal.fire({
                        text: "Chargement...",
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    this.$store
                        .dispatch("services/validateDemandeExam", payload.data.consult_id)
                        .then((res) => {
                            this.$refs.dataTableExamens.reloadData();
                            Swal.close();
                        })
                        .catch((e) => {
                            Swal.close();
                        });
                    break;
                case "view":
                    this.signes = payload.data.details[payload.data.details.length - 1];
                    this.$showBsModal("patientSignesVitauxModal");
                    break;
                case "details":
                    this.showDetail(payload.data);
                    break;
                default:
                    break;
            }
        },

        showDetail(data) {
            Swal.fire({
                text: "Chargement...",
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            this.$store
                .dispatch("services/showExamDetails", data.consult_id)
                .then((res) => {
                    Swal.close();
                    let detail = {
                        heading: data,
                        detail: res.detail,
                    };
                    this.selectedExamConsult = detail;
                    this.$showBsModal("examenDetailsModal");
                })
                .catch((e) => {
                    Swal.close();
                });
        },
    },

    computed: {
        isEmplacementDefined() {
            return (
                this.$user().hopital !== undefined &&
                this.$user().hopital.emplacement !== undefined
            );
        },
    },
};
</script>
