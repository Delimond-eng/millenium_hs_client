<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Assignation patient</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header align-items-start justify-content-center d-flex flex-column mb-0">
                                <h4 class="card-title mb-0 flex-grow-1">Assignez un patient à un médecin</h4>
                                <p class="mt-2 text-muted">Veuillez sélectionner le patient dont vous voulez assigner puis
                                    sélectionner un médecin concerné !
                                    !</p>
                            </div>
                            <div class="card-body">
                                <div class="row d-flex align-items-center justify-content-center align-content-center">
                                    <div class="col-md-8">
                                        <div class="row">
                                            <div class="col-lg-6">

                                                <label for="patientCode" class="form-label">Sélectionnez un patient concerné
                                                    <sup class="text-danger">*</sup></label>
                                                <select class="patient-select2 select2" name="state">
                                                    <option>--Sélectionnez un patient--</option>
                                                    <option value="AL">Alabama</option>
                                                    <option value="MA">Madrid</option>
                                                    <option value="TO">Toronto</option>
                                                    <option value="LO">Londan</option>
                                                    <option value="WY">Wyoming</option>
                                                </select>
                                            </div>
                                            <div class="col-lg-6">
                                                <label for="patientCode" class="form-label">Sélectionnez le médecin concerné
                                                    <sup class="text-danger">*</sup></label>
                                                <select class="med-select2 select2" name="state">
                                                    <option>--Sélectionnez le médecin--</option>
                                                    <option value="AL">Alabama</option>
                                                    <option value="MA">Madrid</option>
                                                    <option value="TO">Toronto</option>
                                                    <option value="LO">Londan</option>
                                                    <option value="WY">Wyoming</option>
                                                </select>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="row d-flex align-content-center justify-content-center">
                                                    <div class="col-md-6">
                                                        <div
                                                            class="d-flex align-items-center justify-content-center w-100 mt-4">

                                                            <button type="button"
                                                                class="btn btn-success btn-border btn-label right nexttab nexttab me-4 w-100 flex-fill"><i
                                                                    class="ri-link label-icon align-middle fs-16 ms-2 "></i>Assigner</button>

                                                            <button type="button"
                                                                class="btn btn-light btn-border btn-label right flex-fill w-100"><i
                                                                    class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                                                Annuler</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- end col -->
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
            <div class="btn-info text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$router.push('/home/patients/list')">
                <i class="ri-list-check-2 fs-22"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PatientAssign",
    data() {
        return {
            selectPatient: null,
            selectMedecin: null,
        }
    },
    unmounted() {
        this.selectPatient.select2('destroy');
        this.selectMedecin.select2('destroy');
    },
    mounted() {
        this.selectPatient = $(".patient-select2").select2();
        this.selectMedecin = $(".med-select2").select2();
    }
}
</script>