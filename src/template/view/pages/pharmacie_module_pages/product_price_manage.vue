<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
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
          <!--  <div class="col-md-4">
            <div class="card">
              <form @submit.prevent="submitForm" class="card-body">
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
          </div> -->

          <div class="col-md-12">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">
                  Liste des produits et leur prix de vente
                </h4>
              </div>
              <div class="card-body">
                <custom-table v-if="isEmplacementDefined" :api-url="`/pharmacie.config.all/${this.$user().hopital.id}/${this.$user().pharmacie.id
                  }`" :columns="dataTableColumns" :data-src="'datas.productPrices'" ref="dataTablePrices" />
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
      dataTableColumns: [
        { data: "produit.produit_code", title: "CODE" },
        { data: "produit.produit_libelle", title: "LIBELLE" },
        { data: "produit_prix", title: "PU" },
        { data: "produit_prix_devise", title: "DEVISE" },
        { data: "produit.categorie.categorie_libelle", title: "CATEGORIE" },
        { data: "produit.type.type_libelle", title: "TYPE" },
        { data: "pharmacie.pharmacie_nom", title: "PHARMACIE" },
      ],
    };
  },

  computed: {
    isEmplacementDefined() {
      return this.$user().hopital !== undefined;
    },
  },
};
</script>
