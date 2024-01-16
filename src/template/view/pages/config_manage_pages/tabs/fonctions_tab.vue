<template>
    <div role="tabpanel">
        <div class="row">
            <div class="col-md-7">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive table-card">
                            <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Libellé</th>
                                        <th scope="col" style="width: 150px;">Actions</th>
                                    </tr>
                                </thead>
                                <tbody v-if="configs.fonctions">
                                    <tr v-for="(item, index) in configs.fonctions" :key="index">
                                        <!-- <td>{{ formatDate(item.service_create_At) }}</td> -->
                                        <td>{{ item.fonction_libelle }} </td>
                                        <td>

                                            <button type="button" class="btn btn-sm btn-ghost-danger text-danger"><i
                                                    class="ri-delete-bin-3-line"></i></button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                            <state-empty v-if="configs.fonctions === undefined || configs.fonctions.length === 0"
                                title="Aucune information répertoriée !"
                                description="Veuillez créer des fonctions dans le système !"></state-empty>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <p>Configurez les fonctions de votre établissement hospitalier !</p>
                        <form @submit.prevent="submitForm">
                            <div class="input-group mb-2" v-for="(item, index) in forms" :key="index">
                                <input type="text" v-model="item.libelle" class="form-control"
                                    placeholder="Entrer le libellé..." required>
                                <button type="button" class="btn btn-icon btn-soft-secondary"
                                    @click="forms.push({ libelle: '' })">
                                    <i class="ri-add-line"></i> </button>
                            </div>

                            <bs-toast id="borderedToastErrorFonctions" :msg="errors_msg" />
                            <!-- buttons -->
                            <div class="d-flex justify-content-end align-items-end">
                                <button type="button" @click.prevent="forms = [{ libelle: '' }]"
                                    class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2">Annuler</button>
                                <load-button btn-type="submit" :loading="formLoading"
                                    class-name="btn btn-success flex-fill btn-border btn-lg mt-2 text-uppercase">Créer</load-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Fonctions-tab',

    data() {
        return {
            forms: [
                {
                    libelle: ''
                }
            ],
            formLoading: false,
            errors_msg: ''
        }
    },
    methods: {
        submitForm(e) {
            let datas = [];
            for (let form of this.forms) {
                if (form.libelle !== '') {
                    datas.push({
                        libelle: form.libelle,
                        created_by: this.user.id,
                        hopital_id: this.user.hopital.id
                    });
                }
            }
            this.formLoading = true;
            this.$store.dispatch('services/addFonctions', { fonctions: datas }).then((res) => {
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "bottom-end",
                        icon: "success",
                        toast: true,
                        title: "Fonctions configurées avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('services/showConfigs');
                    this.forms = [{ libelle: '' }];
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastErrorFonctions")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch(err => this.formLoading = false);

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