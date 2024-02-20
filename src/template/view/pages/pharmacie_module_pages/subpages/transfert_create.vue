<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Transfert produits</h2>
    </div>
    <div class="card-body">
      <div>
        <label for="basiInput" class="form-label"
          >Produit <sup class="text-danger">*</sup></label
        >
        <input
          type="text"
          class="form-control"
          id="basiInput"
          placeholder="Entrez le libellé de la categorie"
        />
      </div>
      <!-- Basic Input -->
      <div class="mt-2">
        <label for="basiInput" class="form-label"
          >Catégorie Libellé <sup class="text-danger">*</sup></label
        >
        <input
          type="text"
          class="form-control"
          id="basiInput"
          placeholder="Entrez le libellé de la categorie"
        />
      </div>

      <!-- Input with Label -->
      <div class="mt-2">
        <label for="labelInput" class="form-label"
          >Description <small>(optionnel)</small></label
        >
        <textarea class="form-control" placeholder="Entrez une description..."></textarea>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-end align-items-end">
            <load-button
              btn-type="submit"
              :loading="formLoading"
              class-name="btn btn-secondary mt-2 text-uppercase"
              >Sauvegarder</load-button
            >
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
