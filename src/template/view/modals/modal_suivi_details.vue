<template>
  <teleport to="body">
    <div
      id="suiviDetailsModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Liste des soins administrés</h5>
          </div>
          <div class="modal-body p-4">
            <table class="table table-hover table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Médicament</th>
                  <th scope="col">dosage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in traitements" :key="index">
                  <td>{{ `${index + 1}`.padStart(2, "0") }}</td>
                  <td>
                    <span v-if="item.prescription">{{
                      item.prescription.produit.produit_libelle
                    }}</span>
                  </td>
                  <td>
                    <span v-if="item.prescription">
                      {{ item.prescription.prescription_traitement_dosage }}
                      {{ item.prescription.prescription_traitement_dosage_unite }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-end align-items-end">
              <button
                type="button"
                class="btn btn-light btn-border mt-2 text-uppercase me-2"
                @click="$closeBsModal('suiviDetailsModal')"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </teleport>
</template>

<script>
export default {
  name: "SuiviDetailsModal",
  props: {
    traitements: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
