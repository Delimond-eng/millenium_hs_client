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
                            <div class="card-header align-items-start justify-content-center d-flex flex-column">
                                <h4 class="card-title mb-0 flex-grow-1">Patient infos</h4>
                                <p class="mt-2 text-muted">Veuillez renseigner tous les champs requis pour créer un patient
                                    !</p>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xxl-3 col-md-2">
                                        <div>
                                            <label for="patientCode" class="form-label">Patient code</label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="patientCode"
                                                    :value="pcode" disabled>
                                                <i class="bx bx-hash"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div>
                                            <label for="iconInputNom" class="form-label">Nom <sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="iconInputNom"
                                                    placeholder="Saisir le nom du patient...ex:Gaston">
                                                <i class="ri-user-2-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div>
                                            <label for="iconInputNom" class="form-label">Prénom <sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="iconInputNom"
                                                    placeholder="Saisir le prénom du patient...ex:Lionnel">
                                                <i class="ri-user-2-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- patient sexe select -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label for="iconInputPoids" class="form-label">Sexe <sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <select class="form-select" id="inputGroupSelect01">
                                                    <option selected label="Sélectionner un sexe"></option>
                                                    <option value="M">Masculin</option>
                                                    <option value="F">Féminin</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- patient age input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label for="iconInputNom" class="form-label">Age<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="number" class="form-control form-control-icon"
                                                    id="iconInputNom" placeholder="Saisir l'âge... ex: 20">
                                                <i class="ri-parent-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- patient poids input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label for="iconInputNom" class="form-label">Poids<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="number" class="form-control form-control-icon"
                                                    id="iconInputNom" placeholder="Saisir le poids... ex: 63.3">
                                                <i class="ri-scales-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Temperature input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label for="iconInputNom" class="form-label">Temperature<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="number" class="form-control form-control-icon"
                                                    id="iconInputNom" placeholder="Saisir le T°... ex: 34.5">
                                                <i class="ri-contrast-drop-2-line "></i>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- telephone input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label for="iconInputNom" class="form-label">Téléphone<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="iconInputNom"
                                                    placeholder="Saisir le tél... ex: +(243) 810000000">
                                                <i class="ri-phone-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- taille input -->
                                    <div class="col-md-3">
                                        <div class="mt-3">
                                            <label for="iconInputNom" class="form-label">Taille<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="iconInputNom"
                                                    placeholder="Saisir la taille... ex: 1.70">
                                                <i class=" ri-ruler-line"></i>
                                            </div>
                                        </div>
                                    </div>


                                    <!-- adresse input -->
                                    <div class="col-md-6">
                                        <div class="mt-3">
                                            <label for="iconInputNom" class="form-label">Adresse<sup
                                                    class="text-danger">*</sup></label>
                                            <div class="form-icon">
                                                <input type="text" class="form-control form-control-icon" id="iconInputNom"
                                                    placeholder="Saisir l'adresse du patient... ex: N°/ av. / Q. /C">
                                                <i class="ri-map-pin-5-line"></i>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="d-flex align-items-start mt-4">
                                    <button type="button"
                                        class="btn btn-success btn-border  btn-label right nexttab nexttab me-2"><i
                                            class="ri-check-double-fill label-icon align-middle fs-16 ms-2"></i>Enregistrer</button>
                                    <button type="button" class="btn btn-light btn-border  btn-label right"><i
                                            class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                        Annuler</button>
                                </div>
                            </div>
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
export default {
    name: "PatientCreate",
    data() {
        return {
            form: {
                code: "",
                nom: "",
                prenom: "",
                sexe: "",
                telephone: "",
                adresse: "",
                datenais: "",
                patient_id: "",
                created_by: "",
                patient_details: {},
                form_details: {
                    poids: "",
                    taille: "",
                    temperature: "",
                    tension_art: "",
                    age: ""
                }
            }
        }
    },

    mounted() {
        this.$store.dispatch('services/showCode')
    },

    computed: {
        pcode() {
            return this.$store.getters['services/GET_CODE'];
        }
    },
}
</script>