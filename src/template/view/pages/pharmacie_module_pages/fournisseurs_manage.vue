<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
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
                      <input type="text" class="form-control search" v-model="search"
                        placeholder="Recherche fournisseur ..." />

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

                          <th class="sort" data-sort="customer_name">Nom</th>

                          <th class="sort" data-sort="phone">Email</th>

                          <th class="sort" data-sort="date">Téléphone</th>

                          <th class="sort" data-sort="status">Status</th>

                          <th class="sort" data-sort="action">Action</th>
                        </tr>
                      </thead>

                      <tbody class="list form-check-all" v-if="config.fournisseurs">
                        <tr v-for="(data, index) in config.fournisseurs" :key="index">
                          <th scope="row">
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" name="chk_child" value="option1" />
                            </div>
                          </th>

                          <td class="id" style="display: none">
                            <a href="javascript:void(0);" class="fw-medium link-primary">#VZ2101</a>
                          </td>

                          <td class="customer_name">{{ data.fournisseur_nom }}</td>

                          <td class="email">{{ data.fournisseur_email }}</td>

                          <td class="phone">{{ data.fournisseur_telephone }}</td>

                          <td class="status">
                            <span class="badge bg-success-subtle text-success text-uppercase">Active</span>
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
                  </div>
                </div>

                <!-- Modal -->

                <!--end modal -->
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Création Fournisseur</h4>
              </div>

              <form class="card-body" @submit.prevent="submitForm">
                <!-- Basic Input -->

                <div class="mb-2">
                  <label for="basiInput" class="form-label">Nom<sup class="text-danger">*</sup></label>

                  <input type="text" class="form-control" id="basiInput" placeholder="Entrer le nom complet..."
                    v-model="form.nom" required />
                </div>

                <div class="mb-2">
                  <label for="basiInput" class="form-label">Email</label>

                  <input type="email" class="form-control" id="basiInput" placeholder="Entrer l'adresse email..."
                    v-model="form.email" />
                </div>

                <div class="mb-2">
                  <label for="basiInput" class="form-label">Télephone</label>

                  <input type="text" class="form-control" id="basiInput" placeholder="Entrer le n° de téléphone"
                    v-model="form.telephone" />
                </div>

                <div class="mb-2">
                  <label for="basiInput" class="form-label">Adresse<sup class="text-danger">*</sup></label>

                  <textarea class="form-control" placeholder="Entrer l'adresse physique du fournisseur"
                    v-model="form.adresse" required></textarea>
                </div>

                <bs-toast id="errorsToastFourn" :msg="errors_msg" />

                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <load-button btn-type="submit" :loading="formLoading"
                        class-name="btn btn-success mt-2 text-uppercase">
                        <i class="ri-add-fill"></i>Créer</load-button>
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
      search: "",
      errors_msg: "",
      form: {
        nom: "",
        telephone: "",
        email: "",
        adresse: "",
      },
    };
  },

  mounted() {
    this.$store.dispatch("pharmacie/allConfigs");
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
        .dispatch("pharmacie/createFournisseur", this.form)
        .then((res) => {
          this.formLoading = false;
          this.$store.dispatch("pharmacie/allConfigs");
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastFourn");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Nouveau fournisseur ajouté avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.nom = "";
            this.form.email = "";
            this.form.telephone = "";
            this.form.adresse = "";
          }
        })
        .catch((err) => (this.formLoading = false));
    },
  },
};
</script>
