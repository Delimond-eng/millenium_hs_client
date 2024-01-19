<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Dossier médical</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">

                                    <li v-if="doc" class="breadcrumb-item"><a href="javascript: void(0);"
                                            class="btn btn-secondary btn-sm text-white btn-border"> <i
                                                class="ri-printer-fill"></i>
                                            Imprimer</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pt-2 mb-lg-3 pb-lg-2 profile-wrapper card">
                    <div class="row g-4 p-3">
                        <div class="col-auto">
                            <div class="avatar-lg">
                                <img src="assets/images/companies/doc2.png" alt="user-img"
                                    class="img-thumbnail img-fluid rounded-2">
                            </div>
                        </div>
                        <!--end col-->
                        <div class="col">
                            <div class="p-2" v-if="doc">
                                <h3 class="text-black mb-1">{{ doc.patient_nom }}</h3>
                                <p class="text-black text-opacity-75"><i
                                        class="ri-qr-code-fill me-1 text-opacity-75 fs-16 align-middle"></i>{{
                                            doc.patient_code }}</p>
                                <div class="hstack text-black-50 gap-1">
                                    <div class="me-2"><i
                                            class="ri-map-pin-user-line me-1 text-opacity-75 fs-16 align-middle"></i>{{
                                                doc.patient_adresse }}</div>
                                    <div>
                                        <i class="ri-building-line me-1 text-opacity-75 fs-16 align-middle"></i>Themesbrand
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table mb-0">
                                        <tbody class="text-black">
                                            <tr>
                                                <th scope="row">Sexe</th>
                                                <td>{{ doc.patient_sexe }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <tbody class="text-black">
                                        <tr>
                                            <th scope="row">Date de naissance</th>
                                            <td>{{ doc.patient_datenais }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Etat civil</th>
                                            <td>{{ doc.patient_etat_civil }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Groupe </th>
                                            <td>{{ doc.patient_gs }}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!--end row-->
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div>
                            <div class="d-flex profile-wrapper">
                                <!-- Nav tabs -->
                                <ul class="nav nav-pills animation-nav mb-2 gap-2 gap-lg-3 flex-grow-1" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab"
                                            role="tab" aria-selected="true">
                                            <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                class="d-none d-md-inline-block">Symptômes & signes vitaux</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link fs-14" data-bs-toggle="tab" href="#consults-tab" role="tab"
                                            aria-selected="true">
                                            <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                class="d-none d-md-inline-block">Consultations & diagnostics</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link fs-14" data-bs-toggle="tab" href="#activities" role="tab"
                                            aria-selected="false" tabindex="-1">
                                            <i class="ri-list-unordered d-inline-block d-md-none"></i> <span
                                                class="d-none d-md-inline-block">Antécedents</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link fs-14" data-bs-toggle="tab" href="#projects" role="tab"
                                            aria-selected="false" tabindex="-1">
                                            <i class="ri-price-tag-line d-inline-block d-md-none"></i> <span
                                                class="d-none d-md-inline-block">Examens</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link fs-14" data-bs-toggle="tab" href="#documents" role="tab"
                                            aria-selected="false" tabindex="-1">
                                            <i class="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                class="d-none d-md-inline-block">Prescriptions</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <!-- Tab panes -->
                            <div class="tab-content pt-2 text-muted">
                                <div class="tab-pane active" id="overview-tab" role="tabpanel">
                                    <div class="row">
                                        <!--end col-->
                                        <div class="col-xxl-9">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="card">
                                                        <div class="card-header align-items-center d-flex">
                                                            <h4 class="card-title mb-0  me-2">Symptômes & signes vitaux</h4>

                                                        </div>
                                                        <div class="card-body">
                                                            <div class="profile-timeline">
                                                                <div class="accordion accordion-flush" id="todayExample">
                                                                    <h6>Signes vitaux</h6>
                                                                    <div class="accordion-item border-0">
                                                                        <div class="accordion-header" id="headingFour">
                                                                            <a class="accordion-button p-2 shadow-none"
                                                                                data-bs-toggle="collapse"
                                                                                href="#collapseFour" aria-expanded="true">
                                                                                <div class="d-flex">
                                                                                    <div class="flex-shrink-0 avatar-xs">
                                                                                        <div
                                                                                            class="avatar-title bg-light text-muted rounded-circle">
                                                                                            <i
                                                                                                class="ri-calendar-check-line"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex-grow-1 ms-3">
                                                                                        <h6 class="fs-14 mb-1">
                                                                                            Nancy Martino
                                                                                        </h6>
                                                                                        <small class="text-muted">Commented
                                                                                            on 12:57PM</small>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div id="collapseFour"
                                                                            class="accordion-collapse collapse show"
                                                                            aria-labelledby="headingFour"
                                                                            data-bs-parent="#accordionExample">
                                                                            <div
                                                                                class="accordion-body ms-2 ps-5 fst-italic">
                                                                                " A wonderful serenity has
                                                                                taken possession of my
                                                                                entire soul, like these
                                                                                sweet mornings of spring
                                                                                which I enjoy with my whole
                                                                                heart. Each design is a new,
                                                                                unique piece of art birthed
                                                                                into this world, and while
                                                                                you have the opportunity to
                                                                                be creative and make your
                                                                                own style choices. "
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--end accordion-->
                                                            </div>
                                                        </div><!-- end card body -->
                                                    </div><!-- end card -->
                                                </div><!-- end col -->
                                            </div><!-- end row -->
                                        </div>
                                        <!--end col-->
                                    </div>
                                    <!--end row-->
                                </div>
                                <div class="tab-pane fade" id="consults-tab" role="tabpanel">
                                    <div class="row">
                                        <!--end col-->
                                        <div class="col-xxl-9">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="card">
                                                        <div class="card-header align-items-center d-flex">
                                                            <h4 class="card-title mb-0  me-2">Les signes vitaux</h4>

                                                        </div>
                                                        <div class="card-body">
                                                            <div class="profile-timeline">
                                                                <div class="accordion accordion-flush" id="todayExample">
                                                                    <div class="accordion-item border-0">
                                                                        <div class="accordion-header" id="headingFour">
                                                                            <a class="accordion-button p-2 shadow-none"
                                                                                data-bs-toggle="collapse"
                                                                                href="#collapseFour" aria-expanded="true">
                                                                                <div class="d-flex">
                                                                                    <div class="flex-shrink-0 avatar-xs">
                                                                                        <div
                                                                                            class="avatar-title bg-light text-muted rounded-circle">
                                                                                            <i
                                                                                                class="ri-calendar-check-line"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex-grow-1 ms-3">
                                                                                        <h6 class="fs-14 mb-1">
                                                                                            Nancy Martino
                                                                                        </h6>
                                                                                        <small class="text-muted">Commented
                                                                                            on 12:57PM</small>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div id="collapseFour"
                                                                            class="accordion-collapse collapse show"
                                                                            aria-labelledby="headingFour"
                                                                            data-bs-parent="#accordionExample">
                                                                            <div
                                                                                class="accordion-body ms-2 ps-5 fst-italic">
                                                                                " A wonderful serenity has
                                                                                taken possession of my
                                                                                entire soul, like these
                                                                                sweet mornings of spring
                                                                                which I enjoy with my whole
                                                                                heart. Each design is a new,
                                                                                unique piece of art birthed
                                                                                into this world, and while
                                                                                you have the opportunity to
                                                                                be creative and make your
                                                                                own style choices. "
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--end accordion-->
                                                            </div>
                                                        </div><!-- end card body -->
                                                    </div><!-- end card -->
                                                </div><!-- end col -->
                                            </div><!-- end row -->
                                        </div>
                                        <!--end col-->
                                    </div>
                                    <!--end row-->
                                </div>
                                <div class="tab-pane fade" id="activities" role="tabpanel">
                                    <div class="row">
                                        <!--end col-->
                                        <div class="col-xxl-9">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="card">
                                                        <div class="card-header align-items-center d-flex">
                                                            <h4 class="card-title mb-0  me-2">Les signes vitaux</h4>

                                                        </div>
                                                        <div class="card-body">
                                                            <div class="profile-timeline">
                                                                <div class="accordion accordion-flush" id="todayExample">
                                                                    <div class="accordion-item border-0">
                                                                        <div class="accordion-header" id="headingFour">
                                                                            <a class="accordion-button p-2 shadow-none"
                                                                                data-bs-toggle="collapse"
                                                                                href="#collapseFour" aria-expanded="true">
                                                                                <div class="d-flex">
                                                                                    <div class="flex-shrink-0 avatar-xs">
                                                                                        <div
                                                                                            class="avatar-title bg-light text-muted rounded-circle">
                                                                                            <i
                                                                                                class="ri-calendar-check-line"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex-grow-1 ms-3">
                                                                                        <h6 class="fs-14 mb-1">
                                                                                            Nancy Martino
                                                                                        </h6>
                                                                                        <small class="text-muted">Commented
                                                                                            on 12:57PM</small>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div id="collapseFour"
                                                                            class="accordion-collapse collapse show"
                                                                            aria-labelledby="headingFour"
                                                                            data-bs-parent="#accordionExample">
                                                                            <div
                                                                                class="accordion-body ms-2 ps-5 fst-italic">
                                                                                " A wonderful serenity has
                                                                                taken possession of my
                                                                                entire soul, like these
                                                                                sweet mornings of spring
                                                                                which I enjoy with my whole
                                                                                heart. Each design is a new,
                                                                                unique piece of art birthed
                                                                                into this world, and while
                                                                                you have the opportunity to
                                                                                be creative and make your
                                                                                own style choices. "
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--end accordion-->
                                                            </div>
                                                        </div><!-- end card body -->
                                                    </div><!-- end card -->
                                                </div><!-- end col -->
                                            </div><!-- end row -->
                                        </div>
                                        <!--end col-->
                                    </div>
                                    <!--end card-->
                                </div>
                                <!--end tab-pane-->
                                <div class="tab-pane fade" id="projects" role="tabpanel">
                                    <div class="row">
                                        <!--end col-->
                                        <div class="col-xxl-9">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="card">
                                                        <div class="card-header align-items-center d-flex">
                                                            <h4 class="card-title mb-0  me-2">Les signes vitaux</h4>
                                                        </div>
                                                        <div class="card-body">
                                                            <div class="profile-timeline">
                                                                <div class="accordion accordion-flush" id="todayExample">
                                                                    <div class="accordion-item border-0">
                                                                        <div class="accordion-header" id="headingFour">
                                                                            <a class="accordion-button p-2 shadow-none"
                                                                                data-bs-toggle="collapse"
                                                                                href="#collapseFour" aria-expanded="true">
                                                                                <div class="d-flex">
                                                                                    <div class="flex-shrink-0 avatar-xs">
                                                                                        <div
                                                                                            class="avatar-title bg-light text-muted rounded-circle">
                                                                                            <i
                                                                                                class="ri-calendar-check-line"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex-grow-1 ms-3">
                                                                                        <h6 class="fs-14 mb-1">
                                                                                            Nancy Martino
                                                                                        </h6>
                                                                                        <small class="text-muted">Commented
                                                                                            on 12:57PM</small>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div id="collapseFour"
                                                                            class="accordion-collapse collapse show"
                                                                            aria-labelledby="headingFour"
                                                                            data-bs-parent="#accordionExample">
                                                                            <div
                                                                                class="accordion-body ms-2 ps-5 fst-italic">
                                                                                " A wonderful serenity has
                                                                                taken possession of my
                                                                                entire soul, like these
                                                                                sweet mornings of spring
                                                                                which I enjoy with my whole
                                                                                heart. Each design is a new,
                                                                                unique piece of art birthed
                                                                                into this world, and while
                                                                                you have the opportunity to
                                                                                be creative and make your
                                                                                own style choices. "
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="accordion-item border-0">
                                                                        <div class="accordion-header" id="headingFive">
                                                                            <a class="accordion-button p-2 shadow-none"
                                                                                data-bs-toggle="collapse"
                                                                                href="#collapseFive" aria-expanded="true">
                                                                                <div class="d-flex">
                                                                                    <div class="flex-shrink-0 avatar-xs">
                                                                                        <div
                                                                                            class="avatar-title bg-light text-muted rounded-circle">
                                                                                            <i
                                                                                                class="ri-calendar-check-line"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex-grow-1 ms-3">
                                                                                        <h6 class="fs-14 mb-1">
                                                                                            Nancy Martino
                                                                                        </h6>
                                                                                        <small class="text-muted">Commented
                                                                                            on 12:57PM</small>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div id="collapseFive"
                                                                            class="accordion-collapse collapse show"
                                                                            aria-labelledby="headingFour"
                                                                            data-bs-parent="#accordionExample">
                                                                            <div
                                                                                class="accordion-body ms-2 ps-5 fst-italic">
                                                                                " A wonderful serenity has
                                                                                taken possession of my
                                                                                entire soul, like these
                                                                                sweet mornings of spring
                                                                                which I enjoy with my whole
                                                                                heart. Each design is a new,
                                                                                unique piece of art birthed
                                                                                into this world, and while
                                                                                you have the opportunity to
                                                                                be creative and make your
                                                                                own style choices. "
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--end accordion-->
                                                            </div>
                                                        </div><!-- end card body -->
                                                    </div><!-- end card -->
                                                </div><!-- end col -->
                                            </div><!-- end row -->
                                        </div>
                                        <!--end col-->
                                    </div>
                                </div>
                                <!--end tab-pane-->
                                <div class="tab-pane fade" id="documents" role="tabpanel">
                                    <div class="row">
                                        <!--end col-->
                                        <div class="col-xxl-9">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="card">
                                                        <div class="card-header align-items-center d-flex">
                                                            <h4 class="card-title mb-0  me-2">Les signes vitaux</h4>

                                                        </div>
                                                        <div class="card-body">
                                                            <div class="profile-timeline">
                                                                <div class="accordion accordion-flush" id="todayExample">
                                                                    <div class="accordion-item border-0">
                                                                        <div class="accordion-header" id="headingFour">
                                                                            <a class="accordion-button p-2 shadow-none"
                                                                                data-bs-toggle="collapse"
                                                                                href="#collapseFour" aria-expanded="true">
                                                                                <div class="d-flex">
                                                                                    <div class="flex-shrink-0 avatar-xs">
                                                                                        <div
                                                                                            class="avatar-title bg-light text-muted rounded-circle">
                                                                                            <i
                                                                                                class="ri-calendar-check-line"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex-grow-1 ms-3">
                                                                                        <h6 class="fs-14 mb-1">
                                                                                            Nancy Martino
                                                                                        </h6>
                                                                                        <small class="text-muted">Commented
                                                                                            on 12:57PM</small>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div id="collapseFour"
                                                                            class="accordion-collapse collapse show"
                                                                            aria-labelledby="headingFour"
                                                                            data-bs-parent="#accordionExample">
                                                                            <div
                                                                                class="accordion-body ms-2 ps-5 fst-italic">
                                                                                " A wonderful serenity has
                                                                                taken possession of my
                                                                                entire soul, like these
                                                                                sweet mornings of spring
                                                                                which I enjoy with my whole
                                                                                heart. Each design is a new,
                                                                                unique piece of art birthed
                                                                                into this world, and while
                                                                                you have the opportunity to
                                                                                be creative and make your
                                                                                own style choices. "
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--end accordion-->
                                                            </div>
                                                        </div><!-- end card body -->
                                                    </div><!-- end card -->
                                                </div><!-- end col -->
                                            </div><!-- end row -->
                                        </div>
                                        <!--end col-->
                                    </div>
                                </div>
                                <!--end tab-pane-->
                            </div>
                            <!--end tab-content-->
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

        <div class="customizer-setting d-block">
            <div class="btn-secondary text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$router.go(-1)">
                <i class="ri-arrow-go-back-fill  fs-22"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MedicalDocPage",

    computed: {
        doc() {
            return this.$store.getters['services/GET_PATIENT_DOC']
        }
    },
}
</script>