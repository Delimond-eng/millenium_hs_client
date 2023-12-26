<template>
    <div class="layout-wrapper landing">
        <nav class="navbar navbar-expand-lg navbar-landing fixed-top navbar-light fixed-top is-sticky" id="navbar">
            <div class="container">
                <a class="navbar-brand" href="#/home">
                    <img src="assets/logo.png" class="card-logo card-logo-dark" alt="logo dark" height="50">
                    <img src="assets/logo.png" class="card-logo card-logo-light" alt="logo light" height="50">
                </a>
                <button class="navbar-toggler py-0 fs-20 text-body" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i class="mdi mdi-menu"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
                        <li class="nav-item">
                            <a class="nav-link active" href="#hero">Acceuil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contacts">Modules</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contacts">Contacts</a>
                        </li>
                    </ul>

                    <div class="">
                        <a href="javascript:void(0)" class="btn btn-primary">Connexion</a>
                    </div>
                </div>

            </div>
        </nav>
        <!-- end navbar -->
        <div class="vertical-overlay" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent.show"></div>


        <!-- start cta -->
        <section class="py-5 bg-primary position-relative" style="margin-top:73px">
            <div class="bg-overlay bg-overlay-pattern opacity-50"></div>
            <div class="container">
                <div class="row align-items-center gy-4">
                    <div class="col-sm">
                        <div>
                            <h5 class="text-white mb-0 fw-semibold">Optimisez votre établissement hospitalier : Ajoutez des
                                modules pour une gestion complète et efficace !</h5>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-sm-auto">
                        <div>
                            <a href="#/home" class="btn bg-gradient btn-danger"><i
                                    class="ri-reply-line align-middle me-1"></i>
                                Retour</a>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </section>
        <!-- end cta -->

        <!-- start plan -->
        <section class="section bg-light" id="plans">
            <div class="bg-overlay bg-overlay-pattern"></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="text-center mb-5">
                            <h3 class="mb-3 fw-semibold">Sélectionnez un ou plusieurs modules</h3>
                            <p class="text-muted mb-4">Pour la gestion complète de votre hôpital ajouter les modules à votre
                                organisation !
                            </p>
                        </div>
                    </div>
                    <!-- end col -->
                </div>
                <!-- end row -->

                <div class="row gy-4 d-flex justify-content-center align-items-center">
                    <div class="col-md-3" v-for="(item, index) in modules" :key="index">
                        <label :for="`check_${index}`"
                            class="card cursor-pointer p-3 rounded form-check form-check-success ribbon-box border ribbon-fill shadow-none">
                            <div v-show="item.checked" class="ribbon ribbon-success ribbon-sm"><i
                                    class="ri-download-line"></i></div>
                            <div class="d-flex align-items-center  justify-content-between">
                                <div class="d-flex align-items-center me-2">
                                    <div class="avatar-sm flex-shrink-0 me-2">
                                        <div class="avatar-title bg-warning-subtle text-warning rounded fs-18">
                                            <img :src="item.icon" class="img-fluid" style="height:30px">
                                        </div>
                                    </div>
                                    <h6 class="fs-12 lh-base mb-0">{{ item.title }}</h6>
                                </div>
                                <input type="checkbox" class="form-check-input"
                                    @change="item.checked = $event.target.checked" :id="`check_${index}`"
                                    :checked="item.checked">
                            </div>
                        </label>
                    </div>
                </div>
                <!--end row-->
                <button type="button" class="btn btn-success btn-label right shadow-lg"
                    style="position: absolute; right: 20px; z-index:999"><i
                        class="ri-apps-fill  label-icon align-middle fs-16 ms-2"></i> Ajouter les
                    modules</button>

            </div>
            <!-- end container -->
        </section>
        <!-- end plan -->

        <!-- Start footer -->
        <footer class="custom-footer bg-dark py-5 position-relative">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mt-4">
                        <div>
                            <div>
                                <img src="assets/logo-2.png" alt="logo light" height="50">
                            </div>
                            <div class="mt-4 fs-13">
                                <p>La plateforme de gestion hospitalière est une solution numérique complète et intuitive
                                    conçue pour transformer et optimiser la gestion des établissements de santé. Cette
                                    plateforme innovante combine des fonctionnalités avancées pour répondre aux besoins
                                    complexes des hôpitaux modernes, offrant une gestion efficace et globale des opérations
                                    quotidiennes !</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-7 ms-lg-auto">
                        <div class="row">
                            <div class="col-sm-4 mt-4">
                                <h5 class="text-white mb-0">Company</h5>
                                <div class="text-muted mt-3">
                                    <ul class="list-unstyled ff-secondary footer-list">
                                        <li><a href="pages-profile.html">About Us</a></li>
                                        <li><a href="pages-gallery.html">Gallery</a></li>
                                        <li><a href="apps-projects-overview.html">Projects</a></li>
                                        <li><a href="pages-timeline.html">Timeline</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-sm-4 mt-4">
                                <h5 class="text-white mb-0">Apps Pages</h5>
                                <div class="text-muted mt-3">
                                    <ul class="list-unstyled ff-secondary footer-list">
                                        <li><a href="pages-pricing.html">Calendar</a></li>
                                        <li><a href="apps-mailbox.html">Mailbox</a></li>
                                        <li><a href="apps-chat.html">Chat</a></li>
                                        <li><a href="apps-crm-deals.html">Deals</a></li>
                                        <li><a href="apps-tasks-kanban.html">Kanban Board</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-sm-4 mt-4">
                                <h5 class="text-white mb-0">Support</h5>
                                <div class="text-muted mt-3">
                                    <ul class="list-unstyled ff-secondary footer-list">
                                        <li><a href="pages-faqs.html">FAQ</a></li>
                                        <li><a href="pages-faqs.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row text-center text-sm-start align-items-center mt-5">
                    <div class="col-sm-6">

                        <div>
                            <p class="copy-rights mb-0">
                                2023 © Millenium HS
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-sm-end mt-3 mt-sm-0">
                            <ul class="list-inline mb-0 footer-social-link">
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-facebook-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-github-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-linkedin-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-google-fill"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript: void(0);" class="avatar-xs d-block">
                                        <div class="avatar-title rounded-circle">
                                            <i class="ri-dribbble-line"></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- end footer -->


        <!--start back-to-top-->
        <button onclick="topFunction()" class="btn btn-danger btn-icon landing-back-top" id="back-to-top">
            <i class="ri-arrow-up-line"></i>
        </button>
        <!--end back-to-top-->

    </div>
</template>
<script>
export default {
    name: "PatientListPage",

    data() {
        return {
            modules: [
                {
                    title: "Gestion pharmacie",
                    icon: "assets/images/companies/pills.png",
                    checked: false
                },
                {
                    title: "Gestion laboratoire",
                    icon: "assets/images/companies/labo.png",
                    checked: false
                },
                {
                    title: "Gestion matérnité",
                    icon: "assets/images/companies/maternity2.png",
                    checked: false
                },
            ]
        }
    },
}
</script>
