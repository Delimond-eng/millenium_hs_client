<template>
  <div>
    <div class="row">
      <div class="row mb-3 pb-1">
        <div class="col-12">
          <div class="d-flex align-items-lg-center flex-lg-row flex-column">
            <div class="flex-grow-1">
              <h4 class="fs-16 mb-1 fw-bold">
                Bienvenue <br />
                <small v-if="user" class="text-uppercase"><span v-if="user.role" class="text-secondary-emphasis">{{
                  user.role.role
                }}</span>
                  {{ user.name }}</small>
              </h4>
              <p class="text-muted mb-0">
                Votre tableau de bord pour vous guider à bien travailler.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1 overflow-hidden">
                <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                  Ventes journalières annulés
                </p>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                  <span class="counter-value" v-if="reports.counts">{{
                    `${reports.counts.abort_sells}`.padStart(2, "0")
                  }}</span>
                </h4>
                <a href="javascript:void(0)" class="text-decoration-underline">Voir les détails</a>
              </div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-warning-subtle rounded fs-3">
                  <i class="ri-error-warning-line text-warning"></i>
                </span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->

      <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1 overflow-hidden">
                <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                  Factures journalières
                </p>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h2 class="fs-22 fw-semibold ff-secondary mb-4">
                  <span class="counter-value" v-if="reports.counts">{{
                    `${reports.counts.tickets}`.padStart(2, "0")
                  }}</span>
                </h2>
                <a href="#" class="text-decoration-underline">Voir les détails</a>
              </div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-info-subtle rounded fs-3">
                  <i class="bx bx-shopping-bag text-info"></i>
                </span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->

      <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1 overflow-hidden">
                <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                  Clients journalières
                </p>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h2 class="fs-22 fw-semibold ff-secondary mb-4">
                  <span v-if="reports.counts" class="counter-value">{{
                    `${reports.counts.clients}`.padStart(2, "0")
                  }}</span>
                </h2>
                <a href="#" class="text-decoration-underline">Voir les détails</a>
              </div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-warning-subtle rounded fs-3">
                  <i class="bx bx-user-circle text-warning"></i>
                </span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->

      <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1 overflow-hidden">
                <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                  La balance journalière
                </p>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                  <span class="counter-value" v-if="reports.counts">{{
                    `${reports.counts.balance}`.padStart(2, "0")
                  }}</span>
                  <small v-if="reports.counts">CDF</small>
                </h4>
                <a href="#" class="text-decoration-underline">Voir les détails</a>
              </div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-primary-subtle rounded fs-3">
                  <i class="bx bx-wallet text-primary"></i>
                </span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card" id="customerList">
          <div class="card-header border-bottom-dashed">
            <div class="row g-4 align-items-center">
              <div class="col-sm">
                <div>
                  <h2 class="card-title mb-0 text-uppercase fw-bold">
                    Situation globale du stock
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div v-if="user">
              <custom-table v-if="user.pharmacie" :api-url="`/pharmacie.reports/${user.pharmacie.id}`"
                :columns="dataTableColumns" :action-buttons="actionButtons" @actionButtonClick="handleActionButtonClick"
                :data-src="'reports'" ref="customTableReports" />
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
  </div>
  <!-- end row-->
</template>

<script>
export default {
  name: "PharmacieDash",

  data() {
    return {
      timer: null,
      produit: null,
      dataTableColumns: [
        { data: "produit.produit_code", title: "CODE" },
        { data: "produit.produit_libelle", title: "PRODUIT" },
        {
          title: "PRODUIT",
          data: null,
          render: function (data, type, row) {
            return row.produit.produit_libelle + ' - ' + row.produit.type.type_libelle;
          },
        },
        { data: "produit.categorie.categorie_libelle", title: "CATEGORIE" },
        { data: "qte_entree", title: "QTE ENTREES" },
        { data: "qte_sortie", title: "QTE SORTIES" },
        {
          title: "SOLDE",
          data: null,
          render: function (data, type, row) {
            return parseInt(row.qte_entree) - parseInt(row.qte_sortie);
          },
        },
      ],
      actionButtons: [
        {
          label: "Voir détails",
          class: "btn-secondary",
          key: "delete",
        },
      ],
    };
  },
  unmounted() {
    clearInterval(this.timer);
  },
  beforeMount() {
    this.$nextTick(() => {
      this.$store.dispatch("pharmacie/viewDailySellerReport", "admin");
    });
  },
  methods: {
    handleActionButtonClick(payload) {
      this.$router.push({ name: 'pharma-operation-product-route', params: { id: payload.data.produit.id } })
    },
  },
  computed: {
    reports() {
      return this.$store.getters["pharmacie/GET_SELLER_REPORTS"];
    },
    user() {
      return this.$store.getters["auth/GET_USER"];
    }
  },
};
</script>
