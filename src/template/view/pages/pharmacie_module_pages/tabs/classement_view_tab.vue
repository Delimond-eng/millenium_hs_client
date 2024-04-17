<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <custom-table
            v-if="isPharmacieDefined"
            :api-url="`/pharmacie.operations.all/${$user().pharmacie_id}/classement`"
            :columns="dataTableColumns"
            :action-buttons="actionButtons"
            :data-src="'operations'"
            ref="customTableClassement"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Classement_view_tab",
  data() {
    return {
      dataTableColumns: [
        { data: "operation_created_At", title: "DATE" },
        { data: "produit.produit_libelle", title: "PRODUIT" },
        { data: "produit.type.type_libelle", title: "PRODUIT TYPE" },
        { data: "operation_qte", title: "QUANTITE" },
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
    isPharmacieDefined() {
      return this.$user().pharmacie_id !== null;
    },
  },
};
</script>
