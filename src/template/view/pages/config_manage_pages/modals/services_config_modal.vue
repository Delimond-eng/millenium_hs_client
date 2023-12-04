<template>
    <teleport to="body">
        <div id="serviceConfigModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Configuration <span v-if="actionKey">{{ actionKey }}</span></h5>
                        <p class="text-white-50">Veuillez configurer les <span v-if="actionKey">{{ actionKey }}</span> de
                            l'etablissement!</p>
                    </div>
                    <div class="modal-body  p-4">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Libellé <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.libelle" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer le libellé..." required>
                            </div>
                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastError2" :msg="errors_msg" />
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
    name: 'ServicesConfigModal',

    props: {
        actionKey: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            form: {
                libelle: '',
                key: '',
            },
            formLoading: false,
            errors_msg: ''
        }
    },

    methods: {
        submitForm(e) {
            this.form.hopital_id = this.$user().hopital.id;
            this.form.key = this.actionKey;
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.$store.dispatch('services/addConfig', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "La configuration est effectuée !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('services/showConfigs');
                    this.form.libelle = "";
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
            this.form.libelle = "";
            this.$closeBsModal('serviceConfigModal');
        },
    },
}
</script>