<template>
    <div class="tab-pane fade" id="prescription-tab" role="tabpanel" aria-labelledby="prescription-tab">

        <div class="row">
            <div class="col-md-12">
                <custom-table v-if="isEmplacementDefined"
                    :api-url="`http://127.0.0.1:8000/api/prescriptions.pending/${$user().hopital.emplacement.id}`"
                    :columns="dataTableColumns" :data-src="'prescriptions'" ref="dataTablePrescriptions"
                    :action-buttons="actionButtons" @actionButtonClick="handleActionButtonClick" />
            </div>
        </div>
    </div>
    <prescription-details-modal :detail="selectedPrescription" />
</template>

<script>
import prescriptionDetailsModal from "../../../modals/modal_prescription_details";
export default {
    name: 'PrescriptionsTab',
    components: {
        prescriptionDetailsModal
    },

    data() {
        return {
            dataTableColumns: [
                { data: 'prescription_create_At', title: "Date & heure" },
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
                { data: 'hopital_emplacement_libelle', title: 'Emplacement' },
            ],
            actionButtons: [
                { label: 'Valider', class: 'btn-soft-success btn-load btn-sm me-1', key: 'validate' },
                { label: 'Voir détails', class: 'btn-soft-secondary', key: 'details' },
            ],
            selectedPrescription: null,
        }
    },

    methods: {
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case 'validate':
                    this.validatePrescription(payload.data);
                    break;
                case 'details':
                    this.showPrescriptionDetails(payload.data);
                    break;
                default:
                    break;
            }
        },
        validatePrescription(data) {

            Swal.fire({
                text: 'Chargement...',
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            this.$store.dispatch('services/validatePrescription', data.consult_id).then((res) => {
                Swal.close();
                this.$refs.dataTablePrescriptions.reloadData();
            }).catch((e) => {
                Swal.close();
            })
        },

        showPrescriptionDetails(data) {
            console.log(data);
            Swal.fire({
                text: 'Chargement...',
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            this.$store.dispatch('services/showPrescriptionDetails', data.consult_id).then((res) => {
                Swal.close();
                let detail = {
                    heading: data,
                    detail: res.detail
                };
                this.selectedPrescription = detail;
                this.$showBsModal('prescriptionDetailsModal');
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