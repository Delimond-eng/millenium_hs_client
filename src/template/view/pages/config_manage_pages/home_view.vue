<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Configurations
                            </h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <!-- <li class="me-2"><a href="javascript:void(0)" class="btn btn-soft-success"><i
                                                class="ri-add-line me-1"></i> Ajout service</a>
                                    </li> --><!--v-if-->
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <ul class="nav nav-pills animation-nav mb-3 bg-white shadow-sm p-2" role="tablist">
                            <li class="nav-item active" role="presentation">
                                <router-link :to="{ name: 'emplacements-config-tab' }" class="nav-link" role="tab"
                                    aria-selected="false" tabindex="-1">
                                    <i class="bx bx-location-plus"></i> Emplacements
                                </router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link :to="{ name: 'services-config-tab' }" class="nav-link" role="tab"
                                    aria-selected="true">
                                    <i class="ri-stethoscope-line me-1"></i>Services
                                </router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link :to="{ name: 'fonctions-config-tab' }" class="nav-link" role="tab"
                                    aria-selected="false" tabindex="-1">
                                    <i class=" ri-creative-commons-by-line "></i> Fonctions
                                </router-link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <router-link :to="{ name: 'facturations-config-tab' }" class="nav-link" role="tab"
                                    aria-selected="false" tabindex="-1">
                                    <i class="ri-file-settings-line"></i> Facturations
                                </router-link>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <router-view></router-view>
                        </div>

                    </div>
                </div>
            </div>
            <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        © Millenium HS
                    </div>
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
    name: 'HomeView',

    mounted() {
        this.$store.dispatch('services/viewFacturations', 'all');
        this.$store.dispatch('services/viewAllEmplacements');
        this.$store.dispatch('services/showConfigs');
    },
}
</script>