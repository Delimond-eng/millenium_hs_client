<template>
  <teleport to="body">
    <div id="suiviDetailsModal" class="modal fade fadeInRight" tabindex="-1" aria-hidden="true" style="display: none">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Interventions et suivis médicaux</h5>
          </div>
          <div class="modal-body p-4">
            <div class="profile-timeline">
              <div class="accordion accordion-flush" id="todayExample">
                <div class="accordion-item border-0" v-for="(data, index) in traitements" :key="index">
                  <div class="accordion-header" :id="`heading_${index}`">
                    <a class="accordion-button p-2 shadow-none collapsed" data-bs-toggle="collapse"
                      :href="`#collapse_${index}`" aria-expanded="false">
                      <div class="d-flex">
                        <div class="flex-shrink-0 avatar-xs">
                          <div class="avatar-title bg-gradient bg-secondary text-white rounded-circle">
                            <i class="ri-shield-cross-line"></i>
                          </div>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h6 class="fs-14 mb-1 fw-semibold text-secondary  text-uppercase">
                            Suivi {{ `${index + 1}`.padStart(2, '0') }}
                          </h6>
                          <small class="text-dark">{{ data.created_at }}</small>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div :id="`collapse_${index}`" class="accordion-collapse collapse" :class="index === 0 ? 'show' : ''"
                    aria-labelledby="headingFour" data-bs-parent="#accordionExample" style="">
                    <div class="accordion-body ms-2 ps-5">
                      <div class="table-responsive">
                        <table class="table mb-0">
                          <tbody class="text-black">
                            <tr>
                              <th scope="row" style="width: 200px">Etat de santé</th>
                              <td>
                                <span class="badge badge-gradient-secondary">{{ data.suivi_etat }}</span>
                              </td>

                            </tr>
                            <tr>
                              <th scope="row" style="width: 200px">Recommandations</th>
                              <td>
                                {{ data.suivi_recommandations }}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row" style="width: 200px">Observation</th>
                              <td>
                                {{ data.suivi_obs }}
                              </td>
                              <th scope="row" style="width: 200px">Effectué par</th>
                              <td>
                                <i class="ri-user-3-line text-secondary"></i> <span v-if="data.agent">{{
                                  data.agent.agent_nom }} {{ data.agent.agent_prenom }}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <h6
                        class="fs-14 fw-bold text-start mb-1 mt-3 text-secondary-emphasis p-2 border-2 border-bottom border-secondary">
                        Traitements effectués
                      </h6>
                      <table class="table table-hover table-nowrap mb-0 text-dark">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Médicament</th>
                            <th scope="col">dosage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, i) in data.traitements" :key="i">
                            <td>{{ `${i + 1}`.padStart(2, "0") }}</td>
                            <td>
                              <span v-if="item.prescription">{{
                                item.prescription.produit.produit_libelle
                              }}</span>
                            </td>
                            <td>
                              <span v-if="item.prescription">
                                {{ item.prescription.prescription_traitement_dosage }}
                                {{ item.prescription.prescription_traitement_dosage_unite }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
              <!--end accordion-->
            </div>

            <div class="d-flex justify-content-end align-items-end">
              <button type="button" class="btn btn-light btn-border mt-2 text-uppercase me-2"
                @click="$closeBsModal('suiviDetailsModal')">
                Fermer
              </button>
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
  name: "SuiviDetailsModal",
  props: {
    traitements: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
