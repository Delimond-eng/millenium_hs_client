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
                Gestion des prix des produits pharmaceutiques
                <small>(par pharmacie)</small>
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
          <div class="col-md-4">
            <div class="card">
              <form @submit.prevent="submitForm" class="card-body">
                <!-- Basic Input -->
                <div class="mb-2">
                  <label for="basiInput" class="form-label"
                    >Produit <sup class="text-danger">*</sup></label
                  >
                  <select class="form-control" ref="prodField" required>
                    <option
                      value=""
                      label="Sélectionnez une categorie"
                      selected
                      hidden
                    ></option>
                  </select>
                </div>
                <div class="mb-2" v-if="user.role.role !== 'Pharmacien'">
                  <label for="basiInput" class="form-label"
                    >Pharmacie<sup class="text-danger">*</sup></label
                  >
                  <select
                    class="form-select"
                    @change="loadStockInfo"
                    v-model="form.pharmacie_id"
                    required
                  >
                    <option
                      label="Sélectionnez une pharmacie..."
                      selected
                      hidden
                    ></option>
                    <option
                      v-for="(data, index) in config.pharmacies"
                      :key="index"
                      :value="data.id"
                    >
                      {{ data.pharmacie_nom }}
                    </option>
                  </select>
                </div>
                <div class="row g-2">
                  <div class="col-md-8">
                    <div class="mb-2">
                      <label for="basiInput" class="form-label"
                        >Dernier stock prix achat unitaire
                      </label>
                      <div class="d-flex">
                        <input
                          type="text"
                          :value="stockInfos.stock_pa"
                          class="form-control me-1"
                          placeholder="Entrer le prix unitaire..."
                          required
                          readonly
                        />
                        <input
                          type="text"
                          :value="stockInfos.stock_pa_devise"
                          class="form-control"
                          style="width: 100px"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-2">
                      <label for="basiInput" class="form-label"
                        >Marge bénéf. en % <sup class="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        @input="calculatePu"
                        v-model="form.marge"
                        class="form-control"
                        placeholder="marge...ex:10"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label"
                    >P.U généré <sup class="text-danger">*</sup></label
                  >
                  <div class="d-flex">
                    <input
                      type="text"
                      v-model="form.produit_prix"
                      class="form-control me-2"
                      placeholder="Entrer le prix unitaire..."
                      required
                      readonly
                    />
                    <input
                      type="text"
                      :value="stockInfos.stock_pa_devise"
                      class="form-control"
                      style="width: 100px"
                      readonly
                    />
                  </div>
                </div>

                <bs-toast id="errorsToastPrice" :msg="errors_msg" />

                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <load-button
                        btn-type="submit"
                        :loading="formLoading"
                        class-name="btn btn-secondary mt-4 text-uppercase"
                      >
                        <i class="ri-add-line"></i>valider & Sauvegarder</load-button
                      >
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
                      <input
                        type="text"
                        class="form-control search"
                        placeholder="Recherche produits ..."
                      />
                      <i class="ri-search-line search-icon"></i>
                    </div>
                  </div>
                </div>
              </div>

              <!-- end card body -->

              <div class="card-body">
                <div>
                  <table class="table table-striped table-nowrap">
                    <thead>
                      <tr class="text-uppercase">
                        <th scope="col">CODE</th>
                        <th scope="col">Libellé</th>
                        <th scope="col">PU</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Type</th>
                        <th scope="col">Pharmacie</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, index) in config.productPrices" :key="index">
                        <th scope="row">
                          <span v-if="data.produit"
                            >#{{ data.produit.produit_code }}</span
                          >
                        </th>
                        <td>
                          <span v-if="data.produit">{{
                            data.produit.produit_libelle
                          }}</span>
                        </td>
                        <td>{{ data.produit_prix }} {{ data.produit_prix_devise }}</td>
                        <td>
                          <span v-if="data.produit"
                            ><span v-if="data.produit.categorie">{{
                              data.produit.categorie.categorie_libelle
                            }}</span></span
                          >
                        </td>
                        <td>
                          <span v-if="data.produit"
                            ><span v-if="data.produit.type">{{
                              data.produit.type.type_libelle
                            }}</span></span
                          >
                        </td>
                        <td>
                          <span v-if="data.pharmacie">{{
                            data.pharmacie.pharmacie_nom
                          }}</span>
                        </td>
                        <td>
                          <a href="javascript:void(0);" class="link-secondary">
                            <i class="ri-edit-box-line align-middle"></i
                          ></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
        produit_prix: "",
        produit_prix_devise: "CDF",
        pharmacie_id: "",
        produit_id: "",
        marge: "",
      },
      stockInfos: {
        stock_pa: "",
        stock_pa_devise: "CDF",
      },
    };
  },

  async mounted() {
    await this.$store.dispatch("pharmacie/allConfigs");
    this.initField();
  },

  computed: {
    config() {
      return this.$store.getters["pharmacie/GET_CONFIG"];
    },

    user() {
      return this.$store.getters["auth/GET_USER"];
    },
  },

  methods: {
    submitForm(e) {
      this.formLoading = true;
      this.form.pharmacie_id = this.user.pharmacie.id;
      this.$store
        .dispatch("pharmacie/addPrice", this.form)
        .then((res) => {
          this.formLoading = false;
          this.$store.dispatch("pharmacie/allConfigs");
          if (res.errors !== undefined) {
            console.log(JSON.stringify(res));
            this.errors_msg = res.errors.toString();
            let toast = document.getElementById("errorsToastPrice");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          }
          if (res !== null) {
            Swal({
              icon: "success",
              text: "Prix assigné avec succès !",
              toast: true,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form.pharmacie_id = "";
            this.form.produit_id = "";
            this.form.produit_prix = "";
            this.form.produit_prix_devise = "CDF";
            this.form.marge = "";
            this.stockInfos.stock_pa = "";
            this.stockInfos.stock_pa_devise = "CDF";
            $(this.$refs.prodField).val("").trigger("change");
          }
        })
        .catch((err) => (this.formLoading = false));
    },

    /**
     * Charge les données du dernier stock des produits
     */
    async loadStockInfo(e) {
      let data = {};
      if (this.form.produit_id === "") {
        this.errors_msg = "Veuillez sélectionner le produit !";
        let toast = document.getElementById("errorsToastPrice");
        new bootstrap.Toast(toast, { delay: 1500 }).show();
        this.form.pharmacie_id = "";
        return;
      }
      data.produit_id = this.form.produit_id;
      if (e.pharmacie_id !== undefined) {
        data.pharmacie_id = e.pharmacie_id;
      } else {
        data.pharmacie_id = e.target.value;
      }
      let info = await this.$store.dispatch("pharmacie/viewStockInfo", data);
      if (info !== null) {
        this.stockInfos.stock_pa = info.stock_pa;
        this.stockInfos.stock_pa_devise = info.stock_pa_devise;
      } else {
        this.errors_msg =
          "Ce produit n'a pas de stock enregistré pour la pharmacie sélectionnée !";
        let toast = document.getElementById("errorsToastPrice");
        new bootstrap.Toast(toast, { delay: 1500 }).show();
        return;
      }
    },

    /**
     * Calcul le prix de vente en fonction du marge beneficiaire et prix d'achat unitaire
     */
    calculatePu(e) {
      let val = e.target.value;
      try {
        if (val !== "") {
          let pCalculate = parseFloat(this.stockInfos.stock_pa) * (parseFloat(val) / 100);
          let pu = parseFloat(this.stockInfos.stock_pa) + pCalculate;
          if (isNaN(pu)) {
            this.errors_msg = "Entrez la valeur numerique !";
            let toast = document.getElementById("errorsToastPrice");
            new bootstrap.Toast(toast, { delay: 1500 }).show();
            return;
          } else {
            this.form.produit_prix = pu;
          }
        } else {
          this.form.produit_prix = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    initField() {
      let self = this;
      $(this.$refs.prodField)
        .select2({
          placeholder: "Sélectionner un produit...",
          data: $.map(self.config.produits, function (item) {
            return {
              text: `#${item.produit_code} | ${item.produit_libelle}`,
              id: item.id,
            };
          }),
        })
        .on("change", function (e) {
          let id = $(this).val();
          self.form.produit_id = id;
          if (self.user.role.role === "Pharmacien") {
            let e = {
              pharmacie_id: self.user.pharmacie.id,
            };
            if (self.form.produit_id !== "") {
              self.loadStockInfo(e);
            }
          }
        });
    },
  },
};
</script>
