<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">
                                Gestion des hospitalisation des patient<sup
                                    class="text-danger text-lowercase fw-normal"></sup>
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
                        <div class="card">
                            <div class="card-body">
                                <div class="card-body">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-pills nav-custom mb-3" role="tablist">
                                        <li class="nav-item active" role="presentation">
                                            <router-link :to="{ name: 'bed-tab' }" class="nav-link" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <i class="ri-hotel-bed-line"></i> Lits
                                            </router-link>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <router-link :to="{ name: 'hospitalisation-tab' }" class="nav-link" role="tab"
                                                aria-selected="true">
                                                <i class="ri-hospital-line me-1"></i>Hospitalisations
                                            </router-link>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <router-link :to="{ name: 'transfert-tab' }" class="nav-link" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <i class="ri-arrow-left-right-fill"></i> Transferts
                                            </router-link>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <router-link :to="{ name: 'setting-tab' }" class="nav-link" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <i class="ri-tools-fill"></i> Configurations
                                            </router-link>
                                        </li>
                                    </ul>
                                    <!-- Tab panes -->
                                    <div class="tab-content mx-3">
                                        <router-view></router-view>
                                    </div>
                                </div>
                            </div>
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
    name: "HospitalisationManageHome",

    mounted() {
        this.$store.dispatch("hospitalisation/viewAllDatas");
        this.$store.dispatch("services/showConfigs");
    },

    computed: {
        datas() {
            return this.$store.getters["hospitalisation/GET_ALL_DATAS"];
        },
    },
};
</script>
