<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Gestion services<sup class="text-danger text-lowercase fw-normal"></sup>
                            </h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header align-items-center d-flex">
                                <h4 class="card-title mb-0 flex-grow-1">Création services</h4>
                            </div>
                            <form @submit.prevent="submitForm" class="card-body">
                                <div class="row d-flex justify-content-center">
                                    <!-- agent personals infos -->
                                    <div class="col-md-12">

                                        <div class="row">
                                            <div class=" col-md-6">
                                                <div>
                                                    <label class="form-label">Libellé service <sup
                                                            class="text-danger">*</sup> </label>
                                                    <div class="form-icon">
                                                        <input type="text" class="form-control form-control-icon"
                                                            placeholder="Entrer le libellé service..."
                                                            v-model="form.libelle" required>
                                                        <i class="ri-arrow-left-right-line"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div>
                                                    <label for="iconInputNom" class="form-label">Emplacement <sup
                                                            class="text-danger">*</sup></label>
                                                    <select class="form-select" v-model="form.emplacement_id">
                                                        <option label="Sélectionner un emplacement..."></option>
                                                        <option v-for="(item, index) in configs.emplacements" :key="index"
                                                            :value="item.id">{{
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

                                        </div>
                                    </div>
                                </div>
                                <bs-toast id="errorsToastError4" :msg="errors_msg" />
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
                    </div>
                    <!-- end col -->
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="live-preview">
                                    <div class="table-responsive table-card">
                                        <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col">DATE</th>
                                                    <th scope="col">Libellé</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Emplacement</th>

                                                    <th scope="col" style="width: 150px;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in configs.services" :key="index">
                                                    <td>{{ formatDate(item.service_create_At) }}</td>
                                                    <td>{{ item.service_libelle }} </td>

                                                    <td>{{ item.service_description }}</td>
                                                    <td><span v-if="item.emplacement">{{
                                                        item.emplacement.hopital_emplacement_libelle }}</span></td>

                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-sm btn-info me-2">Editer</button>
                                                        <button type="button"
                                                            class="btn btn-sm btn-ghost-danger text-danger"><i
                                                                class="ri-delete-bin-3-line"></i></button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                        <state-empty v-if="configs.services.length === 0"
                                            title="Aucune information répertoriée !"
                                            description="Veuillez créer des agents dans le système !"></state-empty>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    </div>
</template>


<script>
export default {
    name: 'ServiceCreate',
    data() {
        return {
            errors_msg: '',
            formLoading: false,
            form: {
                key: 'services',
                libelle: '',
                description: '',
                emplacement_id: '',
            },
        }
    },
    mounted() {
        this.$store.dispatch('services/showConfigs');
    },


    methods: {
        /**
         * SUBMIT FORM DATA
        */
        submitForm(e) {
            this.formLoading = true;
            this.$store.dispatch('services/addConfig', this.form).then((res) => {
                console.log(JSON.stringify(res));
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "Service créé avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.cleanField();
                }
                if (res.errors !== undefined) {
                    console.log(JSON.stringify(res));
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("errorsToastError4")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },

        formatDate(timestamp) {
            // Créer un nouvel objet Date avec le timestamp (en millisecondes)
            let date = new Date(timestamp * 1000);
            let year = date.getFullYear();
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);
            /* let hours = ("0" + date.getHours()).slice(-2);
            let minutes = ("0" + date.getMinutes()).slice(-2);
            let seconds = ("0" + date.getSeconds()).slice(-2); */
            let formattedDate = ` ${day}/${month}/${year}`;
            return formattedDate;
        },

        cleanField() {
            this.form.description = "";
            this.form.libelle = "";
            this.form.emplacement_id = "";
            this.$store.dispatch('services/showConfigs');
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