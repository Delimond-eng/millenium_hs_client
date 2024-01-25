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
                                    <li class="breadcrumb-item"><a href="javascript: void(0);"
                                            class="btn btn-sm btn-border btn-secondary text-white"
                                            @click="$router.push('/home/med/create')"><i
                                                class="ri-add-fill me-1 align-bottom"></i> Nouveau agent</a></li>
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
                                <!-- <custom-table :api-url="'http://127.0.0.1:8000/api/hospitalisations.all/2'"
                                    :columns="dataTableColumns" :data-src="'hospitalisations'" ref="customDataTable" /> -->
                                <!-- <div class="live-preview">
                                    <div class="table-responsive table-card">
                                        <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                            <thead class="table-secondary text-uppercase">
                                                <tr>
                                                    <th scope="col">MATRICULE</th>
                                                    <th scope="col">Nom complet</th>
                                                    <th scope="col">Sexe</th>
                                                    <th scope="col">Téléphone</th>
                                                    <th scope="col">Spécialité</th>
                                                    <th scope="col">Service</th>
                                                    <th scope="col">Fonction</th>
                                                    <th scope="col">Emplacement/site</th>
                                                    <th scope="col" style="width: 150px;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in agents" :key="index">
                                                    <td>{{ item.agent_matricule }}</td>
                                                    <td>{{ item.agent_nom }} {{ item.agent_prenom }}</td>
                                                    <td>{{ item.agent_sexe }}</td>
                                                    <td>{{ item.agent_telephone }}</td>
                                                    <td>{{ item.agent_specialite }}</td>
                                                    <td><span v-if="item.service">{{ item.service.service_libelle }}</span>
                                                    </td>
                                                    <td><span v-if="item.fonction">{{ item.fonction.fonction_libelle
                                                    }}</span></td>
                                                    <td><span v-if="item.emplacement">{{
                                                        item.emplacement.hopital_emplacement_libelle
                                                    }}</span></td>
                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-sm btn-info me-2">Editer</button>
                                                        <button type="button" class="btn btn-sm btn-light"><i
                                                                class="ri-delete-bin-3-line"></i></button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                        <state-empty v-if="agents.length === 0" title="Aucune information répertoriée !"
                                            description="Veuillez créer des agents dans le système !"></state-empty>
                                    </div>
                                </div> -->
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
                { data: 'agent_matricule', title: "N° Matricule" },
                {
                    data: null,
                    title: 'Nom complet',
                    render: function (data, type, row) {
                        return row.agent_nom + ' ' + row.agent_prenom;
                    }
                },
                { data: 'agent_sexe', title: 'Sexe' },
                { data: 'agent_telephone', title: 'Téléphone' },
                { data: 'agent_specialite', title: 'Spécialité' },
                { data: 'fonction.fonction_libelle', title: 'Fonction' },
                { data: 'service.service_libelle', title: 'Service' },
                { data: 'emplacement.hopital_emplacement_libelle', title: 'Emplacement' }
            ],
            /* actionButtons: [
                { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
                { label: '<i class="ri-edit-2-line"></i>', class: 'btn-soft-secondary', key: 'edit' },
            ], */
        }
    },

    methods: {
        refreshData() {
            this.$refs.customTableAgents.reloadData();
        },
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
        isHopitalDefined() {
            return this.$user().hopital !== undefined;
        },
    },
}
</script>