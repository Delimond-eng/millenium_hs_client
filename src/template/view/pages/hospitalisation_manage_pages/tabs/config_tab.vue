<template>
  <div role="tabpanel">
    <div class="row">
      <div class="col-12 col-md-12 mb-1">
        <div class="d-sm-flex align-items-center justify-content-between">
          <h5 class="mb-sm-0 text-uppercase fw-semibold">
            Configuration Type des lits<sup
              class="text-danger text-lowercase fw-normal"
            ></sup>
          </h5>
          <button @click="$showBsModal('typeConfigModal')" class="btn btn-soft-primary">
            <i class="ri-add-line me-1"></i> Nouvelle configuration
          </button>
        </div>
      </div>

      <div class="col-md-12">
        <div class="table-responsive table-card text-center mt-2">
          <table class="table table-nowrap table-striped-columns mb-0 mt-2">
            <thead class="table-light">
              <tr>
                <th scope="col">Libellé</th>
                <th scope="col">Emplacement</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in datas.types" :key="index">
                <td>{{ data.type_libelle }}</td>

                <td>
                  <span v-if="data.emplacement">{{
                    data.emplacement.hopital_emplacement_libelle
                  }}</span>
                </td>
                <td>
                  <button class="btn btn-soft-danger btn-sm btn-icon">
                    <!-- <svg-loading v-if="loadedDetail === data.consult_id" color="#0C8BCF"
                                            size="18"></svg-loading> -->
                    <i class="ri-delete-bin-3-line"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <state-empty
            v-if="datas.types === undefined || datas.types.length === 0"
            title="Pas de données disponible !"
            description="Aucune configuration de type des lits disponibles !"
          ></state-empty>
        </div>
      </div>
    </div>
  </div>

  <teleport to="body">
    <div
      id="typeConfigModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">Configuration type</h5>
            <p class="text-white-50">
              Veuillez renseigner tous les champs pour créer une configuration du type de
              lit !
            </p>
          </div>
          <div class="modal-body p-4">
            <form class="row" @submit.prevent="submitForm">
              <div class="mb-2 col-md-12">
                <label for="hsnom">Libellé <sup class="text-danger">*</sup> </label>
                <input
                  type="text"
                  v-model="form.type_libelle"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Entrer le libellé du type..."
                  required
                />
              </div>
              <div class="col-md-12 mb-2">
                <div>
                  <label for="iconInputNom" class="form-label"
                    >Emplacement<sup class="text-danger">*</sup></label
                  >
                  <select
                    class="form-select"
                    v-model="form.hopital_emplacement_id"
                    required
                  >
                    <option
                      label="Sélectionner un type de lit..."
                      selected
                      hidden
                    ></option>
                    <option
                      v-for="(item, index) in configs.emplacements"
                      :key="index"
                      :value="item.id"
                    >
                      {{ item.hopital_emplacement_libelle }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div>
                  <label for="iconInputNom" class="form-label"
                    >Description<sup class="text-danger">(Optionnelle)</sup></label
                  >
                  <textarea
                    class="form-control"
                    v-model="form.type_description"
                    placeholder="Description de la configuration..."
                  ></textarea>
                </div>
              </div>

              <div class="col-md-12">
                <!-- show some errors -->
                <bs-toast id="borderedToastErrors800" :msg="errors_msg" />
                <!-- buttons -->
                <div class="d-flex justify-content-end align-items-end">
                  <button
                    type="button"
                    @click.prevent="
                      $closeBsModal('typeConfigModal');
                      abort();
                    "
                    class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2"
                  >
                    Fermer
                  </button>
                  <load-button
                    btn-type="submit"
                    :loading="formLoading"
                    class-name="btn btn-info btn-border btn-lg mt-2 text-uppercase"
                    >Créer configuration</load-button
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {
  name: "ConfigTab",

  data() {
    return {
      form: {
        type_libelle: "",
        type_description: "",
        hopital_emplacement_id: "",
        created_by: "",
      },
      formLoading: false,
    };
  },

  methods: {
    submitForm(e) {
      this.formLoading = true;
      /**
       * Dispatch vuex action createHospital
       * @argument form this.form
       */
      this.$store
        .dispatch("hospitalisation/addConfig", this.form)
        .then((res) => {
          console.log(res);
          this.formLoading = false;
          if (res.status !== undefined) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              toast: true,
              title: "Nouvelle config créée avec succès !",
              showConfirmButton: false,
              timer: 3000,
              showCloseButton: false,
            });
            this.$store.dispatch("hospitalisation/viewAllDatas");
            this.abort();
          }
          if (res.errors !== undefined) {
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("borderedToastErrors800");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
        })
        .catch((err) => {
          this.formLoading = false;
          console.log(JSON.stringify(err));
        });
    },

    abort() {
      this.form.type_libelle = "";
      this.form.type_description = "";
      this.form.hopital_emplacement_id = "";
      this.form.created_by = "";
    },
  },

  computed: {
    configs() {
      return this.$store.getters["services/GET_CONFIGS"];
    },

    datas() {
      return this.$store.getters["hospitalisation/GET_ALL_DATAS"];
    },
  },
};
</script>
