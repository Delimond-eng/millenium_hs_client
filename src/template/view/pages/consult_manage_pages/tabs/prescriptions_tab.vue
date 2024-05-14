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
      <table class="table table-bordered border-dark-subtle table-nowrap">
        <thead class="bg-dark-subtle border-dark-subtle">
          <tr class="text-dark">
            <th scope="col" class="text-uppercase" style="width: 500px">Produit</th>
            <th scope="col" class="text-uppercase">Dosage</th>
            <th scope="col" class="text-uppercase">Fréquence</th>
            <th scope="col" class="text-uppercase">Durée</th>
            <th scope="col" class="text-uppercase">Quantité</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(input, index) in tempPrescriptions" :key="index">
            <td>
              <!-- <select class="form-control w-100" v-model="input.produit_id">
                <option label="Sélectionnez le traitement" hidden selected></option>
                <option value="Paracetamol | Comprimé">Paracetamol | Comprimé</option>
                <option value="Ibuprofène | Comprimé">Ibuprofène | Comprimé</option>
              </select> -->
              <select2
                placeholder="Sélectionnez un produit..."
                v-model="input.produit_id"
                :options="produits"
                :settings="{ settingOption: value, settingOption: value }"
                :required="true"
              />
            </td>
            <td>
              <div class="d-flex">
                <input
                  type="text"
                  v-model="input.dosage"
                  class="form-control w-100 me-1"
                  placeholder="dosage...ex: 1"
                  required
                />

                <select
                  class="form-select"
                  style="width: 100px"
                  v-model="input.dosage_unite"
                  required
                >
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
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  v-model="input.frequence"
                  class="form-control w-100"
                  placeholder="Fréquence...ex: 1"
                  required
                />
                <div class="mx-1">/</div>
                <select
                  class="form-select"
                  style="width: 100px"
                  v-model="input.frequence_unite"
                  required
                >
                  <option value="Jour" selected>Jour</option>
                  <option value="Semaine">Semaine</option>
                  <option value="Mois">Mois</option>
                </select>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  v-model="input.duree"
                  class="form-control w-100 me-1"
                  placeholder="Durée...ex: 1"
                  required
                />
                <div class="mx-1">/</div>
                <select
                  class="form-select"
                  style="width: 100px"
                  v-model="input.duree_unite"
                  required
                >
                  <option value="Jours" selected>Jours</option>
                  <option value="Semaines">Semaines</option>
                  <option value="Mois">Mois</option>
                </select>
              </div>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  v-model="input.qte"
                  class="form-control w-100"
                  placeholder="Quantité ...ex: 1"
                  required
                />
                <div class="mx-1">/</div>
                <input
                  type="text"
                  style="width: 100px"
                  v-model="input.dosage_unite"
                  class="form-control"
                  placeholder="unité"
                  disabled
                  required
                />
              </div>
            </td>

            <td>
              <button
                class="btn btn-soft-danger"
                type="button"
                @click="index !== 0 ? tempPrescriptions.splice(index, 1) : () => null"
              >
                <i class="ri-close-line"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex">
        <button class="btn btn-outline-secondary me-2" type="button" @click="addTempItem">
          <i class="ri-add-line"></i>Ajouter une ligne
        </button>
        <!--  <button @click="triggerPrint" class="btn btn-info" type="button">
          <i class="ri-printer-line me-2"></i>Imprimer & valider
        </button> -->
      </div>

      <bs-toast id="errorsToast5" :msg="errors_msg" />
      <div class="d-flex align-items-end justify-content-end w-100 mt-4">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="formCheck2"
            v-model="isPrinted"
          />
          <label class="form-check-label" for="formCheck2"
            >Lancer l'impression après validation</label
          >
        </div>
      </div>
      <div class="d-flex align-items-end justify-content-end w-100 mt-4">
        <button type="button" class="btn btn-light btn-border btn-label right me-2">
          <i class="ri-restart-line label-icon align-middle fs-16 ms-2"></i> Annuler
        </button>

        <load-button
          btn-type="submit"
          :loading="formLoadingPrescriptions"
          class-name="btn-success btn-border btn-label right nexttab nexttab "
          ><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Valider
          Soumettre la préscription</load-button
        >
      </div>
    </form>
  </div>
  <!--end tab-pane-->
  <prescription-invoice :item="latestPrescription" />
</template>

<script>
import PrescriptionInvoice from "../../invoices/prescription_invoice.vue";
export default {
  name: "PrescriptionsTab",
  data() {
    return {
      formLoadingPrescriptions: false,
      errors_msg: "",
      isPrinted: false,
      latestPrescription: [],
      tempPrescriptions: [
        {
          produit_id: "",
          consult_id: "",
          dosage: "",
          dosage_unite: "",
          frequence: "",
          frequence_unite: "Jour",
          duree: "",
          duree_unite: "Jours",
          qte: "",
        },
      ],
    };
  },
  components: {
    PrescriptionInvoice,
  },

  methods: {
    submitFormPrescriptions(e, isPrintOnly = false) {
      if (this.latestPrescription.length > 0) {
        $("#examens-tab").click();
        return;
      }
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
        p.created_by = user.id;
      }
      let form = {
        prescriptions: this.tempPrescriptions,
      };

      this.formLoadingPrescriptions = true;
      this.$store
        .dispatch("services/addPrescriptions", form)
        .then((res) => {
          this.formLoadingPrescriptions = false;
          if (res.status !== undefined) {
            this.latestPrescription = res.result;
            this.$nextTick(() => {
              if (this.isPrinted) {
                window.print();
              }
            });

            setTimeout(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Prescriptions ajoutées avec succès !",
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: false,
              });
              if (this.latestPrescription) {
                $("#examens-tab").click();
              }
            }, 500);
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

    triggerPrint() {
      this.$nextTick(() => {
        window.print();
      });
    },

    addTempItem() {
      this.tempPrescriptions.push({
        produit_id: "",
        consult_id: "",
        dosage: "",
        dosage_unite: "",
        frequence: "",
        frequence_unite: "Jour",
        duree: "",
        duree_unite: "Jours",
        qte: "",
      });
    },

    clean() {
      this.tempPrescriptions = [
        {
          produit_id: "",
          consult_id: "",
          dosage: "",
          dosage_unite: "",
          frequence: "",
          frequence_unite: "Jour",
          duree: "",
          duree_unite: "Jours",
          qte: "",
        },
      ];
    },

    showDatas() {
      console.log(JSON.stringify(this.tempPrescriptions));
    },
  },

  beforeMount() {
    this.$store.dispatch("pharmacie/allConfigs");
  },

  computed: {
    produits() {
      let datas = this.$store.getters["pharmacie/GET_CONFIG"];
      let formattedOptions = [];
      if (datas.produits) {
        formattedOptions = datas.produits.map((item) => {
          return {
            id: item.id,
            text: `${item.produit_libelle} | ${item.type.type_libelle}`,
          };
        });
      }
      return formattedOptions;
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
