<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Transferts des patients
                            </h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="me-2"><a href="javascript:void(0)"
                                            @click="$showBsModal('transfertsCreateModal')"
                                            class="btn btn-secondary btn-sm"><i class="ri-add-line me-1"></i> Nouveau
                                            tranfert</a>
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
                                    :api-url="`http://127.0.0.1:8000/api/transferts.all/${this.$user().hopital.emplacement.id}`"
                                    :columns="dataTableColumns" :data-src="'transferts'" ref="dataTableTransferts"
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
    <transfert-create-modal @reload="$refs.dataTableTransferts.reloadData()"></transfert-create-modal>
</template>

<script>
import TransfertCreateModal from './modals/create_transfert_modal'
export default {
    name: 'HomeView',
    data() {
        return {
            dataTableColumns: [
                { data: 'transfert_date', title: "Date & heure" },
                { data: 'transfert_motif', title: "Motif" },
                { data: 'transfert_hopital', title: "Hopital de destination" },
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
                { data: 'emplacement.hopital_emplacement_libelle', title: "Emplacement" },

            ],
            actionButtons: [
                { label: '<i class="ri-edit-2-line"></i>', class: 'btn-secondary me-1', key: 'edit' },
                { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
            ],
        }
    },
    components: {
        TransfertCreateModal
    },
    methods: {
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case 'edit':
                    console.log('');
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