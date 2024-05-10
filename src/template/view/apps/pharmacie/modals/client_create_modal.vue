<template>
  <teleport to="body">
    <div
      id="client-Modal"
      class="modal fade"
      tabindex="-1"
      style="display: none; padding-left: 0px"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 overflow-hidden">
          <div class="row g-0">
            <div class="col-lg-7">
              <div class="modal-body p-5">
                <h2 class="lh-base">Création ou verification du client !</h2>
                <p class="text-muted mb-4">
                  Veuillez entrez le numéro de téléphone du client pour verifier sa
                  disponibilité dans le système !
                </p>
                <form @submit.prevent="submitData" class="row g-3">
                  <div class="col-md-12">
                    <input
                      type="tel"
                      @input="checkClient"
                      class="form-control"
                      placeholder="Entrez le numéro de tél..."
                      v-model="form.client_phone"
                      required
                    />
                  </div>
                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.client_nom"
                      placeholder="Nom du client(optionnel)..."
                    />
                  </div>
                  <bs-toast id="errorsToastClient" :msg="errors_msg" />
                  <div class="col-md-12">
                    <div class="d-flex">
                      <button
                        type="button"
                        class="btn btn-dark me-2"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Fermer
                      </button>
                      <load-button
                        :loading="formLoading"
                        btn-type="submit"
                        class-name="btn btn-secondary flex-fill"
                      >
                        <i class="ri-check-double-line"></i> Valider & ajouter
                      </load-button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="subscribe-modals-cover h-100">
                <img
                  src="assets/images/pharma_client.avif"
                  alt=""
                  class="h-100 w-100 object-fit-cover"
                  style="
                    clip-path: polygon(
                      100% 0%,
                      100% 100%,
                      100% 100%,
                      0% 100%,
                      25% 50%,
                      0% 0%
                    );
                  "
                />
              </div>
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
  name: "ClientModal",

  data() {
    return {
      formLoading: false,
      isClientFound: false,
      errors_msg: "",
      form: {
        client_phone: "",
        client_nom: "",
      },
    };
  },

  computed: {
    client() {
      return this.$store.getters["pharmacie/GET_CURRENT_CLIENT"];
    },
  },

  methods: {
    //checkExisting client
    checkClient(event) {
      let val = event.target.value;
      if (val.length >= 10) {
        this.$store.dispatch("pharmacie/checkClient", val).then((res) => {
          if (res !== null && res.client !== null) {
            this.form.client_nom = res.client.client_nom;
            this.isClientFound = true;
          }
        });
      } else {
        this.form.client_nom = "";
      }
    },

    //Create and return client
    submitData(e) {
      if (this.isClientFound) {
        this.form.client_nom = "";
        this.form.client_phone = "";
        this.$emit("onValidate", this.client.id);
        this.$closeBsModal("client-Modal");
        return;
      }
      this.formLoading = true;
      this.$store
        .dispatch("pharmacie/addClient", this.form)
        .then((res) => {
          this.formLoading = false;
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastClient");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            this.form.client_nom = "";
            this.form.client_phone = "";
            this.$emit("onValidate", res.client.id);
            this.$closeBsModal("client-Modal");
          }
        })
        .catch((err) => {
          this.errors_msg = err.toString();
          let toast = document.getElementById("errorsToastClient");
          new bootstrap.Toast(toast, { delay: 1500 }).show();
          this.formLoading = false;
        });
    },
  },
};
</script>
