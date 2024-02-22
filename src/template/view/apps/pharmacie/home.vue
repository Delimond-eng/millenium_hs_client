<template>
  <!-- Begin page -->
  <div>
    <!-- Header -->
    <header-layout />
    <!-- End Header -->

    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="pos dvh-100 d-flex flex-column mt-5">
      <div class="pos-content flex-grow-1 bg-200">
        <div class="product-screen d-flex h-100 bg-100">
          <div class="leftpane d-flex flex-column mt-5">
            <!-- if you have data -->

            <div
              class="order-container overflow-y-auto flex-grow-1 d-flex flex-column text-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h2 class="fw-bold m-2">
                  <i class="bx bx-shopping-bag me-2"></i> Panier
                </h2>
                <button class="btn btn-sm btn-danger">
                  <i class="ri-delete-bin-3-line"></i> Effacer tout
                </button>
              </div>
              <hr />
              <li
                class="orderline bg-white mb-1 p-3 lh-sm cursor-pointer"
                v-for="(item, index) in 4"
                :key="index"
              >
                <div class="d-flex justify-content-between">
                  <div
                    class="product-name d-inline-block flex-grow-1 fw-bolder pe-1 text-truncate"
                  >
                    <span class="text-wrap">Conference Chair (Aluminium)</span>
                  </div>
                  <div class="product-price text-end price fw-bolder">
                    <span class="me-2"> 45,31Fr </span>
                    <button class="btn btn-soft-danger btn-sm btn-icon">
                      <i class="ri-delete-bin-6-line"></i>
                    </button>
                  </div>
                </div>
                <ul class="info-list ms-2">
                  <li class="price-per-unit">
                    <em class="qty fst-normal fw-bolder me-1">1,00</em> Unité(s) x 45,31Fr
                    <span> / Unité(s)</span>
                  </li>
                </ul>
              </li>
            </div>
            <!-- total -->
            <div
              class="order-summary bg-light w-100 py-2 px-3 bg-100 overflow-hidden text-end fw-bolder fs-2 lh-sm"
            >
              Total : <span class="total">235,06Fr</span>
              <div class="fs-6 text-muted subentry">
                Taxes : <span class="tax">30,66Fr</span>
              </div>
            </div>
            <div class="pads border-top">
              <div class="subpads d-flex">
                <div
                  class="actionpad d-flex flex-column flex-grow-1 mw-50 p-0 border-end"
                >
                  <button
                    class="button set-partner btn btn-light rounded-0 py-2 flex-shrink-1 fw-bolder"
                  >
                    <div class="d-flex justify-content-center align-items-center">
                      <span
                        class="d-flex justify-content-center align-items-center rounded-circle me-2 text-bg-dark"
                        ><i class="ri-user-3-line text-white"></i
                      ></span>
                      <div>Client</div>
                    </div></button
                  ><button
                    class="pay validation pay-order-button btn-primary button btn d-flex flex-column flex-fill align-items-center justify-content-center fw-bolder btn-lg rounded-0"
                  >
                    <div
                      class="pay-circle d-flex align-items-center justify-content-center py-2 mb-2"
                    >
                      <i class="ri-arrow-right-line"></i>
                    </div>
                    Paiement
                  </button>
                </div>
                <div class="w-100 numpad row row-cols-4 gx-0">
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    1
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    2
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    3
                  </button>
                  <button
                    class="col btn btn-light py-3 border fw-bolder rounded-0 active border-primary"
                  >
                    Qty
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    4
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    5
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    6
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    % Disc
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    7
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    8
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    9
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    Price
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    +/-
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    0
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    ,
                  </button>
                  <button class="col btn btn-light py-3 border fw-bolder rounded-0">
                    ⌫
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="rightpane overflow-auto d-flex flex-grow-1 flex-column bg-300 w-60">
            <div class="products-widget d-flex flex-column flex-grow-1 overflow-auto">
              <div class="product-list-container flex-grow-1 overflow-y-auto">
                <div class="product-list-empty no-results-message text-center mt-5">
                  <div class="product-list-container flex-grow-1 overflow-y-auto">
                    <div class="container mt-0">
                      <div class="row">
                        <div class="col-12">
                          <div class="card border shadow-xs mb-4">
                            <div class="card-header border-bottom pb-0">
                              <div class="d-sm-flex align-items-center mb-3">
                                <div class="ms-auto d-flex">
                                  <div class="input-group flex-fill h-100 me-2">
                                    <div
                                      class="form-control input-container d-flex align-items-center py-1 bg-view"
                                    >
                                      <i class="ri-search-2-line"></i
                                      ><input
                                        class="border-0 mx-2 form-control form-control-sm"
                                        type="text"
                                        style="min-width: 60px"
                                        placeholder="Recherche produit..."
                                      />
                                    </div>
                                  </div>
                                  <div class="input-group h-100">
                                    <div
                                      class="form-control input-container d-flex align-items-center py-1 bg-view"
                                    >
                                      <i class="ri-filter-2-line"></i>
                                      <select
                                        class="border-0 mx-2 form-control form-control-sm"
                                        tyle="min-width: 40px"
                                      >
                                        <option
                                          label="Sélectionnez une catégorie"
                                          selected
                                          hidden
                                        ></option>
                                        <option value="Antibiotique">Antibiotique</option>
                                        <option value="Antianalgesique">
                                          Antianalgesique
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="card-body overflow-y-auto"
                              style="max-height: 80vh"
                            >
                              <div class="row">
                                <div
                                  class="col-md-4 mb-3"
                                  v-for="(item, index) in 20"
                                  :key="index"
                                >
                                  <div
                                    class="d-flex rounded-2 p-2 cursor-pointer align-items-center card-animate"
                                    style="border: 1px solid #dde0e4"
                                  >
                                    <div
                                      class="flex-shrink-0 avatar-md bg-light rounded p-1"
                                    >
                                      <img
                                        src="assets/images/companies/medic.png"
                                        alt=""
                                        class="img-fluid d-block"
                                      />
                                    </div>
                                    <div class="flex-grow-1 text-start ms-2">
                                      <h5 class="fs-15 text-primary">Amoxyciline</h5>
                                      <p class="text-muted mb-2">Antibiotique</p>
                                      <p class="text-dark fw-bold mb-0">
                                        <span class="fw-medium">500,00 Fr </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- <div class="table-responsive p-0">
                                <table
                                  class="table align-items-center justify-content-center mb-0"
                                >
                                  <thead class="bg-gray-100">
                                    <tr>
                                      <th
                                        class="text-secondary text-xs font-weight-semibold text-black"
                                      >
                                        CODE
                                      </th>
                                      <th
                                        class="text-secondary text-xs font-weight-semibold text-black"
                                      >
                                        PRODUIT LIBELLE
                                      </th>
                                      <th
                                        class="text-secondary text-xs font-weight-semibold text-black ps-2"
                                      >
                                        PU
                                      </th>
                                      <th
                                        class="text-secondary text-xs font-weight-semibold text-black ps-2"
                                      >
                                        CATEGORIE
                                      </th>
                                      <th
                                        class="text-secondary text-xs font-weight-semibold text-black ps-2"
                                      >
                                        Status
                                      </th>

                                      <th
                                        class="text-center text-secondary text-xs font-weight-semibold opacity-7"
                                      ></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(item, index) in 7" :key="index">
                                      <td>
                                        <div class="my-auto">
                                          <h6 class="mb-0 text-sm">#93920{{ index }}</h6>
                                        </div>
                                      </td>
                                      <td>
                                        <span class="text-sm font-weight-normal"
                                          >Paracetamol</span
                                        >
                                      </td>
                                      <td>
                                        <p class="text-sm font-weight-normal mb-0">
                                          500,00 Fr
                                        </p>
                                      </td>
                                      <td>
                                        <span class="text-sm font-weight-normal"
                                          >Anti analgesique</span
                                        >
                                      </td>
                                      <td>
                                        <span
                                          class="badge badge-sm border border-success text-success bg-success"
                                        >
                                          Actif
                                        </span>
                                      </td>
                                      <td class="align-middle">
                                        <button
                                          class="btn btn-sm btn-icon btn-soft-primary font-weight-bold text-xs"
                                          title="Ajouter au panier"
                                        >
                                          <i class="ri-add-line"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div class="border-top py-3 px-3 d-flex align-items-center">
                                <button
                                  class="btn btn-sm btn-white d-sm-block d-none mb-0"
                                >
                                  Previous
                                </button>
                                <nav aria-label="..." class="ms-auto">
                                  <ul class="pagination pagination-light mb-0">
                                    <li class="page-item active" aria-current="page">
                                      <span class="page-link font-weight-bold">1</span>
                                    </li>
                                    <li class="page-item">
                                      <a
                                        class="page-link border-0 font-weight-bold"
                                        href="javascript:;"
                                        >2</a
                                      >
                                    </li>
                                    <li class="page-item">
                                      <a
                                        class="page-link border-0 font-weight-bold d-sm-inline-flex d-none"
                                        href="javascript:;"
                                        >3</a
                                      >
                                    </li>
                                    <li class="page-item">
                                      <a
                                        class="page-link border-0 font-weight-bold"
                                        href="javascript:;"
                                        >...</a
                                      >
                                    </li>
                                    <li class="page-item">
                                      <a
                                        class="page-link border-0 font-weight-bold d-sm-inline-flex d-none"
                                        href="javascript:;"
                                        >8</a
                                      >
                                    </li>
                                    <li class="page-item">
                                      <a
                                        class="page-link border-0 font-weight-bold"
                                        href="javascript:;"
                                        >9</a
                                      >
                                    </li>
                                    <li class="page-item">
                                      <a
                                        class="page-link border-0 font-weight-bold"
                                        href="javascript:;"
                                        >10</a
                                      >
                                    </li>
                                  </ul>
                                </nav>
                                <button
                                  class="btn btn-sm btn-white d-sm-block d-none mb-0 ms-auto"
                                >
                                  Next
                                </button>
                              </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end main content-->
  </div>
  <!-- END layout-wrapper -->
</template>

<script>
import HeaderLayout from "./layouts/header.vue";
import FooterLayout from "./layouts/footer.vue";
import "./assets/css/style.css";
export default {
  name: "Home",

  components: {
    HeaderLayout,
    FooterLayout,
  },

  mounted() {
    this.addAttributes();
  },
  methods: {
    addAttributes() {
      // Ajoutez vos attributs à la balise HTML (ici, <html>) ici
      document.documentElement.setAttribute("data-layout", "horizontal");
      document.documentElement.setAttribute("data-layout-style", "");
      document.documentElement.setAttribute("data-layout-position", "fixed");
      document.documentElement.setAttribute("data-topbar", "light");
    },
    removeAttributes() {
      // Supprimez vos attributs de la balise HTML (ici, <html>) ici
      document.documentElement.removeAttribute("data-layout");
      document.documentElement.removeAttribute("data-layout-style");
      document.documentElement.removeAttribute("data-layout-position");
      document.documentElement.removeAttribute("data-topbar");
    },
  },
};
</script>
