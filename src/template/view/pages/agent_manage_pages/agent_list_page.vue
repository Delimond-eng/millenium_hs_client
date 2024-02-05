<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des médecins</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item">
                                        <a href="javascript: void(0);"
                                            class="btn btn-sm btn-border btn-secondary text-white"
                                            @click="$router.push('/home/med/create')"><i
                                                class="ri-add-fill me-1 align-bottom"></i> Nouveau agent</a>
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
                                <custom-table v-if="isHopitalDefined" :api-url="`/agents.all/${$user().hopital.id}`"
                                    :columns="dataTableColumns" :data-src="'agents'" ref="customTableAgents" />
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
                    <div class="col-sm-6">© Millenium HS</div>
                    <div class="col-sm-6">
                        <div class="text-sm-end d-none d-sm-block">
                            &copy; Powered by Millenium Horizon
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div class="customizer-setting d-block">
            <div class="btn-success text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$router.push('/home/med/create')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AgentList",
    data() {
        return {
            dataTableColumns: [
                { data: "agent_matricule", title: "N° Matricule" },
                {
                    data: null,
                    title: "Nom complet",
                    render: function (data, type, row) {
                        return row.agent_nom + " " + row.agent_prenom;
                    },
                },
                { data: "agent_sexe", title: "Sexe" },
                { data: "agent_telephone", title: "Téléphone" },
                {
                    data: null,
                    title: "Spécialité",
                    render: function (data, type, row) {
                        if (row.agent_specialite) {
                            return row.agent_specialite;
                        } else {
                            return "---";
                        }
                    },
                },
                {
                    data: null,
                    title: "Service",
                    render: function (data, type, row) {
                        if (row.fonction) {
                            return row.fonction.fonction_libelle;
                        } else {
                            return "---";
                        }
                    },
                },

                {
                    data: null,
                    title: "Service",
                    render: function (data, type, row) {
                        if (row.service) {
                            return row.service.service_libelle;
                        } else {
                            return "---";
                        }
                    },
                },
                { data: "emplacement.hopital_emplacement_libelle", title: "Emplacement" },
            ],
            /* actionButtons: [
                                              { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
                                              { label: '<i class="ri-edit-2-line"></i>', class: 'btn-soft-secondary', key: 'edit' },
                                          ], */
        };
    },

    methods: {
        refreshData() {
            this.$refs.customTableAgents.reloadData();
        },
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case "delete":
                    console.log("delete", JSON.stringify(payload.data));
                    break;
                case "edit":
                    console.log("edit", JSON.stringify(payload.data));
                    break;
                default:
                    break;
            }
        },
    },

    computed: {
        isHopitalDefined() {
            return this.$user().hopital !== undefined;
        },
    },
};
</script>
