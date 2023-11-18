<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Consultation</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title mb-0 flex-grow-1">Consultation du patient</h4>
                            </div>
                            <div class="card-body">
                                <div class="row ">
                                    <div class="col-md-12">
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

                                    <div class="col-md-12 mt-2">
                                        <label for="consultMotif" class="form-label">Motif de la consultation
                                            <sup class="text-danger">*</sup></label>
                                        <textarea class="form-control" id="consultMotif"
                                            placeholder="Entrer le motif de la consultation..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body text-muted">
                                <h5 class="fs-14 text-start mb-3">Consultation détails</h5>
                                <div class="row d-flex mt-2" v-for="(detail, index) in consultDetails" :key="index">
                                    <div class="col-md-5">
                                        <div>
                                            <label for="iconrightInput" class="form-label">Désignation</label>
                                            <div class="form-icon right">
                                                <input type="text" class="form-control form-control-icon"
                                                    id="iconrightInput" placeholder="Entrer la designation..."
                                                    v-model="detail.title">
                                                <i class="bx bx-body"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div>
                                            <label for="iconrightInput" class="form-label">Valeur</label>
                                            <div class="form-icon right">
                                                <input type="text" class="form-control form-control-icon"
                                                    id="iconrightInput" placeholder="Entrer la valeur..."
                                                    v-model="detail.value">
                                                <i class="bx bx-body"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 align-items-end">
                                        <div>
                                            <label for="iconrightInput" class="form-label "
                                                style="visibility: hidden;">Actions</label>
                                            <div class="d-flex">
                                                <button class="btn btn-info btn-border me-1"
                                                    @click.prevent="consultDetails.push({ title: '', value: '' })"><i
                                                        class="ri-add-line"></i></button>
                                                <button class="btn btn-light btn-border me-1"
                                                    @click.prevent="consultDetails.splice(index, 1)"><i
                                                        class="ri-close-line"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="d-flex align-items-center justify-content-center w-100 mt-4">
                                    <button type="button"
                                        class="btn btn-success btn-border btn-label right nexttab nexttab me-4 w-100 flex-fill"><i
                                            class="ri-check-double-line label-icon align-middle fs-16 ms-2 "></i>Soumettre
                                        la
                                        consultation</button>

                                    <button type="button"
                                        class="btn btn-light btn-border btn-label right flex-fill w-100"><i
                                            class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                        Annuler</button>
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
                @click.prevent="$router.push('/home/consults/list')">
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
            consultDetails: [
                {
                    title: '',
                    value: ''
                }
            ]
        }
    },
    unmounted() {
        this.selectPatient.select2('destroy');
    },
    mounted() {
        this.selectPatient = $(".patient-select2").select2();
    }
}
</script>