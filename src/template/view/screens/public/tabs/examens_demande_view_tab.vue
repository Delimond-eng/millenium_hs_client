<template>
    <div class="tab-pane fade show active" id="pills-bill-info" role="tabpanel" aria-labelledby="pills-bill-info-tab">

        <div class="row">
            <div class="col-md-12">
                <custom-table v-if="isEmplacementDefined"
                    :api-url="`http://127.0.0.1:8000/api/consult.examens/${$user().hopital.emplacement.id}`"
                    :columns="dataTableColumns" :data-src="'examens'" ref="dataTableExamens" :action-buttons="actionButtons"
                    @actionButtonClick="handleActionButtonClick" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExamensDemandeTab',

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
                { label: 'Valider', class: 'btn-soft-success btn-load btn-sm me-1', key: 'delete' },
                { label: 'Voir détails', class: 'btn-soft-secondary', key: 'edit' },
            ],
        }
    },

    methods: {
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case 'delete':
                    console.log("delete", JSON.stringify(payload.data));
                    break;
                case 'edit':
                    console.log("edit", JSON.stringify(payload.data));
                    break;
                default:
                    break;
            }
        },
    },

    computed: {
        isEmplacementDefined() {
            return this.$user().hopital !== undefined && this.$user().hopital.emplacement !== undefined;
        }
    }
}
</script>