<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Retour des produits auprès de fournisseur</h2>
    </div>
    <div class="card-body">
      <div>
        <label for="basiInput" class="form-label">Produit <sup class="text-danger">*</sup></label>
        <select class="form-select">
          <option label="-- Sélectionnez un produit --"></option>
        </select>
      </div>
      <!-- Basic Input -->
      <div class="mt-2">
        <label for="basiInput" class="form-label">Quantité<sup class="text-danger">*</sup></label>
        <input type="text" class="form-control" id="basiInput" placeholder="Entrez la qté à retourner..." />
      </div>

      <div class="mt-2">
        <label for="basiInput" class="form-label">Fournisseur <sup class="text-danger">*</sup></label>
        <select class="form-select">
          <option label="-- Sélectionnez un fournisseur --"></option>
        </select>
      </div>

      <!-- Input with Label -->
      <div class="mt-2">
        <label for="labelInput" class="form-label">Observation <small>(optionnel)</small></label>
        <textarea class="form-control" placeholder="Entrez une observation..."></textarea>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-end align-items-end">
            <load-button btn-type="submit" :loading="formLoading" class-name="btn btn-secondary btn-lg mt-2">Valider le
              retour</load-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Approvisionnement",

  data() {
    return {
      formLoading: false,
    };
  },
};
</script>
