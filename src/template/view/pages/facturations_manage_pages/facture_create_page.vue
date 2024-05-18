<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12 col-md-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">Configuration des facturations</h4>
            </div>
          </div>
        </div>
        <!-- end page title -->
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-md-5">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0 flex-grow-1 fs-12">
                  Veuillez renseigner toutes les informations requises pour effectuer
                  cette opération !
                </h4>
              </div>
              <div class="card-body">
                <form @submit.prevent="submitForm" class="row">
                  <div
                    class="mb-3"
                    :class="facture_amount === '' ? 'col-md-12' : 'col-md-8'"
                  >
                    <label for="patientCode" class="form-label fw-semibold"
                      >Type de facture <sup class="text-danger">*</sup></label
                    >
                    <select class="form-select w-100" ref="selectType" required>
                      <option></option>
                    </select>
                  </div>
                  <div class="col-md-4 mb-3" v-if="facture_amount">
                    <label for="patientCode" class="form-label fw-semibold"
                      >Montant à payer
                    </label>
                    <input
                      type="text"
                      class="form-control fw-semibold text-success"
                      readonly
                      :value="`${facture_amount} ${facture_amount_currency}`"
                    />
                  </div>
                  <div class="col-md-7">
                    <label for="patientCode" class="form-label fw-semibold"
                      >Sélectionnez un patient concerné
                      <sup class="text-danger">*</sup></label
                    >
                    <div class="d-flex">
                      <select class="patient-select2 select2 flex-fill" required>
                        <option></option>
                      </select>
                      <!-- <button class="btn btn-icon btn-soft-secondary ms-2"> <i
                                                    class="ri-add-line"></i></button> -->
                    </div>
                  </div>
                  <div class="col-md-5">
                    <label>Montant facture<sup class="text-danger">*</sup></label>
                    <div class="d-flex">
                      <input
                        type="number"
                        v-model="form.paiement_montant"
                        placeholder="Saisir le montant..."
                        class="form-control flex-fill me-2"
                        required
                      />
                      <select
                        class="form-control"
                        v-model="form.paiement_montant_devise"
                        style="width: 80px"
                      >
                        <option value="CDF" selected>CDF</option>
                        <option value="USD">USD</option>
                        <option value="EURO">EURO</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <bs-toast id="errorsToastPay" :msg="errors_msg" />
                    <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                      <button
                        type="button"
                        @click="clean"
                        class="btn btn-light btn-border btn-label right me-2"
                      >
                        <i class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                        Annuler
                      </button>

                      <load-button
                        btn-type="submit"
                        :loading="formLoading"
                        class-name="btn-success btn-border btn-label right nexttab nexttab "
                        ><i class="ri-printer-line label-icon align-middle fs-16 ms-2"></i
                        >Sauvegarder & imprimer facture</load-button
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">© Millenium HS</div>
          <div class="col-sm-6">
            <div class="text-sm-end d-none d-sm-block">
              &copy; Powered by Millenium Horizon
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="customizer-setting d-block">
      <div
        class="btn-info text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
        @click="$router.push({ name: 'factures-list-route' })"
      >
        <i class="ri-list-check-2 fs-22"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FactureCreatePage",
  data() {
    return {
      form: {
        paiement_montant: "",
        paiement_montant_devise: "CDF",
        patient_id: "",
        facturation_id: "",
      },
      facture_amount: "",
      facture_amount_currency: "",
      formLoading: false,
      errors_msg: "",
    };
  },
  methods: {
    submitForm(e) {
      this.formLoading = true;
      this.$store
        .dispatch("services/createPaiement", this.form)
        .then((res) => {
          this.formLoading = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: "Paiement facture effectué avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            this.clean();
          }
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastPay");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
          }
        })
        .catch((err) => {
          this.formLoading = false;
          console.log(JSON.stringify(err));
        });
    },

    clean() {
      this.facture_amount = "";
      this.facture_amount_currency = "";
      this.form.facturation_id = "";
      this.form.patient_id = "";
      this.form.paiement_montant = "";
      this.form.paiement_montant_devise = "CDF";
      $(".patient-select2").val("").trigger("change");
      $(this.$refs.selectType).val("").trigger("change");
    },
  },
  unmounted() {
    if (this.selectPatient !== null) this.selectPatient.select2("destroy");
  },
  async mounted() {
    let self = this;
    this.$store.dispatch("services/showConfigs");
    this.selectPatient = $(".patient-select2").select2({
      placeholder: "chargement des patients en cours...",
    });
    let patients = await this.$store.dispatch("services/viewPatientsPending");
    this.selectPatient = $(".patient-select2")
      .select2({
        placeholder: "Sélectionner un patient...",
        data: $.map(patients, function (item) {
          return {
            text: `${item.patient_code} ${item.patient_nom} ${item.patient_prenom}`,
            id: item.id,
          };
        }),
      })
      .on("change", function (e) {
        self.form.patient_id = $(this).val();
      });

    this.$nextTick(() => {
      $(this.$refs.selectType)
        .select2({
          placeholder: "Sélectionner un type de facture...",
          data: $.map(this.configs.facturations, function (item) {
            return {
              text: item.facturation_config_libelle,
              id: item.id,
              row: item,
            };
          }),
        })
        .on("change", function (e) {
          self.form.facturation_id = $(this).val();
          if ($(this).select2("data")[0].row !== undefined) {
            self.facture_amount = $(this).select2(
              "data"
            )[0].row.facturation_config_montant;
            self.facture_amount_currency = $(this).select2(
              "data"
            )[0].row.facturation_config_montant_devise;
          }
        });
    });
  },

  computed: {
    configs() {
      return this.$store.getters["services/GET_CONFIGS"];
    },
  },
};
</script>
