<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Classement des produits défectueux</h2>
    </div>
    <form @submit.prevent="submitForm" class="card-body">
      <div>
        <label for="basiInput" class="form-label">Produit <sup class="text-danger">*</sup></label>
        <select class="form-select" ref="fieldProd">
          <option label="Chargement en cours..."></option>
        </select>
      </div>
      <!-- Basic Input -->
      <div class="mt-2">
        <label for="basiInput" class="form-label">Quantité<sup class="text-danger">*</sup></label>
        <input type="text" v-model="form.operation_qte" class="form-control" id="basiInput"
          placeholder="Entrez la qté à classer..." />
      </div>
      <!-- Input with Label -->
      <div class="mt-2">
        <label for="labelInput" class="form-label">Observation <small>(optionnel)</small></label>
        <textarea v-model="form.operation_obs" class="form-control" placeholder="Entrez une observation..."></textarea>
      </div>

      <bs-toast id="errorsToastClassement" :msg="errors_msg" />

      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-end align-items-end">
            <button class="btn btn-lg btn-dark mt-2 me-2" type="reset">Annuler</button>
            <load-button btn-type="submit" :loading="formLoading" class-name="btn btn-lg btn-secondary mt-2">Classer &
              sauvegarder</load-button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Classement",

  data() {
    return {
      formLoading: false,
      errors_msg: "",
      form: {
        produit_id: "",
        operation_libelle: "classement",
        operation_obs: "",
        operation_qte: "",
        pharmacie_id: "",
      },
    };
  },

  async mounted() {
    await this.$store.dispatch("pharmacie/allConfigs");
    this.initField();
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },

    user() {
      return this.$store.getters["auth/GET_USER"];
    },
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
              text: `#${item.produit_code} | ${item.produit_libelle} - ${item.type.type_libelle}`,
              id: item.id,
            };
          }),
        })
        .on("change", function (e) {
          let id = $(this).val();
          self.form.produit_id = id;
        });
    },

    submitForm(e) {
      this.formLoading = true;
      this.form.pharmacie_id = this.$user().pharmacie.id;
      this.$store
        .dispatch("pharmacie/createOperation", this.form)
        .then((res) => {
          this.formLoading = false;
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastClassement");
            new bootstrap.Toast(toast, { delay: 2000 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Le classement est effectué avec succès !",
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.operation_obs = "";
            this.form.operation_qte = "";
            $(this.$refs.fieldProd).val("").trigger("change");
          }
        })
        .catch((err) => (this.formLoading = false));
    },
  },
};
</script>
