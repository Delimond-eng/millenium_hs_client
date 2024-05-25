<template>
  <teleport to="body">
    <div
      id="patientsPendingModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Patients en attente</h5>
            <p class="text-white-50 mb-1">
              Veuillez sélectionner un patient dans la liste
            </p>
          </div>
          <div class="modal-body p-4">
            <div class="d-flex mb-3">
              <div class="search-box flex-fill me-2">
                <input
                  type="text"
                  class="form-control"
                  id="searchProductList"
                  placeholder="Recherche patient..."
                  v-model="search"
                />
                <i class="ri-search-line search-icon"></i>
              </div>
              <button
                class="btn btn-soft-success btn-icon"
                @click="
                  $closeBsModal('patientsPendingModal');
                  $router.push({ name: 'patient-create' });
                "
              >
                <i class="ri-add-line"></i>
              </button>
            </div>
            <div class="table-responsive">
              <table
                class="table align-middle table-nowrap mb-0"
                v-if="patients.length > 0"
              >
                <thead class="table-info">
                  <tr>
                    <th scope="col" style="width: 50px"></th>
                    <th class="sort fw-bold" style="width: 100px" scope="col">
                      N° Jeton
                    </th>
                    <th class="sort fw-bold" scope="col">Nom complet</th>
                  </tr>
                </thead>
                <tbody class="list form-check-all">
                  <tr v-for="(patient, index) in patients" :key="index">
                    <th scope="row">
                      <span
                        class="spinner-border spinner-border-sm"
                        v-if="id === patient.id"
                      ></span>
                      <div class="form-check form-radio-success" v-else>
                        <input
                          :disabled="id !== ''"
                          class="form-check-input"
                          @change.prevent="onSelect($event, patient)"
                          type="radio"
                          name="formradiocolor3"
                          id="formradioRight7"
                        />
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
                  </tr>
                </tbody>
              </table>
              <state-empty
                v-else
                title="Aucun informations répertorié !"
                :expanded="false"
                description="Vs n'avez pas des consultations en attente pour l'instant !"
              ></state-empty>
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
  name: "FilterModal",
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
            this.$store.dispatch("services/viewMedicDocs", result.id);
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

    $("#patientsPendingModal").on("show.bs.modal", function (e) {
      self.$store.dispatch("services/viewPatientsPending");
    });
  },

  computed: {
    patients() {
      if (this.search) {
        let arr = this.$store.getters["services/GET_PATIENTS_PENDING"];
        let filtered = arr.filter((el) =>
          el.patient_nom.toLowerCase().includes(this.search.toLocaleLowerCase())
        );
        return filtered;
      } else {
        return this.$store.getters["services/GET_PATIENTS_PENDING"];
      }
    },
  },
};
</script>
