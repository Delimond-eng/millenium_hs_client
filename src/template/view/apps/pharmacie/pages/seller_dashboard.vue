<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">Tableau de bord</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);">Pharmacie vendeur</a>
                  </li>
                  <li class="breadcrumb-item active">Tableau de bord</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <!-- end page title -->

        <div class="row">
          <div class="col-xl-12">
            <div class="card crm-widget">
              <div class="card-body p-0">
                <div class="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">
                  <!-- end col -->
                  <div class="col">
                    <div class="mt-3 mt-md-0 py-4 px-3">
                      <h5 class="text-muted text-uppercase fs-13">Balance</h5>
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                          <i class="ri-exchange-dollar-line display-6 text-secondary"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h2 class="mb-0">
                            $<span class="counter-value" data-target="489.4">0</span>k
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                  <div class="col">
                    <div class="mt-3 mt-md-0 py-4 px-3">
                      <h5 class="text-muted text-uppercase fs-13">Produits vendus</h5>
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                          <i class="ri-pulse-line display-6 text-success"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h2 class="mb-0">
                            <span class="counter-value" data-target="32.89">0</span>%
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                  <div class="col">
                    <div class="mt-3 mt-lg-0 py-4 px-3">
                      <h5 class="text-muted text-uppercase fs-13">Ventes annulées</h5>
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                          <i class="ri-error-warning-line display-6 text-warning"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h2 class="mb-0">
                            $<span class="counter-value" data-target="1596.5">0</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                  <div class="col">
                    <div class="mt-3 mt-lg-0 py-4 px-3">
                      <h5 class="text-muted text-uppercase fs-13">Clients journaliers</h5>
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                          <i class="ri-group-line display-6 text-primary"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h2 class="mb-0">
                            <span class="counter-value" data-target="2659">0</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->

                  <!-- end col -->
                  <div class="col">
                    <div class="mt-3 mt-lg-0 py-4 px-3">
                      <h5 class="text-muted text-uppercase fs-13">Tickets de caisse</h5>
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                          <i class="ri-file-4-line display-6 text-info-emphasis"></i>
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h2 class="mb-0">
                            <span class="counter-value" data-target="2659">0</span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->

        <div class="row">
          <div class="col-md-12">
            <div class="card card-height-100">
              <div class="card-header align-items-center d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Ventes journalières</h4>
                <div class="flex-shrink-0">
                  <button class="btn btn-soft-primary btn-sm">24H</button>
                </div>
                <div class="flex-shrink-0 ms-2">
                  <div class="dropdown card-header-dropdown">
                    <a
                      class="btn btn-soft-primary btn-sm"
                      role="button"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Rapport<i class="mdi mdi-chevron-down align-middle ms-1"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a class="dropdown-item" href="#">Télécharger Rapport</a>
                      <a class="dropdown-item" href="#">Exporter</a>
                      <a class="dropdown-item" href="#">Importer</a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card header -->
              <div class="card-body">
                <div class="table-responsive table-card">
                  <table
                    class="table table-hover table-borderless table-centered align-middle table-nowrap mb-0"
                  >
                    <thead class="text-white bg-primary">
                      <tr>
                        <th>Heure</th>
                        <th>Produit</th>
                        <th>Catégorie</th>
                        <th>Quantité</th>
                        <th>PU</th>
                        <th>PT</th>
                        <th>Devise</th>
                        <th>Client</th>
                        <th></th>
                      </tr>
                    </thead>
                    <!-- end thead -->
                    <tbody>
                      <tr v-for="(data, index) in reports" :key="index">
                        <td>{{ data.operation_created_At.split(" ")[1] }}</td>
                        <td>
                          <span v-if="data.produit">{{
                            data.produit.produit_libelle
                          }}</span>
                        </td>
                        <td>
                          <span v-if="data.produit.categorie">{{
                            data.produit.categorie.categorie_libelle
                          }}</span>
                        </td>
                        <td>{{ data.operation_qte }}</td>
                        <td>{{ data.produit_prix }}</td>
                        <td>{{ parseFloat(data.produit_prix) * data.operation_qte }}</td>
                        <td>{{ data.produit_prix_devise }}</td>
                        <td>
                          <span v-if="data.client">{{ data.client.client_nom }}</span>
                        </td>
                        <td>
                          <button class="btn btn-sm btn-icon btn-soft-danger">
                            <i class="ri-delete-bin-6-line"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <!-- end tbody -->
                  </table>
                  <!-- end table -->
                </div>
                <!-- end tbody -->
              </div>
              <!-- end cardbody -->
            </div>
          </div>
        </div>
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
  </div>
</template>

<script>
export default {
  name: "SellerDashboardPage",

  computed: {
    reports() {
      return this.$store.getters["pharmacie/GET_SELLER_REPORTS"];
    },
  },
};
</script>
