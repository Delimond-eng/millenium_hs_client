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
          <div class="col-md-8">
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
                          <th class="sort">Nom utilisateur</th>
                          <th class="sort">Email</th>
                          <th class="sort">Rôle</th>
                          <th class="sort">Pharmacie</th>
                          <th class="sort" data-sort="action">Action</th>
                        </tr>
                      </thead>

                      <tbody class="list form-check-all">
                        <tr v-for="(data, index) in users" :key="index">
                          <th scope="row">
                            <div class="avatar-xs flex-shrink-0 me-3">
                              <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
                                {{ data.name.substring(0, 1).toUpperCase() }}
                              </div>
                            </div>
                          </th>

                          <td>{{ data.name }}</td>
                          <td>{{ data.email }}</td>
                          <td>{{ data.pharmacie_role }}</td>
                          <td>{{ data.pharmacie.pharmacie_nom }}</td>
                          <td>
                            <ul class="list-inline hstack gap-2 mb-0">
                              <li class="list-inline-item edit" title="edition">
                                <a href="#" class="text-secondary d-inline-block edit-item-btn">
                                  <i class="ri-pencil-fill fs-16"></i>
                                </a>
                              </li>

                              <li class="list-inline-item">
                                <a class="text-danger d-inline-block remove-item-btn" href="#">
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
              </div>
              <!-- end card body -->
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Création nouveau utilisateur</h4>
              </div>
              <form @submit.prevent="submitForm" class="card-body">
                <!-- Basic Input -->
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Nom complet<sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput" placeholder="Entrer le nom complet..."
                    v-model="form.name" required />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Email<sup class="text-danger">*</sup></label>
                  <input type="email" class="form-control" id="basiInput" placeholder="Entrer l'adresse email..."
                    v-model="form.email" required />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Rôle<sup class="text-danger">*</sup></label>
                  <select class="form-select" v-model="form.pharmacie_role" required>
                    <option label="Sélectionnez un rôle..." selected hidden></option>
                    <option value="Vendeur">Vendeur</option>
                    <option value="Gérant">Administrateur</option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Pharmacie<sup class="text-danger">*</sup></label>
                  <select class="form-select" v-model="form.pharmacie_id" required>
                    <option label="Sélectionnez une pharmacie..." selected hidden></option>
                    <option v-for="(data, index) in config.pharmacies" :key="index" :value="data.id">
                      {{ data.pharmacie_nom }}
                    </option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Mot de passe<sup class="text-danger">*</sup></label>
                  <input type="password" v-model="form.password" class="form-control" id="basiInput"
                    placeholder="Entrer le mot de passe" required />
                </div>
                <bs-toast id="errorsToastPharmaUsers" :msg="errors_msg" />
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <button class="btn btn-dark mt-2 me-2" type="reset">Annuler</button>
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
  name: "UsersManage",

  data() {
    return {
      formLoading: false,
      errors_msg: "",
      form: {
        name: "",
        email: "",
        password: "",
        pharmacie_id: "",
        pharmacie_role: "",
      },
    };
  },

  mounted() {
    this.$store.dispatch("pharmacie/viewAllUsers");
    this.$store.dispatch("pharmacie/allConfigs");
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },

    users() {
      return this.$store.getters["pharmacie/GET_USERS"];
    },
  },

  methods: {
    submitForm(e) {
      this.formLoading = true;
      this.$store
        .dispatch("auth/register", this.form)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoading = false;
          this.$store.dispatch("pharmacie/viewAllUsers");

          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastPharmaUsers");
            new bootstrap.Toast(toast, { delay: 2000 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Utilisateur créé avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.name = "";
            this.form.email = "";
            this.form.password = "";
            this.form.pharmacie_id = "";
            this.form.pharmacie_role = "";
          }
        })
        .catch((err) => (this.formLoading = false));
    },
  },
};
</script>
