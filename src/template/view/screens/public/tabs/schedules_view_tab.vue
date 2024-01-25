<template>
    <div class="tab-pane fade" id="schedules" role="tabpanel">
        <div class="row mb-3">
            <div class="col-sm mt-sm-0">
                <h6 class="fw-semibold mb-0">Les rendez-vous en attente</h6>
            </div>
            <div class="col-auto order-2 order-sm-3 ms-auto">
                <div class="hstack gap-2">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button class="btn btn-icon btn-sm fw-semibold btn-primary"><i class="ri-list-check"></i></button>
                        <button class="btn btn-icon btn-sm fw-semibold btn-soft-primary"><i
                                class="ri-calendar-event-line"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">

            <div class="col-md-12">
                <custom-table v-if="isEmplacementDefined" :api-url="`/schedules.all/${$user().hopital.emplacement.id}`"
                    :columns="dataTableColumns" :data-src="'schedules'" ref="customTablePatients2"
                    :action-buttons="actionButtons" />
            </div>
        </div>
    </div>
    <!--  <examen-details-modal :detail="selectedExamConsult" /> -->
</template>
<script>
export default {
    name: 'ExamensDemandeTab',
    data() {
        return {
            dataTableColumns: [
                { data: 'schedule_date_heure', title: "Date & heure" },
                {
                    data: null,
                    title: 'Patient',
                    render: function (data, type, row) {
                        // Concaténer les valeurs de agent_nom et agent_prenom
                        return row.patient.patient_code + ' ' + row.patient.patient_nom + ' ' + row.patient.patient_prenom;
                    },
                },
                {
                    data: null,
                    title: 'Médecin',
                    render: function (data, type, row) {
                        // Concaténer les valeurs de agent_nom et agent_prenom
                        return row.agent.agent_matricule + ' ' + row.agent.agent_nom + ' ' + row.agent.agent_prenom;
                    },
                },
                { data: 'schedule_duree', title: 'Durée' },
                { data: 'schedule_status', title: 'Status' },
            ],
            actionButtons: [
                { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
            ]
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
        }
    },

    computed: {
        isEmplacementDefined() {
            return this.$user().hopital !== undefined && this.$user().hopital.emplacement !== undefined;
        }
    }
}
</script>