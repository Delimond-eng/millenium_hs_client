<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <a href="javascript:void(0)" class="logo logo-dark">
              <span class="logo-sm">
                <img src="assets/images/companies/pharmacy.png" alt="" height="50" />
              </span>
              <span class="logo-lg">
                <img src="assets/images/companies/pharmacy.png" alt="" height="50" />
              </span>
            </a>

            <a href="javascript:void(0)" class="logo logo-light">
              <span class="logo-sm">
                <img src="assets/images/companies/pharmacy.png" alt="" height="50" />
              </span>
              <span class="logo-lg">
                <img src="assets/images/companies/pharmacy.png" alt="" height="50" />
              </span>
            </a>
          </div>

          <button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- App Search-->
        </div>

        <div class="d-flex align-items-center">
          <div class="dropdown ms-sm-3 header-item topbar-user">
            <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <span class="d-flex align-items-center">
                <img class="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg"
                  alt="Header Avatar" />
                <span class="text-start ms-xl-2">
                  <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">Gaston delimond</span>
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">Vendeur</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <!-- item-->
              <h6 class="dropdown-header">Bienvenue Gaston delimond!</h6>
              <a class="dropdown-item" href="javascript:void(0)"><i
                  class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Profil</span></a>
              <a class="dropdown-item" href="javascript:void(0)"><i
                  class="mdi mdi-monitor-account text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Mes ventes</span></a>

              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void(0)"><i
                  class="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Balance : <b>$5971.67</b></span></a>

              <a class="dropdown-item" href="javascript:void(0)"><i
                  class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" data-key="t-logout">Déconnecter</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "FooterLayout",
};
</script>
