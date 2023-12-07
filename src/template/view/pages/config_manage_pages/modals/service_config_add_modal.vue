<template>
    <teleport to="body">
        <div id="serviceCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Configuration services </h5>
                        <p class="text-white-50">Veuillez configurer les services pour votre établissement
                            hospitalier</p>
                    </div>
                    <div class="modal-body  p-4">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="col-md-12 mb-2">
                                <div>
                                    <label class="form-label">Libellé service <sup class="text-danger">*</sup>
                                    </label>
                                    <div class="form-icon">
                                        <input type="text" class="form-control form-control-icon"
                                            placeholder="Entrer le libellé service..." v-model="form.libelle" required>
                                        <i class="ri-arrow-left-right-line"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <div>
                                    <label for="iconInputNom" class="form-label">Emplacement <sup
                                            class="text-danger">*</sup></label>
                                    <select class="form-select" v-model="form.emplacement_id">
                                        <option label="Sélectionner un emplacement..."></option>
                                        <option v-for="(item, index) in configs.emplacements" :key="index" :value="item.id">
                                            {{
                                                item.hopital_emplacement_libelle }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="mt-3">
                                    <label for="iconInputNom" class="form-label">Description <sup
                                            class="text-danger">*</sup></label>
                                    <textarea class="form-control" v-model="form.description"
                                        placeholder="Entrer une description..."></textarea>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastErrorService" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="abort"
                                        class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2">Fermer</button>
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn btn-success btn-border btn-lg mt-2 text-uppercase">Créer</load-button>
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
    name: 'ServiceConfigModal',
    data() {
        return {
            form: {
                key: 'services',
                libelle: '',
                description: '',
                emplacement_id: '',
            },
            formLoading: false,
            errors_msg: ''
        }
    },
    mounted() {
        let self = this;
        $('#serviceCreateModal').on("show.bs.modal", function (e) {
            self.$store.dispatch('services/showConfigs');
        });
    },

    methods: {
        submitForm(e) {
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
                        title: "La configuration du service effectuée !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('services/showConfigs');
                    this.form.libelle = "";
                    this.form.description = "";
                    this.form.emplacement_id = "";
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastErrorService")
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
            this.$closeBsModal('serviceCreateModal');
        },
    },
    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
    },
}
</script>