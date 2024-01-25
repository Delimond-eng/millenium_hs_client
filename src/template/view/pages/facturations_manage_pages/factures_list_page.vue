<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Historique de facturations & paiements
                            </h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="me-2"><a href="#/home/facture/create" class="btn btn-secondary btn-sm"><i
                                                class="ri-add-line me-1"></i> Nouveau paiement</a>
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
                                    :api-url="`/paiements.all/${this.$user().hopital.emplacement.id}`"
                                    :columns="dataTableColumns" :data-src="'paiements'" ref="dataTableFactures"
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
</template>

<script>
export default {
    name: 'FacturesList',
    data() {
        return {
            dataTableColumns: [
                { data: 'paiement_created_At', title: "Date & heure" },
                { data: 'facturation.facturation_config_libelle', title: "Libelle" },
                {
                    data: null,
                    title: 'Montant payé',
                    render: function (data, type, row) {
                        return row.paiement_montant + ' ' + row.paiement_montant_devise;
                    },
                },
                {
                    data: null,
                    title: 'Montant à payer',
                    render: function (data, type, row) {
                        return row.facturation.facturation_config_montant + ' ' + row.facturation.facturation_config_montant_devise;
                    },
                },
                {
                    data: null,
                    title: 'Patient',
                    render: function (data, type, row) {
                        return row.patient.patient_code + ' ' + row.patient.patient_nom + ' ' + row.patient.patient_prenom;
                    },
                },
                {
                    data: null,
                    title: 'Effectuer par',
                    render: function (data, type, row) {
                        return row.user.name;
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