<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Approvisionnement</h2>
    </div>
    <form @submit.prevent="submitForm" class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div>
            <label for="basiInput" class="form-label">Pharmacie <sup class="text-danger">*</sup></label>
            <select class="form-select" v-model="form.pharmacie_id" required>
              <option label="Sélectionnez une pharmacie..." hidden selected></option>
              <option v-for="(data, index) in config.pharmacies" :key="index" :value="data.id">
                {{ data.pharmacie_nom }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <label for="basiInput" class="form-label">Produit <sup class="text-danger">*</sup></label>
            <select class="form-select" ref="fieldProd" required>
              <option label=""></option>
            </select>
          </div>
        </div>
      </div>
      <!-- Basic Input -->
      <div class="row">
        <div class="mt-2 col-md-6">
          <label for="basiInput" class="form-label">Quantité<sup class="text-danger">*</sup></label>
          <input type="text" v-model="form.stock_qte" class="form-control" id="basiInput"
            placeholder="Entrez la qté d'approvisionnement..." required />
        </div>
        <div class="mt-2 col-md-6">
          <label for="basiInput" class="form-label">Prix d'achat unitaire<sup class="text-danger">*</sup></label>
          <div class="d-flex">
            <input type="text" v-model="form.stock_pa" class="form-control me-2" id="basiInput"
              placeholder="Entrez le prix d'achat du stock..." required />
            <select v-model="form.stock_pa_devise" class="form-control" style="width: 100px" required>
              <option value="CDF" selected>CDF</option>
              <option value="USD">USD</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="mt-2 col-md-6">
          <label for="basiInput" class="form-label">Stock Date d'Expiration <sup class="text-danger">*</sup></label>
          <input type="date" v-model="form.stock_date_exp" class="form-control me-2" id="basiInput"
            placeholder="Entrez le libellé de la categorie" required />
        </div>
        <div class="mt-2 col-md-6">
          <label for="basiInput" class="form-label">Fournisseur <sup class="text-danger">*</sup></label>
          <select class="form-select" v-model="form.fournisseur_id" required>
            <option label="Sélectionnez un fournisseur..." hidden selected></option>
            <option v-for="(data, index) in config.fournisseurs" :key="index" :value="data.id">
              {{ data.fournisseur_nom }}
            </option>
          </select>
        </div>
      </div>

      <!-- Input with Label -->
      <div class="mt-2">
        <label for="labelInput" class="form-label">Observation <small>(optionnel)</small></label>
        <textarea class="form-control" v-model="form.stock_obs" placeholder="Entrez une observation..."></textarea>
      </div>

      <bs-toast id="errorsToastApprov" :msg="errors_msg" />

      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-end align-items-end">
            <load-button btn-type="submit" :loading="formLoading" class-name="btn btn-secondary btn-lg mt-3">
              <i class="ri-add-line"></i> Sauvegarder</load-button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Approvisionnement",

  data() {
    return {
      formLoading: false,
      errors_msg: "",
      form: {
        stock_qte: "",
        stock_date_exp: "",
        stock_pa: "",
        stock_pa_devise: "CDF",
        stock_obs: "",
        produit_id: "",
        fournisseur_id: "",
        pharmacie_id: "",
      },
    };
  },

  methods: {
    //Initialise le Select2 produits
    initField() {
      let self = this;
      $(this.$refs.fieldProd)
        .select2({
          placeholder: "Sélectionner un produit...",
          data: $.map(self.config.produits, function (item) {
            return {
              text: `#${item.produit_code} | ${item.produit_libelle}`,
              id: item.id,
            };
          }),
        })
        .on("change", function (e) {
          let id = $(this).val();
          self.form.produit_id = id;
        });
    },

    //Submit
    submitForm(e) {
      this.formLoading = true;
      this.$store
        .dispatch("pharmacie/addStock", this.form)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoading = false;
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastApprov");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Nouveau stock ajouté avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.produit_id = "";
            this.form.stock_date_exp = "";
            this.form.stock_pa = "";
            this.form.stock_pa_devise = "CDF";
            this.form.stock_qte = "";
            $(this.$refs.fieldProd).val("").trigger("change");
          }
        })
        .catch((err) => (this.formLoading = false));
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
