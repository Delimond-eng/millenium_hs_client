<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Liste des suivis médicaux</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="me-2">
                    <a href="#/home/suivi/make" class="btn btn-secondary btn-sm"><i
                        class="ri-add-line me-1"></i>Effectuer un suivi</a>
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
                <custom-table v-if="isEmplacementDefined"
                  :api-url="`/suivis.all/${this.$user().hopital.emplacement.id}`" :columns="dataTableColumns"
                  :data-src="'suivis'" ref="dataTableSuivi" :action-buttons="actionButtons"
                  @actionButtonClick="handleActionButtonClick" />
              </div>
            </div>
          </div>
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
  </div>
  <suivi-details-modal :traitements="traitements" />
</template>

<script>
import SuiviDetailsModal from "../../modals/modal_suivi_details.vue";
export default {
  name: "PremierSoinList",

  components: {
    SuiviDetailsModal,
  },
  data() {
    return {
      traitements: [],
      dataTableColumns: [
        { data: "patient_code", title: "CODE" },
        { data: "patient_nom", title: "NOM" },
        { data: "patient_prenom", title: "PRENOM" },
        { data: "patient_sexe", title: "SEXE" },
        {
          data: null,
          title: "Consulté par",
          render: function (data, type, row) {
            // Concaténer les valeurs de agent_nom et agent_prenom
            if (row.suivis !== undefined && row.suivis.length > 0) {
              return (
                'Dr. ' + row.suivis[0].traitements[0].prescription.user.agent.agent_nom
                + ' ' + row.suivis[0].traitements[0].prescription.user.agent.agent_prenom
              );
            }
            return null;

          },
        },
      ],
      actionButtons: [
        {
          label: '<i class="ri-shield-cross-line me-1"></i>Voir suivis',
          class: "btn-secondary me-1",
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

  methods: {
    handleActionButtonClick(payload) {
      switch (payload.key) {
        case "details":
          this.traitements = payload.data.suivis;
          this.$showBsModal("suiviDetailsModal");
          break;
        case "delete":
          console.log("");
          break;
      }
    },
  },
  computed: {
    isEmplacementDefined() {
      return (
        this.$user().hopital !== undefined &&
        this.$user().hopital.emplacement !== undefined
      );
    },
  },
};
</script>
