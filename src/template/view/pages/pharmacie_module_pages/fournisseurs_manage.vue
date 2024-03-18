<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">Gestion des fournisseurs</h4>

              <div class="page-title-right">
                <!-- <ol class="breadcrumb m-0">
    
                      <li class="breadcrumb-item">
    
                        <a href="javascript: void(0);" class="btn btn-sm btn-secondary text-white">Voir liste des
    
                          produits</a>
    
                      </li>
    
                    </ol> -->
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Liste des Fournisseurs</h4>
              </div>

              <div class="card-body">
                <div class="row">
                  <div class="col-xl-12">
                    <div class="search-box">
                      <input
                        type="text"
                        class="form-control search"
                        placeholder="Recherche fournisseur ..."
                      />

                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </div>
                </div>
              </div>

              <!-- end card body -->

              <div class="card-body">
                <div>
                  <div class="table-responsive table-card mb-1">
                    <table class="table align-middle" id="customerTable">
                      <thead class="table-light text-muted">
                        <tr>
                          <th scope="col" style="width: 50px">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="checkAll"
                                value="option"
                              />
                            </div>
                          </th>

                          <th class="sort" data-sort="customer_name">Nom</th>

                          <th class="sort" data-sort="phone">Email</th>

                          <th class="sort" data-sort="date">Téléphone</th>

                          <th class="sort" data-sort="status">Status</th>

                          <th class="sort" data-sort="action">Action</th>
                        </tr>
                      </thead>

                      <tbody class="list form-check-all">
                        <tr v-for="i in 10" :key="i">
                          <th scope="row">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                name="chk_child"
                                value="option1"
                              />
                            </div>
                          </th>

                          <td class="id" style="display: none">
                            <a href="javascript:void(0);" class="fw-medium link-primary"
                              >#VZ2101</a
                            >
                          </td>

                          <td class="customer_name">Mary Cousar</td>

                          <td class="email">marycousar@velzon.com</td>

                          <td class="phone">580-464-4694</td>

                          <td class="status">
                            <span
                              class="badge bg-success-subtle text-success text-uppercase"
                              >Active</span
                            >
                          </td>

                          <td>
                            <ul class="list-inline hstack gap-2 mb-0">
                              <li
                                class="list-inline-item edit"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                aria-label="Edit"
                                data-bs-original-title="Edit"
                              >
                                <a
                                  href="#showModal"
                                  data-bs-toggle="modal"
                                  class="text-primary d-inline-block edit-item-btn"
                                >
                                  <i class="ri-pencil-fill fs-16"></i>
                                </a>
                              </li>

                              <li class="list-inline-item">
                                <a
                                  class="text-danger d-inline-block remove-item-btn"
                                  href="#deleteRecordModal"
                                >
                                  <i class="ri-delete-bin-line fs-16"></i>
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="noresult" style="display: none">
                      <div class="text-center">
                        <lord-icon
                          src="https://cdn.lordicon.com/msoeawqm.json"
                          trigger="loop"
                          colors="primary:#121331,secondary:#08a88a"
                          style="width: 75px; height: 75px"
                        ></lord-icon>

                        <h5 class="mt-2">Sorry! No Result Found</h5>

                        <p class="text-muted mb-0">
                          We've searched more than 150+ customer We did not find any
                          customer for you search.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-end">
                    <div class="pagination-wrap hstack gap-2">
                      <a class="page-item pagination-prev disabled" href="#">
                        Previous
                      </a>

                      <ul class="pagination listjs-pagination mb-0">
                        <li class="active">
                          <a class="page" href="#" data-i="1" data-page="8">1</a>
                        </li>
                      </ul>

                      <a class="page-item pagination-next" href="#"> Next </a>
                    </div>
                  </div>
                </div>

                <div
                  class="modal fade"
                  id="showModal"
                  tabindex="-1"
                  style="display: none"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header bg-light p-3">
                        <h5 class="modal-title" id="exampleModalLabel">Add Customer</h5>

                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          id="close-modal"
                        ></button>
                      </div>

                      <form class="tablelist-form" autocomplete="off">
                        <div class="modal-body">
                          <input type="hidden" id="id-field" />

                          <div class="mb-3" id="modal-id" style="display: none">
                            <label for="id-field1" class="form-label">ID</label>

                            <input
                              type="text"
                              id="id-field1"
                              class="form-control"
                              placeholder="ID"
                              readonly=""
                            />
                          </div>

                          <div class="mb-3">
                            <label for="customername-field" class="form-label"
                              >Customer Name</label
                            >

                            <input
                              type="text"
                              id="customername-field"
                              class="form-control"
                              placeholder="Enter name"
                              required=""
                            />

                            <div class="invalid-feedback">
                              Please enter a customer name.
                            </div>
                          </div>

                          <div class="mb-3">
                            <label for="email-field" class="form-label">Email</label>

                            <input
                              type="email"
                              id="email-field"
                              class="form-control"
                              placeholder="Enter email"
                              required=""
                            />

                            <div class="invalid-feedback">Please enter an email.</div>
                          </div>

                          <div class="mb-3">
                            <label for="phone-field" class="form-label">Phone</label>

                            <input
                              type="text"
                              id="phone-field"
                              class="form-control"
                              placeholder="Enter phone no."
                              required=""
                            />

                            <div class="invalid-feedback">Please enter a phone.</div>
                          </div>

                          <div class="mb-3">
                            <label for="date-field" class="form-label"
                              >Joining Date</label
                            >

                            <input
                              type="date"
                              id="date-field"
                              class="form-control"
                              data-provider="flatpickr"
                              data-date-format="d M, Y"
                              required=""
                              placeholder="Select date"
                            />

                            <div class="invalid-feedback">Please select a date.</div>
                          </div>

                          <div>
                            <label for="status-field" class="form-label">Status</label>

                            <select
                              class="form-control"
                              data-choices=""
                              data-choices-search-false=""
                              name="status-field"
                              id="status-field"
                              required=""
                            >
                              <option value="">Status</option>

                              <option value="Active">Active</option>

                              <option value="Block">Block</option>
                            </select>
                          </div>
                        </div>

                        <div class="modal-footer" style="display: block">
                          <div class="hstack gap-2 justify-content-end">
                            <button
                              type="button"
                              class="btn btn-light"
                              data-bs-dismiss="modal"
                            >
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

                <div
                  class="modal fade zoomIn"
                  id="deleteRecordModal"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="btn-close"
                          id="deleteRecord-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div class="modal-body">
                        <div class="mt-2 text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/gsqxdxog.json"
                            trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548"
                            style="width: 100px; height: 100px"
                          ></lord-icon>

                          <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you sure ?</h4>

                            <p class="text-muted mx-4 mb-0">
                              Are you sure you want to remove this record ?
                            </p>
                          </div>
                        </div>

                        <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                          <button
                            type="button"
                            class="btn w-sm btn-light"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>

                          <button
                            type="button"
                            class="btn w-sm btn-danger"
                            id="delete-record"
                          >
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

          <div class="col-md-4">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Création nouveau utilisateur</h4>
              </div>

              <div class="card-body">
                <!-- Basic Input -->

                <div class="mb-2">
                  <label for="basiInput" class="form-label"
                    >Nom<sup class="text-danger">*</sup></label
                  >

                  <input
                    type="text"
                    class="form-control"
                    id="basiInput"
                    placeholder="Entrer le nom complet..."
                  />
                </div>

                <div class="mb-2">
                  <label for="basiInput" class="form-label"
                    >Email<sup class="text-danger">*</sup></label
                  >

                  <input
                    type="email"
                    class="form-control"
                    id="basiInput"
                    placeholder="Entrer l'adresse email..."
                  />
                </div>

                <div class="mb-2">
                  <label for="basiInput" class="form-label"
                    >Télephone<sup class="text-danger">*</sup></label
                  >

                  <input
                    type="text"
                    class="form-control"
                    id="basiInput"
                    placeholder="Entrer le nom complet..."
                  />
                </div>

                <div class="mb-2">
                  <label for="basiInput" class="form-label"
                    >Adresse<sup class="text-danger">*</sup></label
                  >

                  <textarea
                    class="form-control"
                    placeholder="Entrer l'adresse physique du fournisseur"
                  ></textarea>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <load-button
                        btn-type="submit"
                        :loading="formLoading"
                        class-name="btn btn-success mt-2 text-uppercase"
                      >
                        <i class="ri-add-fill"></i>Créer</load-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
export default {
  name: "CategoriesCreating",

  data() {
    return {
      formLoading: false,
    };
  },
};
</script>
