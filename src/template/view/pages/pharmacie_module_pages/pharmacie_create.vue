<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">Création pharmacies</h4>
              <div class="page-title-right">
                <!-- <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a
                      href="javascript: void(0);"
                      class="btn btn-sm btn-secondary text-white"
                      >Liste des pharmacies</a
                    >
                  </li>
                </ol> -->
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5">
            <div class="card">
              <form @submit.prevent="submitForm" class="card-body">
                <!-- Basic Input -->
                <div>
                  <label for="basiInput" class="form-label"
                    >Dénomination <sup class="text-danger">*</sup></label
                  >
                  <input
                    type="text"
                    v-model="form.nom"
                    class="form-control"
                    id="basiInput"
                    placeholder="Entrez la dénomination de la pharmacie"
                  />
                </div>
                <div class="mt-2">
                  <label for="basiInput" class="form-label"
                    >Téléphone <sup class="text-danger">(optionnel)</sup></label
                  >
                  <input
                    type="text"
                    v-model="form.telephone"
                    class="form-control"
                    id="basiInput"
                    placeholder="Entrez le téléphone de contact"
                  />
                </div>

                <!-- Input with Label -->
                <div class="mt-2">
                  <label for="labelInput" class="form-label"
                    >Adresse <sup class="text-danger">(optionnel)</sup></label
                  >
                  <textarea
                    v-model="form.adresse"
                    class="form-control"
                    placeholder="Entrez une adresse..."
                  ></textarea>
                </div>

                <bs-toast id="errorsToastPharma" :msg="errors_msg" />

                <div class="mt-2">
                  <label for="iconInputLocation" class="form-label"
                    >Emplacement <sup class="text-danger">*</sup></label
                  >
                  <div class="form-icon">
                    <select
                      class="form-select"
                      id="iconInputLocation"
                      v-model="form.emplacement_id"
                      required
                    >
                      <option
                        selected
                        label="Sélectionner un emplacement..."
                        hidden
                      ></option>
                      <option
                        v-for="(item, index) in appConfigs.emplacements"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.hopital_emplacement_libelle }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <button class="btn btn-dark mt-4 me-2" type="reset">Annuler</button>
                      <load-button
                        btn-type="submit"
                        :loading="formLoading"
                        class-name="btn btn-success mt-4 text-uppercase"
                      >
                        <i class="ri-add-line"></i> Sauvegarder</load-button
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-7">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Liste des pharmacies</h4>
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

                          <th class="sort">Nom</th>
                          <th class="sort">Téléphone</th>
                          <th class="sort">Adresse</th>
                          <th class="sort">Emplacement</th>
                          <th class="sort" data-sort="action">Action</th>
                        </tr>
                      </thead>

                      <tbody class="list form-check-all" v-if="config.pharmacies">
                        <tr v-for="(data, index) in config.pharmacies" :key="index">
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

                          <td>{{ data.pharmacie_nom }}</td>
                          <td>{{ data.pharmacie_telephone }}</td>
                          <td>{{ data.pharmacie_adresse }}</td>
                          <td>
                            <span v-if="data.emplacement">{{
                              data.emplacement.hopital_emplacement_libelle
                            }}</span>
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
                                  class="text-secondary d-inline-block edit-item-btn"
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
  name: "PharmacieManage",

  data() {
    return {
      formLoading: false,
      errors_msg: "",
      form: {
        nom: "",
        adresse: "",
        telephone: "",
        emplacement_id: "",
      },
    };
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },

    appConfigs() {
      return this.$store.getters["services/GET_CONFIGS"];
    },
  },

  mounted() {
    this.$store.dispatch("pharmacie/allConfigs");
  },

  methods: {
    submitForm(e) {
      this.formLoading = true;
      this.$store
        .dispatch("pharmacie/createPharmacie", this.form)
        .then((res) => {
          console.log(JSON.stringify(res));
          this.formLoading = false;
          this.$store.dispatch("pharmacie/allConfigs");

          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastPharma");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Nouvelle pharmacie créée avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.nom = "";
            this.form.telephone = "";
            this.form.adresse = "";
            this.form.emplacement_id = "";
          }
        })
        .catch((err) => (this.formLoading = false));
    },
  },
};
</script>
