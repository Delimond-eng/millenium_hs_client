<template>
    <div role="tabpanel">
        <div class="row">
            <div class="col-12 col-md-12 mb-3">
                <div class=" d-sm-flex align-items-center justify-content-between">
                    <h5 class="mb-sm-0 text-uppercase fw-semibold">Gestion des lits<sup
                            class="text-danger text-lowercase fw-normal"></sup>
                    </h5>
                    <button @click="$showBsModal('bedCreateModal')" class="btn btn-soft-primary"><i
                            class="ri-add-line me-1"></i> Nouveau
                        lit</button>
                </div>
            </div>

            <div class="col-md-3" v-for="(data, index) in datas.lits" :key="index">
                <div class="card card-height-100 ribbon-box ribbon-fill right border shadow-none">
                    <div class="card-body">
                        <div class="ribbon fs-10 fw-bold"
                            :class="data.lit_status.includes('dispo') ? 'ribbon-success' : 'ribbon-warning'">
                            {{ data.lit_status.includes('dispo') ? 'Dispo' :
                                data.lit_status }}
                        </div>
                        <div class="ribbon-content">

                            <div class="mb-4 pb-2">
                                <img :src="data.lit_status.includes('dispo') ?
                                    'assets/images/companies/hospital-bed-2.png' :
                                    'assets/images/companies/hospital-bed-3.png'" alt="" class="avatar-md">
                            </div>
                            <h6 class="fs-15 fw-bold mb-1">Lit n° {{ data.lit_numero
                            }}
                            </h6>
                            <span v-if="data.type" class="text-info fs-10 mb-2 fw-semibold">{{ data.type.type_libelle
                            }}</span>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <span class="fs-12"><i class=" ri-hospital-line me-1 align-bottom"></i>
                                        <span v-if="data.service">{{
                                            data.service.service_libelle }}</span>
                                    </span>
                                </div>
                                <button v-if="data.lit_status.includes('occupé')"
                                    class="btn btn-soft-success btn-load btn-sm me-1">
                                    <!-- <svg-loading v-if="loaded === data.consult_id" color="#13b69f"
                                                                        size="18"></svg-loading>
                                                                        <span v-else>Valider</span> -->
                                    Libérer
                                </button>
                                <button v-else class="btn btn-soft-danger btn-load btn-icon btn-sm me-1">
                                    <i class="ri-delete-bin-5-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <state-empty v-if="datas.lits === undefined || datas.lits === 0" title="Aucune information répertoriée !"
            description="Il n'y a aucune fiche de patient en attente pour l'instant !"></state-empty>
    </div>


    <teleport to="body">
        <div id="bedCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Creation des lits </h5>
                        <p class="text-white-50">Veuillez renseigner tous les champs pour créer un lit !</p>
                    </div>
                    <div class="modal-body  p-4">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Libellé <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.lit_numero" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer le numéro du lit..." required>
                            </div>
                            <div class="col-md-12 mb-2">
                                <div>
                                    <label for="iconInputNom" class="form-label">Type de lit <sup
                                            class="text-danger">*</sup></label>
                                    <select class="form-select" v-model="form.type_id">
                                        <option label="Sélectionner un type de lit..."></option>
                                        <option v-for="(item, index) in datas.types" :key="index" :value="item.id">
                                            {{
                                                item.type_libelle }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <div>
                                    <label for="iconInputNom" class="form-label">Service/emplacement <sup
                                            class="text-danger">*</sup></label>
                                    <select class="form-select" v-model="form.service_id">
                                        <option label="Sélectionner un service..." selected hidden></option>
                                        <option v-for="(item, index) in configs.services" :key="index" :value="item.id">
                                            {{
                                                item.service_libelle }}
                                        </option>
                                    </select>
                                </div>
                            </div>


                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastErrors80" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="$closeBsModal('bedCreateModal'); abort();"
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
    name: "BedTab",

    data() {
        return {
            form: {
                lit_numero: "",
                type_id: "",
                service_id: "",
            },
            formLoading: false,
            errors_msg: ''
        }
    },

    methods: {
        submitForm(e) {
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.$store.dispatch('hospitalisation/addBed', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "Nouveau lit créé avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('hospitalisation/viewAllDatas');
                    this.abort()
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastErrors80")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },

        abort() {
            this.form.lit_numero = "";
            this.form.type_id = "";
            this.form.service_id = "";
        }
    },

    computed: {
        datas() {
            return this.$store.getters['hospitalisation/GET_ALL_DATAS'];
        },
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        }
    }
}
</script>