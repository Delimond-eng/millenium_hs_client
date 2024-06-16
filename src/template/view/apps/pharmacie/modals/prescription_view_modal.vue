<template>
  <teleport to="body">
    <div id="prescription-view-modal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Encaissement d'une prescription</h5>
            <p class="text-white-50 mb-1">
              Veuillez entrer le code de la prescription pour voir les produits prescrits !
            </p>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="onSearch" class="d-flex mb-3">
              <div class="search-box flex-fill me-2">
                <input type="text" class="form-control form-control-lg" id="searchProductList"
                  placeholder="Entrez le code de la prescription..." v-model="search" required />
                <i class="ri-search-line search-icon"></i>
              </div>
              <button type="submit" class="btn btn-secondary btn-icon btn-lg">
                <i class="ri-search-2-line"></i>
              </button>
            </form>
            <div class="table-responsive">
              <table v-if="prescriptions.length > 0" class="table align-middle table-nowrap mb-0">
                <thead class="table-info">
                  <tr>
                    <th scope="col" style="width: 50px"></th>
                    <th class="sort fw-bold" scope="col">Produit</th>
                    <th class="sort fw-bold" style="width: 200px" scope="col">
                      Quantité
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in prescriptions" :key="index">
                    <td>{{ `${index + 1}`.padStart(2, "0") }}</td>
                    <td><span v-if="data.produit">{{ data.produit.produit_libelle }} - {{ data.produit.type.type_libelle
                        }}</span></td>
                    <td>{{ data.prescription_traitement_qte }}</td>
                    <td><button class="btn btn-icon btn-secondary" @click="onSelect(data)"><i class="ri-add-line"></i>
                      </button></td>
                  </tr>
                </tbody>
              </table>
              <state-empty v-else title="Encaissement prescription médicale !" :expanded="false"
                description="Veuillez entrez le code sur la prescription pour voir le produit !"></state-empty>
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
  name: "PrescriptionViewModal",
  data() {
    return {
      search: "",
      id: "",
      prescriptions: []
    };
  },
  methods: {
    onSelect(data) {
      for (var item of this.produits) {
        if (item.stock < data.prescription_traitement_qte) {
          Swal({
            icon: "warning",
            title: "Avertissement de stock !",
            text: `le stock actuel pour ce produit est de ${item.stock} unités !`,
          });
          return;
        }
        if (item.produit_id === data.produit_id) {
          item.operation_qte = data.prescription_traitement_qte;
          this.$store.dispatch('pharmacie/addToCart', item);
          let index = this.prescriptions.indexOf(data);
          this.prescriptions.splice(index, 1);
          if (this.prescriptions.length === 0) {
            this.$closeBsModal("prescription-view-modal");
          }
        }
      }
    },

    onSearch(e) {
      Swal.fire({
        text: 'Chargement...',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.$store.dispatch('pharmacie/showPrescription', this.search).then((res) => {
        this.prescriptions = res;
        Swal.close();
      })
    }
  },

  computed: {
    produits() {
      return this.$store.getters['pharmacie/GET_SELL_PRODUCTS'];
    }
  },
};
</script>
