<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Création patient</h4>
              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="#/home/patients/list" class="btn btn-info btn-border btn-sm text-white"><i
                        class="ri-list-check-2"></i> Voir la liste des patients</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <!-- end page title -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">
                  Veuillez remplir tous les champs requis !
                </h4>
              </div>
              <ul class="nav nav-pills nav-custom nav-custom-light animation-nav m-3" role="tablist">
                <li class="nav-item me-2" role="presentation">
                  <a class="nav-link active" data-bs-toggle="tab" href="#basic-infos" role="tab" aria-selected="true">
                    <i class="ri-user-3-line me-2"></i> Informations personnelles
                  </a>
                </li>
                <li class="nav-item me-2" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#medic-infos" role="tab" aria-selected="false"
                    tabindex="-1">
                    <i class="ri-stethoscope-line me-2"></i> Signes vitaux
                    <sup class="text-danger">*</sup>
                  </a>
                </li>

                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#pay-tab" role="tab" aria-selected="false"
                    tabindex="-1">
                    <i class="ri-money-dollar-box-line me-2"></i> Paiement
                    <sup class="text-danger">*</sup>
                  </a>
                </li>
              </ul>
              <!-- Tab panes -->
              <form class="card-body" @submit.prevent="submitForm">
                <div class="tab-content">
                  <div class="tab-pane active show" id="basic-infos" role="tabpanel">
                    <div class="row">
                      <div class="col-md-2">
                        <div class="mt-3">
                          <label class="form-label">Assurance <sup class="text-danger">(Optionnel)</sup></label>
                          <select class="form-select" v-model="form.assure">
                            <option value="Non" selected>Non</option>
                            <option value="Oui">Oui</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-6" v-if="form.assure === 'Oui'">
                        <div class="mt-3">
                          <label class="form-label">Numéro assurance<sup class="text-danger">*</sup></label>
                          <div class="input-group">
                            <input type="text" @input="findAssureInfos" v-model="form.num_assurance"
                              class="form-control form-control-icon" required :readonly="form.patient_id !== ''"
                              placeholder="saisir le n° assurance du patient..." />
                            <button type="button" @click="$showBsModal('assuranceInfoModal')" v-if="assuranceInfos"
                              class="btn btn-info">
                              <i class="ri-eye-2-line"></i> Voir détails
                            </button>
                            <button v-else-if="searchLoading" disabled class="btn btn-icon btn-dark">
                              <svg-loading size="20"></svg-loading>
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- patient code input -->
                      <div class="col-md-2">
                        <div class="mt-3">
                          <label for="patientCode" class="form-label">Patient code</label>
                          <div class="form-icon">
                            <input type="text" class="form-control form-control-icon" id="patientCode" v-model="pcode"
                              disabled />
                            <i class="bx bx-hash"></i>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-2">
                        <div class="mt-3">
                          <label for="appelCode" class="form-label">Code appel <sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <input type="text" class="form-control form-control-icon" id="appelCode"
                              placeholder="code d'appel" v-model="form.code_appel" required />
                            <i class="bx bx-hash"></i>
                          </div>
                        </div>
                      </div>

                      <!-- nom input -->
                      <div class="col-md-6">
                        <div class="mt-3">
                          <label class="form-label">Nom <sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form.nom" class="form-control form-control-icon"
                              placeholder="Saisir le nom du patient...ex:KAYEMBE" required
                              :readonly="form.patient_id !== ''" />
                            <i class="ri-user-2-line"></i>
                          </div>
                        </div>
                      </div>

                      <!-- prenom input -->
                      <div class="col-md-6">
                        <div class="mt-3">
                          <label class="form-label">Prénom <sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form.prenom" class="form-control form-control-icon"
                              placeholder="Saisir le prénom du patient...ex:Lionnel" required
                              :readonly="form.patient_id !== ''" />
                            <i class="ri-user-2-line"></i>
                          </div>
                        </div>
                      </div>

                      <!-- patient sexe select -->
                      <div class="col-md-3">
                        <div class="mt-3">
                          <label class="form-label">Sexe <sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <select class="form-select" id="inputGroupSelect01" v-model="form.sexe"
                              :readonly="form.patient_id !== ''">
                              <option selected label="Sélectionner un sexe" hidden></option>
                              <option value="M">Masculin</option>
                              <option value="F">Féminin</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <!-- telephone input -->
                      <div class="col-md-3">
                        <div class="mt-3">
                          <label class="form-label">Téléphone<sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form.telephone" class="form-control form-control-icon"
                              placeholder="Saisir le tél... ex: +(243) 810000000" :readonly="form.patient_id !== ''" />
                            <i class="ri-phone-line"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="mt-3">
                          <label class="form-label">Téléphone d'urgence<sup
                              class="text-danger">(optionnel)</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form.telephone_urgence" class="form-control form-control-icon"
                              placeholder="Saisir le tél... ex: +(243) 810000000" :readonly="form.patient_id !== ''" />
                            <i class="ri-phone-line"></i>
                          </div>
                        </div>
                      </div>

                      <!-- sate naissance input -->
                      <div class="col-md-3">
                        <div class="mt-3">
                          <label class="form-label">Date de naissance<sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <input type="date" v-model="form.datenais" class="form-control form-control-icon" required
                              :readonly="form.patient_id !== ''" />
                            <i class="ri-phone-line"></i>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="mt-3">
                          <label class="form-label">Etat civil<sup class="text-danger">*</sup></label>
                          <select class="form-select" v-model="form.etat_civil" required>
                            <option selected hidden label="Sélectionner Etat civil"></option>
                            <option value="Célibataire">Célibataire</option>
                            <option value="Marié">Marié(e)</option>
                            <option value="Divorcé">Divorcé(e)</option>
                            <option value="Veuf">Veuf(ve)</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="mt-3">
                          <label class="form-label">Groupe sanguin<sup class="text-danger">(Optionnel)</sup></label>
                          <select class="form-select" v-model="form.groupe_sang">
                            <option selected hidden label="Sélectionner le groupe sanguin"></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                            <option value="Rh positif (+)">Rh positif (+)</option>
                            <option value="Rh négatif (-)">Rh négatif (-)</option>
                          </select>
                        </div>
                      </div>

                      <!-- adresse input -->
                      <div class="col-md-12">
                        <div class="mt-3">
                          <label class="form-label">Adresse<sup class="text-danger">*</sup></label>
                          <textarea class="form-control" v-model="form.adresse"
                            placeholder="Saisir l'adresse du patient... ex: n°.. av.. Q.. C.."></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="medic-infos" role="tabpanel">
                    <div class="row">
                      <!-- patient poids input -->
                      <div class="col-md-4">
                        <div>
                          <label class="form-label">Poids<sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <input type="number" v-model="form_details.poids" class="form-control form-control-icon"
                              placeholder="Saisir le poids... ex: 63.3" required />
                            <i class="ri-scales-line"></i>
                          </div>
                        </div>
                      </div>

                      <!-- Temperature input -->
                      <div class="col-md-4">
                        <div>
                          <label class="form-label">Temperature<sup class="text-danger">*</sup></label>
                          <div class="form-icon">
                            <input type="number" v-model="form_details.temperature"
                              class="form-control form-control-icon rounded-end-0"
                              placeholder="Saisir le T°... ex: 34.5" required />
                            <i class="ri-contrast-drop-2-line"></i>
                          </div>
                        </div>
                      </div>

                      <!-- taille input -->
                      <div class="col-md-4">
                        <div>
                          <label class="form-label">Taille<sup class="text-danger"> (optionnelle)</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form_details.taille" class="form-control form-control-icon"
                              placeholder="Saisir la taille... ex: 170" />
                            <i class="ri-ruler-line"></i>
                          </div>
                        </div>
                      </div>

                      <!-- tension arterielle input -->
                      <div class="col-md-4 mt-3">
                        <div>
                          <label class="form-label">Tension arterielle<sup
                              class="text-danger">(Optionnelle)</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form_details.tension_art" class="form-control form-control-icon"
                              placeholder="tension arterielle..." />
                            <i class="bx bx-pulse"></i>
                          </div>
                        </div>
                      </div>

                      <!-- frequence cardio input -->
                      <div class="col-md-4 mt-3">
                        <div>
                          <label class="form-label">Pulsation<sup class="text-danger">(Optionnelle)</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form_details.freq_cardio" class="form-control form-control-icon"
                              placeholder="Entrer le pouls du patient..." />
                            <i class="bx bx-pulse"></i>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mt-3">
                        <div>
                          <label class="form-label">Saturation<sup class="text-danger">(Optionnelle)</sup></label>
                          <div class="form-icon">
                            <input type="text" v-model="form_details.saturation" class="form-control form-control-icon"
                              placeholder="Entrer la saturation du patient..." />
                            <i class="bx bx-pulse"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="pay-tab" role="tabpanel">
                    <div class="row d-flex justify-content-center align-items-center">
                      <!-- Paiements inputs -->
                      <div class="mb-2 mt-2 col-md-6">
                        <label for="hsnom">Facturation type<sup class="text-danger">*</sup>
                        </label>
                        <div class="d-flex">
                          <select class="form-select flex-grow-0" v-model="selectedConfig" @change="updatePaiement"
                            required>
                            <option value="" label="Sélectionnez une facturation ..." selected hidden></option>
                            <option v-for="(item, index) in config.facturations" :value="item" :key="index">
                              {{ item.facturation_config_libelle }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="mb-2 mt-2 col-md-6">
                        <label for="hsnom">Montant<sup class="text-danger">*</sup>
                        </label>
                        <div class="d-flex">
                          <input type="number" v-model="paiement.montant" class="form-control me-1 flex-fill"
                            id="exampleInputEmail1" placeholder="Entrer le montant du paiement..." required />
                          <select class="form-control flex-grow-0" style="width: 100px" v-model="paiement.devise"
                            required>
                            <option value="CDF" selected>CDF</option>
                            <option value="CDF" selected>USD</option>
                            <option value="EURO" selected>EURO</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <bs-toast id="errorsToast" :msg="errors_msg" />
                <div div class="d-flex align-items-end justify-content-end mt-4" v-if="$user().agent_id !== 0">
                  <load-button btn-type="submit" :loading="formLoading"
                    class-name="btn-success btn-border btn-label right nexttab nexttab me-2">
                    <span><i class="ri-check-double-fill label-icon align-middle fs-16 ms-2"></i>Enregistrer</span>
                  </load-button>
                  <button type="button" class="btn btn-light btn-border btn-label right" @click.prevent="cleanField">
                    <i class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                    Annuler
                  </button>
                </div>
              </form>
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
      <div class="btn-info text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
        @click.prevent="$router.push('/home/patients/list')">
        <i class="ri-list-check-2 fs-22"></i>
      </div>
    </div>
  </div>
  <assurance-modal :detail="assuranceInfos" />
</template>

<script>
import { calculateAge } from "@/utils";
import AssuranceModal from "./modals/assurance_info_modal";
import { get } from "@/http";
export default {
  name: "PatientCreate",
  data() {
    return {
      form: {
        code: "",
        code_appel: "",
        nom: "",
        prenom: "",
        sexe: "",
        telephone: "",
        telephone_urgence: "",
        assure: "Non",
        adresse: "",
        datenais: "",
        patient_id: "",
        groupe_sang: "",
        etat_civil: "",
        num_assurance: "",
        created_by: "",
        patient_details: {},
      },
      form_details: {
        poids: "",
        taille: "",
        temperature: "",
        tension_art: "",
        freq_cardio: "",
        saturation: "",
        age: "",
      },
      paiement: {
        montant: "",
        facturation_id: "",
        devise: "CDF",
      },
      selectedConfig: "",
      formLoading: false,
      isOld: false,
      selectPatient: null,
      searchLoading: false,
      isAssured: false,
      errors_msg: "",
      assuranceInfos: null,
    };
  },

  components: {
    AssuranceModal,
  },

  methods: {
    /**
     * SUBMIT FORM DATA TO SERVER
     */
    submitForm(e) {
      let age = calculateAge(this.form.datenais);
      this.form_details.age = age;
      this.form.code = this.pcode;
      this.form.patient_details = this.form_details;
      this.form.paiement = this.paiement;

      /**
       * @var $user Global fonction retourne l'utilisateur courant
       */
      this.form.created_by = this.$user().agent_id;
      this.formLoading = true;

      if (this.form.created_by === 0) {
        return;
      }
      this.$store
        .dispatch("services/createPatient", this.form)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoading = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Patient créé avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            this.$store.dispatch("services/viewAllPatients");
            this.cleanField();
            this.loadPatientsList();
          }
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToast");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
          }
        })
        .catch((err) => {
          this.formLoading = false;
          console.log(JSON.stringify(err));
        });
    },

    /**
     * Find assured infos
     */
    findAssureInfos(event) {
      let query = event.target.value;
      this.searchLoading = true;
      get(`/partener.agent.search?query=${query}`)
        .then(({ data, status }) => {
          this.searchLoading = false;
          if (status === 200) {
            if (data.length > 0) {
              this.assuranceInfos = data[0];
            } else {
              this.assuranceInfos = null;
            }
          } else {
            this.assuranceInfos = null;
          }
        })
        .catch((e) => {
          this.searchLoading = false;
          this.assuranceInfos = null;
        });
    },

    updatePaiement() {
      if (this.selectedConfig) {
        this.paiement.facturation_id = this.selectedConfig.id;
        this.paiement.montant = this.selectedConfig.facturation_config_montant;
        this.paiement.devise = this.selectedConfig.facturation_config_montant_devise;
      }
    },

    cleanField() {
      this.form.patient_id = "";
      this.form.code = "";
      this.form.code_appel = "";
      this.form.nom = "";
      this.form.prenom = "";
      this.form.sexe = "";
      this.form.adresse = "";
      this.form.datenais = "";
      this.form.patient_id = "";
      this.form.telephone = "";
      this.form.groupe_sang = "";
      this.form.etat_civil = "";
      this.form.num_assurance = "";
      this.form_details.poids = "";
      this.form_details.taille = "";
      this.form_details.temperature = "";
      this.form_details.tension_art = "";
      this.form_details.freq_cardio = "";
      this.form_details.saturation = "";
      this.isAssured = false;

      this.$store.dispatch("services/showCode");
      $(".patient-select2").val("").trigger("change");
    },
  },

  mounted() {
    this.$store.dispatch('services/showCode')
  },

  computed: {
    pcode() {
      return this.$store.getters["services/GET_CODE"];
    },

    config() {
      return this.$store.getters["services/GET_CONFIGS"];
    },
  },
};
</script>

<style>
.animation-nav li:hover {
  color: #ffffff !important;
}
</style>
