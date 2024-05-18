<template>
  <teleport to="body">
    <div id="modalFacturePayment" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Paiement de la facture</h5>
            <p class="text-white-50">
              Veuillez renseigner les informations requises pour une nouvelle visite !
            </p>
          </div>
          <div class="modal-body p-4">
            <form class="row" @submit.prevent="submitForm">
              <div class="row">
                <div class="col-md-12">
                  <label for="hsnom">Patient payeur<sup class="text-danger">*</sup></label>
                  <select2 placeholder="Sélectionnez un patient qui paye..." v-model="paiement.patient_id"
                    :options="patients" :settings="{ settingOption: value, settingOption: value }" :required="true" />
                </div>
                <div class="mb-2 mt-2 col-md-6">
                  <label for="hsnom">Facturation type<sup class="text-danger">*</sup>
                  </label>
                  <div class="d-flex">
                    <select class="form-select flex-grow-0" v-model="selectedConfig" @change="updatePaiement" required>
                      <option value="" label="Sélectionnez une facturation ..." selected hidden></option>
                      <option v-for="(item, index) in config.facturations" :value="item" :key="index">
                        {{ item.facturation_config_libelle }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-2 mt-2 col-md-6">
                  <label for="hsnom">Montant<sup class="text-danger">*</sup> </label>
                  <div class="d-flex">
                    <input type="number" v-model="paiement.paiement_montant" class="form-control me-1 flex-fill"
                      id="exampleInputEmail1" placeholder="Entrer le montant du paiement..." required />
                    <select class="form-control flex-grow-0" style="width: 100px"
                      v-model="paiement.paiement_montant_devise" required>
                      <option value="CDF" selected>CDF</option>
                      <option value="CDF" selected>USD</option>
                      <option value="EURO" selected>EURO</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <bs-toast id="borderedToastPay" :msg="errors_msg" />

                <div class="border border-dashed mt-2 mb-2"></div>
                <!-- buttons -->
                <div class="d-flex justify-content-end align-items-end">
                  <button type="button" @click.prevent="$closeBsModal('modalFacturePayment')"
                    class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2">
                    Fermer
                  </button>
                  <load-button btn-type="submit" :loading="formLoading"
                    class-name="btn btn-success btn-border btn-lg mt-2 text-uppercase">Valider & soumettre</load-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "FacturePaymentModal",

  data() {
    return {
      paiement: {
        paiement_montant: "",
        paiement_montant_devise: "CDF",
        facturation_id: "",
        patient_id: "",
      },
      selectedConfig: "",
      formLoading: false,
      errors_msg: "",
    };
  },

  methods: {
    submitForm(e) {
      /**
       * Dispatch vuex action createHospital
       * @argument form this.form
       */
      this.formLoading = true;
      this.$store
        .dispatch("services/createPaiement", this.paiement)
        .then((res) => {
          this.formLoading = false;
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("borderedToastPay");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
          }
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Paiement effectué avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            this.$emit("onRefresh");
            this.paiement.paiement_montant = "";
            this.paiement.facturation_id = "";
            this.paiement.patient_id = "";
            this.selectedConfig = "";
          }
        })
        .catch((err) => {
          this.formLoading = false;
          console.log(JSON.stringify(err));
        });
    },

    updatePaiement() {
      if (this.selectedConfig) {
        this.paiement.facturation_id = this.selectedConfig.id;
        this.paiement.paiement_montant = this.selectedConfig.facturation_config_montant;
        this.paiement.paiement_montant_devise = this.selectedConfig.facturation_config_montant_devise;
      }
    },
  },

  mounted() {
    const self = this;
    $("#modalFacturePayment").on("hidden.bs.modal", function (e) {
      self.paiement.montant = "";
      self.paiement.patient_id = "";
      self.paiement.facturation_id = "";
      self.selectedConfig = "";
    });
    this.$store.dispatch("services/viewAllPatients");
  },

  computed: {
    config() {
      return this.$store.getters["services/GET_CONFIGS"];
    },
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
    patients() {
      const patients = this.$store.getters["services/GET_PATIENTS"];
      let formattedOptions = [];
      if (patients) {
        formattedOptions = patients.map((item) => {
          return {
            id: item.id,
            text: `${item.patient_code} | ${item.patient_nom} ${item.patient_prenom}`,
          };
        });
      }
      return formattedOptions;
    },
  },
};
</script>
