<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Consultation</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="me-2" v-if="!selectedPatient">
                                        <a href="javascript:void(0)" class="btn btn-secondary"
                                            @click="$showBsModal('patientsPendingModal')"> <i class="ri-refresh-line"></i>
                                            Voir patients en
                                            attente</a>
                                    </li>
                                    <li v-if="selectedPatient" class="breadcrumb-item"><a href="javascript: void(0);"
                                            @click.prevent="readCommand" class="btn btn-secondary text-white btn-border"> <i
                                                class="ri-user-voice-line"></i> Appeler
                                            le patient</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card ribbon-box right">
                            <div class="card-header">
                                <div class="nav nav-pills nav-pills-tab custom-verti-nav-pills text-center" role="tablist"
                                    aria-orientation="vertical">
                                    <button
                                        class="nav-link d-flex flex-fill me-2 flex-column justify-content-center align-items-center show"
                                        :class="selectedPatient != null ? 'active' : ''" id="custom-v-pills-home-tab"
                                        data-bs-toggle="pill" href="#custom-v-pills-home" role="tab"
                                        aria-controls="custom-v-pills-home" aria-selected="true">
                                        <img src="assets/images/companies/patient_3.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;"> Patient
                                        infos
                                    </button>
                                    <button
                                        class="nav-link d-flex flex-fill me-2 flex-column justify-content-center align-items-center"
                                        id="consultations-tab" data-bs-toggle="pill" href="#custom-v-pills-profile"
                                        role="tab" aria-controls="custom-v-pills-profile" aria-selected="false"
                                        :disabled="selectedPatient === null">
                                        <img src="assets/images/companies/consult.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Consultations
                                    </button>
                                    <button
                                        class="nav-link flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                                        id="prescriptions-tab" data-bs-toggle="pill" href="#custom-v-pills-messages"
                                        role="tab" :disabled="selectedPatient === null"
                                        aria-controls="custom-v-pills-messages" aria-selected="false">
                                        <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> --> <img
                                            src="assets/images/companies/prescription2.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Prescriptions
                                    </button>
                                    <button
                                        class="nav-link flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                                        id="examens-tab" data-bs-toggle="pill" role="tab"
                                        :disabled="selectedPatient === null" aria-controls="examens-tab"
                                        aria-selected="false" href="#examens">
                                        <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> --> <img
                                            src="assets/images/companies/test-analysis.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Examens médicaux
                                    </button>

                                    <button
                                        class="nav-link flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                                        id="schedules-tab" data-bs-toggle="pill" role="tab"
                                        :disabled="selectedPatient === null" aria-controls="schedule-tab"
                                        aria-selected="false" href="#schedules">
                                        <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> --> <img
                                            src="assets/images/companies/schedule.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Prochain rendez-vous
                                    </button>

                                    <button
                                        class="nav-link flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                                        id="docs-btn" @click="loadDoc" :disabled="docLoading">
                                        <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> --> <img
                                            src="assets/images/companies/doc3.png" class="d-block fs-20 mb-1 text-center"
                                            style="height: 40px;">
                                        <span v-if="!docLoading">Dossier médical</span>
                                        <svg-loading v-else color="#000000"></svg-loading>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="ribbon ribbon-success round-shape" v-if="currentConsult"> <i
                                        class="ri-stethoscope-line"></i> </div>
                                <div class="row">
                                    <!-- end col-->
                                    <div class="col-lg-12">
                                        <div class="tab-content text-muted mt-3 mt-lg-0">
                                            <tab-infos :selected-patient="selectedPatient"></tab-infos>
                                            <!--end tab-pane-->


                                            <div class="tab-pane fade" id="custom-v-pills-profile" role="tabpanel"
                                                aria-labelledby="custom-v-pills-profile-tab">
                                                <form class="row" @submit.prevent="submitFormConsult">
                                                    <div class="col-md-12 mt-2">
                                                        <label class="form-label text-dark">Motif
                                                            de la consultation
                                                            <sup class="text-danger">*</sup></label>
                                                        <textarea class="form-control form-control-icon"
                                                            placeholder="Entrer le motif de la consultation..."
                                                            v-model="form_consult.libelle" required></textarea>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Les
                                                                    symptômes
                                                                </h6>
                                                                <div class="border border-dashed mb-2"></div>
                                                                <div class="input-group mb-2"
                                                                    v-for="(s, index) in symptomes" :key="index">
                                                                    <input type="text" class="form-control"
                                                                        v-model="s.libelle"
                                                                        placeholder="entrer symptôme...">
                                                                    <button class="btn btn-outline-secondary"
                                                                        @click.prevent="symptomes.push({ libelle: '' })"
                                                                        type="button"><i class="ri-add-line"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <div class="row text-dark">
                                                            <div class="col-md-12">
                                                                <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Les
                                                                    antécedents
                                                                </h6>
                                                                <div class="border border-dashed"></div>
                                                                <div class="row mt-2">
                                                                    <div class="col-md-12 mb-1"
                                                                        v-for="(detail, index) in consult_details"
                                                                        :key="index">
                                                                        <label class="form-label">{{ detail.detail_libelle
                                                                        }}
                                                                            <sup class="text-danger">(optionnel)</sup>
                                                                        </label>
                                                                        <textarea class="form-control"
                                                                            v-model="detail.detail_valeur"
                                                                            :placeholder="detail.detail_libelle.toLowerCase() + '...'"></textarea>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12 mt-2">
                                                        <label class="form-label text-dark">Diagnostic
                                                            <sup class="text-danger">*</sup></label>
                                                        <!-- wizard editor -->
                                                        <textarea class="form-control"
                                                            placeholder="Saisir votre diagnostic..."
                                                            v-model="form_consult.diagnostic" required></textarea>
                                                    </div>
                                                    <div class="col-md-12 mt-2">
                                                        <bs-toast id="errorsToast4" :msg="errors_msg" />
                                                        <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                                                            <button type="button"
                                                                class="btn btn-light btn-border btn-label right me-2"><i
                                                                    class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                                                Annuler</button>
                                                            <load-button btn-type="submit" :loading="formLoading"
                                                                class-name="btn-success btn-border btn-label right nexttab nexttab ">Soumettre
                                                                & continuer <i
                                                                    class="ri-arrow-right-line label-icon align-middle fs-16 ms-2 "></i></load-button>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>

                                            <!-- prescription tab -->
                                            <prescriptions-tab :current-consult="currentConsult"></prescriptions-tab>
                                            <!--end tab-pane-->

                                            <!-- examen tab -->
                                            <examens-tab :current-consult="currentConsult"
                                                :selected-patient="selectedPatient"></examens-tab>
                                            <!--end tab-pane-->


                                            <!-- schedules tab -->
                                            <schedules-tab :current-consult="currentConsult"
                                                :selected-patient="selectedPatient"></schedules-tab>
                                        </div>
                                    </div> <!-- end col-->
                                </div> <!-- end row-->
                            </div><!-- end card-body -->
                        </div>
                        <!--end card-->
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

        <div class="customizer-setting d-block">
            <div class="btn-info text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2" @click.prevent="refreshAll">
                <i class="ri-refresh-line fs-22"></i>
            </div>
        </div>
    </div>
    <patients-pending-modal @on-select="selectedPatient = $event" />
</template>

<script>
//Tabs IMPORTS
import TabInfos from './tabs/infos_tab';
import PrescriptionsTab from './tabs/prescriptions_tab';
import ExamensTab from './tabs/examens_tab';
import SchedulesTab from './tabs/schedules_tab';
//END Tabs

import ConsultMixins from '../../mixins/consult.mixins'
import patientsPendingModal from '../../modals/modal_patients_pending'
export default {
    name: "PatientAssign",
    components: {
        patientsPendingModal,
        TabInfos,
        PrescriptionsTab,
        ExamensTab,
        SchedulesTab
    },
    mixins: [ConsultMixins],
    data() {
        return {
            docLoading: false,
        }
    },

    methods: {
        loadDoc() {
            if (this.selectedPatient === null) {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    text: 'Veuillez sélectionnez un patient pour afficher son dossier médical !',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    showCloseButton: false,
                });
                return;
            }
            this.docLoading = true;
            this.$store.dispatch('services/viewPatientDoc', this.selectedPatient.id).then((res) => {
                this.docLoading = false
                this.$router.push({ name: 'patient-docs' });
            });
        }
    },
}
</script>