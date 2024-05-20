<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Situation des opérations</h4>

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

        <div class="card">
          <div class="card-body">
            <!-- Nav tabs -->
            <ul class="nav nav-pills animation-nav nav-secondary mb-3" role="tablist">
              <li class="nav-item waves-effect waves-light" role="presentation">
                <a class="nav-link active" data-bs-toggle="tab" href="#home-1" role="tab"
                  aria-selected="true">Approvisionnements</a>
              </li>
              <li class="nav-item waves-effect waves-light" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#profile-1" role="tab" aria-selected="false"
                  tabindex="-1">Transferts</a>
              </li>
              <li class="nav-item waves-effect waves-light" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#messages-1" role="tab" aria-selected="false"
                  tabindex="-1">Classements</a>
              </li>
              <li class="nav-item waves-effect waves-light" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#settings-1" role="tab" aria-selected="false"
                  tabindex="-1">Retournés</a>
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content text-muted">
              <div class="tab-pane active" id="home-1" role="tabpanel">
                <stock-view-tab></stock-view-tab>
              </div>
              <div class="tab-pane" id="profile-1" role="tabpanel">
                <transfert-view-tab></transfert-view-tab>
              </div>
              <div class="tab-pane" id="messages-1" role="tabpanel">
                <classement-view-tab></classement-view-tab>
              </div>
              <div class="tab-pane" id="settings-1" role="tabpanel">
                <retour-view-tab></retour-view-tab>
              </div>
            </div>
          </div>
          <!-- end card-body -->
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
import stockViewTab from "./tabs/approv_view_tab.vue";
import transfertViewTab from "./tabs/transfert_view_tab.vue";
import classementViewTab from "./tabs/classement_view_tab.vue";
import retourViewTab from "./tabs/retour_view_tab.vue";
export default {
  name: "OperationViewer",
  components: {
    transfertViewTab,
    stockViewTab,
    retourViewTab,
    classementViewTab,
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
