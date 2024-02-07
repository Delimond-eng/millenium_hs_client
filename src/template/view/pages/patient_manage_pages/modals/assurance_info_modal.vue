<template>
  <teleport to="body">
    <div
      id="assuranceInfoModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Information sur l'assuré</h5>
          </div>
          <div class="modal-body p-4">
            <div class="table-responsive">
              <table class="table mb-0" v-if="detail">
                <tbody class="text-black">
                  <tr>
                    <th scope="row">Sociète conventionné</th>
                    <td class="fw-bold">
                      <span v-if="detail.partener">
                        {{ detail.partener.partener_nom }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Matricule</th>
                    <td>
                      <span v-if="detail.agent_matricule">
                        {{ detail.agent_matricule }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">N° Assurance</th>
                    <td>
                      <span v-if="detail.agent_num_convention">
                        {{ detail.agent_num_convention }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Nom & prenom de l'assuré</th>
                    <td>
                      <span v-if="detail.agent_nom">
                        {{ detail.agent_nom }}
                        {{ detail.agent_prenom }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Sexe</th>
                    <td>
                      <span v-if="detail.agent_sexe">
                        {{ detail.agent_sexe }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Etat civil</th>
                    <td>
                      <span v-if="detail.agent_etat_civil">
                        {{ detail.agent_etat_civil }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Nombre d'enfants</th>
                    <td>
                      <span v-if="detail.agent_nbre_efts">
                        {{ detail.agent_nbre_efts }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-end align-items-end mt-2">
              <button
                type="button"
                class="btn btn-light btn-border text-uppercase me-2"
                @click="$closeBsModal('assuranceInfoModal')"
              >
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
  name: "PrescriptionDetailsModal",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    detail: {
      type: Array,
      default: () => {},
    },
  },

  methods: {
    /* validDemand() {
                                    this.loading = true;
                                    let consultId = this.detail.heading.consult_id;
                                    this.$store.dispatch('services/validateDemandeExam', consultId).then((res) => {
                                        console.log(res);
                                        this.loading = false;
                                        setTimeout(() => {
                                            this.$closeBsModal('examenDetailsModal');
                                        }, 1000)
                                    }).catch((e) => {
                                        this.loading = false;
                                        console.log(e);
                                    })
                                }, */
  },
};
</script>
