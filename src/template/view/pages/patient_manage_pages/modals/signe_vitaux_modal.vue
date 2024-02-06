<template>
  <teleport to="body">
    <div id="patientSignesVitauxModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Signes vitaux</h5>
          </div>
          <div class="modal-body p-4">
            <div class="table-responsive">
              <table class="table mb-0" v-if="detail">
                <tbody class="text-black">
                  <tr>
                    <th scope="row">Poids</th>
                    <td>
                      <span v-if="detail.patient_sv_poids">
                        {{ detail.patient_sv_poids }}
                        {{ detail.patient_sv_poids_unite }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Taille</th>
                    <td>
                      <span v-if="detail.patient_sv_taille">
                        {{ detail.patient_sv_taille }}
                        {{ detail.patient_sv_taille_unite }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Temperature</th>
                    <td>
                      <span v-if="detail.patient_sv_temperature">
                        {{ detail.patient_sv_temperature }}
                        {{ detail.patient_sv_temperature_unite }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Tension arterielle</th>
                    <td>
                      <span v-if="detail.patient_sv_tension_art">
                        {{ detail.patient_sv_tension_art }}
                        {{ detail.patient_sv_tension_art_unite }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Pulsation</th>
                    <td>
                      <span v-if="detail.patient_sv_freq_cardio">
                        {{ detail.patient_sv_freq_cardio }}
                        {{ detail.patient_sv_freq_cardio_unite }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Saturation</th>
                    <td>
                      <span v-if="detail.patient_sv_saturation">
                        {{ detail.patient_sv_saturation }}
                        {{ detail.patient_sv_saturation_unite }}
                      </span>
                      <span v-else>--</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-end align-items-end mt-2">
              <button type="button" class="btn btn-light btn-border text-uppercase me-2"
                @click="$closeBsModal('patientSignesVitauxModal')">
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
      default: () => { },
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
