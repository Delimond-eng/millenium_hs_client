<template>
    <teleport to="body">
        <div id="hostoCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Création hôpital</h5>
                        <p class="text-white-50 mb-4">Veuillez créer votre établissement hospitalier !</p>
                    </div>
                    <div class="modal-body p-4">
                        <form class="row" enctype="multipart/form-data" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">Désignation Hôpital <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.nom" class="form-control" id="exampleInputEmail1"
                                    placeholder="Entrer le nom de l'hôpital..." required>
                            </div>
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">Logo <sup class="text-danger">(optionnel)</sup> </label>
                                <input type="file" ref="logo" @change="uploadFile" class="form-control"
                                    id="exampleInputEmail1" placeholder="Entrer le nom de l'hôpital..." required>
                            </div>
                            <div class="mb-3 col-md-12">
                                <label for="hsadresse">Adresse Hôpitale <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.adresse" class="form-control"
                                    placeholder="Entrer l'adresse de l'hôpital" id="hsadresse" required>
                            </div>
                            <div class="mb-2 col-md-6">
                                <label for="hsgerant">Nom du gérant <sup class="text-danger">*</sup> </label>
                                <input type="text" class="form-control" v-model="form.user_name" id="hsgerant"
                                    placeholder="Entrer le nom du gérant..." required>
                            </div>
                            <div class="mb-2 col-md-6">
                                <label for="phone">Téléphone <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.user_phone" class="form-control" id="phone"
                                    placeholder="Entrer le n° de téléphone..." required>
                            </div>
                            <div class="mb-2 col-md-4">
                                <label for="email">Email du gérant <sup class="text-danger">*</sup> </label>
                                <input type="email" class="form-control" v-model="form.user_email" id="email"
                                    placeholder="Entrer l'email du gérant..." required>
                            </div>
                            <div class="mb-2 col-md-4">
                                <label for="password">Mot de passe <sup class="text-danger">*</sup> </label>
                                <input type="password" class="form-control" v-model="form.user_password" id="password"
                                    placeholder="Entrer le mot de passe..." required>
                            </div>
                            <div class="mb-2 col-md-4">
                                <label for="confirm">Confirmation mot de passe<sup class="text-danger">*</sup> </label>
                                <input type="password" class="form-control" v-model="form.password_confirm" id="confirm"
                                    placeholder="Entrer le mot de passe..." required>
                            </div>

                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastError" :msg="errors_msg" />

                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="$closeBsModal('hostoCreateModal')"
                                        class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2">Fermer</button>
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn btn-info btn-border btn-lg mt-2 text-uppercase">Créer</load-button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'HospitalCreateModal',
    data() {
        return {
            form: {
                nom: '',
                adresse: '',
                logo: '',
                user_name: '',
                user_phone: '',
                user_email: '',
                user_password: '',
                password_confirm: ''
            },
            formLoading: false,
            errors_msg: ''
        }
    },

    methods: {
        submitForm(e) {
            if (this.form.user_password !== this.form.password_confirm) {
                this.errors_msg = 'Echec de la confirmation du mot de passe !';
                let toast = document.getElementById("borderedToastError")
                new bootstrap.Toast(toast, { delay: 1500 }).show();
                return;
            }
            let formData = new FormData();
            formData.append('nom', this.form.nom);
            formData.append('adresse', this.form.adresse);
            formData.append('logo', this.form.logo);
            formData.append('user_name', this.form.user_name);
            formData.append('user_phone', this.form.user_phone);
            formData.append('user_email', this.form.user_email);
            formData.append('user_password', this.form.user_password);
            this.formLoading = true;

            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.$store.dispatch('auth/createHospital', formData).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "La création de l'hôpital a été effectuée avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    let user = JSON.stringify(res.user);
                    localStorage.setItem('user-data', user);
                    setTimeout(() => {
                        this.abort();
                        this.$router.push({ name: 'home' });
                    }, 1000)
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastError")
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
            this.form.logo = '';
            this.form.adresse = '';
            this.form.user_email = '';
            this.form.user_password = '';
            this.form.user_phone = '';
            this.form.user_name = '';
            this.$closeBsModal('hostoCreateModal');
        },
        uploadFile(e) {
            let file = e.target.files[0];
            this.form.logo = file;
            console.log(file);
        }
    },
}
</script>