<template>
  <!-- Begin page -->
  <div>
    <!-- Header -->
    <header-layout />
    <!-- End Header -->

    <div class="app-menu navbar-menu">
      <!-- LOGO -->
      <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <a href="index.html" class="logo logo-dark">
          <span class="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span class="logo-lg">
            <img src="assets/images/logo-dark.png" alt="" height="17" />
          </span>
        </a>
        <!-- Light Logo-->
        <a href="index.html" class="logo logo-light">
          <span class="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span class="logo-lg">
            <img src="assets/images/logo-light.png" alt="" height="17" />
          </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover">
          <i class="ri-record-circle-line"></i>
        </button>
      </div>

      <div id="scrollbar">
        <div class="container-fluid">
          <div id="two-column-menu"></div>
          <ul class="navbar-nav" id="navbar-nav">
            <li class="menu-title"><span data-key="t-menu">Menu</span></li>
            <li class="nav-item">
              <a class="nav-link menu-link" href="javascript:void(0)">
                <i class="bx bx-shopping-bag"></i>
                <span
                  class="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">5</span>
                <span data-key="t-dashboards">Tableau des ventes</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link menu-link" href="javascript:void(0)">
                <i class="ri-dashboard-2-line"></i>
                <span data-key="t-dashboards">Tableau de bord</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- Sidebar -->
      </div>

      <div class="sidebar-background"></div>
    </div>
    <!-- Left Sidebar End -->
    <!-- Vertical Overlay-->
    <div class="vertical-overlay"></div>

    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Ventes des produits pharmaceutiques</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);">Pharmacie</a>
                  </li>
                  <li class="breadcrumb-item active">ventes</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <!-- end page title -->

        <div class="row mt-4" id="seller-list">
          <div class="col-md-4">
            <div class="m-0">
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header">
                      <div class="d-flex">
                        <div class="flex-grow-1">
                          <h5 class="card-title mb-0">
                            <i class="ri-shopping-cart-2-line"></i> Panier
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="card-body overflow-auto" data-simplebar-auto-hide="false" data-simplebar
                      style="height: 300px">
                      <div class="table-responsive table-card">
                        <table class="table table-borderless align-middle mb-0">
                          <thead class="table-light text-muted">
                            <tr>
                              <th scope="col">Produit</th>
                              <th scope="col" class="text-end"></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody v-if="cart.length > 0">
                            <tr class="border-bottom-dashed border" v-for="(data, i) in cart" :key="i">
                              <td>
                                <h5 class="fs-14">
                                  <a href="javascript:void(0)" class="text-dark">{{
                            data.produit_libelle
                          }}</a>
                                </h5>
                                <div class="d-flex align-items-center">
                                  <p class="text-secondary mb-0 me-4 fw-bold">
                                    {{ data.produit_prix }}{{ data.produit_devise }} x
                                    {{ data.operation_qte }}
                                  </p>
                                  <div class="input-step">
                                    <button type="button" @click="
                            data.operation_qte === 1
                              ? (data.operation_qte = 1)
                              : data.operation_qte--
                            " class="minus">
                                      –
                                    </button>
                                    <input type="number" class="product-quantity" v-model="data.operation_qte"
                                      min="0" />
                                    <button type="button" class="plus" @click="data.operation_qte++">
                                      +
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td class="text-end">
                                {{ data.produit_prix * data.operation_qte
                                }}{{ data.produit_devise }}
                              </td>
                              <td>
                                <button class="btn btn-soft-danger btn-sm text-end" @click="cart.splice(i, 1)">
                                  <i class="ri-close-fill"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>

                          <tbody v-else>
                            <tr style="height: 200px"
                              class="d-flex flex-column justify-content-center align-items-center">
                              <td>
                                <div
                                  class="text-center empty-cart w-100 d-flex flex-column justify-content-center align-items-center"
                                  id="empty-cart">
                                  <div class="avatar-lg">
                                    <div class="avatar-title bg-danger-subtle text-danger fs-36 rounded-circle">
                                      <i class="bx bx-cart"></i>
                                    </div>
                                  </div>
                                  <h5 class="mt-2 fs-12">
                                    Veuillez cliquer sur un produit pour ajouter au panier
                                    !
                                  </h5>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="card-footer p-1">
                      <div class="table-responsive">
                        <table class="table table-borderless align-middle mb-0">
                          <thead></thead>
                          <tbody>
                            <tr class="table-active">
                              <th colspan="2">Total (FC) :</th>
                              <td class="text-end">
                                <span class="fw-semibold"> {{ cartTotal }}F </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- end card body -->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <!-- numeric pad -->
                  <numeric-pad @on-client-added="showOffcanvas" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-header rounded">
                <div class="row g-2">
                  <div class="col-xl-3">
                    <div class="search-box">
                      <input type="text" class="form-control" autocomplete="off" id="searchResultList"
                        placeholder="Recherchez produit" v-model="filter_1" />
                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-xxl-3 ms-auto">
                    <div>
                      <select class="form-control" v-model="filter_2" id="category-select">
                        <option value="" hidden selected>Filtrez par catégorie...</option>
                        <option value="">Tout</option>
                        <option v-for="(data, index) in categories" :key="index" :value="data.id">
                          {{ data.categorie_libelle }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-lg-auto">
                    <div class="hstack gap-2">
                      <button class="btn btn-success" data-bs-toggle="offcanvas" data-bs-target="#client-offcanvas"
                        aria-controls="client-offcanvas">
                        <i class="ri-add-fill me-1 align-bottom"></i> Ajout client
                      </button>
                    </div>
                  </div>
                  <!--end col-->
                </div>
                <!--end row-->
              </div>
              <div class="card-body overflow-auto" data-simplebar-auto-hide="false" data-simplebar
                style="height: 570px">
                <div class="row g-2 mb-4">
                  <div class="col-md-3" v-for="(item, index) in products" :key="index">
                    <div @click="$store.dispatch('pharmacie/addToCart', item)"
                      class="d-flex rounded-2 p-1 cursor-pointer align-items-center card-animate"
                      style="border: 1px solid #dde0e4">
                      <img src="assets/images/companies/medic.png" alt="" class="img-fluid d-block"
                        style="height: 50px" />
                      <div class="flex-grow-1 text-start ms-2">
                        <h5 class="fs-15 text-primary">
                          <span v-if="item.produit">{{
                            item.produit.produit_libelle
                          }}</span>
                        </h5>
                        <span class="text-muted fs-10 mb-2"><span v-if="item.produit.categorie">{{
                            item.produit.categorie.categorie_libelle
                          }}</span></span><br />
                        <span class="text-dark fw-bold mb-0">
                          {{ item.produit_prix }} {{ item.produit_prix_devise }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end row-->
        <!-- pagination-element -->
        <!-- <div
          class="row align-items-center mb-4 text-center text-sm-start"
          id="pagination-element"
        >
          <div class="col-sm">
            <div class="text-muted">Showing 1 to 8 of 12 entries</div>
          </div>
          <div class="col-sm-auto mt-3 mt-sm-0">
            <div
              class="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0"
            >
              <div class="page-item">
                <a href="javascript:void(0);" class="page-link" id="page-prev"
                  ><i class="mdi mdi-chevron-left"></i
                ></a>
              </div>
              <span id="page-num" class="pagination"></span>
              <div class="page-item">
                <a href="javascript:void(0);" class="page-link" id="page-next"
                  ><i class="mdi mdi-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div> -->
        <!-- pagination-element -->
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <!--   <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">2024. © Velzon.</div>
          <div class="col-sm-6">
            <div class="text-sm-end d-none d-sm-block">
              Design & Develop by Themesbrand
            </div>
          </div>
        </div>
      </div>
    </footer> -->
  </div>
  <!-- END layout-wrapper -->
  <!-- <client-offcanvas /> -->
</template>

<script>
import HeaderLayout from "./layouts/header.vue";
import FooterLayout from "./layouts/footer.vue";
import ClientOffcanvas from "./modals/client_create_modal.vue";
import NumericPad from "./components/numeric_pad.vue";
import "./assets/css/style.css";
export default {
  name: "Home",

  components: {
    HeaderLayout,
    FooterLayout,
    ClientOffcanvas,
    NumericPad,
  },

  data() {
    return {
      filter_1: "",
      filter_2: "",
    };
  },

  mounted() {
    this.addAttributes();
    this.$store.dispatch("pharmacie/viewPharmacieProducts");
    this.$store.dispatch("pharmacie/viewAllCategories");
  },
  unmounted() {
    this.removeAttributes();
  },
  methods: {
    addAttributes() {
      // Ajoutez vos attributs à la balise HTML (ici, <html>) ici
      document.documentElement.setAttribute("data-layout", "horizontal");
      document.documentElement.setAttribute("data-layout-style", "");
      document.documentElement.setAttribute("data-layout-position", "fixed");
      document.documentElement.setAttribute("data-topbar", "dark");
      document.body.classList.add("overflow-hidden");
    },
    removeAttributes() {
      // Supprimez vos attributs de la balise HTML (ici, <html>) ici
      document.documentElement.removeAttribute("data-layout");
      document.documentElement.removeAttribute("data-layout-style");
      document.documentElement.removeAttribute("data-layout-position");
      document.documentElement.removeAttribute("data-topbar");
      document.body.classList.remove("overflow-hidden");
      $("#client-offcanvas").offcanvas("show");
    },
    showOffcanvas() {
      $("#client-offcanvas").offcanvas("show");
    },
  },

  computed: {
    products() {
      if (this.filter_1) {
        let arr = this.$store.getters["pharmacie/GET_SELL_PRODUCTS"];
        let filtered = arr.filter((el) =>
          el.produit.produit_libelle.toLowerCase().includes(this.filter_1.toLowerCase())
        );
        return filtered;
      } else if (this.filter_2) {
        let arr = this.$store.getters["pharmacie/GET_SELL_PRODUCTS"];
        let filtered = arr.filter((el) => el.produit.categorie_id === this.filter_2);
        return filtered;
      } else {
        return this.$store.getters["pharmacie/GET_SELL_PRODUCTS"];
      }
    },
    categories() {
      return this.$store.getters["pharmacie/GET_CATEGORIES"];
    },

    cart() {
      return this.$store.getters["pharmacie/GET_CART"];
    },

    cartTotal() {
      let sousTotal = 0;
      for (let item of this.cart) {
        sousTotal += parseFloat(item.operation_qte * item.produit_prix);
      }
      return sousTotal;
    },
  },
};
</script>

<style>
.full-height {
  height: 100vh;
}
</style>
