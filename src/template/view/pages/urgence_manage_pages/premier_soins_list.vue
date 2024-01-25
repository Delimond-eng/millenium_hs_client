<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des Premiers soins effectués
                            </h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="me-2"><a href="#/home/premiers_soins" class="btn btn-secondary btn-sm"><i
                                                class="ri-add-line me-1"></i>Administrer prémiers soins</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <custom-table v-if="isEmplacementDefined"
                                    :api-url="`/premiersoins.all/${this.$user().hopital.emplacement.id}`"
                                    :columns="dataTableColumns" :data-src="'results'" ref="dataTableConsult"
                                    :action-buttons="actionButtons" @actionButtonClick="handleActionButtonClick" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        © Millenium HS
                    </div>
                    <div class="col-sm-6">
                        <div class="text-sm-end d-none d-sm-block">
                            &copy; Powered by Millenium Horizon
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <soins-details-modal :details="soins"></soins-details-modal>
</template>

<script>
import SoinsDetailsModal from './modals/soins_details_modal';
export default {
    name: 'PremierSoinList',

    components: {
        SoinsDetailsModal,
    },
    data() {
        return {
            dataTableColumns: [
                { data: 'premier_soin_date_heure', title: "Date & heure" },
                { data: 'premier_soin_motif', title: "Motif" },
                { data: 'premier_soin_obs', title: "Observation" },
                {
                    data: null,
                    title: 'Patient',
                    render: function (data, type, row) {
                        return row.patient.patient_code + ' ' + row.patient.patient_nom + ' ' + row.patient.patient_prenom;
                    },
                },

                {
                    data: null,
                    title: 'Effectué par',
                    render: function (data, type, row) {
                        // Concaténer les valeurs de agent_nom et agent_prenom
                        return row.agent.agent_matricule + ' ' + row.agent.agent_nom + ' ' + row.agent.agent_prenom;
                    },
                },

            ],
            actionButtons: [
                { label: '<i class="ri-eye-2-line"></i>', class: 'btn-secondary me-1', key: 'details' },
                { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
            ],
            soins: []
        }
    },

    methods: {
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case 'details':
                    this.soins = payload.data.traitements;
                    this.$showBsModal('soinsDetailsModal')
                    break;
                case 'delete':
                    console.log("");
                    break;
            }
        },
    },
    computed: {
        isEmplacementDefined() {
            return this.$user().hopital !== undefined && this.$user().hopital.emplacement !== undefined;
        }
    },
}
</script>