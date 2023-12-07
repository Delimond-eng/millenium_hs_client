<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Gestion services<sup class="text-danger text-lowercase fw-normal"></sup>
                            </h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="me-2"><a href="javascript:void(0)"
                                            @click="$showBsModal('serviceCreateModal')" class="btn btn-soft-success"><i
                                                class="ri-add-line me-1"></i> Ajout service</a>
                                    </li><!--v-if-->
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
                                <div class="live-preview">
                                    <div class="table-responsive table-card">
                                        <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col">DATE</th>
                                                    <th scope="col">Libellé</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Emplacement</th>

                                                    <th scope="col" style="width: 150px;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in configs.services" :key="index">
                                                    <td>{{ formatDate(item.service_create_At) }}</td>
                                                    <td>{{ item.service_libelle }} </td>

                                                    <td>{{ item.service_description }}</td>
                                                    <td><span v-if="item.emplacement">{{
                                                        item.emplacement.hopital_emplacement_libelle }}</span></td>

                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-sm btn-info me-2">Editer</button>
                                                        <button type="button"
                                                            class="btn btn-sm btn-ghost-danger text-danger"><i
                                                                class="ri-delete-bin-3-line"></i></button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                        <state-empty v-if="configs.services.length === 0"
                                            title="Aucune information répertoriée !"
                                            description="Veuillez créer des agents dans le système !"></state-empty>
                                    </div>
                                </div>
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
    <service-create-modal />
</template>


<script>
import ServiceCreateModal from "@/template/view/pages/config_manage_pages/modals/service_config_add_modal";
export default {
    name: 'ServiceCreate',
    components: {
        ServiceCreateModal
    },
    mounted() {
        this.$store.dispatch('services/showConfigs');
    },


    methods: {

        formatDate(timestamp) {
            // Créer un nouvel objet Date avec le timestamp (en millisecondes)
            let date = new Date(timestamp * 1000);
            let year = date.getFullYear();
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);
            /* let hours = ("0" + date.getHours()).slice(-2);
            let minutes = ("0" + date.getMinutes()).slice(-2);
            let seconds = ("0" + date.getSeconds()).slice(-2); */
            let formattedDate = ` ${day}/${month}/${year}`;
            return formattedDate;
        },

        cleanField() {
            this.form.description = "";
            this.form.libelle = "";
            this.form.emplacement_id = "";
            this.$store.dispatch('services/showConfigs');
        },
    },



    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
        user() {
            return this.$store.getters['auth/GET_USER']
        },

    },
}
</script>