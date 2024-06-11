<template>
  <!--end tab-pane-->
  <div class="tab-pane fade" id="custom-v-pills-docs" role="tabpanel" aria-labelledby="custom-v-pills-docs-tab">
    <div v-if="docs.length > 0">
      <div class="d-flex w-100 justify-content-between">
        <h2 class="fs-18 text-start fw-bold text-uppercase mb-2 mt-3 text-primary">
          Dossier médical <small>(Parcours médical du patient)</small>
        </h2>
        <button class="btn btn-soft-secondary">
          <i class="ri-printer-line"></i> Télécharger
        </button>
      </div>
      <div class="border border-dashed mt-2 mb-2"></div>

      <div class="row">
        <div class="col-md-3">
          <div class="nav flex-column p-2 nav-pills text-center" id="v-pills-tab" role="tablist"
            aria-orientation="vertical">
            <div class="w-100" v-for="(data, index) in docs" :key="index" :id="`consult${data.id}`">
              <button type="button" :class="index === selectedIndex ? 'btn-secondary' : 'btn-light'"
                @click="selectedIndex = index" class="btn btn-lg bg-gradient waves-effect waves-light w-100">
                <i v-if="index === selectedIndex" class="ri-play-mini-fill me-3"></i>
                Consultation du {{ data.consult_create_At }}
              </button>
              <div class="border border-dashed mt-2 mb-2"></div>
            </div>
          </div>
        </div>
        <!-- end col -->
        <div class="col-md-9" v-if="docs.length > 0">
          <div class="card shadow-none border-light">
            <div class="card-header align-items-xl-center d-xl-flex">
              <h1 class="fs-18 fw-bold text-secondary flex-grow-1 mb-xl-0">
                Consultation du {{ docs[selectedIndex].consult_create_At }}
              </h1>
              <div class="flex-shrink-0">
                <ul class="nav nav-pills card-header-pills" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a class="nav-link active" data-bs-toggle="tab" href="#infos" role="tab" aria-selected="true">
                      Infos médicales
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" data-bs-toggle="tab" href="#antecedents" role="tab" aria-selected="false"
                      tabindex="-1">
                      Antécedents
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" data-bs-toggle="tab" href="#prescriptions" role="tab" aria-selected="false"
                      tabindex="-1">
                      Prescriptions
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" data-bs-toggle="tab" href="#examens2" role="tab" aria-selected="false"
                      tabindex="-1">
                      Examens
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a class="nav-link" data-bs-toggle="tab" href="#hospitalisations" role="tab" aria-selected="false"
                      tabindex="-1">
                      Hospitalisations
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- end card header -->
            <div class="card-body">
              <!-- Tab panes -->
              <div class="tab-content text-muted">
                <div class="tab-pane active show" id="infos" role="tabpanel">
                  <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                    Informations personnelles
                  </h6>
                  <div class="border border border-primary-subtle mb-3"></div>
                  <div class="table-responsive text-dark">
                    <table class="table mb-0">
                      <tbody class="text-black">
                        <tr>
                          <th scope="row">Motif</th>
                          <td>{{ docs[selectedIndex].consult_libelle }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Diagnostique médicale</th>
                          <td>
                            {{ docs[selectedIndex].consult_diagnostic }}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">Age</th>
                          <td>
                            <span v-if="docs[selectedIndex].signe">{{
                              docs[selectedIndex].signe.patient_sv_age
                              }}</span>
                            ans
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Temperature</th>
                          <td>
                            <span v-if="docs[selectedIndex].signe">{{ docs[selectedIndex].signe.patient_sv_temperature
                              }}
                              {{
                                docs[selectedIndex].signe.patient_sv_temperature_unite
                              }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Taille</th>
                          <td>
                            <span v-if="docs[selectedIndex].signe">{{ docs[selectedIndex].signe.patient_sv_taille }}
                              {{
                                docs[selectedIndex].signe.patient_sv_taille_unite
                              }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Fréquence cardiaque</th>
                          <td>
                            <span v-if="docs[selectedIndex].signe">{{ docs[selectedIndex].signe.patient_sv_freq_cardio
                              }}
                              {{
                                docs[selectedIndex].signe.patient_sv_freq_cardio_unite
                              }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Saturation</th>
                          <td>
                            <span v-if="docs[selectedIndex].signe">{{ docs[selectedIndex].signe.patient_sv_saturation }}
                              {{
                                docs[selectedIndex].signe.patient_sv_saturation_unite
                              }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Tension arterielle</th>
                          <td>
                            <span v-if="docs[selectedIndex].signe">{{ docs[selectedIndex].signe.patient_sv_tension_art
                              }}
                              {{
                                docs[selectedIndex].signe.patient_sv_tension_art_unite
                              }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Médecin</th>
                          <td>
                            <span v-if="docs[selectedIndex].agent">
                              {{ docs[selectedIndex].agent.agent_matricule }}|
                              {{ docs[selectedIndex].agent.agent_nom }}
                              {{ docs[selectedIndex].agent.agent_prenom }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tab-pane" id="antecedents" role="tabpanel">
                  <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                    Antécedents
                  </h6>
                  <div class="border border border-primary-subtle mb-3"></div>
                  <div class="table-responsive text-dark">
                    <table class="table mb-0">
                      <tbody class="text-black">
                        <tr v-for="(ant, l) in docs[selectedIndex].antecedents" :key="l">
                          <th scope="row">
                            {{ ant.consult_detail_libelle }}
                          </th>
                          <td>{{ ant.consult_detail_valeur }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tab-pane" id="prescriptions" role="tabpanel">
                  <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                    Préscriptions
                  </h6>
                  <div class="border border border-primary-subtle mb-3"></div>
                  <table class="table table-striped text-dark table-nowrap"
                    v-if="docs[selectedIndex].prescriptions.length > 0">
                    <thead>
                      <tr class="text-dark text-uppercase">
                        <th scope="col">Medicament</th>
                        <th scope="col">Dosage</th>
                        <th scope="col">Nbre unité</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(prescription, j) in docs[selectedIndex].prescriptions" :key="j">
                        <td>
                          <span v-if="prescription.produit">{{
                            prescription.produit.produit_libelle
                            }}</span>
                          |
                          <span v-if="prescription.produit.type">{{
                            prescription.produit.type.type_libelle
                            }}</span>
                        </td>
                        <td>
                          {{ prescription.prescription_traitement_dosage }}
                          {{ prescription.prescription_traitement_dosage_unite }}
                        </td>
                        <td>
                          {{ prescription.prescription_traitement_qte }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tab-pane" id="examens2" role="tabpanel">
                  <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                    Examens
                  </h6>
                  <div class="border border border-primary-subtle mb-3"></div>
                  <table class="table table-striped table-nowrap text-dark">
                    <thead>
                      <tr class="text-dark text-uppercase">
                        <th scope="col">Examen</th>
                        <th scope="col">Resultat</th>
                        <th scope="col">Obs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ex, h) in docs[selectedIndex].examens" :key="h">
                        <td>
                          <span v-if="ex.examen">{{
                            ex.examen.examen_labo_libelle
                            }}</span>
                        </td>
                        <td>.....</td>
                        <td>.....</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tab-pane" id="hospitalisations" role="tabpanel"></div>
              </div>
            </div>
            <!-- end card-body -->
          </div>
        </div>
        <!--  end col -->
      </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center m-5 h-100 w-100 flex-column">
      <img src="assets/images/companies/doc3.png" class="img-fluid mb-2" alt="empty docs" style="height: 120px;" />
      <h1 class="fs-18">Aucun dossier disponible</h1>
    </div>
  </div>
  <!--end tab-pane-->
</template>

<script>
export default {
  name: "DocsTab",

  data() {
    return {
      selectedIndex: 0,
    };
  },

  computed: {
    docs() {
      return this.$store.getters["services/GET_PATIENT_DOCS"];
    },
  },

  props: {
    selectedPatient: {
      type: Object,
      default: () => { },
    },
  },
};
</script>
