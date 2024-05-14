<template>
  <teleport to="body">
    <div id="prescription-view-modal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Encaissement d'une prescription</h5>
            <p class="text-white-50 mb-1">
              Veuillez sélectionner le produit disponible !
            </p>
          </div>
          <div class="modal-body p-4">
            <div class="d-flex mb-3">
              <div class="search-box flex-fill me-2">
                <input type="text" class="form-control form-control-lg" id="searchProductList"
                  placeholder="Entrez le code de la prescription..." v-model="search" />
                <i class="ri-search-line search-icon"></i>
              </div>
              <button class="btn btn-secondary btn-icon btn-lg">
                <i class="ri-search-2-line"></i>
              </button>
            </div>
            <div class="table-responsive">
              <table v-if="false" class="table align-middle table-nowrap mb-0">
                <thead class="table-info">
                  <tr>
                    <th scope="col" style="width: 50px"></th>
                    <th class="sort fw-bold" scope="col">Produit</th>
                    <th class="sort fw-bold" style="width: 200px" scope="col">
                      Quantité
                    </th>
                  </tr>
                </thead>
                <tbody class="list form-check-all">
                  <!-- <tr v-for="(patient, index) in patients" :key="index">
                                        <th scope="row">
                                            <span class="spinner-border spinner-border-sm"
                                                v-if="id === patient.id"></span>
                                            <div class="form-check form-radio-success" v-else>
                                                <input :disabled="id !== ''" class="form-check-input"
                                                    @change.prevent="onSelect($event, patient)" type="radio"
                                                    name="formradiocolor3" id="formradioRight7" />
                                            </div>
                                        </th>
                                        <td class="id">
                                            <a href="javascript:void(0);" class="fw-medium link-primary">{{
                                        patient.patient_code_appel
                                    }}</a>
                                        </td>
                                        <td class="name">
                                            {{ patient.patient_nom }} {{ patient.patient_prenom }}
                                        </td>
                                    </tr> -->
                </tbody>
              </table>
              <state-empty title="Encaissement prescription médicale !" :expanded="false"
                description="Veuillez entrez le code sur la prescription pour voir le produit !"></state-empty>
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
  name: "PrescriptionViewModal",
  data() {
    return {
      search: "",
      id: "",
    };
  },
  methods: {
    onSelect(e, data) {
      let checked = e.target.checked;
      if (checked) {
        this.id = data.id;
        this.$store
          .dispatch("services/showPatient", data.id)
          .then((result) => {
            this.id = "";
            this.$emit("onSelect", result);
            this.$closeBsModal("patientsPendingModal");
          })
          .catch((e) => {
            this.id = "";
          });
      }
    },
  },
  mounted() {
    let self = this;
    $("#patientsPendingModal").on("hidden.bs.modal", function (e) {
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.checked = false;
      });
    });
  },
};
</script>
