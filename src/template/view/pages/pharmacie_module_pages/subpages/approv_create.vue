<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Approvisionnement</h2>
    </div>
    <div class="card-body">
      <div>
        <label for="basiInput" class="form-label">Produit <sup class="text-danger">*</sup></label>
        <select class="form-select" ref="fieldProd">
          <option label=""></option>
        </select>
      </div>
      <!-- Basic Input -->
      <div class="mt-2">
        <label for="basiInput" class="form-label">Quantité<sup class="text-danger">*</sup></label>
        <input type="text" class="form-control" id="basiInput" placeholder="Entrez la qté d'approvisionnement..." />
      </div>

      <div class="mb-2">
        <label for="basiInput" class="form-label">Stock Date d'Expiration <sup class="text-danger">*</sup></label>
        <input type="date" class="form-control" id="basiInput" placeholder="Entrez le libellé de la categorie" />
      </div>

      <div class="mt-2">
        <label for="basiInput" class="form-label">Fournisseur <sup class="text-danger">*</sup></label>
        <select class="form-select">
          <option label="-- Sélectionnez un fournisseur --"></option>
        </select>
      </div>

      <!-- Input with Label -->
      <div class="mt-2">
        <label for="labelInput" class="form-label">Observation <small>(optionnel)</small></label>
        <textarea class="form-control" placeholder="Entrez une observation..."></textarea>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-end align-items-end">
            <load-button btn-type="submit" :loading="formLoading"
              class-name="btn btn-success btn-lg mt-2">Sauvegarder</load-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Approvisionnement",

  data() {
    return {
      formLoading: false,
    };
  },

  methods: {
    initField() {
      let self = this;
      $(this.$refs.fieldProd)
        .select2({
          placeholder: "Sélectionner un produit...",
          allowClear: true,
          data: $.map(self.config.produits, function (item) {
            return {
              text: `${item.produit_code} ${item.produit_libelle}`,
              id: item.id,
            };
          }),
        })
        .on("change", function (e) {
          let id = $(this).val();
        });
    },
  },

  async mounted() {
    await this.$store.dispatch("pharmacie/allConfigs");
    this.initField();
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },
  },
};
</script>
