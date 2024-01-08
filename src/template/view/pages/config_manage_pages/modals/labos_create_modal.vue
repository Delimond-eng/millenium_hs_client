<template>
    <teleport to="body">
        <div id="laboCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Création laboratoire médicale</h5>
                        <p class="text-white-50">Veuillez créer des laboratoires pour votre établissement
                            l'etablissement!</p>
                    </div>
                    <div class="modal-body  p-4">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">Nom <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.labo_nom" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer le nom du labo..." required>
                            </div>
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">N° Contact <sup class="text-danger">(Optionnel)</sup> </label>
                                <input type="text" v-model="form.labo_telephone" class="form-control"
                                    id="exampleInputEmail1" placeholder="Entrer le n° de contact...">
                            </div>
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">Adresse <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.labo_adresse" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer l'adresse du labo..." required>
                            </div>
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">Emplacement <sup class="text-danger">*</sup> </label>
                                <select class="form-select" v-model="form.hopital_emplacement_id" required>
                                    <option selected label="Sélectionner un emplacement...">
                                    </option>
                                    <option v-for="(item, index) in configs.emplacements" :key="index" :value="item.id">{{
                                        item.hopital_emplacement_libelle }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastError2" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="$closeBsModal('laboCreateModal')"
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
    name: 'LaboCreateModal',
    data() {
        return {
            form: {
                labo_nom: '',
                labo_adresse: '',
                labo_telephone: '',
                hopital_emplacement_id: ''
            },
            formLoading: false,
            errors_msg: ''
        }
    },

    methods: {
        submitForm(e) {
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.formLoading = true;
            this.$store.dispatch('labo/createLabo', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "La création du labo effectuée !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });

                    this.form.labo_nom = "";
                    this.form.labo_adresse = "";
                    this.form.hopital_emplacement_id = "";
                    this.form.labo_telephone = "";
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastError2")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
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