<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Création patient</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="#/home/patients/list"
                                            class="btn btn-info btn-border btn-sm text-white"><i
                                                class="ri-list-check-2"></i> Voir la
                                            liste des patients</a></li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">Veuillez remplir tous les champs requis !</h4>
                                <!-- <div class="mx-4 flex-grow-1">
                                    <load-state :processing="searchLoading" :size="30">
                                        <select class="patient-select2" name="state">
                                            <option></option>
                                        </select>
                                    </load-state>
                                </div> -->
                            </div>
                            <form class="card-body" @submit.prevent="submitForm">

                                <div class="border border-dashed border-primary mb-3"></div>
                                <div class="row">

                                    <!-- patient code input -->
                                    <div class="col-xxl-2 col-md-2">
                                        <div>
                                            <label for="patientCode" class="form-label">Patient code</label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="patientCode"
                                                    v-model="pcode" disabled>
                                                <i class="bx bx-hash"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xxl-2 col-md-2">
                                        <div>
                                            <label for="appelCode" class="form-label">Code appel <sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="appelCode"
                                                    v-model="form.code_appel" required>
                                                <i class="bx bx-hash"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- nom input -->
                                    <div class="col-md-4">
                                        <div>
                                            <label class="form-label">Nom <sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" v-model="form.nom" class="form-control form-control-icon"
                                                    placeholder="Saisir le nom du patient...ex:KAYEMBE" required
                                                    :readonly="form.patient_id !== ''">
                                                <i class="ri-user-2-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- prenom input -->
                                    <div class="col-md-4">
                                        <div>
                                            <label class="form-label">Prénom <sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" v-model="form.prenom"
                                                    class="form-control form-control-icon"
                                                    placeholder="Saisir le prénom du patient...ex:Lionnel" required
                                                    :readonly="form.patient_id !== ''">
                                                <i class="ri-user-2-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- patient sexe select -->
                                    <div class="col-md-4">
                                        <div class="mt-3">
                                            <label class="form-label">Sexe <sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <select class="form-select" id="inputGroupSelect01" v-model="form.sexe"
                                                    :readonly="form.patient_id !== ''">
                                                    <option selected label="Sélectionner un sexe"></option>
                                                    <option value="M">Masculin</option>
                                                    <option value="F">Féminin</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- telephone input -->
                                    <div class="col-md-4">
                                        <div class="mt-3">
                                            <label class="form-label">Téléphone<sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" v-model="form.telephone"
                                                    class="form-control form-control-icon"
                                                    placeholder="Saisir le tél... ex: +(243) 810000000"
                                                    :readonly="form.patient_id !== ''">
                                                <i class="ri-phone-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- sate naissance input -->
                                    <div class="col-md-4">
                                        <div class="mt-3">
                                            <label class="form-label">Date de naissance<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="date" v-model="form.datenais"
                                                    class="form-control form-control-icon" required
                                                    :readonly="form.patient_id !== ''">
                                                <i class="ri-phone-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- adresse input -->
                                    <div class="col-md-12">
                                        <div class="mt-3">
                                            <label class="form-label">Adresse<sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" v-model="form.adresse"
                                                    class="form-control form-control-icon"
                                                    placeholder="Saisir l'adresse du patient... ex: n°..... av..... Q..... C....."
                                                    required :readonly="form.patient_id !== ''">
                                                <i class="ri-map-pin-5-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h6 class="fs-14 text-start mb-2 mt-4 text-primary">Infos médicales
                                </h6>
                                <div class="border border-dashed border-primary"></div>
                                <div class="row">
                                    <!-- patient poids input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label class="form-label">Poids<sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="number" v-model="form_details.poids"
                                                    class="form-control form-control-icon"
                                                    placeholder="Saisir le poids... ex: 63.3" required>
                                                <i class="ri-scales-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Temperature input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label class="form-label">Temperature<sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="number" v-model="form_details.temperature"
                                                    class="form-control form-control-icon rounded-end-0"
                                                    placeholder="Saisir le T°... ex: 34.5" required>
                                                <i class="ri-contrast-drop-2-line "></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- taille input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label class="form-label">Taille<sup class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" v-model="form_details.taille"
                                                    class="form-control form-control-icon"
                                                    placeholder="Saisir la taille... ex: 170" required>
                                                <i class=" ri-ruler-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- tension arterielle input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label class="form-label">Tension arterielle<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" v-model="form_details.tension_art"
                                                    class="form-control form-control-icon"
                                                    placeholder="tension arterielle..." required>
                                                <i class="bx bx-pulse"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- frequence cardio input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label class="form-label">Fréquence cardiaque<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" v-model="form_details.freq_cardio"
                                                    class="form-control form-control-icon"
                                                    placeholder="Fréquence cardiaque..." required>
                                                <i class="bx bx-pulse"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <bs-toast id="errorsToast" :msg="errors_msg" />

                                <div div class=" d-flex align-items-end justify-content-end mt-4"
                                    v-if="$user().agent_id !== 0">
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn-success btn-border btn-label right nexttab nexttab me-2">
                                        <span><i
                                                class="ri-check-double-fill label-icon align-middle fs-16 ms-2"></i>Enregistrer</span>
                                    </load-button>
                                    <button type="button" class="btn btn-light btn-border  btn-label right"
                                        @click.prevent="cleanField"><i
                                            class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                        Annuler</button>
                                </div>
                            </form>
                        </div>
                    </div> <!-- end col -->
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
            <div class="btn-info text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$router.push('/home/patients/list')">
                <i class="ri-list-check-2 fs-22"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { calculateAge } from "@/utils"
