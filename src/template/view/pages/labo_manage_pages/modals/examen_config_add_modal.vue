<template>
    <teleport to="body">
        <div id="examensCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Configuration examens médicaux </h5>
                        <p class="text-white-50">Veuillez configurer les examens médicaux pour votre établissement
                            hospitalier</p>
                    </div>
                    <div class="modal-body  p-4">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Libellé <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.libelle" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer le libellé..." required>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div>
                                    <label for="iconInputNom" class="form-label">Emplacement <sup
                                            class="text-danger">*</sup></label>
                                    <select class="form-select" v-model="emplacement">
                                        <option selected label="Sélectionner un emplacement..." hidden></option>
                                        <option v-for="(item, index) in configs.emplacements" :key="index" :value="item">
                                            {{
                                                item.hopital_emplacement_libelle }}
                                        </option>
                                    </select>
                                </div>

                            </div>
                            <div class="col-md-6 mb-2">
                                <div>
                                    <label for="iconInputNom" class="form-label">Laboratoire <sup
                                            class="text-danger">*</sup></label>
                                    <select class="form-select" v-model="form.labo_id"
                                        :disabled="emplacement.labos === undefined || emplacement.labos.length === 0">
                                        <option
                                            :label="emplacement.labos === undefined || emplacement.labos.length === 0 ? 'Aucun labo disponible !' : 'Sélectionner un laboratoire...'"
                                            selected hidden></option>
                                        <option v-for="(item, index) in emplacement.labos" :key="index" :value="item.id">
                                            {{
                                                item.labo_nom }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-2 col-md-8">
                                <label for="hsnom">Prix <sup class="text-danger">*</sup> </label>
                                <div class="d-flex">
                                    <input type="text" v-model="form.prix" class="form-control me-1 flex-fill"
                                        id="exampleInputEmail1" placeholder="Entrer le prix..." required>
                                    <select class="form-control flex-grow-0" style="width: 100px;" v-model="form.devise">
                                        <option value="CDF" selected>CDF</option>
                                        <option value="CDF" selected>USD</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-2 col-md-4">
                                <label for="hsnom">Resultat type <sup class="text-danger">*</sup> </label>
                                <select class="form-control" v-model="form.resultat_type">
                                    <option label="type de resultat..." selected hidden></option>
                                    <option value="text">Text</option>
                                    <option value="image">Image</option>
                                    <option value="numeric">Numerique</option>
                                </select>
                            </div>

                            <div class="col-md-12 mb-2">
                                <div class="mt-3">
                                    <label for="iconInputNom" class="form-label">Description <sup
                                            class="text-danger">*</sup></label>
                                    <textarea class="form-control" v-model="form.description"
                                        placeholder="Entrer une description..."></textarea>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastErrors" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="abort"
                                        class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2">Fermer</button>
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn btn-info btn-border btn-lg mt-2 text-uppercase">Créer</load-button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'ExamensConfigModal',
    data() {
        return {
            form: {
                libelle: '',
                prix: '',
                devise: 'CDF',
                emplacement_id: '',
                resultat_type: '',
                labo_id: '',
                description: '',
            },
            formLoading: false,
            errors_msg: '',
            labos: [],
            emplacement: ''
        }
    },
    mounted() {
        this.$store.dispatch('services/showConfigs');
    },

    methods: {
        submitForm(e) {
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.form.emplacement_id = this.emplacement.id;
            this.$store.dispatch('labo/configExamens', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "La configuration de l'examen effectuée !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('services/showConfigs');
                    this.$emit('reload');
                    this.form.libelle = "";
                    this.form.description = "";
                    this.form.emplacement_id = "";
                    this.form.prix = "";
                    this.form.resultat_type = "";
                    this.form.labo_id = "";
                    this.emplacement = "";
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastErrors")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },
        abort() {
            this.form.libelle = "";
            this.form.description = "";
            this.form.emplacement_id = "";
            this.form.prix = "";
            this.$closeBsModal('examensCreateModal');
        },
    },
    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
    },
}
</script>