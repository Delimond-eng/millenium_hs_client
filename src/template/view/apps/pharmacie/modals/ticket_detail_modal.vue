<template>
    <teleport to="body">
        <div class="modal fade" id="ticket-detail-modal" tabindex="-1" aria-labelledby="detailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myLargeModalLabel">Facture détails</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive table-card mt-2">
                            <table
                                class="table table-hover table-borderless table-centered align-middle table-nowrap mb-0">
                                <thead class="text-black bg-light-subtle">
                                    <tr>
                                        <th>Heure</th>
                                        <th>Produit</th>
                                        <th>Catégorie</th>
                                        <th>Type</th>
                                        <th>Quantité</th>
                                        <th>PU</th>
                                        <th>PT</th>
                                        <th>Devise</th>
                                        <th>Client</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <!-- end thead -->
                                <tbody v-if="items.length > 0">
                                    <tr v-for="(data, index) in items" :key="index">
                                        <td>{{ data.operation_created_At.split(" ")[1] }}</td>
                                        <td>
                                            <span v-if="data.produit">{{ data.produit.produit_libelle }}</span>
                                        </td>
                                        <td>
                                            <span v-if="data.produit.categorie">{{
                                    data.produit.categorie.categorie_libelle
                                }}</span>
                                        </td>
                                        <td>
                                            <span v-if="data.produit.type">{{
                                    data.produit.type.type_libelle
                                }}</span>
                                        </td>
                                        <td>{{ data.operation_qte }}</td>
                                        <td>{{ data.produit_prix }}</td>
                                        <td>{{ parseFloat(data.produit_prix) * data.operation_qte }}</td>
                                        <td>{{ data.produit_prix_devise }}</td>
                                        <td>
                                            <span v-if="data.client">{{ data.client.client_nom }}</span>
                                        </td>
                                        <td>
                                            <button @click="deleteOperation(data.id)"
                                                class="btn btn-sm btn-icon btn-soft-danger">
                                                <span v-if="data.id === deleted_id" class="spinner-border flex-shrink-0"
                                                    style="height: 20px; width: 20px" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </span>
                                                <i class="ri-delete-bin-3-line" v-else></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <!-- end tbody -->
                            </table>
                            <!-- end table -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            deleted_id: "",
        };
    },

    methods: {
        deleteOperation(id) {
            let self = this;
            Swal.fire({
                title: "Etes-vous sûr ?",
                text: "Voulez-vous vraiment supprimer cette vente !",
                icon: "warning",
                showCancelButton: !0,
                confirmButtonText: "Confirmez!",
                cancelButtonText: "Annulez!",
                confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
                cancelButtonClass: "btn btn-danger w-xs mt-2",
                buttonsStyling: !1,
                showCloseButton: !0,
            }).then(function (t) {
                if (t.value) {
                    self.deleted_id = id;
                    self.$store
                        .dispatch("pharmacie/deleteSell", { id: id, table: "operations" })
                        .then((res) => {
                            self.deleted_id = "";
                            if (res.status !== undefined) {
                                self.$closeBsModal("ticket-detail-modal");
                                Swal.fire({
                                    position: "bottom-end",
                                    icon: "info",
                                    title: "Produit supprimé de la facture avec succès !",
                                    showConfirmButton: !1,
                                    timer: 1500,
                                    toast: true,
                                    showCloseButton: !0,
                                });
                            }
                        });
                }
            });
        },
    },
};
</script>
