<template>
  <teleport to="body">
    <div
      id="partenerCreateModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">
              Création des entreprises partenaires conventionné
            </h5>
            <p class="text-white-50">
              Veuillez créer le partenaire en important le fichier Excel contenant la
              liste des agents !
            </p>
          </div>
          <div class="modal-body p-4">
            <form enctype="multipart/form-data" class="row" @submit.prevent="submitForm">
              <div class="col-md-12 mb-2">
                <div>
                  <label class="form-label"
                    >Nom de l'Entreprise <sup class="text-danger">*</sup>
                  </label>
                  <div class="form-icon">
                    <input
                      type="text"
                      class="form-control form-control-icon"
                      placeholder="Entrer le nom de l'Entreprise..."
                      v-model="form.partener_nom"
                      required
                    />
                    <i class="ri-arrow-left-right-line"></i>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div>
                  <label class="form-label"
                    >N° de contact<sup class="text-danger">*</sup>
                  </label>
                  <div class="form-icon">
                    <input
                      type="text"
                      class="form-control form-control-icon"
                      placeholder="Entrer le contact de l'entreprise..."
                      v-model="form.partener_contact"
                      required
                    />
                    <i class="ri-phone-line"></i>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div>
                  <label class="form-label"
                    >Adresse<sup class="text-danger">*</sup>
                  </label>
                  <textarea
                    class="form-control"
                    v-model="form.partener_adresse"
                    placeholder="Entrez l'adresse de l'Entreprise..."
                    required
                  ></textarea>
                </div>
              </div>

              <div class="col-md-12 mb-2">
                <div>
                  <label class="form-label"
                    >Fichier Excel <small>(Contenant la liste des agents)</small>
                    <sup class="text-danger">*</sup>
                  </label>
                  <input
                    type="file"
                    ref="fileInput"
                    @change="form.fichier_agent = $event.target.files[0]"
                    class="form-control"
                    accept=".xls, .xlsx"
                    required
                  />
                </div>
              </div>

              <div class="col-md-12">
                <!-- show some errors -->
                <bs-toast id="borderedToastErrorPartener" :msg="errors_msg" />
                <!-- buttons -->
                <div class="d-flex justify-content-end align-items-end">
                  <button
                    type="button"
                    @click.prevent="abort"
                    class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2"
                  >
                    Fermer
                  </button>
                  <load-button
                    btn-type="submit"
                    :loading="formLoading"
                    class-name="btn btn-success btn-border btn-lg mt-2 text-uppercase"
                    >Sauvegarder</load-button
                  >
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
import { post } from "@/http";
export default {
  name: "ServiceConfigModal",
  data() {
    return {
      form: {
        partener_nom: "",
        partener_adresse: "",
        partener_contact: "",
        fichier_agent: null,
      },
      formLoading: false,
      errors_msg: "",
    };
  },

  methods: {
    async submitForm(e) {
      let formData = new FormData();
      formData.append("partener_nom", this.form.partener_nom);
      formData.append("partener_adresse", this.form.partener_adresse);
      formData.append("partener_contact", this.form.partener_contact);
      formData.append("fichier_agent", this.form.fichier_agent);
      formData.append("hopital_id", this.$user().hopital.id);
      formData.append("created_by", this.$user().id);
      this.formLoading = true;
      post("/partener.create", formData)
        .then(({ data, status }) => {
          this.formLoading = false;
          if (status == 200) {
            if (data.status == "success") {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Creation de l'Entreprise partenaire effectué !",
                showConfirmButton: false,
                timer: 4000,
                showCloseButton: false,
              });
              this.$emit("reloadData", data.partener);
              this.abort();
            } else {
              if (data.errors !== undefined) {
                this.errors_msg = res.errors.toString();
                let toast = document.getElementById("borderedToastErrorPartener");
                new bootstrap.Toast(toast, { delay: 1500 }).show();
                return;
              }
            }
          } else {
            if (data.errors !== undefined) {
              this.errors_msg = res.errors.toString();
              let toast = document.getElementById("borderedToastErrorPartener");
              new bootstrap.Toast(toast, { delay: 1500 }).show();
              return;
            }
          }
        })
        .catch((e) => {
          this.formLoading = false;
        });
    },

    abort() {
      this.form.partener_nom = "";
      this.form.partener_adresse = "";
      this.form.partener_contact = "";
      this.form.fichier_agent = null;
      this.$refs.fileInput.value = null;
      this.$closeBsModal("partenerCreateModal");
    },
  },
};
</script>
