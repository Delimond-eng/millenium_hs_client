<template>
    <div class="tab-pane fade show active" id="pills-bill-info" role="tabpanel" aria-labelledby="pills-bill-info-tab">

        <div class="row">
            <div class="col-md-12">
                <custom-table v-if="isEmplacementDefined" :api-url="`/consult.examens/${$user().hopital.emplacement.id}`"
                    :columns="dataTableColumns" :data-src="'examens'" ref="dataTableExamens" :action-buttons="actionButtons"
                    @actionButtonClick="handleActionButtonClick" />
            </div>
        </div>
    </div>
    <examen-details-modal :detail="selectedExamConsult" />
</template>
<script>
import examenDetailsModal from "../../../modals/modal_examen_details"
export default {
    name: 'ExamensDemandeTab',
    components: {
        examenDetailsModal,
    },
    data() {
        return {
            dataTableColumns: [
                { data: 'consult_examen_create_At', title: "Date & heure" },
                {
                    data: null,
                    title: 'Patient',
                    render: function (data, type, row) {
                        return row.patient_code + ' ' + row.patient_nom + ' ' + row.patient_prenom;
                    }
                },
                {
                    data: null,
                    title: 'Médecin',
                    render: function (data, type, row) {
                        return row.agent_matricule + ' ' + row.agent_nom + ' ' + row.agent_prenom;
                    }
                },
                { data: 'consult_examen_status', title: 'Status' },
            ],
            actionButtons: [
                { label: 'Valider', class: 'btn-soft-success btn-load btn-sm me-1', key: 'validate' },
                { label: 'Voir détails', class: 'btn-soft-secondary', key: 'details' },
            ],
            selectedExamConsult: null,
        }
    },

    methods: {
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case 'validate':
                    Swal.fire({
                        text: 'Chargement...',
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    this.$store.dispatch('services/validateDemandeExam', payload.data.consult_id).then((res) => {
                        this.$refs.dataTableExamens.reloadData();
                        Swal.close();
                    }).catch((e) => {
                        Swal.close();
                    })
                    break;
                case 'details':
                    this.showDetail(payload.data)
                    break;
                default:
                    break;
            }
        },


        showDetail(data) {
            Swal.fire({
                text: 'Chargement...',
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            this.$store.dispatch('services/showExamDetails', data.consult_id).then((res) => {
                Swal.close();
                let detail = {
                    heading: data,
                    detail: res.detail
                };
                this.selectedExamConsult = detail;
                this.$showBsModal('examenDetailsModal');
            }).catch((e) => {

                Swal.close();

            })
        },
    },

    computed: {
        isEmplacementDefined() {
            return this.$user().hopital !== undefined && this.$user().hopital.emplacement !== undefined;
        }
    }
}
</script>