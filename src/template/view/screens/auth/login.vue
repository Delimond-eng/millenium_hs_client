<template>
    <div class="auth-page-wrapper pt-2">
        <!-- auth page bg -->
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>

            <div class="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>

        <!-- auth page content -->
        <div class="auth-page-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center mt-sm-5 mb-4 text-white-50">
                            <div>
                                <a href="javascript:void(0)"
                                    class="d-flex align-items-center justify-content-center align-content-center auth-logo">
                                    <!-- <svg width="40px" height="40px" viewBox="0 0 30 30" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15 4.6C15 4.03995 15 3.75992 14.891 3.54601C14.7951 3.35785 14.6422 3.20487 14.454 3.10899C14.2401 3 13.9601 3 13.4 3H10.6C10.0399 3 9.75992 3 9.54601 3.10899C9.35785 3.20487 9.20487 3.35785 9.10899 3.54601C9 3.75992 9 4.03995 9 4.6V7.4C9 7.96005 9 8.24008 8.89101 8.45399C8.79513 8.64215 8.64215 8.79513 8.45399 8.89101C8.24008 9 7.96005 9 7.4 9H4.6C4.03995 9 3.75992 9 3.54601 9.10899C3.35785 9.20487 3.20487 9.35785 3.10899 9.54601C3 9.75992 3 10.0399 3 10.6V13.4C3 13.9601 3 14.2401 3.10899 14.454C3.20487 14.6422 3.35785 14.7951 3.54601 14.891C3.75992 15 4.03995 15 4.6 15H7.4C7.96005 15 8.24008 15 8.45399 15.109C8.64215 15.2049 8.79513 15.3578 8.89101 15.546C9 15.7599 9 16.0399 9 16.6V19.4C9 19.9601 9 20.2401 9.10899 20.454C9.20487 20.6422 9.35785 20.7951 9.54601 20.891C9.75992 21 10.0399 21 10.6 21H13.4C13.9601 21 14.2401 21 14.454 20.891C14.6422 20.7951 14.7951 20.6422 14.891 20.454C15 20.2401 15 19.9601 15 19.4V16.6C15 16.0399 15 15.7599 15.109 15.546C15.2049 15.3578 15.3578 15.2049 15.546 15.109C15.7599 15 16.0399 15 16.6 15H19.4C19.9601 15 20.2401 15 20.454 14.891C20.6422 14.7951 20.7951 14.6422 20.891 14.454C21 14.2401 21 13.9601 21 13.4V10.6C21 10.0399 21 9.75992 20.891 9.54601C20.7951 9.35785 20.6422 9.20487 20.454 9.10899C20.2401 9 19.9601 9 19.4 9L16.6 9C16.0399 9 15.7599 9 15.546 8.89101C15.3578 8.79513 15.2049 8.64215 15.109 8.45399C15 8.24008 15 7.96005 15 7.4V4.6Z"
                                            stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                    <h1 class="text-white text-uppercase fw-bold mx-2">Millenium HS</h1> -->
                                    <img src="assets/logo-2.png" class="card-logo card-logo-dark" alt="logo dark"
                                        height="70" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end row -->

                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card mt-2">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <img src="assets/images/companies/user.png" style="height: 70px" class="mb-1"
                                        alt="" />
                                </div>
                                <div class="p-2">
                                    <form @submit.prevent="loggedIn">
                                        <div class="mb-2">
                                            <label for="username" class="form-label">Identifiant </label>
                                            <input type="text" class="form-control" id="username" v-model="form.email"
                                                placeholder="Entrer identifiant utilisateur" required />
                                        </div>

                                        <div class="mb-2">
                                            <div class="float-end">
                                                <a href="#" class="text-muted">Mot de passe oublié?</a>
                                            </div>
                                            <label class="form-label" for="password-input">Mot de passe</label>
                                            <div class="position-relative auth-pass-inputgroup mb-2">
                                                <input :type="inputType" class="form-control pe-5 password-input"
                                                    placeholder="Entrer mot de passe" id="password-input"
                                                    v-model="form.password" required />
                                                <button
                                                    class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                    type="button" id="password-addon" @mousedown="inputType = 'text'"
                                                    @mouseup="inputType = 'password'">
                                                    <i v-if="inputType === 'password'"
                                                        class="ri-eye-fill align-middle"></i>
                                                    <i v-else class="ri-eye-off-fill align-middle"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="mt-3">
                                            <load-button btn-type="submit" class-name="btn-success w-100"
                                                :loading="formLoading">
                                                <span class="text-uppercase fw-semibold">Connecter</span></load-button>
                                            <button type="button"
                                                class="btn btn-primary btn-border w-100 mt-2 text-uppercase"
                                                @click.prevent="$showBsModal('hostoCreateModal')">
                                                Création hôpital
                                            </button>
                                        </div>
                                        <div id="borderedToast4"
                                            class="toast toast-border-danger overflow-hidden w-100 mt-2" role="alert"
                                            aria-live="assertive" aria-atomic="true">
                                            <div class="toast-body">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-shrink-0 me-2">
                                                        <lord-icon src="https://cdn.lordicon.com/tdrtiskw.json"
                                                            trigger="loop" colors="primary:#f06548,secondary:#F7704B"
                                                            style="width: 30px; height: 30px"></lord-icon>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <h6 class="mb-0">Identifiant ou mot de passe invalide !</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->
                    </div>
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end auth page content -->
    </div>
    <hosto-create-modal />
</template>

<script>
import HostoCreateModal from "./modals/create-hospital-modal";
export default {
    name: "Login",
    components: {
        HostoCreateModal,
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            inputType: "password",
            formLoading: false,
        };
    },

    methods: {
        loggedIn(e) {
            this.formLoading = true;
            this.$store
                .dispatch("auth/login", this.form)
                .then((res) => {
                    this.formLoading = false;
                    if (res !== null) {
                        if (res.user.pharmacie_role === "Vendeur") {
                            this.$router.push({ name: "seller-home-route" });
                        } else {
                            this.$router.push({ name: "home" });
                        }
                    } else {
                        let toast = document.getElementById("borderedToast4");
                        new bootstrap.Toast(toast, { delay: 1000 }).show();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.formLoading = false;
                });
        },
    },
};
</script>
