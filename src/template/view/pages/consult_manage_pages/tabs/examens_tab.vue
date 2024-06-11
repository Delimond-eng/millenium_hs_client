<template>
  <div class="tab-pane fade" id="examens" role="tabpanel" aria-labelledby="examens-tab">
    <div class="card shadow-none border-light bg-light" v-if="currentConsult">
      <div class="card-body" v-if="currentConsult.examens">
        <!-- Small Tables -->
        <table class="table table-sm table-nowrap">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Examen</th>
              <th scope="col">Resultat</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in currentConsult.examens" :key="index">
              <th scope="row">{{ `${index + 1}`.padStart(2, "0") }}</th>
              <td>
                <span v-if="item.examen">{{ item.examen.examen_labo_libelle }}</span>
              </td>
              <td>
                <span class="badge badge-gradient-warning">non disponible</span>
              </td>
              <td>
                <button type="button" class="btn btn-soft-danger btn-icon btn-sm">
                  <i class="ri-close-line"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h6 class="fs-14 text-start mb-2 mt-3 text-primary">
      Veuillez sélectionner les examens à prescrire au patient !
    </h6>
    <div class="border border-dashed"></div>

    <form @submit.prevent="submitFormExamens">
      <div class="row mt-3 p-2">
        <div class="form-check form-check-success col-md-3" v-for="(exam, index) in examens" :key="index">
          <label
            class="card p-2 shadow-none border-1 border-dark-subtle d-flex justify-content-between flex-row align-items-center"
            :for="'checkList_' + index">
            <h6 class="form-check-label text-dark fw-medium flex-fill">
              {{ exam.examen_labo_libelle }}
            </h6>
            <input class="form-check-input" type="checkbox" @change="triggerSelectExamen($event, exam)"
              :id="'checkList_' + index" />
          </label>
        </div>
      </div>
      <state-empty v-if="examens.length === 0" title="Aucun informations répertorié !" :expanded="false"
        description="Il y a aucun examen pour cet emplacement !"></state-empty>

      <bs-toast id="errorsToastExamen" :msg="errors_msg" />
      <div class="d-flex align-items-end justify-content-end w-100 mt-4">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="formCheck2" v-model="isPrinted" />
          <label class="form-check-label" for="formCheck2">Lancer l'impression après validation</label>
        </div>
      </div>
      <div class="d-flex align-items-end justify-content-end w-100 mt-4" v-show="form_examens.length > 0">
        <button type="button" class="btn btn-light btn-border btn-label right me-2">
          <i class="ri-restart-line label-icon align-middle fs-16 ms-2"></i> Annuler
        </button>

        <load-button btn-type="submit" :loading="formLoadingExamens"
          class-name="btn-success btn-border btn-label right nexttab nexttab "><i
            class="ri-check-double-line label-icon align-middle fs-16 ms-2"></i>Valider
          & imprimer
        </load-button>
      </div>
    </form>
  </div>
  <invoice :item="latestInvoice" />
</template>

<script>
import Invoice from '../../invoices/examen_invoice.vue'
export default {
  name: "ExamensTab",
  components: {
    Invoice,
  },
  data() {
    return {
      formLoadingExamens: false,
      errors_msg: "",
      form_examens: [],
      latestInvoice: [],
      isPrinted: false
    };
  },

  methods: {
    /**
     * Crée la prescription des examens pour un patient
     */
    submitFormExamens(e) {
      if (this.latestInvoice.length > 0) {
        if (this.isPrinted) {
          window.print();
        }
        return;
      }
      if (this.currentConsult === null) {
        this.errors_msg = "Veuillez consulter le patient avant de le prescrire !";
        let toast = document.getElementById("errorsToastExamen");
        new bootstrap.Toast(toast, { delay: 2000 }).show();
        return;
      }
      this.formLoadingExamens = true;
      let user = JSON.parse(localStorage.getItem("user-data"));
      for (let exam of this.form_examens) {
        exam.consult_id = this.currentConsult.id;
        exam.patient_id = this.selectedPatient.id;
        exam.created_by = user.id;
        exam.hopital_id = user.hopital.id;
        exam.emplacement_id = user.hopital.emplacement.id;
      }
      this.$store
        .dispatch("services/addExamens", this.form_examens)
        .then((res) => {
          this.formLoadingExamens = false;
          if (res.status !== undefined) {
            this.latestInvoice = res.result;
            this.$nextTick(() => {
              if (this.isPrinted) {
                window.print();
              }
            });
            setTimeout(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Demandes d'examens effectuées avec succès !",
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: false,
              });
              this.$store.dispatch("services/viewAllConsultsExamens");
              this.$store.dispatch("services/viewPatientDoc", this.selectedPatient.id);
            }, 500);
          }
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastExamen");
            new bootstrap.Toast(toast, { delay: 2000 }).show();
          }
        })
        .catch((err) => {
          this.formLoadingExamens = false;
          console.log(JSON.stringify(err));
        });
    },

    /**
     * Lors de la selection de l'examen
     */
    triggerSelectExamen(e, data) {
      let checked = e.target.checked;
      if (checked) {
        this.form_examens.push({
          examen_id: data.id,
          consult_id: 0,
          agent_id: this.user.agent_id,
          emplacement_id: this.user.hopital.emplacement.id,
          hopital_id: this.user.hopital.id,
        });
      } else {
        for (let i = 0; i < this.form_examens.length; i++) {
          if (this.form_examens[i].examen_id === data.id) {
            this.form_examens.splice(i, 1);
            break;
          }
        }
      }
      console.log(JSON.stringify(this.form_examens));
    },
  },

  computed: {
    examens() {
      return this.$store.getters["services/GET_EXAMENS"];
    },
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },

  props: {
    currentConsult: {
      type: Object,
      default: () => { },
    },
    selectedPatient: {
      type: Object,
      default: () => { },
    },
  },
};
</script>
