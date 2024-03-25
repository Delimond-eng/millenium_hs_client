<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">
                Configurtation des catégories des produits pharmaceutiques
                <small>(Ex: Antibiotiques...)</small>
              </h4>
              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <!-- <li class="breadcrumb-item">
                    <a
                      href="javascript: void(0);"
                      class="btn btn-sm btn-secondary text-white"
                      >Voir liste des produits</a
                    >
                  </li> -->
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Liste des Catégories</h4>
              </div>

              <div class="card-body">
                <div class="row">
                  <div class="col-xl-12">
                    <div class="search-box">
                      <input
                        type="text"
                        class="form-control search"
                        placeholder="Recherche catégorie ..."
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

                          <th class="sort" data-sort="customer_name">
                            Catégorie Libellé
                          </th>
                          <th class="sort" data-sort="action">Action</th>
                        </tr>
                      </thead>

                      <tbody class="list form-check-all" v-if="config.categories">
                        <tr v-for="(data, index) in config.categories" :key="index">
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

                          <td class="customer_name">{{ data.categorie_libelle }}</td>
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

                    <!-- <div class="noresult" style="display: none">
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
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <form @submit.prevent="submitForm" class="card-body">
                <!-- Basic Input -->
                <div>
                  <label for="basiInput" class="form-label"
                    >Catégorie Libellé <sup class="text-danger">*</sup></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="basiInput"
                    placeholder="Entrez le libellé de la categorie"
                    v-model="form.categorie_libelle"
                    required
                  />
                </div>

                <!-- Input with Label -->
                <div class="mt-2">
                  <label for="labelInput" class="form-label"
                    >Description <small>(optionnel)</small></label
                  >
                  <textarea
                    class="form-control"
                    placeholder="Entrez une description..."
                    v-model="form.categorie_description"
                  ></textarea>
                </div>

                <bs-toast id="errorsToastII" :msg="errors_msg" />
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <load-button
                        btn-type="submit"
                        :loading="formLoading"
                        class-name="btn btn-success mt-2 text-uppercase"
                      >
                        <i class="ri-check-double-line"></i> Sauvegarder</load-button
                      >
                    </div>
                  </div>
                </div>
              </form>
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
      errors_msg: "",
      form: {
        categorie_libelle: "",
        categorie_description: "",
      },
    };
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },
  },

  mounted() {
    this.$store.dispatch("pharmacie/allConfigs");
  },

  methods: {
    submitForm(e) {
      this.formLoading = true;
      this.$store
        .dispatch("pharmacie/createCategorie", this.form)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoading = false;
          this.$store.dispatch("pharmacie/allConfigs");

          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastII");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Nouvelle catégorie des produits ajoutée avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.categorie_libelle = "";
            this.form.categorie_description = "";
          }
        })
        .catch((err) => (this.formLoading = false));
    },
  },
};
</script>