export default {
    name: "PatientCreate",
    data() {
        return {
            form: {
                code: "",
                code_appel: "",
                nom: "",
                prenom: "",
                sexe: "",
                telephone: "",
                adresse: "",
                datenais: "",
                patient_id: "",
                created_by: "",
                patient_details: {},
            },
            form_details: {
                poids: "",
                taille: "",
                temperature: "",
                tension_art: "",
                freq_cardio: "",
                age: ""
            },
            formLoading: false,
            isOld: false,
            selectPatient: null,
            searchLoading: false,
            errors_msg: '',
        }
    },

    methods: {

        /**
         * SUBMIT FORM DATA TO SERVER
        */
        submitForm(e) {
            let age = calculateAge(this.form.datenais);
            this.form_details.age = age;
            this.form.code = this.pcode;
            this.form.patient_details = this.form_details;

            /**
             * @var $user Global fonction retourne l'utilisateur courant
            */
            this.form.created_by = this.$user().agent_id;
            this.formLoading = true;

            if (this.form.created_by === 0) {
                return;
            }
            this.$store.dispatch('services/createPatient', this.form).then((res) => {
                console.log(JSON.stringify(res));
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Patient créé avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('services/viewAllPatients');
                    this.cleanField();
                    this.loadPatientsList();
                }
                if (res.errors !== undefined) {
                    console.log(JSON.stringify(res));
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("errorsToast")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },


        /**
         * SHOW SELECTED PATIENTS
        */
        loadCachedPatient() {
            this.$nextTick(() => {
                let patient = JSON.parse(localStorage.getItem('current-patient'));
                if (patient !== null && patient !== undefined) {
                    this.$store.commit('services/SET_CODE', patient.patient_code);
                    this.form.code = patient.patient_code;
                    this.form.nom = patient.patient_nom;
                    this.form.prenom = patient.patient_prenom;
                    this.form.sexe = patient.patient_sexe;
                    this.form.adresse = patient.patient_adresse;
                    this.form.datenais = patient.patient_datenais;
                    this.form.patient_id = patient.id;
                    this.form.telephone = patient.patient_telephone;
                } else {
                    this.$store.dispatch('services/showCode');
                }
            });
        },

        async loadPatientsList() {
            let self = this;
            let patients = await this.$store.dispatch('services/viewAllPatients');
            /**
             * DESTROY AND SELECT PATIENTS
            */
            if (this.selectPatient !== null) this.selectPatient.select2('destroy');
            this.selectPatient = $(".patient-select2").select2({
                placeholder: 'Veuillez sélectionner un patient...',
                data: $.map(patients, function (item) {
                    return {
                        text: `${item.patient_code} : ${item.patient_nom} ${item.patient_prenom}`,
                        id: item.id
                    }
                })
            }).on('change', function () {
                let id = $(this).val();
                if (id !== "") {
                    self.searchLoading = true;
                    self.$store.dispatch('services/showPatient', id).then((patient) => {
                        self.searchLoading = false;
                        /**
                         * SHOW PATIENT DATA
                        */
                        if (patient !== null) {
                            self.$store.commit('services/SET_CODE', patient.patient_code);
                            self.form.code = patient.patient_code;
                            self.form.nom = patient.patient_nom;
                            self.form.prenom = patient.patient_prenom;
                            self.form.sexe = patient.patient_sexe;
                            self.form.adresse = patient.patient_adresse;
                            self.form.datenais = patient.patient_datenais;
                            self.form.patient_id = patient.id;
                            self.form.telephone = patient.patient_telephone;
                        }
                        else {
                            self.cleanField();
                        }
                    });
                }
            });
        },



        cleanField() {
            this.form.patient_id = "";
            this.form.code = "";
            this.form.code_appel = "";
            this.form.nom = "";
            this.form.prenom = "";
            this.form.sexe = "";
            this.form.adresse = "";
            this.form.datenais = "";
            this.form.patient_id = "";
            this.form.telephone = "";
            this.form_details.poids = "";
            this.form_details.taille = "";
            this.form_details.temperature = "";
            this.form_details.tension_art = "";
            this.form_details.freq_cardio = "";

            this.$store.dispatch('services/showCode');
            $(".patient-select2").val('').trigger('change');

        }
    },

    unmounted() {
        if (this.selectPatient !== null) this.selectPatient.select2('destroy');
        /**
         * renitialise les données dans le cache !
        */
        localStorage.removeItem('current-patient');
    },

    async mounted() {

        /* $(".patient-select2").select2({ placeholder: 'chargement des patients...' }); */
        this.loadCachedPatient();
        //await this.loadPatientsList();
    },

    computed: {
        pcode() {
            return this.$store.getters['services/GET_CODE'];
        }
    },
}
</script>