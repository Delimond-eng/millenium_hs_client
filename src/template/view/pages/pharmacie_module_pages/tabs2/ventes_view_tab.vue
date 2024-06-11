<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <custom-table v-if="user.pharmacie"
                        :api-url="`/pharmacie.produit.operations/${user.pharmacie.id}?key=Vente&id=${$route.params.id}`"
                        :columns="dataTableColumns" :data-src="'operations'" ref="customTableVenteByProduct" />
                    <!-- <custom-table v-else :api-url="'/pharmacie.stocks'" :columns="dataTableColumns" :data-src="'stocks'"
                        ref="customTableApprov" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sells_view_tab",

    props: {
        produit: {
            type: Object,
            default: () => { }
        },
    },
    data() {
        return {
            dataTableColumns: [
                { data: "operation_created_At", title: "DATE" },
                { data: "produit.produit_libelle", title: "PRODUIT" },
                { data: "produit.type.type_libelle", title: "PRODUIT TYPE" },
                { data: "operation_qte", title: "QUANTITE" },
                { data: "user.name", title: "UTILISATEUR" },
            ],
            /* actionButtons: [                                                                                                { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' }                                                                                             { label: '<i class="ri-edit-2-line"></i>', class: 'btn-soft-secondary', key: 'edit' }                                                                                         ], */
        };
    },
    computed: {
        user() {
            return this.$store.getters['auth/GET_USER'];
        }
    },
};
</script>
