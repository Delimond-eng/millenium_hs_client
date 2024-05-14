<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Création des produits pharmaceutiques</h4>
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
          <div class="col-md-4">
            <div class="card">
              <form @submit.prevent="submitForm" class="card-body">
                <!-- Basic Input -->
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Code produit <sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput" placeholder="Entrez le code "
                    v-model="form.produit_code" required />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Libellé <sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput" placeholder="Entrez le libellé du produit"
                    v-model="form.produit_libelle" required />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Qté stock minimum pour alerter
                    <sup class="text-danger">(10 par defaut)</sup></label>
                  <input type="number" class="form-control" id="basiInput"
                    placeholder="Entrez stock minimal pour alerter" v-model="form.produit_stock_min" />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Catégorie <sup class="text-danger">*</sup></label>
                  <select class="form-control" v-model="form.categorie_id" required>
                    <option label="Sélectionnez une categorie" selected hidden></option>
                    <option v-for="(data, index) in config.categories" :key="index" :value="data.id">
                      {{ data.categorie_libelle }}
                    </option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Type <sup class="text-danger">*</sup></label>
                  <select class="form-control" v-model="form.type_id" required>
                    <option label="Sélectionnez un type" selected hidden></option>
                    <option v-for="(data, index) in config.types" :key="index" :value="data.id">
                      {{ data.type_libelle }}
                    </option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Unité <sup class="text-danger">*</sup></label>
                  <select class="form-control" v-model="form.unite_id" required>
                    <option label="Sélecti onnez une unité" selected hidden></option>
                    <option v-for="(data, index) in config.unites" :key="index" :value="data.id">
                      {{ data.unite_libelle }}
                    </option>
                  </select>
                </div>
                <!-- Input with Label -->
                <div class="mb-2">
                  <label for="labelInput" class="form-label">Description <small>(optionnel)</small></label>
                  <textarea class="form-control" placeholder="Entrez une description..."
                    v-model="form.produit_description"></textarea>
                </div>
                <bs-toast id="errorsToastProd" :msg="errors_msg" />

                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <button class="btn btn-dark mt-4 me-2" type="reset">Annuler</button>
                      <load-button btn-type="submit" :loading="formLoading"
                        class-name="btn btn-success mt-4 text-uppercase">
                        <i class="ri-add-line"></i> Sauvegarder</load-button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-8">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Liste des produits</h4>
              </div>

              <div class="card-body">
                <div class="row">
                  <div class="col-xl-12">
                    <div class="search-box">
                      <input type="text" class="form-control search" placeholder="Recherche produits ..." />
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
                              <input class="form-check-input" type="checkbox" id="checkAll" value="option" />
                            </div>
                          </th>

                          <th class="sort" data-sort="customer_name">Code</th>
                          <th class="sort" data-sort="customer_name">Libellé</th>
                          <th class="sort" data-sort="customer_name">Catégorie</th>
                          <th class="sort" data-sort="customer_name">Type</th>
                          <th class="sort" data-sort="customer_name">Unité</th>
                          <th class="sort" data-sort="action">Action</th>
                        </tr>
                      </thead>

                      <tbody class="list form-check-all">
                        <tr v-for="(data, index) in config.produits" :key="index">
                          <th scope="row">
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" name="chk_child" value="option1" />
                            </div>
                          </th>

                          <td class="customer_name">#{{ data.produit_code }}</td>
                          <td class="customer_name">{{ data.produit_libelle }}</td>

                          <td class="customer_name">
                            <span v-if="data.categorie">{{
                data.categorie.categorie_libelle
              }}</span>
                          </td>
                          <td class="customer_name">
                            <span v-if="data.type">{{ data.type.type_libelle }}</span>
                          </td>
                          <td class="customer_name">
                            <span v-if="data.unite">{{ data.unite.unite_libelle }}</span>
                          </td>
                          <td>
                            <ul class="list-inline hstack gap-2 mb-0">
                              <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover"
                                data-bs-placement="top" aria-label="Edit" data-bs-original-title="Edit">
                                <a href="#showModal" data-bs-toggle="modal"
                                  class="text-primary d-inline-block edit-item-btn">
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

                <!--end modal -->
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
  name: "ProductCreate",
  data() {
    return {
      formLoading: false,
      errors_msg: "",
      form: {
        produit_libelle: "",
        produit_code: "",
        produit_stock_min: "",
        produit_description: "",
        categorie_id: "",
        pharmacie_id: "",
        unite_id: "",
        type_id: "",
      },
    };
  },

  mounted() {
    this.$store.dispatch("pharmacie/showConfigs");
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },
  },

  methods: {
    submitForm(e) {
      this.formLoading = true;
      this.$store
        .dispatch("pharmacie/createProduct", this.form)
        .then((res) => {
          this.formLoading = false;
          this.$store.dispatch("pharmacie/allConfigs");
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastProd");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Nouveau produit ajouté avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.produit_code = "";
            this.form.produit_libelle = "";
            this.form.produit_prix_unitaire = "";
            this.form.produit_prix_devise = "CDF";
            this.form.produit_stock_min = "";
            this.form.categorie_id = "";
            this.form.unite_id = "";
            this.form.type_id = "";
          }
        })
        .catch((err) => (this.formLoading = false));
    },
  },
};
</script>
