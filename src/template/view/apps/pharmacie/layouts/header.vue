<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <a href="javascript:void(0)" class="logo logo-dark">
              <span class="logo-sm">
                <img src="assets/logo-2.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="assets/logo-2.png" alt="" height="17" />
              </span>
            </a>

            <a href="#/pharmacie/seller/home" class="logo logo-light">
              <span class="logo-sm">
                <img src="assets/logo-2.png" alt="" height="50" />
              </span>
              <span class="logo-lg">
                <img src="assets/logo-2.png" alt="" height="55" />
              </span>
            </a>
          </div>

          <button
            type="button"
            class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon"
          >
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- App Search-->
          <form class="app-search d-none d-md-block">
            <div class="position-relative">
              <input
                type="text"
                @input="onSearchTrigger"
                class="form-control"
                placeholder="Recherche produits"
                autocomplete="off"
                id="search-options"
                value=""
              />
              <span class="mdi mdi-magnify search-widget-icon"></span>
              <span
                class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                id="search-close-options"
              ></span>
            </div>
            <div class="dropdown-menu dropdown-menu-lg" id="search-box" ref="search-box">
              <div data-simplebar style="max-height: 320px">
                <!-- item-->
                <div class="dropdown-header">
                  <h6 class="text-overflow text-muted mb-0 text-uppercase">
                    Produits trouvés
                  </h6>
                </div>
                <div class="dropdown-header mt-2">
                  <h6 class="mb-2 text-info fs-10">
                    Cliquez sur un produit pour ajouter au panier !
                  </h6>
                </div>

                <div class="notification-list">
                  <!-- item -->
                  <a
                    href="javascript:void(0);"
                    class="dropdown-item notify-item py-2"
                    v-for="(data, index) in products_searched"
                    :key="index"
                    @click="$store.dispatch('pharmacie/addToCart', data)"
                  >
                    <div class="d-flex">
                      <img
                        src="assets/images/companies/medic.png"
                        class="me-3 rounded-circle avatar-xs"
                        alt="user-pic"
                      />
                      <div class="flex-grow-1">
                        <h6 class="m-0">{{ data.produit.produit_libelle }}</h6>
                        <span class="fs-11 mb-0 text-muted">{{
                          data.produit.categorie.categorie_libelle
                        }}</span>
                      </div>
                      <h6 class="m-0">
                        {{ data.produit_prix }}{{ data.produit_prix_devise }}
                      </h6>
                    </div>
                  </a>
                </div>
              </div>

              <div
                class="text-center d-flex justify-content-center align-items-center pt-3 pb-1"
              >
                <a
                  href="javascript:void(0)"
                  @click="closeSearchViewer"
                  class="btn btn-soft-danger btn-sm me-2"
                  >Fermer <i class="ri-close-line ms-1"></i
                ></a>
                <a href="#/pharmacie/seller/home" class="btn btn-soft-primary btn-sm"
                  >Voir tous les produits <i class="ri-arrow-right-line ms-1"></i
                ></a>
              </div>
            </div>
          </form>
        </div>

        <div class="d-flex align-items-center">
          <div class="dropdown d-md-none topbar-head-dropdown header-item">
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-search-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-search fs-22"></i>
            </button>
            <div
              class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-search-dropdown"
            >
              <form class="p-3">
                <div class="form-group m-0">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search ..."
                      aria-label="Recipient's username"
                    />
                    <button class="btn btn-primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="dropdown topbar-head-dropdown ms-1 header-item">
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-cart-dropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-shopping-bag fs-22"></i>
              <span
                class="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-danger"
                >{{ cart.length }}</span
              >
            </button>
            <div
              class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
              aria-labelledby="page-header-cart-dropdown"
            >
              <div
                class="p-3 border-top-0 border-start-0 border-end-0 border-dashed border"
              >
                <div class="row align-items-center">
                  <div class="col">
                    <h6 class="m-0 fs-16 fw-semibold">Panier en attente</h6>
                  </div>
                  <div class="col-auto">
                    <span class="badge bg-warning-subtle text-warning fs-13"
                      ><span class="cartitem-badge">{{ cart.length }}</span> items
                    </span>
                  </div>
                </div>
              </div>
              <div data-simplebar style="max-height: 300px">
                <div class="p-2" v-if="cart.length === 0">
                  <div class="text-center empty-cart" id="empty-cart">
                    <div class="avatar-md mx-auto my-3">
                      <div
                        class="avatar-title bg-danger-subtle text-danger fs-36 rounded-circle"
                      >
                        <i class="bx bx-cart"></i>
                      </div>
                    </div>
                    <h5 class="mb-3 fs-12">
                      Panier vide,veuillez cliquer sur un produit pour ajouter au panier !
                    </h5>
                  </div>
                </div>
                <div class="p-2" v-else>
                  <div
                    class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2"
                    v-for="(data, index) in cart"
                    :key="index"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/companies/medic.png"
                        class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic"
                      />
                      <div class="flex-grow-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          {{ data.produit_libelle }}
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          QTE :
                          <span
                            >{{ data.operation_qte }} x
                            {{ data.produit_prix + data.produit_devise }}</span
                          >
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">
                          <span class="cart-item-price"
                            >{{ data.operation_qte * data.produit_prix
                            }}{{ data.produit_devise }}</span
                          >
                        </h5>
                      </div>
                      <div class="ps-2">
                        <button
                          type="button"
                          @click="cart.splice(index, 1)"
                          class="btn btn-icon btn-sm btn-ghost-danger remove-item-btn"
                        >
                          <i class="ri-close-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
                id="checkout-elem"
              >
                <div class="d-flex justify-content-between align-items-center pb-3">
                  <h5 class="m-0 text-muted">Total:</h5>
                  <div class="px-2">
                    <h5 class="m-0" id="cart-item-total">{{ cartTotal }}F</h5>
                  </div>
                </div>

                <button
                  type="button"
                  :disabled="sellLoading"
                  class="btn btn-success btn-lg w-100"
                  @click="makeSell"
                >
                  <svg
                    width="22"
                    v-if="sellLoading"
                    fill="#FFFFFF"
                    height="22"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle class="spinner_S1WN" cx="4" cy="12" r="3" />
                    <circle class="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" />
                    <circle class="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" />
                  </svg>
                  <i v-else class="ri-check-double-line"></i> Valider le paiement
                </button>
              </div>
            </div>
          </div>

          <div class="dropdown ms-sm-3 header-item topbar-user">
            <button
              type="button"
              class="btn"
              id="page-header-user-dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="d-flex align-items-center">
                <img
                  class="rounded-circle header-profile-user"
                  src="assets/images/users/avatar-1.jpg"
                  alt="Header Avatar"
                />
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{
                    user.name
                  }}</span>
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{{
                    user.pharmacie_role
                  }}</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end" v-if="user !== null">
              <!-- item-->
              <h6 class="dropdown-header">Bienvenue {{ user.name }}!</h6>
              <a class="dropdown-item" href="javascript:void(0)"
                ><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Profile</span></a
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void(0)"
                ><i
                  class="mdi mdi-wallet text-secondary-emphasis fs-16 align-middle me-1"
                ></i>
                <span class="align-middle"
                  >Balance : <b v-if="reports.counts">{{ reports.counts.balance }}</b>
                  <small><b>CDF</b></small></span
                ></a
              >

              <a
                class="dropdown-item"
                href="javascript:void(0)"
                @click="$showBsModal('session-modal')"
                ><i class="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Fermeture de la session</span></a
              >
              <a
                class="dropdown-item"
                href="javascript:void(0)"
                @click.prevent="
                  $store.dispatch('auth/loggedOut');
                  $router.push({ name: 'login' });
                "
                ><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" data-key="t-logout">Déconnexion</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
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
      <button
        type="button"
        class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
        id="vertical-hover"
      >
        <i class="ri-record-circle-line"></i>
      </button>
    </div>

    <div id="scrollbar">
      <div class="container-fluid">
        <div id="two-column-menu"></div>
        <ul class="navbar-nav" id="navbar-nav">
          <li class="menu-title"><span data-key="t-menu">Menu</span></li>
          <li class="nav-item">
            <a class="nav-link menu-link" href="#/pharmacie/seller/home">
              <i class="bx bx-shopping-bag"></i>
              <span
                class="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info"
                >5</span
              >
              <span data-key="t-dashboards">Tableau des ventes</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link menu-link" href="#/pharmacie/seller/dashboard">
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
</template>

