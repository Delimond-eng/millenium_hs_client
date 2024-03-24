<template>
  <!--end tab-pane-->
  <div
    class="tab-pane fade"
    id="custom-v-pills-messages"
    role="tabpanel"
    aria-labelledby="custom-v-pills-messages-tab"
  >
    <h6 class="fs-14 text-start mb-2 mt-3 text-primary">
      Veuillez prescrire le patient !
    </h6>
    <div class="border border-dashed"></div>

    <form @submit.prevent="submitFormPrescriptions">
      <!-- Tables Border Colors -->
      <table class="table table-bordered border-light table-nowrap">
        <thead>
          <tr class="text-dark">
            <th scope="col" class="text-uppercase">Traitement</th>
            <th scope="col" class="text-uppercase">Posologie</th>
            <th scope="col" class="text-uppercase">Fréquence</th>
            <th scope="col" class="text-uppercase">Durée de traitement</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(input, index) in tempPrescriptions" :key="index">
            <td>
              <select class="form-control w-100" v-model="input.produit_id">
                <option label="Sélectionnez le traitement" hidden selected></option>
                <option value="Paracetamol | Comprimé">Paracetamol | Comprimé</option>
                <option value="Ibuprofène | Comprimé">Ibuprofène | Comprimé</option>
              </select>
            </td>
            <td>
              <div class="d-flex">
                <input
                  type="text"
                  v-model="input.posologie"
                  class="form-control w-100 me-1"
                  placeholder="posologie...ex: 1"
                />
                <select class="form-control w-auto" v-model="input.posologie_unite">
                  <option label="Unité" selected hidden></option>
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                  <option value="ml">mcg</option>
                  <option value="UI">UI</option>
                  <option value="dose">dose</option>
                  <option value="patch">patch</option>
                </select>
              </div>
            </td>
            <td>
              <div class="d-flex">
                <input
                  type="text"
                  v-model="input.traitement_freq"
                  class="form-control w-100 me-1"
                  placeholder="Fréquence...ex: 1"
                />
                <select class="form-control w-auto" v-model="input.traitement_freq_unite">
                  <option value="/Jour" selected>/Jour</option>
                  <option value="/Semaine">/Semaine</option>
                  <option value="/Mois">/Mois</option>
                </select>
              </div>
            </td>
            <td>
              <div class="d-flex">
                <input
                  type="text"
                  v-model="input.traitement_duree"
                  class="form-control w-100 me-1"
                  placeholder="Durée...ex: 1"
                />
                <select
                  class="form-control w-auto"
                  v-model="input.traitement_duree_unite"
                >
                  <option value="Jours" selected>Jours</option>
                  <option value="Semaines">Semaines</option>
                  <option value="Mois">Mois</option>
                </select>
              </div>
            </td>
            <td>
              <button
                class="btn btn-soft-danger"
                type="button"
                @click="index !== 0 ? tempPrescriptions.splice(index, 1) : () => null"
              >
                <i class="ri-delete-bin-4-line"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex">
        <button class="btn btn-outline-secondary me-2" type="button" @click="addTempItem">
          <i class="ri-add-line"></i>Ajouter une ligne
        </button>
        <button class="btn btn-outline-info" type="button">
          <i class="ri-printer-line"></i>Imprimer
        </button>
      </div>

      <bs-toast id="errorsToast5" :msg="errors_msg" />
      <div class="d-flex align-items-end justify-content-end w-100 mt-4">
        <button type="button" class="btn btn-light btn-border btn-label right me-2">
          <i class="ri-restart-line label-icon align-middle fs-16 ms-2"></i> Annuler
        </button>

        <load-button
          btn-type="submit"
          :loading="formLoadingPrescriptions"
          class-name="btn-success btn-border btn-label right nexttab nexttab "
          ><i class="ri-check-double-line label-icon align-middle fs-16 ms-2"></i>Valider
          Soumettre la préscription</load-button
        >
      </div>
    </form>
  </div>
  <!--end tab-pane-->
</template>

<script>
export default {
  name: "PrescriptionsTab",
  data() {
    return {
      formLoadingPrescriptions: false,
      errors_msg: "",
      tempPrescriptions: [
        {
          produit_id: "",
          consult_id: "",
          posologie: "",
          posologie_unite: "",
          traitement_freq: "",
          traitement_freq_unite: "/Jour",
          traitement_duree: "",
          traitement_duree_unite: "Jours",
        },
      ],
    };
  },

  methods: {
    submitFormPrescriptions(e) {
      if (this.currentConsult === null) {
        this.errors_msg = "Veuillez consulter le patient avant de le prescrire !";
        let toast = document.getElementById("errorsToast5");
        new bootstrap.Toast(toast, { delay: 2000 }).show();
        return;
      }
      let user = JSON.parse(localStorage.getItem("user-data"));
      for (let p of this.tempPrescriptions) {
        p.consult_id = this.currentConsult.id;
        p.emplacement_id = user.hopital.emplacement.id;
        p.traitement_duree = p.traitement_duree + " " + p.traitement_duree_unite;
        p.traitement_freq = p.traitement_freq + " " + p.traitement_freq_unite;
        p.posologie = p.posologie + " " + p.posologie_unite;
        p.created_by = user.id;
      }
      let form = {
        prescriptions: this.tempPrescriptions,
      };

      this.formLoadingPrescriptions = true;
      this.$store
        .dispatch("services/addPrescriptions", form)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoadingPrescriptions = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Prescriptions ajoutées avec succès !",
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            $("#examens-tab").click();
          }
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToast5");
            new bootstrap.Toast(toast, { delay: 2000 }).show();
          }
        })
        .catch((err) => {
          this.formLoadingPrescriptions = false;
          console.log(JSON.stringify(err));
        });
    },

    addTempItem() {
      this.tempPrescriptions.push({
        produit_id: "",
        consult_id: "",
        posologie: "",
        posologie_unite: "",
        traitement_freq: "",
        traitement_freq_unite: "/Jour",
        traitement_duree: "",
        traitement_duree_unite: "Jours",
      });
    },

    clean() {
      this.tempPrescriptions = [
        {
          produit_id: "",
          consult_id: "",
          posologie: "",
          posologie_unite: "",
          traitement_freq: "",
          traitement_freq_unite: "/Jour",
          traitement_duree: "",
          traitement_duree_unite: "Jours",
        },
      ];
    },
  },

  props: {
    currentConsult: {
      type: Object,
      default: () => {},
    },
    selectedPatient: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
