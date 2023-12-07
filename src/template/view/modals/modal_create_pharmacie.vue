<template>
    <teleport to="body">
        <div id="pharmacieCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Création pharmacie</h5>
                        <p class="text-white-50 mb-2">Veuillez créer des pharmacies pour votre établissement hospitalier !
                        </p>
                    </div>
                    <div class="modal-body p-4">
                        <form class="row" enctype="multipart/form-data" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Nom <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.nom" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer la designation de la pharmacie..." required>
                            </div>
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Adresse <sup class="text-danger">*</sup> </label>
                                <input class="form-control" v-model="form.adresse"
                                    placeholder="Entrer l'adresse de la pharmacie..." required>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="hsnom">Téléphone <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.telephone" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer la designation de la pharmacie..." required>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="hsnom">Emplacement <sup class="text-danger">*</sup> </label>
                                <select class="form-select" v-model="form.emplacement_id">
                                    <option label="Sélectionner un emplacement..."></option>
                                    <option :value="e.id" v-for="(e, index) in configs.emplacements" :key="index">{{
                                        e.hopital_emplacement_libelle }}</option>
                                </select>
                            </div>
                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastError8" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="abort"
                                        class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2">Fermer</button>
                                    <load-button btn-type="submit" :loading="formLoading" v-if="!form.pharmacie_id"
                                        class-name="btn btn-success btn-border btn-lg mt-2 text-uppercase">Créer</load-button>
                                    <load-button :loading="formLoading" btn-type="submit" v-else
                                        class-name="btn btn-info btn-border btn-lg mt-2 text-uppercase">Mettre à
                                        jour</load-button>
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
    name: 'PharmacieCreateModal',
    data() {
        return {
            form: {
                nom: '',
                adresse: '',
                emplacement_id: '',
                telephone: '',
                pharmacie_id: ''
            },
            formLoading: false,
            errors_msg: ''
        }
    },
    mounted() {

        let self = this;
        $('#pharmacieCreateModal').on("show.bs.modal", function (e) {
            self.$store.dispatch('services/showConfigs');
        });

        $('#pharmacieCreateModal').on("hidden.bs.modal", function (e) {
            self.form.nom = "";
            self.form.adresse = "";
            self.form.emplacement_id = "";
            self.form.telephone = "";
            self.form.pharmacie_id = "";
        });
    },
    methods: {
        submitForm(e) {
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.$store.dispatch('services/createPharmacie', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Une nouvelle pharmacie créée avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('services/viewAllPharmacies');
                    this.form.nom = '';
                    this.form.adresse = '';
                    this.form.telephone = '';
                    this.form.emplacement_id = '';
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastError8")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },
        abort() {
            this.form.nom = '';
            this.form.adresse = '';
            this.form.emplacement_id = '';
            this.form.telephone = '';
            this.$closeBsModal('pharmacieCreateModal');
        },
    },

    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
    },

    props: {
        pharmacie: {
            type: Object
        }
    },
    watch: {
        pharmacie(val, old) {
            this.form.nom = val.pharmacie_nom ?? old.pharmacie_nom;
            this.form.adresse = val.pharmacie_adresse ?? old.pharmacie_adresse;
            this.form.telephone = val.pharmacie_telephone ?? old.pharmacie_telephone;
            this.form.emplacement_id = val.hopital_emplacement_id ?? old.hopital_emplacement_id;
            this.form.pharmacie_id = val.id ?? old.id;
        }
    }
}
</script>