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
                                        <a href="javascript:void(0)" class="btn btn-soft-primary"
                                            @click="$showBsModal('patientsPendingModal')">Voir patients en
                                            attente</a>
                                    </li>
                                    <li v-if="selectedPatient" class="breadcrumb-item"><a href="javascript: void(0);"
                                            @click.prevent="readCommand" class="btn btn-success text-white btn-border"> <i
                                                class="ri-phone-line"></i> Appeler
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
                                    <a class="nav-link d-flex flex-fill me-2 flex-column justify-content-center align-items-center active show "
                                        id="custom-v-pills-home-tab" data-bs-toggle="pill" href="#custom-v-pills-home"
                                        role="tab" aria-controls="custom-v-pills-home" aria-selected="true">
                                        <img src="assets/images/companies/patient_3.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;"> Patient
                                        infos
                                    </a>
                                    <a class="nav-link d-flex flex-fill me-2 flex-column justify-content-center align-items-center"
                                        id="custom-v-pills-profile-tab" data-bs-toggle="pill" href="#custom-v-pills-profile"
                                        role="tab" aria-controls="custom-v-pills-profile" aria-selected="false"
                                        :disabled="selectedPatient === null">
                                        <img src="assets/images/companies/consult.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Consultations
                                    </a>
                                    <a class="nav-link flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                                        id="custom-v-pills-messages-tab" data-bs-toggle="pill"
                                        href="#custom-v-pills-messages" role="tab" :disabled="selectedPatient === null"
                                        aria-controls="custom-v-pills-messages" aria-selected="false">
                                        <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> --> <img
                                            src="assets/images/companies/prescription2.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Prescriptions
                                    </a>
                                    <a class="nav-link flex-fill d-flex me-2 flex-column justify-content-center align-items-center"
                                        id="examens-tab" data-bs-toggle="pill" role="tab"
                                        :disabled="selectedPatient === null" aria-controls="examens-tab"
                                        aria-selected="false" href="#examens">
                                        <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> --> <img
                                            src="assets/images/companies/test-analysis.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Examens médicaux
                                    </a>

                                    <a class="nav-link d-flex flex-column justify-content-center align-items-center"
                                        id="custom-v-pills-messages-tab" data-bs-toggle="pill" role="tab" disabled
                                        aria-controls="custom-v-pills-messages" aria-selected="false">
                                        <!-- <i class="las la-file-alt  d-block fs-20 mb-1"></i> --> <img
                                            src="assets/images/companies/clipboard.png"
                                            class="d-block fs-20 mb-1 text-center" style="height: 40px;">
                                        Anciens dossiers
                                    </a>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="ribbon ribbon-success round-shape" v-if="currentConsult"> <i
                                        class="ri-stethoscope-line"></i> </div>
                                <div class="row">
                                    <!-- end col-->
                                    <div class="col-lg-12">
                                        <div class="tab-content text-muted mt-3 mt-lg-0">
                                            <div class="tab-pane fade active show" id="custom-v-pills-home" role="tabpanel"
                                                aria-labelledby="custom-v-pills-home-tab">
                                                <div>
                                                    <div class="d-flex justify-content-between mt-3 align-items-center align-content-center"
                                                        v-if="selectedPatient">
                                                        <h6 class="fs-14 text-primary fw-bold">Infos récentes
                                                            du
                                                            patient</h6>
                                                        <!-- <button class="btn btn-info btn-border btn-sm"> <i
                                                                class="ri-folder-5-line "></i> Voir le parcours du
                                                            patient</button> -->
                                                        <div class="d-flex align-content-end align-items-center"
                                                            v-if="selectedPatient">
                                                            <span class="me-1">N° Jeton :</span>
                                                            <span class="fw-bold text-primary fs-17">{{
                                                                selectedPatient.patient_code_appel }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="border-primary border-bottom-dashed mb-3"
                                                        v-if="selectedPatient">
                                                    </div>
                                                    <div class="row" v-if="selectedPatient">
                                                        <div class="col-md-6">
                                                            <div class="table-responsive">
                                                                <table class="table mb-0">
                                                                    <tbody class="text-black">
                                                                        <tr>
                                                                            <th scope="row" style="width: 200px;">Nom
                                                                                complet</th>
                                                                            <td>{{ selectedPatient.patient_nom }} {{
                                                                                selectedPatient.patient_prenom }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Sexe</th>
                                                                            <td>{{ selectedPatient.patient_sexe }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Téléphone</th>
                                                                            <td>{{ selectedPatient.patient_telephone }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Adresse</th>
                                                                            <td>{{ selectedPatient.patient_adresse }}
                                                                            </td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="table-responsive">
                                                                <table class="table mb-0">
                                                                    <tbody class="text-black">
                                                                        <tr>
                                                                            <th scope="row">Age</th>
                                                                            <td>{{
                                                                                selectedPatient.details[selectedPatient.details.length
                                                                                    - 1].patient_fiche_age }} ans</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Taille</th>
                                                                            <td>{{
                                                                                selectedPatient.details[selectedPatient.details.length
                                                                                    - 1].patient_fiche_taille }} {{
            selectedPatient.details[selectedPatient.details.length
                - 1].patient_fiche_taille_unite }}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th scope="row">Poids</th>
                                                                            <td>{{
                                                                                selectedPatient.details[selectedPatient.details.length
                                                                                    - 1].patient_fiche_poids }} {{
            selectedPatient.details[selectedPatient.details.length
                - 1].patient_fiche_poids_unite }}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th scope="row">Temperature</th>
                                                                            <td>{{
                                                                                selectedPatient.details[selectedPatient.details.length
                                                                                    - 1].patient_fiche_temperature }} {{
            selectedPatient.details[selectedPatient.details.length
                - 1].patient_fiche_temperature_unite }}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Tension arterielle</th>
                                                                            <td>{{
                                                                                selectedPatient.details[selectedPatient.details.length
                                                                                    - 1].patient_fiche_tension_art }} {{
            selectedPatient.details[selectedPatient.details.length
                - 1].patient_fiche_tension_art_unite }}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th scope="row">Fréquence cardiaque</th>
                                                                            <td>{{
                                                                                selectedPatient.details[selectedPatient.details.length
                                                                                    - 1].patient_fiche_freq_cardio }} {{
            selectedPatient.details[selectedPatient.details.length
                - 1].patient_fiche_freq_cardio_unite }}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <state-empty v-else title="Sélection patient !"
                                                        description="Veuillez sélectionner un patient dans la liste pour commencer la consultation !"></state-empty>
                                                </div>
                                            </div>
                                            <!--end tab-pane-->
                                            <div class="tab-pane fade" id="custom-v-pills-profile" role="tabpanel"
                                                aria-labelledby="custom-v-pills-profile-tab">
                                                <form class="row" @submit.prevent="submitFormConsult">
                                                    <div class="col-md-12 mt-2">
                                                        <label class="form-label text-dark">Motif
                                                            de la consultation
                                                            <sup class="text-danger">*</sup></label>
                                                        <div class="form-icon right">
                                                            <input type="text" class="form-control form-control-icon"
                                                                placeholder="Entrer le motif de la consultation..."
                                                                v-model="form_consult.libelle" required>
                                                            <i class="ri-edit-box-fill"></i>
                                                        </div>
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
                                                        <div class="row">
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
                                                                class-name="btn-success btn-border btn-label right nexttab nexttab "><i
                                                                    class="ri-check-double-line label-icon align-middle fs-16 ms-2 "></i>Soumettre
                                                                la
                                                                consultation</load-button>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                            <!--end tab-pane-->
                                            <div class="tab-pane fade" id="custom-v-pills-messages" role="tabpanel"
                                                aria-labelledby="custom-v-pills-messages-tab">
                                                <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Veuillez prescrire le
                                                    patient !</h6>
                                                <div class="border border-dashed"></div>

                                                <form @submit.prevent="submitFormPrescriptions">
                                                    <div class="row d-flex mt-2 p-2">
                                                        <div class="col-md-12">
                                                            <div class="input-group mb-1"
                                                                v-for="(p, index) in prescriptions" :key="index">
                                                                <input type="text" class="form-control form-control-icon"
                                                                    placeholder="Traitement..." style="width: 33%;"
                                                                    v-model="p.traitement" required>
                                                                <input type="text" class="form-control form-control-icon"
                                                                    placeholder="Posologie..." style="width: 33%;"
                                                                    v-model="p.posologie" required>
                                                                <select class="form-control" style="width: 120px;"
                                                                    v-model="p.traitement_type" required>
                                                                    <option selected label="Type..."></option>
                                                                    <option value="Comprimé">Comprimé</option>
                                                                    <option value="Injéctable">Injéctable</option>
                                                                    <option value="Cirop">Cirop</option>
                                                                    <option value="Rectale">Rectale</option>
                                                                    <option value="Dermique">Dermique</option>
                                                                </select>
                                                                <button class="btn btn-soft-secondary btn-icon"
                                                                    @click.prevent="prescriptions.push({ traitement: '', traitement_type: '', posologie: '', consult_id: '' })"><i
                                                                        class="ri-add-line"></i></button>
                                                                <!-- <button class="btn btn-soft-danger btn-icon"
                                                                    @click.prevent="prescriptions.splice(index, 1)"><i
                                                                        class="ri-close-line"></i></button> -->
                                                            </div>
                                                            <!-- <div>
                                                            <label class="form-label">Traitement
                                                            </label>
                                                            <div class="form-icon right">
                                                                <input type="text" class="form-control form-control-icon"
                                                                    placeholder="Traitement..." v-model="detail.title">
                                                                <i class="ri-health-book-line"></i>
                                                            </div>
                                                        </div> -->
                                                        </div>
                                                        <!-- <div class="col-md-5">
                                                        <div>
                                                            <label class="form-label">Posologie</label>
                                                            <div class="form-icon right">
                                                                <input type="text" class="form-control form-control-icon"
                                                                    placeholder="Entrer la valeur..."
                                                                    v-model="detail.value">
                                                                <i class="ri-health-book-line"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2 align-items-end">
                                                        <div>
                                                            <label class="form-label "
                                                                style="visibility: hidden;">Actions</label>
                                                            <div class="d-flex">
                                                                <button class="btn btn-outline-primary btn-icon me-1"
                                                                    @click.prevent="prescriptionDetails.push({ title: '', value: '' })"><i
                                                                        class="ri-add-line"></i></button>
                                                                <button class="btn btn-light btn-icon"
                                                                    @click.prevent="prescriptionDetails.splice(index, 1)"><i
                                                                        class="ri-close-line"></i></button>
                                                            </div>
                                                        </div>
                                                    </div> -->
                                                    </div>
                                                    <bs-toast id="errorsToast5" :msg="errors_msg" />
                                                    <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                                                        <button type="button"
                                                            class="btn btn-light btn-border btn-label right me-2"><i
                                                                class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                                            Annuler</button>

                                                        <load-button btn-type="submit" :loading="formLoadingPrescriptions"
                                                            class-name="btn-success btn-border btn-label right nexttab nexttab "><i
                                                                class="ri-check-double-line label-icon align-middle fs-16 ms-2 "></i>Valider
                                                            & imprimer
                                                            la prescription</load-button>
                                                    </div>
                                                </form>
                                            </div>
                                            <!--end tab-pane-->

                                            <!--end tab-pane-->
                                            <div class="tab-pane fade" id="examens" role="tabpanel"
                                                aria-labelledby="examens-tab">
                                                <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Veuillez sélectionner
                                                    les examens à prescrire au patient !</h6>
                                                <div class="border border-dashed"></div>

                                                <form @submit.prevent="submitFormExamens">
                                                    <div class="row mt-3 p-2">
                                                        <div class="form-check form-check-success col-md-3 mb-3"
                                                            v-for="(exam, index) in examens" :key="index">
                                                            <input class="form-check-input" type="checkbox"
                                                                @change="triggerSelectExamen($event, exam)"
                                                                :id="'checkList_' + index">
                                                            <label class="form-check-label text-dark fw-medium"
                                                                :for="'checkList_' + index">
                                                                {{ exam.examen_labo_libelle }}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <state-empty v-if="examens.length === 0"
                                                        title="Aucun informations répertorié !" :expanded="false"
                                                        description="Il y a aucun examen pour cet emplacement !"></state-empty>
                                                    <bs-toast id="errorsToastExamen" :msg="errors_msg" />
                                                    <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                                                        <button type="button"
                                                            class="btn btn-light btn-border btn-label right me-2"><i
                                                                class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                                            Annuler</button>

                                                        <load-button btn-type="submit" :loading="formLoadingExamens"
                                                            class-name="btn-success btn-border btn-label right nexttab nexttab "><i
                                                                class="ri-check-double-line label-icon align-middle fs-16 ms-2 "></i>Valider
                                                            & imprimer
                                                        </load-button>
                                                    </div>
                                                </form>
                                            </div>
                                            <!--end tab-pane-->
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
import ConsultMixins from '../../mixins/consult.mixins'
import patientsPendingModal from '../../modals/modal_patients_pending'
export default {
    name: "PatientAssign",
    components: {
        patientsPendingModal
    },
    mixins: [ConsultMixins],
}
</script>