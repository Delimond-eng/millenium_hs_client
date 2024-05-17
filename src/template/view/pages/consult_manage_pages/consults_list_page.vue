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
              <h4 class="mb-sm-0">Liste des consultations</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="me-2">
                    <button
                      class="btn btn-secondary btn-border btn-sm addMembers-modal"
                      @click="$router.push('/home/consult/create')"
                    >
                      <i class="ri-add-fill me-1 align-bottom"></i> Nouvelles
                      consultations
                    </button>
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
              <div class="card-body">
                <custom-table
                  v-if="isEmplacementDefined"
                  :api-url="`/consultations.all/${this.$user().hopital.emplacement.id}`"
                  :columns="dataTableColumns"
                  :data-src="'consultations'"
                  ref="dataTableConsult"
                  :action-buttons="actionButtons"
                  @actionButtonClick="handleActionButtonClick"
                />
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
        class="btn-secondary text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
        @click.prevent="$router.push('/home/consult/create')"
      >
        <i class="ri-add-line fs-22"></i>
      </div>
    </div>
  </div>

  <!-- modal consult details view -->
  <consult-details-modal :selected-consult="selectedConsult" />
</template>

<script>
import consultDetailsModal from "../../modals/modal_consult_details";
export default {
  name: "ConsulstList",
  components: {
    consultDetailsModal,
  },
  data() {
    return {
      selectedConsult: null,
      dataTableColumns: [
        { data: "consult_create_At", title: "Date" },
        {
          data: null,
          title: "Nom complet",
          render: function (data, type, row) {
            return (
              row.patient.patient_code +
              " " +
              row.patient.patient_nom +
              " " +
              row.patient.patient_prenom
            );
          },
        },
        { data: "consult_libelle", title: "Motif" },
        {
          data: null,
          title: "Consulté par",
          render: function (data, type, row) {
            // Concaténer les valeurs de agent_nom et agent_prenom
            return (
              row.agent.agent_matricule +
              " " +
              row.agent.agent_nom +
              " " +
              row.agent.agent_prenom
            );
          },
        },
      ],
      actionButtons: [
        {
          label: '<i class="ri-edit-2-line"></i>',
          class: "btn-secondary me-1",
          key: "edit",
        },
        {
          label: '<i class="Voir détails',
          class: "btn-info me-1",
          key: "details",
        },
        {
          label: '<i class="ri-delete-bin-3-line"></i>',
          class: "btn-soft-danger me-1",
          key: "delete",
        },
      ],
    };
  },
  computed: {
    consultations() {
      return this.$store.getters["services/GET_CONSULTATIONS"];
    },
    isEmplacementDefined() {
      return (
        this.$user().hopital !== undefined &&
        this.$user().hopital.emplacement !== undefined
      );
    },
  },

  mounted() {
    this.$store.dispatch("services/viewAllConsults");
  },
  methods: {
    handleActionButtonClick(payload) {
      switch (payload.key) {
        case "details":
          this.selectedConsult = payload.data;
          this.$showBsModal("detailsModal");
          break;
        case "edit":
          localStorage.setItem("cached-consult", JSON.stringify(payload));
          setTimeout(() => {
            this.$router.push({ name: "consult-create" });
          }, 1000);
          break;
        case "delete":
          console.log("");
          break;
      }
    },
  },
};
</script>
