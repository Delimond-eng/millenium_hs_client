<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Transfert produits</h2>
    </div>
    <form @submit.prevent="submitForm" class="card-body">
      <div>
        <label for="basiInput" class="form-label">Produit <sup class="text-danger">*</sup></label>
        <select class="form-select" ref="fieldProd">
          <option value="" label="Chargement en cours..." selected></option>
        </select>
      </div>
      <!-- Basic Input -->
      <div class="mt-2">
        <label for="basiInput" class="form-label">Quantité<sup class="text-danger">*</sup></label>
        <input type="text" v-model="form.operation_qte" class="form-control" id="basiInput"
          placeholder="Entrez la qté à transférer..." />
      </div>

      <div class="mt-2">
        <label for="basiInput" class="form-label">Pharmacie de destination <sup class="text-danger">*</sup></label>
        <select class="form-select" v-model="form.pharmacie_dest_id">
          <option label="Sélectionnez une pharmacie..." selected hidden></option>
          <option v-for="(data, index) in config.pharmacies" :value="data.id" :key="index"
            :hidden="data.id === user.pharmacie_id">
            {{ data.pharmacie_nom }}
          </option>
        </select>
      </div>

      <!-- Input with Label -->
      <div class="mt-2">
        <label for="labelInput" class="form-label">Observation <small>(optionnel)</small></label>
        <textarea class="form-control" v-model="form.operation_obs" placeholder="Entrez une description..."></textarea>
      </div>
      <bs-toast id="errorsToastTransfert" :msg="errors_msg" />
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-end align-items-end">
            <load-button btn-type="submit" :loading="formLoading" class-name="btn btn-secondary btn-lg mt-2"><i
                class="ri-"></i> Transférer</load-button>
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
        produit_id: "",
        operation_libelle: "transfert",
        operation_obs: "",
        operation_qte: "",
        pharmacie_id: "1",
        pharmacie_dest_id: "",
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

    submitForm(e) {
      this.formLoading = true;
      this.$store
        .dispatch("pharmacie/createOperation", this.form)
        .then((res) => {
          this.formLoading = false;
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastTransfert");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Transfert du stock des produits effectués avec succès !",
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.operation_obs = "";
            this.form.operation_qte = "";
            this.form.pharmacie_dest_id = "";
            $(this.$refs.fieldProd).val("").trigger("change");
          }
        })
        .catch((err) => (this.formLoading = false));
    },
  },
};
</script>
