<template>
  <teleport to="body">
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Consultation détails</h5>
          </div>

          <div class="modal-body p-4">
            <div class="row d-flex align-items-start">
              <div class="col-md-10">
                <div class="table-card">
                  <table class="table mb-0">
                    <tbody>
                      <tr>
                        <td class="fw-medium text-uppercase">
                          Patient code & nom complet
                        </td>
                        <td class="fw-bold" v-if="selectedConsult">
                          <span v-if="selectedConsult.patient"><span class="text-primary text-decoration-underline">{{
                              selectedConsult.patient.patient_code }}
                            </span>
                            {{ selectedConsult.patient.patient_nom }}
                            {{ selectedConsult.patient.patient_prenom }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-medium text-uppercase">Médecin</td>
                        <td class="fw-bold" v-if="selectedConsult">
                          <span v-if="selectedConsult.agent"><span class="text-primary text-decoration-underline">{{
                            selectedConsult.agent.agent_matricule
                          }}</span>
                            {{ selectedConsult.agent.agent_nom }}
                            {{ selectedConsult.agent.agent_prenom }}</span>
                        </td>
                      </tr>

                      <tr>
                        <td class="fw-medium">Motif</td>
                        <td v-if="selectedConsult">
                          {{ selectedConsult.consult_libelle }}
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-medium">Diagnostic</td>
                        <td v-if="selectedConsult">
                          {{ selectedConsult.consult_diagnostic }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--end table-->
                </div>
              </div>

              <div class="col-md-2">
                <div class="table-card">
                  <table class="table mb-0">
                    <tbody>
                      <tr>
                        <td class="fw-medium">Date et heure</td>
                        <td v-if="selectedConsult">
                          {{ selectedConsult.consult_create_At }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div v-if="selectedConsult" class="mt-5">
              <ul class="nav nav-pills nav-customs nav-danger mb-3" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" data-bs-toggle="tab" href="#symptomes" role="tab"
                    aria-selected="true">Symptômes</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#antecedents" role="tab" aria-selected="false"
                    tabindex="-1">Antécedents</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#prescriptions" role="tab" aria-selected="false"
                    tabindex="-1">Préscriptions</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#examens" role="tab" aria-selected="false"
                    tabindex="-1">Examens</a>
                </li>
              </ul>
              <!-- Tab panes -->
              <div class="tab-content text-muted">
                <div class="tab-pane active show" id="symptomes" role="tabpanel">
                  <div v-if="selectedConsult.symptomes.length > 0">
                    <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                      Patient Symptômes
                    </h6>
                    <div class="border border border-primary-subtle mb-3"></div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item" v-for="(s, index) in selectedConsult.symptomes" :key="index">
                        {{ s.consult_symptome_libelle }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="tab-pane" id="antecedents" role="tabpanel">
                  <div v-if="selectedConsult.antecedents.length > 0">
                    <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                      Antécedents
                    </h6>
                    <div class="border border border-primary-subtle mb-3"></div>

                    <!-- Small Tables -->
                    <table class="table table-sm table-nowrap text-dark">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Libellé</th>
                          <th scope="col">Valeur</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, index) in selectedConsult.antecedents" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ detail.consult_detail_libelle }}</td>
                          <td>{{ detail.consult_detail_valeur }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <state-empty v-else title="Aucun antécedent répertorié !" :expanded="false"
                    description="Il n'y a aucun antécedent disponible pour cette consultation !"></state-empty>
                </div>
                <div class="tab-pane" id="prescriptions" role="tabpanel">
                  <div v-if="selectedConsult.prescriptions.length > 0">
                    <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                      Prescriptions
                    </h6>
                    <div class="border border border-primary-subtle mb-3"></div>
                    <!-- Small Tables -->
                    <table class="table table-sm table-nowrap text-dark">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Traitement</th>
                          <th scope="col">dosage</th>
                          <th scope="col">Type</th>
                          <th scope="col">Qté</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(p, index) in selectedConsult.prescriptions" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>
                            <span v-if="p.produit">{{ p.produit.produit_libelle }}</span>
                          </td>
                          <td>{{ p.produit.type.type_libelle }}</td>
                          <td>
                            {{ p.prescription_traitement_dosage }}
                            {{ p.prescription_traitement_dosage_unite }}
                          </td>
                          <td>{{ p.prescription_traitement_qte }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <state-empty v-else title="Aucune préscription répertoriée !" :expanded="false"
                    description="Il n'y a aucune préscription  disponible pour cette consultation !"></state-empty>
                </div>
                <div class="tab-pane" id="examens" role="tabpanel">
                  <div v-if="selectedConsult.examens.length > 0">
                    <h6 class="fs-14 fw-bold text-start mb-1 mt-3 text-primary bg-primary-subtle p-2 text-uppercase">
                      Examens
                    </h6>
                    <div class="border border border-primary-subtle mb-3"></div>
                    <!-- Small Tables -->
                    <table class="table table-sm table-nowrap text-dark">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Examen</th>
                          <th scope="col">Resultat</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(e, index) in selectedConsult.examens" :key="index">
                          <th scope="row">{{ index + 1 }}</th>
                          <td>
                            <span v-if="e.examen">{{
                              e.examen.examen_labo_libelle
                            }}</span>
                          </td>
                          <td>
                            <span class="badge badge-gradient-info">non disponible</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <state-empty v-else title="Aucun examen répertorié !" :expanded="false"
                    description="Il n'y a aucune examen disponible pour cette consultation !"></state-empty>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ["selectedConsult"],
};
</script>
