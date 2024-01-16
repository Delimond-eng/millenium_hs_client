<template>
    <div role="tabpanel">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive table-card">
                            <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Libellé</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Emplacement</th>

                                        <th scope="col" style="width: 150px;"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="configs.services">
                                    <tr v-for="(item, index) in configs.services" :key="index">
                                        <!-- <td>{{ formatDate(item.service_create_At) }}</td> -->
                                        <td>{{ item.service_libelle }} </td>
                                        <td>{{ item.service_description }}</td>
                                        <td><span v-if="item.emplacement">{{
                                            item.emplacement.hopital_emplacement_libelle }}</span></td>

                                        <td>
                                            <button type="button" class="btn btn-sm btn-info me-2">Editer</button>
                                            <button type="button" class="btn btn-sm btn-ghost-danger text-danger"><i
                                                    class="ri-delete-bin-3-line"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <state-empty v-if="configs.services === undefined || configs.services.length === 0"
                                title="Aucune information répertoriée !"
                                description="Veuillez créer des agents dans le système !"></state-empty>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="customizer-setting d-block">
            <div class="btn-success text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$showBsModal('serviceCreateModal')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
    <service-create-modal />
</template>

<script>
import ServiceCreateModal from "../modals/service_config_add_modal";
export default {
    name: 'Services-tab',
    components: {
        ServiceCreateModal
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