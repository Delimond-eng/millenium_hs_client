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
          <div class="col-md-5">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Liste des utilisateurs</h4>
              </div>
              <div class="card-body">
                <div data-simplebar="init" style="height: 270px" class="mx-n3 px-3 simplebar-scrollable-y">
                  <div class="simplebar-wrapper" style="margin: 0px -16px">
                    <div class="simplebar-height-auto-observer-wrapper">
                      <div class="simplebar-height-auto-observer"></div>
                    </div>
                    <div class="simplebar-mask">
                      <div class="simplebar-offset" style="right: 0px; bottom: 0px">
                        <div class="simplebar-content-wrapper" tabindex="0" role="region"
                          aria-label="scrollable content" style="height: 100%; overflow: hidden scroll">
                          <div class="simplebar-content" style="padding: 0px 16px">
                            <div class="vstack gap-3">
                              <div class="d-flex align-items-center" v-for="i in 10" :key="i">
                                <div class="avatar-xs flex-shrink-0 me-3">
                                  <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
                                    HB
                                  </div>
                                </div>
                                <div class="flex-grow-1">
                                  <h5 class="fs-13 mb-0">
                                    <a href="#" class="text-body d-block">Henry Baird</a>
                                  </h5>
                                  <small class="text-muted">Vendeur</small>
                                </div>
                                <div class="flex-shrink-0">
                                  <div class="d-flex align-items-center gap-1">
                                    <div class="dropdown">
                                      <button class="btn btn-icon btn-sm fs-16 text-muted dropdown" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="ri-more-fill"></i>
                                      </button>
                                      <ul class="dropdown-menu" style="">
                                        <li>
                                          <a class="dropdown-item" href="javascript:void(0);"><i
                                              class="ri-eye-fill text-muted me-2 align-bottom"></i>Voir détails</a>
                                        </li>

                                        <li>
                                          <a class="dropdown-item" href="javascript:void(0);"><i
                                              class="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>Supprimer</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- end list -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="simplebar-placeholder" style="width: 383px; height: 284px"></div>
                  </div>
                  <div class="simplebar-track simplebar-horizontal" style="visibility: hidden">
                    <div class="simplebar-scrollbar" style="width: 0px; display: none"></div>
                  </div>
                  <div class="simplebar-track simplebar-vertical" style="visibility: visible">
                    <div class="simplebar-scrollbar" style="
                        height: 194px;
                        transform: translate3d(0px, 41px, 0px);
                        display: block;
                      "></div>
                  </div>
                </div>
              </div>
              <!-- end card body -->
            </div>
          </div>
          <div class="col-md-7">
            <div class="card">
              <div class="card-header align-items-center d-flex border-bottom-dashed">
                <h4 class="card-title mb-0 flex-grow-1">Création nouveau utilisateur</h4>
              </div>
              <div class="card-body">
                <!-- Basic Input -->
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Nom complet<sup class="text-danger">*</sup></label>
                  <input type="text" class="form-control" id="basiInput" placeholder="Entrer le nom complet..." />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Email<sup class="text-danger">*</sup></label>
                  <input type="email" class="form-control" id="basiInput" placeholder="Entrer l'adresse email..." />
                </div>
                <div class="mb-2">
                  <label for="basiInput" class="form-label">Mot de passe<sup class="text-danger">*</sup></label>
                  <input type="password" class="form-control" id="basiInput" placeholder="Entrer le mot de passe" />
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex justify-content-end align-items-end">
                      <load-button btn-type="submit" :loading="formLoading"
                        class-name="btn btn-success mt-2 text-uppercase">
                        <i class="ri-add-fill"></i>Créer</load-button>
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
  name: "UsersManage",

  data() {
    return {
      formLoading: false,
    };
  },
};
</script>
