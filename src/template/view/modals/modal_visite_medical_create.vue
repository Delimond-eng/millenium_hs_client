<template>
  <teleport to="body">
    <div
      id="modalCreateVisite"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Nouvelle visite médicale</h5>
            <p class="text-white-50">
              Veuillez renseigner les informations requises pour une nouvelle visite !
            </p>
          </div>
          <div class="modal-body p-4">
            <form class="row" @submit.prevent="submitForm">
              <div class="col-md-12">
                <div class="card-body">
                  <ul class="nav nav-pills nav-customs nav-danger mb-3" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link active"
                        data-bs-toggle="tab"
                        href="#border-navs-home"
                        role="tab"
                        aria-selected="true"
                        >Informations personnelles</a
                      >
                    </li>
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link"
                        data-bs-toggle="tab"
                        href="#border-navs-profile"
                        role="tab"
                        aria-selected="false"
                        tabindex="-1"
                        >Prélèvement signes vitaux</a
                      >
                    </li>
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link"
                        data-bs-toggle="tab"
                        href="#border-navs-messages"
                        role="tab"
                        aria-selected="false"
                        tabindex="-1"
                        >Paiement</a
                      >
                    </li>
                  </ul>
                  <div class="border border-dashed mt-2 mb-2"></div>
                  <!-- Tab panes -->
                  <div class="tab-content text-muted">
                    <div
                      class="tab-pane active show"
                      id="border-navs-home"
                      role="tabpanel"
                    >
                      <div class="row">
                        <div class="col-md-6">
                          <div class="table-responsive" v-if="patient">
                            <table class="table mb-0">
                              <tbody class="text-black">
                                <tr>
                                  <th scope="row">CODE</th>
                                  <td>
                                    {{ patient.patient_code }}
                                  </td>
                                </tr>
                                <tr v-if="patient.patient_num_assurance">
                                  <th scope="row">N° Assurance</th>
                                  <td>
                                    {{ patient.patient_num_assurance }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Nom</th>
                                  <td>
                                    {{ patient.patient_nom }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Prenom</th>
                                  <td>
                                    {{ patient.patient_prenom }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Prenom</th>
                                  <td>
                                    {{ patient.patient_prenom }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Sexe</th>
                                  <td>
                                    {{ patient.patient_sexe }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="table-responsive" v-if="patient">
                            <table class="table mb-0">
                              <tbody class="text-black">
                                <tr>
                                  <th scope="row">Date de naissance</th>
                                  <td>
                                    {{ patient.patient_datenais }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Adresse</th>
                                  <td>
                                    {{ patient.patient_adresse }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Téléphone</th>
                                  <td>
                                    {{ patient.patient_telephone }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Contact d'urgence</th>
                                  <td>
                                    {{ patient.patient_contact_urgence }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Etat civil</th>
                                  <td>
                                    {{ patient.patient_etat_civil }}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Groupe sanguin</th>
                                  <td>
                                    {{ patient.patient_gs }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="border-navs-profile" role="tabpanel">
                      <div class="row">
                        <!-- patient poids input -->
                        <div class="col-md-4">
                          <div>
                            <label class="form-label"
                              >Poids<sup class="text-danger">*</sup></label
                            >
                            <div class="form-icon">
                              <input
                                type="number"
                                v-model="form.poids"
                                class="form-control form-control-icon"
                                placeholder="Saisir le poids... ex: 63.3"
                                required
                              />
                              <i class="ri-scales-line"></i>
                            </div>
                          </div>
                        </div>

                        <!-- Temperature input -->
                        <div class="col-md-4">
                          <div>
                            <label class="form-label"
                              >Temperature<sup class="text-danger">*</sup></label
                            >
                            <div class="form-icon">
                              <input
                                type="number"
                                v-model="form.temperature"
                                class="form-control form-control-icon rounded-end-0"
                                placeholder="Saisir le T°... ex: 34.5"
                                required
                              />
                              <i class="ri-contrast-drop-2-line"></i>
                            </div>
                          </div>
                        </div>

                        <!-- taille input -->
                        <div class="col-md-4">
                          <div>
                            <label class="form-label"
                              >Taille<sup class="text-danger"> (optionnelle)</sup></label
                            >
                            <div class="form-icon">
                              <input
                                type="text"
                                v-model="form.taille"
                                class="form-control form-control-icon"
                                placeholder="Saisir la taille... ex: 170"
                              />
                              <i class="ri-ruler-line"></i>
                            </div>
                          </div>
                        </div>

                        <!-- tension arterielle input -->
                        <div class="col-md-4 mt-3">
                          <div>
                            <label class="form-label"
                              >Tension arterielle<sup class="text-danger"
                                >(Optionnelle)</sup
                              ></label
                            >
                            <div class="form-icon">
                              <input
                                type="text"
                                v-model="form.tension_art"
                                class="form-control form-control-icon"
                                placeholder="tension arterielle..."
                              />
                              <i class="bx bx-pulse"></i>
                            </div>
                          </div>
                        </div>

                        <!-- frequence cardio input -->
                        <div class="col-md-4 mt-3">
                          <div>
                            <label class="form-label"
                              >Pulsation<sup class="text-danger"
                                >(Optionnelle)</sup
                              ></label
                            >
                            <div class="form-icon">
                              <input
                                type="text"
                                v-model="form.freq_cardio"
                                class="form-control form-control-icon"
                                placeholder="Entrer le pouls du patient..."
                              />
                              <i class="bx bx-pulse"></i>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-4 mt-3">
                          <div>
                            <label class="form-label"
                              >Saturation<sup class="text-danger"
                                >(Optionnelle)</sup
                              ></label
                            >
                            <div class="form-icon">
                              <input
                                type="text"
                                v-model="form.saturation"
                                class="form-control form-control-icon"
                                placeholder="Entrer la saturation du patient..."
                              />
                              <i class="bx bx-pulse"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="border-navs-messages" role="tabpanel">
                      <div class="row">
                        <div class="mb-2 mt-2 col-md-6">
                          <label for="hsnom"
                            >Facturation type<sup class="text-danger">*</sup>
                          </label>
                          <div class="d-flex">
                            <select
                              class="form-select flex-grow-0"
                              v-model="selectedConfig"
                              @change="updatePaiement"
                              required
                            >
                              <option
                                value=""
                                label="Sélectionnez une facturation ..."
                                selected
                                hidden
                              ></option>
                              <option
                                v-for="(item, index) in config.facturations"
                                :value="item"
                                :key="index"
                              >
                                {{ item.facturation_config_libelle }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="mb-2 mt-2 col-md-6">
                          <label for="hsnom"
                            >Montant<sup class="text-danger">*</sup>
                          </label>
                          <div class="d-flex">
                            <input
                              type="number"
                              v-model="paiement.montant"
                              class="form-control me-1 flex-fill"
                              id="exampleInputEmail1"
                              placeholder="Entrer le montant du paiement..."
                              required
                            />
                            <select
                              class="form-control flex-grow-0"
                              style="width: 100px"
                              v-model="paiement.devise"
                              required
                            >
                              <option value="CDF" selected>CDF</option>
                              <option value="CDF" selected>USD</option>
                              <option value="EURO" selected>EURO</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <bs-toast id="borderedToastSV" :msg="errors_msg" />

                <div class="border border-dashed mt-2 mb-2"></div>
                <!-- buttons -->
                <div class="d-flex justify-content-end align-items-end">
                  <button
                    type="button"
                    @click.prevent="$closeBsModal('modalCreateVisite')"
                    class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2"
                  >
                    Fermer
                  </button>
                  <load-button
                    btn-type="submit"
                    :loading="formLoading"
                    class-name="btn btn-success btn-border btn-lg mt-2 text-uppercase"
                    >Valider & soumettre</load-button
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
import { calculateAge, dateConvertor } from "@/utils";
export default {
  name: "LaboCreateModal",

  props: {
    patient: {
      type: Object,
      default: () => null,
    },
  },

  data() {
    return {
      form: {
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
      form_send: {},
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
      const date = dateConvertor(`${this.patient.patient_datenais}`);
      let age = calculateAge(date);
      console.log("calculate age :", age);
      this.form.age = age;
      this.form_send.patient_details = this.form;
      this.form_send.paiement = this.paiement;
      this.form_send.patient_id = this.patient.id;
      this.form_send.code_appel = "002";
      /**
       * @var $user Global fonction retourne l'utilisateur courant
       */
      this.formLoading = true;
      this.form_send.created_by = this.$user().agent_id;
      if (this.form_send.created_by === 0) {
        return;
      }
      this.$store
        .dispatch("services/createPatient", this.form_send)
        .then((res) => {
          this.formLoading = false;
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("borderedToastSV");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
          }
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title:
                "Nouvelle visite créée avec succès, le patient est mise en attente de consultation !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            this.$emit("onRefresh");
            this.$store.dispatch("services/viewPatientsPending");
            this.form.poids = "";
            this.form.taille = "";
            this.form.temperature = "";
            this.form.tension_art = "";
            this.form.freq_cardio = "";
            this.form.saturation = "";
            this.paiement.montant = "";
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
        this.paiement.montant = this.selectedConfig.facturation_config_montant;
        this.paiement.devise = this.selectedConfig.facturation_config_montant_devise;
      }
    },
  },

  mounted() {
    const self = this;
    $("#modalCreateVisite").on("hidden.bs.modal", function (e) {
      self.form.poids = "";
      self.form.taille = "";
      self.form.temperature = "";
      self.form.tension_art = "";
      self.form.freq_cardio = "";
      self.form.saturation = "";
      self.selectedConfig = "";
      self.paiement.montant = "";
    });
  },

  computed: {
    config() {
      return this.$store.getters["services/GET_CONFIGS"];
    },
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },
};
</script>
