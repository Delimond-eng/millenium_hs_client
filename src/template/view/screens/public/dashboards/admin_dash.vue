<template>
  <div class="row">
    <div class="col-md-12 mb-3 pb-1">
      <div class="d-flex align-items-lg-center flex-lg-row flex-column">
        <div class="flex-grow-1">
          <h4 class="fs-16 mb-1 fw-bold">
            Bienvenue <br />
            <small class="text-uppercase"><span v-if="user.role" class="text-secondary-emphasis">{{
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

    <!-- <div class="col-md-12 mt-2 mb-2" v-if="config.produits">
      <autocomplete :data="config.produits" placeholder="Search product..." selected-label="produit_libelle"
        selected-key="id" @on-selected="onSelected" />
    </div>
    <div class="col-md-12 mt-2 mb-2" v-if="config.produits">
      <autocomplete :data="config.produits" placeholder="Search product..." selected-label="produit_libelle"
        selected-key="id" @on-selected="onSelected" />
    </div> -->
    <div class="col-xl-3 col-md-6">
      <!-- card -->
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                NBRE EMPLACEMENTS
              </p>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                <span class="counter-value">0</span>
              </h4>
              <a href="#/admin/config/all" class="text-decoration-underline">Voir les détails</a>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-warning-subtle rounded fs-3">
                <i class="ri-hospital-line text-warning"></i>
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
                Nbre des patients
              </p>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                <span class="counter-value">04</span>
              </h4>
              <a href="javascript:void(0)" class="text-decoration-underline">Voir les détails</a>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-success-subtle rounded fs-3">
                <i class="bx bx-user-circle text-success"></i>
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
                Nbres des agents
              </p>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                <span class="counter-value">0</span>
              </h4>
              <a href="javascript:void(0)" class="text-decoration-underline">Voir les détails</a>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-info-subtle rounded fs-3">
                <i class="ri-user-2-line text-info"></i>
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
                Nbre des partenaires
              </p>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                <span class="counter-value">0</span>
              </h4>
              <a href="javascript:void(0)" class="text-decoration-underline">Voir les détails</a>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-primary-subtle rounded fs-3">
                <i class="ri-red-packet-line text-primary"></i>
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
  <!-- end row-->
</template>

<script>
export default {
  name: "AdminDash",

  data() {
    return {
      autocomplete: null,
    };
  },

  computed: {
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },
  },
  async mounted() {
    await this.$store.dispatch("pharmacie/allConfigs");
  },

  methods: {
    onSelected(e) {
      console.log(e);
    },
  },
};
</script>
