<template>
    <teleport to="body">
        <div id="emplacementCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Création emplacement hôpital</h5>
                        <p class="text-white-50 mb-4">Veuillez créer votre établissement hospitalier !</p>
                    </div>
                    <div class="modal-body p-4">
                        <form class="row" enctype="multipart/form-data" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Désignation Emplacement <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.emplacement_libelle" class="form-control"
                                    id="exampleInputEmail1" placeholder="Entrer la designation de l'emplacement..."
                                    required>
                            </div>
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Adresse <sup class="text-danger">*</sup> </label>
                                <textarea class="form-control" v-model="form.emplacement_adresse"
                                    placeholder="Entrer l'adresse de l'emplacement..."></textarea>
                            </div>
                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastError2" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="$closeBsModal('emplacementCreateModal')"
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
    name: 'EmplacementCreateModal',
    data() {
        return {
            form: {
                emplacement_libelle: '',
                emplacement_adresse: '',
                hopital_id: ''
            },
            formLoading: false,
            errors_msg: ''
        }
    },

    methods: {
        submitForm(e) {
            this.form.hopital_id = this.$user().hopital.id
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.$store.dispatch('services/createEmplacement', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "L'Emplacement ajouté avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('services/viewAllEmplacements');
                    this.abort();
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
        },
        abort() {
            this.form.emplacement_libelle = "";
            this.form.emplacement_adresse = "";
            /*  this.$closeBsModal('emplacementCreateModal'); */
        },
    },
}
</script>