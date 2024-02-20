<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <div class="d-flex align-items-center">
                <img
                  src="assets/images/companies/emplacement.png"
                  style="height: 30px"
                  class="me-2"
                  alt="emplacement icon"
                />
                <h4 class="fs-16 fw-bold mb-1 text-uppercase" v-if="user.hopital">
                  <span v-if="user.hopital" class="fw-bold">
                    {{ user.hopital.hopital_nom }}
                  </span>
                  <span v-if="user.hopital.emplacement">
                    🏥{{ user.hopital.emplacement.hopital_emplacement_libelle }}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div v-if="user.role">
          <!-- admin dash -->
          <admin-dash v-if="user.role.role.toLowerCase().includes('admin')" />
          <!-- end admin -->

          <!-- dashboard pharmacie content here -->
          <pharmacie-dash v-if="user.role.role.includes('Pharmacien')" />
          <!-- end dashboard content -->

          <!-- dashboard reception -->
          <reception-dash v-if="user.role.role.includes('Réceptionniste')" />
          <!-- end dashboard -->

          <!-- doctor dashboard -->
          <doctor-dash v-if="user.role.role.toLowerCase().includes('docteur')" />
          <!-- end doctor dashboard -->
        </div>
      </div>
    </div>

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
</template>

<script>
import PharmacieDash from "./dashboards/pharmacie_admin_dashboard.vue";
import ReceptionDash from "./dashboards/reception_dash.vue";
import AdminDash from "./dashboards/admin_dash.vue";
import DoctorDash from "./dashboards/doctor_dashbord.vue";
export default {
  components: {
    PharmacieDash,
    ReceptionDash,
    AdminDash,
    DoctorDash,
  },
  computed: {
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },
};
</script>

<style scoped>
li:active {
  background-color: #d7e4fc !important;
}
</style>
