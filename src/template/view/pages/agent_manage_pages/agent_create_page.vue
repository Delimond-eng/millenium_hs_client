<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Création agent <sup class="text-danger text-lowercase fw-normal">(médecin,
                                    infirmier,laborantin...)</sup></h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">

                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">Création agent</h4>

                                <div class="flex-shrink-0">
                                    <div class="form-check form-switch form-switch-right form-switch-md">
                                        <label for="allow_account" class="form-label text-muted">Créer agent avec un compte
                                            utilisateur ?</label>
                                        <input class="form-check-input code-switcher" type="checkbox" id="allow_account"
                                            @change="user_account_allowed = $event.target.checked">
                                    </div>
                                </div>
                            </div>
                            <form @submit.prevent="submitForm" class="card-body">
                                <div class="row d-flex justify-content-center">
                                    <!-- agent personals infos -->
                                    <div class="col-md-8">
                                        <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Infos personnelles</h6>
                                        <div class="border border-dashed border-primary mb-2"></div>
                                        <div class="row">
                                            <div class=" col-md-6">
                                                <div>
                                                    <label class="form-label">Matricule</label>
                                                    <div class="form-icon">
                                                        <input type="text" class="form-control form-control-icon"
                                                            placeholder="n° matricule ..." v-model="form.matricule"
                                                            required>
                                                        <i class="bx bx-hash"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div>
                                                    <label for="iconInputNom" class="form-label">Nom <sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <input type="text" class="form-control form-control-icon"
                                                            id="iconInputNom" placeholder="Saisir le nom...ex:Gaston"
                                                            v-model="form.nom" required>
                                                        <i class="ri-user-3-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputNom" class="form-label">Prénom <sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <input type="text" class="form-control form-control-icon"
                                                            id="iconInputNom" placeholder="Saisir le prénom..."
                                                            v-model="form.prenom">
                                                        <i class=" ri-user-3-line "></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- patient sexe select -->
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputPoids" class="form-label">Sexe <sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <select class="form-select" id="inputGroupSelect01"
                                                            v-model="form.sexe" required>
                                                            <option selected label="Sélectionner un sexe"></option>
                                                            <option value="M">Masculin</option>
                                                            <option value="F">Féminin</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- telephone input -->
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputNom" class="form-label">Téléphone<sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <input type="text" class="form-control form-control-icon"
                                                            id="iconInputNom"
                                                            placeholder="Saisir le tél... ex: +(243) 810000000"
                                                            v-model="form.telephone" required>
                                                        <i class="ri-phone-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- date naissance input -->
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputNom" class="form-label">Date de naissance<sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <input type="date" class="form-control form-control-icon"
                                                            id="iconInputNom"
                                                            placeholder="Saisir le tél... ex: +(243) 810000000"
                                                            v-model="form.datenais" required>
                                                        <i class="ri-calendar-2-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- adresse input -->
                                            <div class="col-md-12">
                                                <div class="mt-3">
                                                    <label for="iconInputNom" class="form-label">Adresse<sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <input type="text" class="form-control form-control-icon"
                                                            id="iconInputNom" v-model="form.adresse"
                                                            placeholder="Saisir l'adresse ...... ex: N°/ av. / Q. /C"
                                                            required>
                                                        <i class="ri-map-pin-5-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- spécialité -->
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputPoids" class="form-label">Spécialité <sup
                                                            class="text-danger">(optionnelle)</sup></label>
                                                    <div class="form-icon">
                                                        <select class="specSelect" id="inputGroupSelect01">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>



                                            <!-- grade -->
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputPoids" class="form-label">Grade <sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <select class="form-select" id="inputGroupSelect01"
                                                            v-model="form.grade_id" required>
                                                            <option selected label="Sélectionner un grade"></option>
                                                            <option v-for="(item, index) in configs.grades" :key="index"
                                                                :value="item.id">{{ item.grade_libelle }}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- service -->
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputPoids" class="form-label">Service <sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <select class="form-select" id="inputGroupSelect01"
                                                            v-model="form.service_id" required>
                                                            <option selected label="Sélectionner un service"></option>
                                                            <option v-for="(item, index) in configs.services" :key="index"
                                                                :value="item.id">{{ item.service_libelle }}</option>

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- fonction -->
                                            <div class="col-md-6">
                                                <div class="mt-3">
                                                    <label for="iconInputPoids" class="form-label">Fonction <sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <select class="form-select" id="inputGroupSelect01"
                                                            v-model="form.fonction_id" required>
                                                            <option selected label="Sélectionner une fonction"></option>
                                                            <option v-for="(item, index) in configs.fonctions" :key="index"
                                                                :value="item.id">{{ item.fonction_libelle }}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mt-3">
                                                    <label for="iconInputLocation" class="form-label">Emplacement <sup
                                                            class="text-danger">*</sup></label>
                                                    <div class="form-icon">
                                                        <select class="form-select" id="iconInputLocation"
                                                            v-model="form.emplacement_id" required>
                                                            <option selected label="Sélectionner un emplacement...">
                                                            </option>
                                                            <option v-for="(item, index) in configs.emplacements"
                                                                :key="index" :value="item.id">{{
                                                                    item.hopital_emplacement_libelle }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- account infos -->
                                    <div class="col-md-4">
                                        <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Infos compte utilisateur <sup
                                                class="text-danger">(Optionnelle)</sup></h6>
                                        <div class="border border-dashed border-primary mb-2"></div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div>
                                                    <label class="form-label">Rôle utilisateur<sup
                                                            class="text-danger">*</sup></label>
                                                    <select class="form-select" v-model="form_user.role_id"
                                                        :disabled="!user_account_allowed" :required="user_account_allowed">
                                                        <option selected label="Sélectionnez un rôle..."></option>
                                                        <option v-for="(item, index) in configs.roles" :key="index"
                                                            :value="item.id">{{ item.role }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mt-3">
                                                    <label class="form-label">Email</label>
                                                    <div class="form-icon">
                                                        <input type="email" class="form-control form-control-icon"
                                                            placeholder="Saisir l'email de l'agent..."
                                                            v-model="form_user.email" :disabled="!user_account_allowed"
                                                            :required="user_account_allowed">
                                                        <i class="ri-mail-settings-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="mt-3">
                                                    <label class="form-label">Mot de passe </label>
                                                    <div class="form-icon">
                                                        <input type="password" class="form-control form-control-icon"
                                                            placeholder="Saisir le mot de passe"
                                                            v-model="form_user.password" :disabled="!user_account_allowed"
                                                            :required="user_account_allowed">
                                                        <i class="ri-lock-password-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="mt-3">
                                                    <label class="form-label">Confirmation </label>
                                                    <div class="form-icon">
                                                        <input type="password" class="form-control form-control-icon"
                                                            placeholder="Confirmer le mot de passe "
                                                            v-model="form_user.confirm"
                                                            :required="user_account_allowed && form_user.password !== form_user.confirm"
                                                            :disabled="!user_account_allowed">
                                                        <i class="ri-lock-password-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-2" v-show="user_account_allowed">
                                            <div class="col-lg-12">
                                                <div>
                                                    <label class="fs-14 mb-2 text-dark">Menus accessibles <sup
                                                            class="text-danger">*</sup></label>
                                                    <select :required="user_account_allowed" multiple="multiple"
                                                        style="width:100%" name="menus-select" id="multiselect-basic">
                                                        <option selected>Tableau de bord</option>
                                                        <option>Patients</option>
                                                        <option>Agents</option>
                                                        <option>Consultations</option>
                                                        <option>Configurations</option>
                                                        <option>Comptes utilisateurs</option>
                                                        <option>Services</option>
                                                        <option>Pharmacies</option>
                                                        <option>Laboratoires</option>
                                                        <option>Maternités</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- end col -->

                                        </div>
                                    </div>
                                </div>
                                <bs-toast id="errorsToast2" :msg="errors_msg" />
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
                @click.prevent="$router.push('/home/meds/list')">
                <i class="ri-list-check-2 fs-22"></i>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'MedecinCreate',
    data() {
        return {
            specSelect: null,
            errors_msg: '',
            formLoading: false,
            form: {
                matricule: '',
                nom: '',
                prenom: '',
                sexe: '',
                telephone: '',
                adresse: '',
                specialite: '',
                datenais: '',
                fonction_id: '',
                grade_id: '',
                service_id: '',
                created_by: '',
                emplacement_id: '',
                user_data: {}
            },
            user_account_allowed: false,
            form_user: {
                role_id: '',
                password: '',
                email: '',
                confirm: '',
                menus: ''
            },

        }
    },
    mounted() {
        this.$store.dispatch('services/showConfigs');
        this.init();
    },

    unmounted() {
        this.specSelect.select2('destroy');
    },

    methods: {
        init() {
            let self = this;
            /* specialites init select2 */
            this.specSelect = $('.specSelect').select2({
                placeholder: 'Sélectionnez une spécialité...',
                data: [
                    'Allergologie',
                    'Anesthésiologie',
                    'Cardiologie',
                    'Chirurgie cardiaque',
                    'Chirurgie générale',
                    'Chirurgie orthopédique',
                    'Dermatologie',
                    'Endocrinologie',
                    'Gastro-entérologie',
                    'Gynécologie',
                    'Hématologie',
                    'Médecine interne',
                    'Néphrologie',
                    'Neurologie',
                    'Ophtalmologie',
                    'Oto-rhino-laryngologie (ORL)',
                    'Pédiatrie',
                    'Pneumologie',
                    'Psychiatrie',
                    'Radiologie',
                    'Rhumatologie',
                    'Urologie',
                    'Anatomie pathologique',
                    'Andrologie',
                    'Cancérologie',
                    'Chirurgie plastique',
                    'Chirurgie vasculaire',
                    'Diabétologie',
                    'Endodontie',
                    'Gériatrie',
                    'Hépatologie',
                    'Immunologie',
                    'Médecine du sport',
                    'Médecine légale',
                    'Médecine nucléaire',
                    'Néonatologie',
                    'Oncologie pédiatrique',
                    'Parodontie',
                    'Pathologie clinique',
                    'Podologie',
                    'Proctologie',
                    'Sexologie',
                    'Toxicologie',
                    'Virologie',
                    'Addictologie',
                    'Biologie médicale',
                    'Chirurgie maxillo-faciale',
                    'Génétique médicale',
                    'Médecine d\'urgence',
                    'Médecine physique et de réadaptation',
                    'Néphrologie pédiatrique',
                    'Orthophonie',
                    'Pédopsychiatrie',
                    'Réanimation médicale',
                    'Santé publique',
                    'Traumatologie',
                    'Chirurgie thoracique',
                    'Dentisterie conservatrice',
                    'Hématologie clinique',
                    'Médecine esthétique',
                    'Médecine interne pédiatrique',
                    'Néphrologie pédiatrique',
                    'Orthoptie',
                    'Périnatalogie',
                ]
            }).on('change', function () {
                let specialite = $(this).val();
                self.form.specialite = specialite;
            });


            let multiSelectBasic = document.getElementById("multiselect-basic");
            if (multiSelectBasic) {
                multi(multiSelectBasic, {
                    enable_search: false,
                });
            } else {
                console.error("L'élément avec l'ID multiselect-basic n'a pas été trouvé.");
            }
        },


        getSelectedMenus() {
            let multiSelectElement = document.getElementById("multiselect-basic");

            // Obtenez tous les éléments sélectionnés
            let selectedOptions = Array.from(multiSelectElement.selectedOptions).map(option => option.value);
            // Affiche les éléments sélectionnés
            console.log(selectedOptions);
        },

        /**
         * SUBMIT FORM DATA
        */
        submitForm(e) {
            this.formLoading = true;
            if (this.user_account_allowed) {
                let multiSelectElement = document.getElementById("multiselect-basic");
                let selectedOptions = Array.from(multiSelectElement.selectedOptions).map(option => option.value);
                this.form_user.menus = selectedOptions.toString();
                this.form.user_data = this.form_user
            };
            this.form.created_by = this.$user().agent_id;
            this.$store.dispatch('services/createAgent', this.form).then((res) => {
                console.log(JSON.stringify(res));
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "Agent créé avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.cleanField();
                }
                if (res.errors !== undefined) {
                    console.log(JSON.stringify(res));
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("errorsToast2")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },

        cleanField() {
            this.form.matricule = '';
            this.form.nom = '';
            this.form.prenom = '';
            this.form.sexe = '';
            this.form.telephone = '';
            this.form.adresse = '';
            this.form.specialite = '';
            this.form.datenais = ''
            this.form.fonction_id = '';
            this.form.grade_id = '';
            this.form.service_id = '';
            this.form.emplacement_id = '';
            this.form.created_by = '';
            this.form_user.role_id = '';
            this.form_user.password = '';
            this.form_user.email = '';
            this.form_user.confirm = '';
            $(".specSelect").val('').trigger('change');
        },

        testPermission() {
            let permission = this.$hasPermission('docteur');
            console.log(permission);
        }
    },



    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
        user() {
            return this.$store.getters['auth/GET_USER']
        },
    },
}
</script>