<script>
export default {
  name: "FooterLayout",

  data() {
    return {
      search: "",
      sellLoading: false,
    };
  },

  beforeMount() {
    this.$store.dispatch("auth/refreshUser");
  },

  computed: {
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
    reports() {
      return this.$store.getters["pharmacie/GET_SELLER_REPORTS"];
    },
    cart() {
      let cart = this.$store.getters["pharmacie/GET_CART"];
      return cart;
    },
    cartTotal() {
      let sousTotal = 0;
      for (let item of this.cart) {
        sousTotal += parseFloat(item.operation_qte * item.produit_prix);
      }
      return sousTotal;
    },
    products_searched() {
      if (this.search) {
        let arr = this.$store.getters["pharmacie/GET_SELL_PRODUCTS"];
        let filtered = arr.filter((el) =>
          el.produit.produit_libelle.toLowerCase().includes(this.search.toLowerCase())
        );
        console.log(filtered.length);
        return filtered;
      } else {
        return [];
      }
    },
  },

  methods: {
    onSearchTrigger(event) {
      let searchBox = document.querySelector("#search-box");
      let options = document.querySelector("#search-close-options");
      let value = event.target.value;
      this.search = value;
      if (value !== "") {
        searchBox.classList.add("show");
        options.classList.remove("d-none");
      } else {
        searchBox.classList.remove("show");
        options.classList.add("d-none");
      }
      /* this.$emit("onSearched", value); */
    },

    closeSearchViewer() {
      let options = document.querySelector("#search-close-options");
      let searchBox = document.querySelector("#search-box");
      searchBox.classList.remove("show");
      options.classList.add("d-none");
    },

    makeSell() {
      this.sellLoading = true;
      this.$store
        .dispatch("pharmacie/createNewSell")
        .then((res) => {
          this.sellLoading = false;
          if (res.errors !== undefined) {
            Swal.fire({
              icon: "error",
              title: "Echec de l'opération !",
              text: res.errors.toString(),
            });
            return;
          } else if (res.status !== undefined) {
            Swal.fire({
              icon: "success",
              title: "Vente effectuée !",
              text: "Nouvelle vente effectuée avec succès !",
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => (this.sellLoading = false));
    },
  },
};
</script>
