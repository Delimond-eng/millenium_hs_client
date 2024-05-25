<template>
    <div class="offcanvas offcanvas-end border-0" tabindex="-1" id="theme-settings-offcanvas">
        <div class="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header">
            <h5 class="m-0 me-2 text-white">Services configuration</h5>

            <button type="button" class="btn-close btn-close-white ms-auto" id="customizerclose-btn"
                data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-0">
            <div class="h-100">
                <div>
                    <div class="p-3">
                        <h6 class="mb-0 fw-semibold text-uppercase">Création service</h6>
                        <div class="mt-3">
                            <label for="patientCode" class="form-label">Libellé service</label>
                            <div class="row g-2">
                                <div class="col-lg">
                                    <div class="form-icon">
                                        <input type="text" class="form-control form-control-icon" id="serviceLibelle"
                                            placeholder="Entrez libellé service..." />
                                        <i class="ri-settings-2-line"></i>
                                    </div>
                                </div>
                                <div class="col-lg-auto">
                                    <button class="btn btn-light btn-border" type="button">
                                        <i class="ri-add-line align-bottom"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-success btn-border text-uppercase w-100 mt-2">
                                Soumettre & valider
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive p-3">
                        <table class="table table-nowrap mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col-lg">Service Libellé</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in 10" :key="i">
                                    <td>Annette Black</td>
                                    <td>
                                        <div class="d-flex">
                                            <button class="btn btn-info btn-sm btn-border me-1">
                                                <i class="ri-edit-box-line"></i>
                                            </button>
                                            <button class="btn btn-light btn-sm btn-border">
                                                <i class="ri-delete-bin-3-line"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- end preloader-menu -->
            </div>
        </div>
    </div>
</template>
