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
              <h4 class="mb-sm-0">Premiers soins</h4>
            </div>
          </div>
        </div>
        <!-- end page title -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0 flex-grow-1 fs-12">
                  Veuillez renseigner toutes les informations requises pour effectuer
                  cette opération !
                </h4>
              </div>
              <div class="card-body">
                <form @submit.prevent="submitForm" class="row g-2">
                  <div class="col-md-6">
                    <div class="row g-2">
                      <div class="col-md-8">
                        <label for="patientCode" class="form-label fw-semibold"
                          >Sélectionnez un patient concerné
                          <sup class="text-danger">*</sup></label
                        >
                        <select2
                          ref="selectPatient"
                          placeholder="Sélectionnez un patient..."
                          v-model="form.patient_id"
                          :options="patients"
                          :settings="{ settingOption: value, settingOption: value }"
                          :required="true"
                          @select="loadPatientTraitment"
                        />
                      </div>
                      <div class="col-md-4">
                        <label>Etat de santé <sup class="text-danger">*</sup></label>
                        <select class="form-select" v-model="form.suivi_etat">
                          <option
                            value=""
                            hidden
                            selected
                            label="Sélectionnez l'état actuel de santé du patient"
                          ></option>
                          <option value="stable">Stable</option>
                          <option value="instable">Instable</option>
                          <option value="critique">Critique</option>
                          <option value="grave">Grave</option>
                          <option value="sérieux">Sérieux</option>
                          <option value="rémission">Rémission</option>
                          <option value="détérioration">Détérioration</option>
                          <option value="conscient">Conscient</option>
                          <option value="inconscient">Inconscient</option>
                          <option value="mobilité">Mobilité</option>
                          <option value="douleur">Douleur</option>
                        </select>
                      </div>
                      <div class="col-md-12">
                        <label>Observation <span class="text-danger">*</span></label>
                        <textarea
                          class="form-control"
                          v-model="form.suivi_obs"
                          placeholder="Entrer le motif du premier soin ..."
                        ></textarea>
                      </div>
                      <div class="col-md-12">
                        <label
                          >Recommandations
                          <span class="text-danger">(optionnel)</span></label
                        >
                        <textarea
                          v-model="form.suivi_recommandations"
                          class="form-control"
                          placeholder="Observation..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="fw-semibold"
                      >Traitements prevus <sup class="text-danger">*</sup></label
                    >
                    <!-- Hoverable Rows -->
                    <table class="table table-hover table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="checkAll"
                                @change="checkAll"
                              />
                            </div>
                          </th>
                          <th scope="col"></th>
                          <th scope="col">Médicament</th>
                          <th scope="col">dosage</th>
                          <th scope="col">Freq.</th>
                          <th scope="col">Préscrit par</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in prescriptions" :key="index">
                          <th scope="row">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :id="`inlineCheckbox${index}`"
                                @change="onPrescriptionChecked($event, item.id)"
                              />
                            </div>
                          </th>
                          <td>{{ `${index + 1}`.padStart(2, "0") }}</td>
                          <td>
                            <span v-if="item.produit">{{
                              item.produit.produit_libelle
                            }}</span>
                          </td>
                          <td>
                            {{ item.prescription_traitement_dosage }}
                            {{ item.prescription_traitement_dosage_unite }}
                          </td>
                          <td>
                            {{ item.prescription_traitement_freq }} par
                            {{ item.prescription_traitement_freq_unite }}
                          </td>
                          <td>
                            <span v-if="item.user"
                              ><span v-if="item.user.agent"
                                >Dr. {{ item.user.agent.agent_nom }}
                                {{ item.user.agent.agent_prenom }}</span
                              ></span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-12">
                    <bs-toast id="errorsToastSuivi" :msg="errors_msg" />
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
                        ><i
                          class="ri-check-double-line label-icon align-middle fs-16 ms-2"
                        ></i
                        >Valider & sauvegarder</load-button
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
        @click="$router.push({ name: 'suivi-route-list' })"
      >
        <i class="ri-list-check-2 fs-22"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientAssign",
  data() {
    return {
      prescriptions: [],
      traitements: [],
      form: {
        patient_id: "",
        suivi_etat: "",
        suivi_obs: "",
        suivi_recommandations: "",
      },
      formLoading: false,
      errors_msg: "",
    };
  },
  methods: {
    clean() {
      this.traitements = [];
      this.prescriptions = [];
      this.form.patient_id = "";
      this.form.suivi_etat = "";
      this.form.suivi_obs = "";
      this.form.suivi_recommandations = "";
      document.getElementById("checkAll").checked = false;
    },

    loadPatientTraitment() {
      Swal.fire({
        text: "Chargement des traitements ...",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.$store
        .dispatch("services/showTraitements", this.form.patient_id)
        .then((res) => {
          Swal.close();
          this.prescriptions = res;
        });
    },
    onPrescriptionChecked(event, id) {
      let checked = event.target.checked;
      if (checked) {
        this.traitements.push({ prescription_id: id });
      } else {
        for (let i = 0; i < this.traitements.length; i++) {
          if (this.traitements[i].prescription_id === id) {
            this.traitements.splice(i, 1);
          }
        }
      }
    },
    checkAll(e) {
      const checked = e.target.checked;
      for (let i = 0; i < this.prescriptions.length; i++) {
        let v = document.getElementById(`inlineCheckbox${i}`);
        v.checked = checked;
        if (checked) {
          this.traitements.push({ prescription_id: this.prescriptions[i].id });
        } else {
          this.traitements = [];
        }
      }
    },
    submitForm(e) {
      this.formLoading = true;
      let datas = this.form;
      datas.created_by = this.user.id;
      datas.hopital_id = this.user.hopital.id;
      datas.hopital_emplacement_id = this.user.hopital.emplacement.id;
      datas.agent_id = this.user.agent_id;
      datas.traitements = this.traitements;
      console.log(JSON.stringify(datas));
      this.formLoading = true;
      this.$store
        .dispatch("services/createSuivi", datas)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoading = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: "Suivi du patient sauvegardé avec succès !",
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
            let toast = document.getElementById("errorsToastSuivi");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
          }
        })
        .catch((err) => {
          this.formLoading = false;
          console.log(JSON.stringify(err));
        });
    },
  },

  beforeMount() {
    this.$store.dispatch("services/viewAllPatients");
  },

  computed: {
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
