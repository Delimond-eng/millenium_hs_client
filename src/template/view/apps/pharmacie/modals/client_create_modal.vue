<template>
    <teleport to="body">
        <div class="offcanvas offcanvas-end border-0 show" tabindex="-1" id="client-offcanvas" aria-modal="true"
            role="dialog">
            <div class="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header">
                <h5 class="m-0 me-2 text-white">Création nouveau client</h5>

                <button type="button" class="btn-close btn-close-white ms-auto" id="customizerclose-btn"
                    data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body p-0">
                <div data-simplebar="init" class="h-100 simplebar-scrollable-y">
                    <div class="simplebar-wrapper" style="margin: 0px">
                        <div class="simplebar-height-auto-observer-wrapper">
                            <div class="simplebar-height-auto-observer"></div>
                        </div>
                        <div class="simplebar-mask">
                            <div class="simplebar-offset" style="right: 0px; bottom: 0px">
                                <div class="simplebar-content-wrapper" tabindex="0" role="region"
                                    aria-label="scrollable content" style="height: 100%; overflow: hidden scroll">
                                    <div class="simplebar-content" style="padding: 0px">
                                        <div class="p-4">
                                            <h6 class="mb-0 fw-semibold text-uppercase">
                                                Enregistrement client en cours
                                            </h6>
                                            <p class="text-muted">
                                                Veuillez renseigner les informations requises pour un client !
                                            </p>

                                            <div class="mb-3 mt-3">
                                                <label for="clientNom" class="form-label">Nom du client</label>
                                                <input class="form-control" placeholder="Entrez le nom du client..."
                                                    type="text" id="clientNom" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="phoneNumber" class="form-label">Téléphone</label>
                                                <input class="form-control"
                                                    placeholder="Entrez le numéro de téléphone..." type="tel"
                                                    id="phoneNumber" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="simplebar-placeholder" style="width: 400px; height: 1978px"></div>
                    </div>
                    <div class="simplebar-track simplebar-horizontal" style="visibility: hidden">
                        <div class="simplebar-scrollbar" style="width: 0px; display: none"></div>
                    </div>
                    <div class="simplebar-track simplebar-vertical" style="visibility: visible">
                        <div class="simplebar-scrollbar"
                            style="height: 43px; transform: translate3d(0px, 0px, 0px); display: block"></div>
                    </div>
                </div>
            </div>
            <div class="offcanvas-footer border-top p-3 text-center">
                <div class="row">
                    <div class="col-6">
                        <button type="reset" data-bs-dismiss="offcanvas" class="btn btn-light w-100" id="reset-layout">
                            Fermer
                        </button>
                    </div>
                    <div class="col-6">
                        <button type="submit" class="btn btn-success w-100">
                            <i class="ri-check-double"></i> Continuer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>
