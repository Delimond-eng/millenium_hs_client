<template>
  <div>
    <div class="row">
      <div class="row mb-3 pb-1">
        <div class="col-12">
          <div class="d-flex align-items-lg-center flex-lg-row flex-column">
            <div class="flex-grow-1">
              <h4 class="fs-16 mb-1 fw-bold">
                Bienvenue <br />
                <small class="text-uppercase"><span v-if="user.role" class="text-secondary-emphasis">{{ user.role.role
                    }}</span> {{ user.name
                  }}</small>
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
                  Total Ventes journalières
                </p>
              </div>
              <div class="flex-shrink-0">
                <h5 class="text-success fs-14 mb-0">
                  <i class="ri-arrow-right-up-line fs-13 align-middle"></i> +16.24 %
                </h5>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                  $<span class="counter-value" data-target="559.25">0</span>k
                </h4>
                <a href="javascript:void(0)" class="text-decoration-underline">Voir les détails</a>
              </div>
              <div class="avatar-sm flex-shrink-0">
                <span class="avatar-title bg-success-subtle rounded fs-3">
                  <i class="bx bx-dollar-circle text-success"></i>
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
                  Factures
                </p>
              </div>
              <div class="flex-shrink-0">
                <h5 class="text-danger fs-14 mb-0">
                  <i class="ri-arrow-right-down-line fs-13 align-middle"></i> -3.57 %
                </h5>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                  <span class="counter-value" data-target="36894">0</span>
                </h4>
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
                  Clients
                </p>
              </div>
              <div class="flex-shrink-0">
                <h5 class="text-success fs-14 mb-0">
                  <i class="ri-arrow-right-up-line fs-13 align-middle"></i> +29.08 %
                </h5>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                  <span class="counter-value" data-target="183.35">0</span>M
                </h4>
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
                  Le balance
                </p>
              </div>
              <div class="flex-shrink-0">
                <h5 class="text-muted fs-14 mb-0">+0.00 %</h5>
              </div>
            </div>
            <div class="d-flex align-items-end justify-content-between mt-4">
              <div>
                <h4 class="fs-22 fw-semibold ff-secondary mb-4">
                  $<span class="counter-value" data-target="165.89">0</span>k
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
                    Situation du stock
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body border-bottom-dashed border-bottom">
            <form>
              <div class="row">
                <div class="col-xl-9">
                  <div class="search-box">
                    <input type="text" class="form-control search" placeholder="Recherche produit ou categorie..." />
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
                <!--end col-->
                <div class="col-xl-3">
                  <div class="input-group">
                    <select class="form-control" data-plugin="choices" data-choices data-choices-search-false
                      name="choices-single-default" id="idStatus">
                      <option label="Catégories" hidden selected></option>
                      <option value="all">Tous</option>
                      <option value="Antibiotique">Antibiotique</option>
                      <option value="Anti analgesique">Anti analgesique</option>
                    </select>
                    <button class="btn btn-primary btn-icon">
                      <i class="ri-search-2-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <!--end row-->
            </form>
          </div>
          <div class="card-body">
            <div>
              <div class="table-responsive table-card mb-1">
                <table class="table align-middle" id="customerTable">
                  <thead class="table-light text-muted">
                    <tr>
                      <th class="sort" data-sort="id">Code</th>
                      <th class="sort" data-sort="libelle">Produit</th>
                      <th class="sort" data-sort="cat">Catégorie</th>
                      <th class="sort" data-sort="qte_e">Qté entrée</th>
                      <th class="sort" data-sort="qte_s">Qté sortie</th>
                      <th class="sort" data-sort="solde">Solde</th>
                      <th class="sort" data-sort="date_exp">Date Exp</th>
                      <th class="sort" data-sort="status">Status</th>
                      <th class="sort" data-sort="action">Action</th>
                    </tr>
                  </thead>
                  <tbody class="list form-check-all">
                    <tr>
                      <td class="id">
                        <a href="javascript:void(0);" class="fw-medium link-primary">#VZ2101</a>
                      </td>
                      <td class="libelle">Paracetamol</td>
                      <td class="cat">antianalgesique</td>
                      <td class="phone">539</td>
                      <td class="qte_e">200</td>
                      <td class="qte_s">339</td>
                      <td class="date_exp">28/02/2026</td>
                      <td class="status">
                        <span class="badge bg-success-subtle text-success text-uppercase">Active</span>
                      </td>
                      <td>
                        <ul class="list-inline hstack gap-2 mb-0">
                          <li class="list-inline-item edit" title="Edition">
                            <a href="javascript:void(0)" class="text-primary d-inline-block edit-item-btn">
                              <i class="ri-pencil-fill fs-16"></i>
                            </a>
                          </li>
                          <li class="list-inline-item" title="Remove">
                            <a class="text-danger d-inline-block remove-item-btn" href="javascript:void(0)">
                              <i class="ri-delete-bin-5-fill fs-16"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="noresult" style="display: none">
                  <div class="text-center">
                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                      colors="primary:#121331,secondary:#08a88a" style="width: 75px; height: 75px"></lord-icon>
                    <h5 class="mt-2">Sorry! No Result Found</h5>
                    <p class="text-muted mb-0">
                      We've searched more than 150+ customer We did not find any customer
                      for you search.
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <div class="pagination-wrap hstack gap-2">
                  <a class="page-item pagination-prev disabled" href="#"> Previous </a>
                  <ul class="pagination listjs-pagination mb-0"></ul>
                  <a class="page-item pagination-next" href="#"> Next </a>
                </div>
              </div>
            </div>
            <div class="modal fade" id="showModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header bg-light p-3">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                      id="close-modal"></button>
                  </div>
                  <form class="tablelist-form" autocomplete="off">
                    <div class="modal-body">
                      <input type="hidden" id="id-field" />

                      <div class="mb-3" id="modal-id" style="display: none">
                        <label for="id-field1" class="form-label">ID</label>
                        <input type="text" id="id-field1" class="form-control" placeholder="ID" readonly />
                      </div>

                      <div class="mb-3">
                        <label for="customername-field" class="form-label">Customer Name</label>
                        <input type="text" id="customername-field" class="form-control" placeholder="Enter name"
                          required />
                        <div class="invalid-feedback">Please enter a customer name.</div>
                      </div>

                      <div class="mb-3">
                        <label for="email-field" class="form-label">Email</label>
                        <input type="email" id="email-field" class="form-control" placeholder="Enter email" required />
                        <div class="invalid-feedback">Please enter an email.</div>
                      </div>

                      <div class="mb-3">
                        <label for="phone-field" class="form-label">Phone</label>
                        <input type="text" id="phone-field" class="form-control" placeholder="Enter phone no."
                          required />
                        <div class="invalid-feedback">Please enter a phone.</div>
                      </div>

                      <div class="mb-3">
                        <label for="date-field" class="form-label">Joining Date</label>
                        <input type="date" id="date-field" class="form-control" data-provider="flatpickr"
                          data-date-format="d M, Y" required placeholder="Select date" />
                        <div class="invalid-feedback">Please select a date.</div>
                      </div>

                      <div>
                        <label for="status-field" class="form-label">Status</label>
                        <select class="form-control" data-choices data-choices-search-false name="status-field"
                          id="status-field" required>
                          <option value="">Status</option>
                          <option value="Active">Active</option>
                          <option value="Block">Block</option>
                        </select>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                          Close
                        </button>
                        <button type="submit" class="btn btn-success" id="add-btn">
                          Add Customer
                        </button>
                        <!-- <button type="button" class="btn btn-success" id="edit-btn">Update</button> -->
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Modal -->
            <div class="modal fade zoomIn" id="deleteRecordModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" id="deleteRecord-close" data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="mt-2 text-center">
                      <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                        colors="primary:#f7b84b,secondary:#f06548" style="width: 100px; height: 100px"></lord-icon>
                      <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Are you sure ?</h4>
                        <p class="text-muted mx-4 mb-0">
                          Are you sure you want to remove this record ?
                        </p>
                      </div>
                    </div>
                    <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                      <button type="button" class="btn w-sm btn-light" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button type="button" class="btn w-sm btn-danger" id="delete-record">
                        Yes, Delete It!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end modal -->
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

  computed: {
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },
};
</script>
