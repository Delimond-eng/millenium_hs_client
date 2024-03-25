<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Gestion des utilisateurs de la pharmacie</h4>
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
          <div class="col-md-7">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Liste des utilisateurs</h4>
              </div>
              <div class="card-body">
                <div>
                  <div class="table-responsive table-card mb-1">
                    <table class="table align-middle" id="customerTable">
                      <thead class="table-light text-muted">
                        <tr>
                          <th scope="col" style="width: 50px"></th>
                          <th class="sort" data-sort="customer_name">Nom utilisateur</th>
                          <th class="sort" data-sort="customer_name">Rôle</th>
                          <th class="sort" data-sort="customer_name">Emplacement</th>
                          <th class="sort" data-sort="action">Action</th>
                        </tr>
                      </thead>

                      <tbody class="list form-check-all">
                        <tr>
                          <th scope="row">
                            <div class="avatar-xs flex-shrink-0 me-3">
                              <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
                                GD
                              </div>
                            </div>
                          </th>

                          <td class="customer_name">Mary Cousar</td>
                          <td class="customer_name">Mary Cousar</td>
                          <td class="customer_name">Mary Cousar</td>
                          <td>
                            <ul class="list-inline hstack gap-2 mb-0">
                              <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover"
                                data-bs-placement="top" aria-label="Edit" data-bs-original-title="Edit">
                                <a href="#showModal" data-bs-toggle="modal"
                                  class="text-secondary d-inline-block edit-item-btn">
                                  <i class="ri-pencil-fill fs-16"></i>
                                </a>
                              </li>

                              <li class="list-inline-item">
                                <a class="text-danger d-inline-block remove-item-btn" href="#deleteRecordModal">
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
                        <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                          colors="primary:#121331,secondary:#08a88a" style="width: 75px; height: 75px"></lord-icon>

                        <h5 class="mt-2">Sorry! No Result Found</h5>

                        <p class="text-muted mb-0">
                          We've searched more than 150+ customer We did not find any
                          customer for you search.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end card body -->
            </div>
          </div>
          <div class="col-md-5">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Création nouveau utilisateur</h4>
              </div>
              <div class="card-body">
                <!-- Basic Input -->
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Nom complet<sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput" placeholder="Entrer le nom complet..." />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Email<sup class="text-danger">*</sup></label>
                  <input type="email" class="form-control" id="basiInput" placeholder="Entrer l'adresse email..." />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Rôle<sup class="text-danger">*</sup></label>
                  <select class="form-select">
                    <option label="Sélectionnez un rôle..." selected hidden></option>
                    <option value="Vendeur">Vendeur</option>
                    <option value="Gérant">Gérant</option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Pharmacie<sup class="text-danger">*</sup></label>
                  <select class="form-select">
                    <option label="Sélectionnez une pharmacie..." selected hidden></option>
                    <option v-for="(data, index) in config.pharmacies" :key="index" :value="data.id">
                      {{ data.pharmacie_nom }}
                    </option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Mot de passe<sup class="text-danger">*</sup></label>
                  <input type="password" class="form-control" id="basiInput" placeholder="Entrer le mot de passe" />
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <load-button btn-type="submit" :loading="formLoading"
                        class-name="btn btn-success mt-2 text-uppercase">
                        <i class="ri-add-fill"></i>Créer</load-button>
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
  name: "UsersManage",

  data() {
    return {
      formLoading: false,
    };
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },
  },
};
</script>
