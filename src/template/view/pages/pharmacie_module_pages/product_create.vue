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
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);" class="btn btn-sm btn-secondary text-white">Voir liste des produits</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <!-- Basic Input -->
                <div>
                  <label for="basiInput" class="form-label">Code produit <sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput" placeholder="Entrez le code " />
                </div>
                <div>
                  <label for="basiInput" class="form-label">Libellé <sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput" placeholder="Entrez le libellé du produit" />
                </div>

                <div>
                  <label for="basiInput" class="form-label">Date d'Expiration <sup class="text-danger">*</sup></label>
                  <input type="date" class="form-control" id="basiInput"
                    placeholder="Entrez le libellé de la categorie" />
                </div>

                <div>
                  <label for="basiInput" class="form-label">Libellé <sup class="text-danger">*</sup></label>
                  <input type="password" class="form-control" id="basiInput"
                    placeholder="Entrez le libellé de la categorie" />
                </div>

                <div>
                  <label for="basiInput" class="form-label">Stock quantité <sup class="text-danger">*</sup></label>
                  <input type="number" class="form-control" id="basiInput"
                    placeholder="Entrez le libellé de la categorie" />
                </div>
                <div>
                  <label for="basiInput" class="form-label">Quantité minimum <sup class="text-danger">*</sup></label>
                  <input type="number" class="form-control" id="basiInput"
                    placeholder="Entrez le libellé de la categorie" />
                </div>

                <div>
                  <label for="basiInput" class="form-label">Unité <sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput"
                    placeholder="Entrez le libellé de la categorie" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <!-- Basic Input -->
                <div>
                  <label for="basiInput" class="form-label">Prix Unitaire <sup class="text-danger">*</sup></label>
                  <input type="number" class="form-control" id="basiInput" placeholder="Entrez le prix unitaire " />
                </div>
                <div>
                  <label for="basiInput" class="form-label">Catégorie <sup class="text-danger">*</sup></label>
                  <select class="form-control">
                    <option label="Sélectionnez une categorie" selected hidden></option>
                    <option value="Cat1">Categorie</option>
                  </select>
                </div>
                <!-- Input with Label -->
                <div>
                  <label for="labelInput" class="form-label">Description <small>(optionnel)</small></label>
                  <textarea class="form-control" placeholder="Entrez une description..."></textarea>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <load-button btn-type="submit" :loading="formLoading"
                        class-name="btn btn-success btn-lg mt-2 text-uppercase">Sauvegarder</load-button>
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
  name: "ProductCreate",
  data() {
    return {
      formLoading: false,
    };
  },
};
</script>
