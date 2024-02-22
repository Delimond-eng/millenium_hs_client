<template>
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
            >
              <h4 class="mb-sm-0">Situation des opérations</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a
                      href="javascript: void(0);"
                      class="btn btn-sm btn-light"
                      @click.prevent="$router.go(-1)"
                      >Retour</a
                    >
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
                <a
                  class="nav-link active"
                  data-bs-toggle="tab"
                  href="#home-1"
                  role="tab"
                  aria-selected="true"
                  >Approvisionnements</a
                >
              </li>
              <li class="nav-item waves-effect waves-light" role="presentation">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#profile-1"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                  >Transferts</a
                >
              </li>
              <li class="nav-item waves-effect waves-light" role="presentation">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#messages-1"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                  >Classements</a
                >
              </li>
              <li class="nav-item waves-effect waves-light" role="presentation">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#settings-1"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                  >Retournés</a
                >
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content text-muted">
              <div class="tab-pane active" id="home-1" role="tabpanel">
                <div class="d-flex">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    Raw denim you probably haven't heard of them jean shorts Austin.
                    Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    Too much or too little spacing, as in the example below, can make
                    things unpleasant for the reader. The goal is to make your text as
                    comfortable to read as possible.
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="profile-1" role="tabpanel">
                <div class="d-flex">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    In some designs, you might adjust your tracking to create a certain
                    artistic effect. It can also help you fix fonts that are poorly spaced
                    to begin with.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    A wonderful serenity has taken possession of my entire soul, like
                    these sweet mornings of spring which I enjoy with my whole heart.
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="messages-1" role="tabpanel">
                <div class="d-flex">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    Each design is a new, unique piece of art birthed into this world, and
                    while you have the opportunity to be creative and make your own style
                    choices.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    For that very reason, I went on a quest and spoke to many different
                    professional graphic designers and asked them what graphic design tips
                    they live.
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="settings-1" role="tabpanel">
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    For that very reason, I went on a quest and spoke to many different
                    professional graphic designers and asked them what graphic design tips
                    they live.
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-fill text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    After gathering lots of different opinions and graphic design basics,
                    I came up with a list of 30 graphic design tips that you can start
                    implementing.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- Content operation -->
        <!-- <div class="row mt-4 d-flex align-items-center justify-content-center">
                    <div class="col-md-10">
                        <router-view v-slot="{ Component }">
                            <transition name="fade-in-up" mode="out-in">
                                <component :is="Component" />
                            </transition>
                        </router-view>
                    </div>
                </div> -->
        <!-- end content -->
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
