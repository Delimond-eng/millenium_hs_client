<template>
  <!-- Begin page -->
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div
            class="page-title-box d-sm-flex align-items-center justify-content-between"
          >
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

      <div class="row mt-4">
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
                  <div
                    class="card-body overflow-auto"
                    data-simplebar-auto-hide="false"
                    data-simplebar
                    style="height: 300px"
                  >
                    <div class="table-responsive table-card">
                      <table class="table table-borderless align-middle mb-0">
                        <thead class="table-light text-muted">
                          <tr>
                            <th scope="col">Produit</th>
                            <th scope="col" v-if="cart.length > 0" class="text-end"></th>
                            <th v-if="cart.length > 0"></th>
                          </tr>
                        </thead>
                        <tbody v-if="cart.length > 0">
                          <tr
                            class="border-bottom-dashed border"
                            v-for="(data, i) in cart"
                            :key="i"
                          >
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
                                  <button
                                    type="button"
                                    @click="
                                      data.operation_qte === 1
                                        ? (data.operation_qte = 1)
                                        : data.operation_qte--
                                    "
                                    class="minus"
                                  >
                                    –
                                  </button>
                                  <input
                                    type="number"
                                    class="product-quantity"
                                    v-model="data.operation_qte"
                                    @input="checkQty($event, data)"
                                    min="0"
                                  />
                                  <button
                                    type="button"
                                    class="plus"
                                    @click="data.operation_qte++"
                                  >
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
                              <button
                                class="btn btn-soft-danger btn-sm text-end"
                                @click="cart.splice(i, 1)"
                              >
                                <i class="ri-close-fill"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>

                        <tbody v-else>
                          <tr
                            style="height: 200px"
                            class="d-flex flex-column justify-content-center align-items-center"
                          >
                            <td>
                              <div
                                class="text-center empty-cart w-100 d-flex flex-column justify-content-center align-items-center"
                                id="empty-cart"
                              >
                                <div class="avatar-lg">
                                  <div
                                    class="avatar-title bg-danger-subtle text-danger fs-36 rounded-circle"
                                  >
                                    <i class="bx bx-cart"></i>
                                  </div>
                                </div>
                                <h5 class="mt-2 fs-12">
                                  Veuillez cliquer sur un produit pour ajouter au panier !
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

                    <div class="d-flex m-2" v-if="cart.length > 0">
                      <button
                        class="btn me-2 btn-info btn-lg"
                        @click="$showBsModal('client-Modal')"
                      >
                        <i class="ri-user-add-line"></i> Client
                      </button>
                      <button
                        type="button"
                        :disabled="sellLoading"
                        class="btn me-2 btn-success btn-lg flex-fill"
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
                          <circle
                            class="spinner_S1WN spinner_Km9P"
                            cx="12"
                            cy="12"
                            r="3"
                          />
                          <circle
                            class="spinner_S1WN spinner_JApP"
                            cx="20"
                            cy="12"
                            r="3"
                          />
                        </svg>
                        <i v-else class="ri-check-double-line"></i> Valider le paiement
                      </button>
                      <button
                        class="btn me-2 btn-dark btn-lg"
                        @click="$store.dispatch('pharmacie/cancelCart')"
                      >
                        <i class="ri-close-line"></i> Annuler
                      </button>
                    </div>
                  </div>
                  <!-- end card body -->
                </div>
              </div>
            </div>
            <!--  <div class="row">
                <div class="col-md-12">
                 
                  <numeric-pad @on-client-added="showOffcanvas" />
                </div>
              </div> -->
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header rounded">
              <div class="row g-2">
                <div class="col-xl-3">
                  <div class="search-box">
                    <input
                      type="text"
                      class="form-control"
                      autocomplete="off"
                      id="searchResultList"
                      placeholder="Recherchez produit"
                      v-model="filter_1"
                    />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
                <!--end col-->
                <div class="col-xxl-3 ms-auto">
                  <div>
                    <select class="form-control" v-model="filter_2" id="category-select">
                      <option value="" hidden selected>Filtrez par catégorie...</option>
                      <option value="">Tout</option>
                      <option
                        v-for="(data, index) in categories"
                        :key="index"
                        :value="data.id"
                      >
                        {{ data.categorie_libelle }}
                      </option>
                    </select>
                  </div>
                </div>
                <!--end col-->
                <div class="col-lg-auto" v-if="cart.length > 0">
                  <div class="hstack gap-2">
                    <button class="btn btn-info" @click="$showBsModal('client-Modal')">
                      <i class="ri-user-add-line me-1 align-bottom"></i> Ajout client
                    </button>
                  </div>
                </div>
                <!--end col-->
              </div>
              <!--end row-->
            </div>
            <div
              class="card-body overflow-auto"
              data-simplebar-auto-hide="false"
              data-simplebar
              v-if="!dataLoading"
            >
              <div class="row g-2 mb-4">
                <div class="col-md-3" v-for="(item, index) in products" :key="index">
                  <div
                    @click="$store.dispatch('pharmacie/addToCart', item)"
                    class="d-flex rounded-2 p-1 cursor-pointer align-items-center card-animate"
                    style="border: 1px solid #dde0e4"
                  >
                    <img
                      src="assets/images/companies/medic.png"
                      alt=""
                      class="img-fluid d-block"
                      style="height: 50px"
                    />
                    <div class="flex-grow-1 text-start ms-2">
                      <h5 class="fs-15 text-primary">
                        <span v-if="item.produit">{{
                          item.produit.produit_libelle
                        }}</span>
                      </h5>
                      <span class="text-muted fs-10 mb-2"
                        ><span v-if="item.produit.categorie">{{
                          item.produit.categorie.categorie_libelle
                        }}</span></span
                      ><br />
                      <span class="text-dark fw-bold mb-0">
                        {{ item.produit_prix }} {{ item.produit_prix_devise }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="card-body d-flex justify-content-center align-items-center"
            >
              <div class="h-75 m-5">
                <loader />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end row-->
    </div>
    <!-- container-fluid -->
  </div>
  <client-modal />
</template>

<script>
import ClientModal from "../modals/client_create_modal.vue";
import NumericPad from "../components/numeric_pad.vue";
import "../assets/css/style.css";
export default {
  name: "Home",

  components: {
    ClientModal,
    NumericPad,
  },

  data() {
    return {
      filter_1: "",
      filter_2: "",
      sellLoading: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick(() => {
        vm.$store.dispatch("auth/refreshUser");
        let session = localStorage.getItem("pharmacist-session");
        if (session === null) {
          var sessionModal = new bootstrap.Modal(
            document.getElementById("session-modal")
          );
          sessionModal.show();
        }
      });
    });
  },

  methods: {
    checkQty(input, data) {
      let inputQte = parseInt(input.target.value);
      if (inputQte > data.produit_stocks) {
        data.operation_qte = data.produit_stocks;
        Swal({
          icon: "warning",
          title: "Avertissement de stock !",
          text: `le stock actuel pour ce produit est de ${data.produit_stocks} unités !`,
        });
      }
    },
    //Create new sell
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

    dataLoading() {
      return this.$store.getters["pharmacie/IS_LOADING"];
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
