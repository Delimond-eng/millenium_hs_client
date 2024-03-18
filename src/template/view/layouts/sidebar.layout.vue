<template>
  <!-- ========== App Menu ========== -->
  <div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <!-- Light Logo-->
      <a href="#/home" class="logo logo-light" id="app-logo">
        <!-- <span class="logo-lg d-flex align-items-center " style="height:80px;">
                    <svg width="28px" height="30px" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 4.6C15 4.03995 15 3.75992 14.891 3.54601C14.7951 3.35785 14.6422 3.20487 14.454 3.10899C14.2401 3 13.9601 3 13.4 3H10.6C10.0399 3 9.75992 3 9.54601 3.10899C9.35785 3.20487 9.20487 3.35785 9.10899 3.54601C9 3.75992 9 4.03995 9 4.6V7.4C9 7.96005 9 8.24008 8.89101 8.45399C8.79513 8.64215 8.64215 8.79513 8.45399 8.89101C8.24008 9 7.96005 9 7.4 9H4.6C4.03995 9 3.75992 9 3.54601 9.10899C3.35785 9.20487 3.20487 9.35785 3.10899 9.54601C3 9.75992 3 10.0399 3 10.6V13.4C3 13.9601 3 14.2401 3.10899 14.454C3.20487 14.6422 3.35785 14.7951 3.54601 14.891C3.75992 15 4.03995 15 4.6 15H7.4C7.96005 15 8.24008 15 8.45399 15.109C8.64215 15.2049 8.79513 15.3578 8.89101 15.546C9 15.7599 9 16.0399 9 16.6V19.4C9 19.9601 9 20.2401 9.10899 20.454C9.20487 20.6422 9.35785 20.7951 9.54601 20.891C9.75992 21 10.0399 21 10.6 21H13.4C13.9601 21 14.2401 21 14.454 20.891C14.6422 20.7951 14.7951 20.6422 14.891 20.454C15 20.2401 15 19.9601 15 19.4V16.6C15 16.0399 15 15.7599 15.109 15.546C15.2049 15.3578 15.3578 15.2049 15.546 15.109C15.7599 15 16.0399 15 16.6 15H19.4C19.9601 15 20.2401 15 20.454 14.891C20.6422 14.7951 20.7951 14.6422 20.891 14.454C21 14.2401 21 13.9601 21 13.4V10.6C21 10.0399 21 9.75992 20.891 9.54601C20.7951 9.35785 20.6422 9.20487 20.454 9.10899C20.2401 9 19.9601 9 19.4 9L16.6 9C16.0399 9 15.7599 9 15.546 8.89101C15.3578 8.79513 15.2049 8.64215 15.109 8.45399C15 8.24008 15 7.96005 15 7.4V4.6Z"
                            stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 class="text-white mx-1 text-uppercase fw-bold">Millenium HS</h3>
                </span> -->
        <img
          src="assets/logo-2.png"
          class="card-logo card-logo-dark mt-2"
          alt="logo dark"
          height="60"
        />
      </a>

      <button
        type="button"
        class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
        id="vertical-hover"
      >
        <i class="ri-record-circle-line"></i>
      </button>
    </div>

    <div data-simplebar-auto-hide="false" data-simplebar class="h-100">
      <div class="container-fluid">
        <div id="two-column-menu"></div>
        <ul class="navbar-nav" id="navbar-nav" v-if="$isAccessMenu('Tableau de bord')">
          <li class="menu-title"><span data-key="t-menu">Menu</span></li>
          <li class="nav-item">
            <a class="nav-link menu-link" href="#/home/dash">
              <i class="ri-apps-2-line"></i>
              <span data-key="t-dashboards">Tableau de bord</span>
            </a>
          </li>
          <!-- end Dashboard Menu -->
          <li class="nav-item" v-if="$isAccessMenu('modules')">
            <a class="nav-link menu-link" href="#/home/modules">
              <i class="ri-apps-fill"></i> <span data-key="t-dashboards">Modules</span>
            </a>
          </li>
          <li class="nav-item" v-if="$isAccessMenu('Patients')">
            <a
              class="nav-link menu-link"
              href="#sidebarApps"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarApps"
            >
              <i class="ri-wheelchair-line"></i> <span data-key="t-apps">Patients</span>
            </a>
            <div class="collapse menu-dropdown" id="sidebarApps">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="#/home/patients/list" class="nav-link" data-key="t-chat">
                    Liste des patients
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#/home/patient/create" class="nav-link" data-key="t-chat">
                    Création patient
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" v-if="$isAccessMenu('Agents')">
            <a
              class="nav-link menu-link"
              href="#med"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="med"
            >
              <i class="ri-user-settings-line"></i> <span data-key="t-apps">Agents</span>
            </a>
            <div class="collapse menu-dropdown" id="med">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="#/home/meds/list" class="nav-link" data-key="t-list">
                    Liste des agents
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#/home/med/create" class="nav-link" data-key="t-create">
                    Création agents
                  </a>
                </li>
                <li class="nav-item" v-if="$user().agent_id !== 0">
                  <a href="#/home/med/create" class="nav-link" data-key="t-create">
                    Rendez-vous
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" v-if="$isAccessMenu('Consultations')">
            <a
              class="nav-link menu-link"
              href="#sidebarLanding"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarLanding"
            >
              <i class="ri-stethoscope-line"></i>
              <span data-key="t-landing">Consultations</span>
            </a>
            <div class="collapse menu-dropdown" id="sidebarLanding">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="#/home/consults/list" class="nav-link" data-key="t-one-page">
                    Liste des consultations
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#/home/consult/create"
                    class="nav-link"
                    data-key="t-nft-landing"
                  >
                    Création consultations
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" v-if="$isAccessMenu('Suivis')">
            <a
              class="nav-link menu-link"
              href="#suiviLanding"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarLanding"
            >
              <i class="ri-stethoscope-line"></i> <span data-key="t-landing">Suivis</span>
            </a>
            <div class="collapse menu-dropdown" id="suiviLanding">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-one-page">
                    Suivi patient
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" v-if="$isAccessMenu('Premiers soins')">
            <a
              class="nav-link menu-link"
              href="#premiersLanding"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="premiersLanding"
            >
              <i class="bx bx-capsule"></i>
              <span data-key="t-landing">Premiers soins</span>
            </a>
            <div class="collapse menu-dropdown" id="premiersLanding">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="#/home/premiers_soins" class="nav-link" data-key="t-one-page">
                    Enregistrement soins</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#/home/premiers_soins/list"
                    class="nav-link"
                    data-key="t-one-page"
                  >
                    Liste des soins</a
                  >
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item" v-if="$isAccessMenu('Transferts patients')">
            <a class="nav-link menu-link" href="#/home/transferts" role="button">
              <i class="ri-arrow-left-right-fill"></i>
              <span data-key="t-apps">Transferts patients</span>
            </a>
          </li>

          <li class="nav-item" v-if="$isAccessMenu('Facturations')">
            <a
              class="nav-link menu-link"
              href="#paiementsLanding"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="paiementsLanding"
            >
              <i class="ri-money-dollar-box-line"></i>
              <span data-key="t-landing">Paiements & factures</span>
            </a>
            <div class="collapse menu-dropdown" id="paiementsLanding">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="#/home/facture/create" class="nav-link" data-key="t-one-page"
                    >Nouvelle facture
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#/home/factures/list" class="nav-link" data-key="t-one-page">
                    Historique factures</a
                  >
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item" v-if="$isAccessMenu('Hospitalisations')">
            <a
              class="nav-link menu-link"
              href="#/home/hospitalisations.manage"
              role="button"
            >
              <i class="ri-hotel-bed-line"></i>
              <span data-key="t-apps">Hospitalisations</span>
            </a>
          </li>

          <li class="nav-item" v-if="$isAccessMenu('Laboratoires')">
            <a
              class="nav-link menu-link"
              href="#lab"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="med"
            >
              <i class="ri-microscope-line"></i>
              <span data-key="t-apps">Laboratoires</span>
            </a>
            <div class="collapse menu-dropdown" id="lab">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="#/admin/labo/config" class="nav-link">
                    Création laboratoire
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#/admin/labo/config/examens">
                    Congiguration examens
                  </a>
                </li>
                <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-list">
                    Examens en attente
                  </a>
                </li>
                <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-list">
                    Resultats
                  </a>
                </li>
                <li class="nav-item" v-if="$user().agent_id !== 0">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-create">
                    Equipements
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item" v-if="$isAccessMenu('Maternites')">
            <a
              class="nav-link menu-link"
              href="#maternite"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="maternite"
            >
              <i class="ri-parent-line"></i> <span data-key="t-apps">Maternité</span>
            </a>
            <div class="collapse menu-dropdown" id="maternite">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-list">
                    Consultation postnatale
                  </a>
                </li>
                <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-list">
                    Consultation prénatale
                  </a>
                </li>
                <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-create">
                    Accouchement
                  </a>
                </li>

                <li class="nav-item">
                  <a href="javascript:void(0)" class="nav-link" data-key="t-create">
                    Création bébé
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item" v-if="$isAccessMenu('Pharmacies')">
            <a
              class="nav-link menu-link"
              href="#pharmacie"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="pharmacie"
            >
              <i class="bx bx-first-aid"></i> <span data-key="t-apps">Pharmacies</span>
            </a>
            <div class="collapse menu-dropdown" id="pharmacie">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <a href="#/pharmacie/create" class="nav-link" data-key="t-list"
                    >Création pharmacie</a
                  >
                </li>
                <li class="nav-item">
                  <a href="#/pharmacie/users/manage" class="nav-link" data-key="t-list"
                    >Gestion des utilisateurs</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#/pharmacie/fournisseurs/manage"
                    class="nav-link"
                    data-key="t-list"
                    >Gestion des fournisseurs</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#sidebarPharmacie"
                    class="nav-link"
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded="true"
                    aria-controls="sidebarPharmacie"
                    data-key="t-profile"
                  >
                    Gestion stock
                  </a>
                  <div class="menu-dropdown collapse" id="sidebarPharmacie" style="">
                    <ul class="nav nav-sm flex-column">
                      <li class="nav-item">
                        <a
                          href="#/pharmacie/create/category"
                          class="nav-link"
                          data-key="t-simple-page"
                        >
                          Création catégories</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          href="#/pharmacie/create/product"
                          class="nav-link"
                          data-key="t-simple-page"
                        >
                          Création produits</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          href="#/pharmacie/operations"
                          class="nav-link"
                          data-key="t-simple-page"
                        >
                          Opérations
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item" id="config-menu" v-if="$isAccessMenu('Configurations')">
            <a class="nav-link menu-link" href="#/admin/config/all" role="button">
              <i class="ri-settings-2-line"></i>
              <span data-key="t-landing">Configurations</span>
            </a>
          </li>
          <li class="nav-item" id="config-menu" v-if="$isAccessMenu('Partenaires')">
            <a class="nav-link menu-link" href="#/admin/config/partener" role="button">
              <i class="ri-contacts-book-line"></i>
              <span data-key="t-landing">Partenaires</span>
            </a>
          </li>

          <li
            class="nav-item"
            id="users-menu"
            v-if="$isAccessMenu('Gestion utilisateurs')"
          >
            <a
              class="nav-link menu-link"
              href="#usersLanding"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="usersLanding"
            >
              <i class="ri-user-settings-line"></i>
              <span data-key="t-landing">Gestion utilisateurs</span>
            </a>
            <div class="collapse menu-dropdown" id="usersLanding">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item">
                  <button class="nav-link" @click.stop="showConfigModal('roles')">
                    Création roles
                  </button>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link" data-key="t-nft-landing">
                    Gestionnaire des comptes
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link" data-key="t-nft-landing">
                    Historique de navigation
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
  </div>
  <service-config-modal :action-key="actionKey" />
</template>

<script>
export default {
  name: "SidebarLayout",
  data() {
    return {
      actionKey: "",
    };
  },
  methods: {
    showConfigModal(tag) {
      this.actionKey = tag;
      this.$showBsModal("serviceConfigModal");
    },
  },
};
</script>
