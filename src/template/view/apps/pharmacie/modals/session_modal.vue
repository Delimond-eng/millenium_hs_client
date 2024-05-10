<template>
  <teleport to="body">
    <div id="session-modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      style="display: none; padding-left: 0px" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 overflow-hidden">
          <div class="row g-0">
            <div class="col-lg-7">
              <div class="modal-body p-5">
                <h2 class="lh-base">
                  {{ session === null ? "Ouverture" : "Fermeture" }} de la session
                  journalière !
                </h2>
                <p class="text-muted mb-4">
                  Bienvenue, veuillez renseigner les champs requis pour ouvrir votre
                  session !
                </p>
                <form @submit.prevent="submitData" class="row g-3">
                  <div class="col-md-12">
                    <input type="number" v-model="form.initial_balance" :disabled="session !== null"
                      class="form-control" placeholder="Balance d'ouverture" required />
                  </div>
                  <div class="col-md-12">
                    <input type="number" v-model="form.closing_balance" :disabled="session === null"
                      class="form-control" placeholder="Balance de fermeture" :required="session !== null" />
                  </div>
                  <div class="col-md-12">
                    <input type="number" v-model="form.nbre_ticket" :disabled="session === null" class="form-control"
                      placeholder="Nombre de tickets" :required="session !== null" />
                  </div>

                  <bs-toast id="errorsToastSession" :msg="errors_msg" />
                  <div class="col-md-12">
                    <div class="d-flex">
                      <button v-if="session !== null" type="button" class="btn btn-dark me-2" data-bs-dismiss="modal"
                        aria-label="Close">
                        Fermer
                      </button>
                      <load-button :loading="formLoading" btn-type="submit" class-name="btn btn-success flex-fill">
                        <i class="ri-lock-unlock-line"></i>
                        {{
                    session === null ? "Ouvrir la session" : "Fermeture la session"
                  }}
                      </load-button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="subscribe-modals-cover h-100">
                <img src="assets/pharmacist-2.jpg" alt="" class="h-100 w-100 object-fit-cover" style="
                    clip-path: polygon(
                      100% 0%,
                      100% 100%,
                      100% 100%,
                      0% 100%,
                      25% 50%,
                      0% 0%
                    );
                  " />
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
      errors_msg: "",
      form: {
        initial_balance: "",
        closing_balance: "",
        nbre_ticket: "",
      },
    };
  },
  mounted() {
    this.$store.dispatch("pharmacie/updateSession");

    this.$nextTick(() => {
      if (this.session !== null) {
        this.form.initial_balance = this.session.initial_balance;
      }
    });
  },

  computed: {
    session() {
      return this.$store.getters["pharmacie/GET_SESSION"];
    },
  },

  methods: {
    //Create and return client
    submitData(e) {
      this.formLoading = true;
      this.$store
        .dispatch("pharmacie/createOrUpdateSession", this.form)
        .then((res) => {
          this.formLoading = false;
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastSession");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res.status !== undefined) {
            this.form.closing_balance = "";
            this.form.initial_balance = "";
            this.form.nbre_ticket = "";
            this.$closeBsModal("session-modal");
            if (res.task === "start") {
              Swal.fire({
                title: "Ouverture de session !",
                text: "La nouvelle session de vente ouverte avec succès !",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                title: "Fermeture de session !",
                text: "La session en cours fermée avec succès !",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.errors_msg = err.toString();
          let toast = document.getElementById("errorsToastSession");
          new bootstrap.Toast(toast, { delay: 1500 }).show();
          this.formLoading = false;
        });
    },
  },
};
</script>
