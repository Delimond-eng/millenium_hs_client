<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <custom-table v-if="user.pharmacie"
            :api-url="`/pharmacie.produit.operations/${user.pharmacie.id}?key=transfert&id=${$route.params.id}`"
            :columns="dataTableColumns" :action-buttons="actionButtons" :data-src="'operations'"
            ref="customTableTransfert" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Transfert_view_tab",
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
        { data: "pharmacie_destination.pharmacie_nom", title: "PHARMACIE DESTINATEUR" },
        { data: "user.name", title: "UTILISATEUR" },
      ],
      actionButtons: [
        {
          label: '<i class="ri-delete-bin-3-line"></i>',
          class: "btn-soft-danger me-1",
          key: "delete",
        },
      ],
    };
  },

  computed: {
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },
};
</script>
