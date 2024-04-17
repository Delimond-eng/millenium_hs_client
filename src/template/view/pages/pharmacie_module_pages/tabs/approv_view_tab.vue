<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <custom-table v-if="isPharmacieDefined" :api-url="`/pharmacie.stocks/1`" :columns="dataTableColumns"
                        :data-src="'stocks'" ref="customTableApprov" />
                    <!-- <custom-table v-else :api-url="'/pharmacie.stocks'" :columns="dataTableColumns" :data-src="'stocks'"
                        ref="customTableApprov" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Approv_view_tab",
    data() {
        return {
            dataTableColumns: [
                { data: "stock_created_At", title: "DATE" },
                { data: "produit.produit_code", title: "#CODE PRODUIT" },
                { data: "produit.produit_libelle", title: "LIBELLE PRODUIT" },
                { data: "stock_qte", title: "QTE STOCK" },
                {
                    data: null,
                    title: "PRIX D'ACHAT",
                    render: function (data, type, row) {
                        return row.stock_pa + " " + row.stock_pa_devise;
                    },
                },
                { data: "pharmacie.pharmacie_nom", title: "PHARMACIE" },
                { data: "fournisseur.fournisseur_nom", title: "FOURNISSEUR" },
                { data: "user.name", title: "UTILISATEUR" },
            ],
            /* actionButtons: [
                                                                                                    { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
                                                                                                    { label: '<i class="ri-edit-2-line"></i>', class: 'btn-soft-secondary', key: 'edit' },
                                                                                                ], */
        };
    },

    computed: {
        isPharmacieDefined() {
            return this.$user().pharmacie_id !== null;
        },
    },
};
</script>
