<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Détails des opérations </h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);" class="btn btn-sm btn-light"
                      @click.prevent="$router.go(-1)">Retour</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <ul class="nav nav-pills nav-custom-light mb-3" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" data-bs-toggle="tab" href="#border-navs-approv" role="tab"
                  aria-selected="true">Approvisionnement</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#border-navs-ventes" role="tab"
                  aria-selected="true">Ventes</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#border-navs-classement" role="tab" aria-selected="false"
                  tabindex="-1">Expirés</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#border-navs-transfert" role="tab" aria-selected="false"
                  tabindex="-1">Transferés</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#border-navs-retour" role="tab" aria-selected="false"
                  tabindex="-1">Retournés</a>
              </li>
            </ul>
            <div class="border border-dashed mt-2 mb-2"></div>
            <!-- Tab panes -->
            <div class="tab-content text-muted">
              <div class="tab-pane active show" id="border-navs-approv" role="tabpanel">
                <approv-tab></approv-tab>
              </div>
              <div class="tab-pane" id="border-navs-ventes" role="tabpanel">
                <ventes-tab></ventes-tab>
              </div>
              <div class="tab-pane" id="border-navs-classement" role="tabpanel">
                <classement-tab></classement-tab>
              </div>
              <div class="tab-pane" id="border-navs-transfert" role="tabpanel">
                <transfert-tab></transfert-tab>
              </div>
              <div class="tab-pane" id="border-navs-retour" role="tabpanel">
                <retour-tab></retour-tab>
              </div>
            </div>
          </div>
        </div>
        <!-- Content operation -->
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
import ApprovTab from './tabs2/approv_view_tab.vue';
import VentesTab from './tabs2/ventes_view_tab.vue';
import ClassementTab from './tabs2/classement_view_tab.vue';
import TransfertTab from './tabs2/transfert_view_tab.vue';
import RetourTab from './tabs2/retour_view_tab.vue';
export default {
  name: "OperationProductViewer",
  props: {
    item: {
      default: () => { },
      type: Object
    }
  },
  components: {
    ApprovTab,
    VentesTab,
    ClassementTab,
    TransfertTab,
    RetourTab
  },
  data() {
    return {
      formLoading: false,
    };
  },
};
</script>

<style>
.fade-in-up-enter-active,
.fade-in-up-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-in-up-enter,
.fade-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
