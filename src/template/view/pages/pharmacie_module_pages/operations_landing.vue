<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">Operations sur le stock pharmaceutique</h4>
              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a
                      href="javascript: void(0);"
                      class="btn btn-sm btn-secondary text-white"
                      @click.prevent="
                        $router.push({ name: 'pharma-operation-viewer-route' })
                      "
                      >Voir la situation des toutes les opérations</a
                    >
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center">
          <div class="col-md-10">
            <div
              class="nav nav-pills active nav-pills-tab custom-verti-nav-pills text-center"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link bg-white border border-primary-subtle p-3 d-flex btn-soft-secondary flex-fill me-2 flex-column justify-content-center align-items-center show"
                id="custom-v-pills-home-tab"
                @click.prevent="$router.push({ name: 'approv-route' })"
                role="tab"
              >
                <img
                  src="assets/images/companies/approvisionnement.png"
                  class="d-block fs-20 mb-1 text-center"
                  style="height: 40px"
                />
                Approvisionnement
              </button>
              <button
                class="nav-link p-3 border border-primary-subtle bg-white d-flex flex-fill me-2 flex-column justify-content-center align-items-center"
                id="consultations-tab"
                @click.prevent="$router.push({ name: 'transfert-route' })"
                role="tab"
              >
                <img
                  src="assets/images/companies/exchange.png"
                  class="d-block fs-20 mb-1 text-center"
                  style="height: 40px"
                />
                Transfert produits
              </button>
              <button
                class="nav-link p-3 bg-white border border-primary-subtle flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                id="prescriptions-tab"
                @click.prevent="$router.push({ name: 'classement-route' })"
                role="tab"
              >
                <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> -->
                <img
                  src="assets/images/companies/expiry.png"
                  class="d-block fs-20 mb-1 text-center"
                  style="height: 40px"
                />
                Classement produits
              </button>
              <button
                class="nav-link p-3 border border-primary-subtle bg-white flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                id="examens-tab"
                role="tab"
                @click.prevent="$router.push({ name: 'retour-route' })"
              >
                <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> -->
                <img
                  src="assets/images/companies/return-2.png"
                  class="d-block fs-20 mb-1 text-center"
                  style="height: 40px"
                />
                Retour auprès du fournisseur
              </button>
            </div>
          </div>
        </div>
        <!-- Content operation -->
        <div class="row mt-4 d-flex align-items-center justify-content-center">
          <div class="col-md-10">
            <router-view v-slot="{ Component }">
              <transition name="fade-in-up" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
        <!-- end content -->
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
export default {
  name: "ProductCreate",
  data() {
    return {
      formLoading: false,
    };
  },
};
</script>

<style>
.fade-in-up-enter-active,
.fade-in-up-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-in-up-enter,
.fade-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
