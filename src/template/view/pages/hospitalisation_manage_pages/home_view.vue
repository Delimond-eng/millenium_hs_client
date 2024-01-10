<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Gestion des hospitalisation des patient<sup
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
                                    <ul class="nav nav-tabs mb-3" role="tablist">
                                        <li class="nav-item active show" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#home" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <i class="ri-hotel-bed-line"></i> Lits
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#hospitalisations" role="tab"
                                                aria-selected="true">
                                                <i class="ri-hospital-line me-1"></i>Hospitalisations
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#transferts" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <i class="ri-arrow-left-right-fill"></i> Transferts
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#facturations" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <i class="ri-file-2-line"></i> Facturations
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#settings" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <i class="ri-tools-fill"></i> Configurations
                                            </a>
                                        </li>
                                    </ul>
                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                        <bed-tab></bed-tab>
                                        <hospitalisation-tab></hospitalisation-tab>
                                        <transferts-tab></transferts-tab>
                                        <facturation-tab></facturation-tab>
                                        <setting-tab></setting-tab>
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
import BedTab from "./tabs/beds_tab"
import FacturationTab from "./tabs/facturation_tab"
import HospitalisationTab from "./tabs/hospitalisations_tab"
import TransfertTab from "./tabs/transferts_tab"
import SettingTab from "./tabs/config_tab"
export default {
    name: 'HospitalisationManageHome',
    components: {
        BedTab,
        FacturationTab,
        HospitalisationTab,
        TransfertTab,
        SettingTab
    }
}
</script>