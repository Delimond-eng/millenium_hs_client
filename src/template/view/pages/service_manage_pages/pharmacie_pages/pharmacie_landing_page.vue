<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Gestion pharmacies<sup class="text-danger text-lowercase fw-normal"></sup>
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3" v-for="(pharma, index) in pharmacies" :key="index">
                        <div class="card card-height-100 card-animate cursor-pointer">
                            <div class="card-body">
                                <div class="dropdown float-end">
                                    <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="Javascript:void(0)"
                                            @click.prevent="selectedPharmacie = pharma; $showBsModal('pharmacieCreateModal');"><i
                                                class="ri-edit-2-line text-secondary me-2"></i> Editer</a>
                                        <a class="dropdown-item" href="Javascript:void(0)"><i
                                                class="ri-delete-bin-line text-danger me-2"></i>Supprimer</a>
                                        <a class="dropdown-item" href="Javascript:void(0)"><i
                                                class="ri-arrow-right-double-line text-info me-2"></i>Entrer</a>
                                    </div>
                                </div>
                                <div class="mb-4 pb-2">
                                    <img src="assets/images/companies/pharmacie-2.png" alt="" class="avatar-sm">
                                </div>
                                <a href="javascript:void(0)">
                                    <h6 class="fs-15 fw-semibold">{{ pharma.pharmacie_nom }}</h6>
                                </a>
                                <p class="text-muted mb-0">
                                    <span class="fs-12"><i class="ri-phone-find-line align-bottom"></i>
                                        {{ pharma.pharmacie_telephone }}
                                    </span><br>
                                    <span class="text-secondary fs-10"><i class="ri-map-pin-2-line align-bottom"></i>
                                        {{ pharma.pharmacie_adresse }} -> <strong v-if="pharma.emplacement">{{
                                            pharma.emplacement.hopital_emplacement_libelle }}</strong>
                                    </span>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row" v-if="pharmacies.length === 0">
                    <div class="col-md-12">
                        <state-empty title="Aucune pharmacie trouvé!"
                            description="Veuillez créer des pharmacies pour cet établissement !"></state-empty>
                    </div>
                </div>
                <!-- end page title -->
                <!-- <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">Création services</h4>
                            </div>
                            <form @submit.prevent="submitForm" class="card-body">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class=" col-md-6">
                                                <div>
                                                    <label class="form-label">Libellé service <sup
                                                            class="text-danger">*</sup> </label>
                                                    <div class="form-icon">
                                                        <input type="text" class="form-control form-control-icon"
                                                            placeholder="Entrer le libellé service..."
                                                            v-model="form.libelle" required>
                                                        <i class="ri-arrow-left-right-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div>
                                                    <label for="iconInputNom" class="form-label">Emplacement <sup
                                                            class="text-danger">*</sup></label>
                                                    <select class="form-select" v-model="form.emplacement_id">
                                                        <option label="Sélectionner un emplacement..."></option>
                                                        <option v-for="(item, index) in configs.emplacements" :key="index"
                                                            :value="item.id">{{
                                                                item.hopital_emplacement_libelle }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mt-3">
                                                    <label for="iconInputNom" class="form-label">Description <sup
                                                            class="text-danger">*</sup></label>
                                                    <textarea class="form-control" v-model="form.description"
                                                        placeholder="Entrer une description..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <bs-toast id="errorsToastError4" :msg="errors_msg" />
                                <div class="d-flex align-items-end justify-content-end mt-4">
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn-success btn-border btn-label right nexttab nexttab me-2">
                                        <span><i
                                                class="ri-check-double-fill label-icon align-middle fs-16 ms-2"></i>Enregistrer</span>
                                    </load-button>
                                    <button type="button" @click.prevent="cleanField"
                                        class="btn btn-light btn-border btn-label right"><i
                                            class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                        Annuler</button>
                                </div>
                            </form>
                        </div>
                        <state-empty title="Aucune pharmacie trouvé!"
                            description="Veuillez créer des pharmacies pour cet établissement !"></state-empty>
                    </div>
                </div> -->
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
        <div class="customizer-setting d-block">
            <div class="btn-success text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$showBsModal('pharmacieCreateModal')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
    <pharmacie-create-modal :pharmacie="selectedPharmacie" />
</template>

<script>
import pharmacieCreateModal from '../../../modals/modal_create_pharmacie'
export default {
    name: 'PharmacieLandingPage',
    data() {
        return {
            selectedPharmacie: null,
        }
    },
    components: {
        pharmacieCreateModal
    },
    mounted() {
        this.$store.dispatch('services/viewAllPharmacies')
    },

    computed: {
        pharmacies() {
            return this.$store.getters['services/GET_PHARMAS']
        }
    },
}
</script>