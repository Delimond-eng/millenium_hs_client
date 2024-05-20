<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Premiers soins</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title mb-0 flex-grow-1 fs-12">
                                    Veuillez renseigner toutes les informations requises pour effectuer
                                    cette opération !
                                </h4>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="submitForm" class="row">
                                    <div class="col-md-7">
                                        <label for="patientCode" class="form-label fw-semibold">Sélectionnez un patient
                                            concerné
                                            <sup class="text-danger">*</sup></label>
                                        <div class="d-flex">
                                            <select class="patient-select2 select2 flex-fill" required>
                                                <option></option>
                                            </select>
                                            <!-- <button class="btn btn-icon btn-soft-secondary ms-2"> <i
                                                    class="ri-add-line"></i></button> -->
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <label>Date & heure <sup class="text-danger">*</sup></label>
                                        <div class="d-flex">
                                            <input type="date" v-model="form.date" class="form-control flex-fill me-2"
                                                required />
                                            <input type="time" v-model="form.heure" class="form-control"
                                                style="width: 80px" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mt-2">
                                        <label>Motif <span class="text-danger">*</span></label>
                                        <textarea class="form-control" v-model="form.motif"
                                            placeholder="Entrer le motif du premier soin ..."></textarea>
                                    </div>
                                    <div class="col-md-6 mt-2">
                                        <label>Observation <span class="text-danger">(optionnel)</span></label>
                                        <textarea v-model="form.obs" class="form-control"
                                            placeholder="Observation..."></textarea>
                                    </div>

                                    <div class="col-md-12 mt-2">
                                        <label>Traitements <sup class="text-danger">*</sup></label>
                                        <div class="row mb-2" v-for="(item, index) in traitements" :key="index">
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    <input type="text" class="form-control flex-fill me-2"
                                                        placeholder="Traitement..."
                                                        v-model="item.ps_traitement_libelle" />
                                                    <select class="form-select" v-model="item.ps_traitement_type"
                                                        style="width: 120px" required>
                                                        <option label="Type" selected hidden></option>
                                                        <option value="Comprimés">Comprimés</option>
                                                        <option value="Comprimés">Injectables</option>
                                                        <option value="Gélules">Gélules</option>
                                                        <option value="Sirops">Sirops</option>
                                                        <option value="Solutions buvables">Solutions buvables</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    <input type="number" class="form-control flex-fill me-2"
                                                        placeholder="Dosage" v-model="item.ps_traitement_dosage" />
                                                    <select class="form-select" v-model="item.ps_traitement_unite"
                                                        style="width: 120px" required>
                                                        <option label="unité" selected hidden></option>
                                                        <option value="mg">mg</option>
                                                        <option value="µg">µg</option>
                                                        <option value="mL">mL</option>
                                                        <option value="Goutte">Goutte</option>
                                                    </select>
                                                    <button @click="
                                    traitements.push({
                                        ps_traitement_libelle: '',
                                        ps_traitement_type: '',
                                        ps_traitement_dosage: '',
                                        ps_traitement_unite: '',
                                    })
                                    " style="width: 50px" class="btn btn-icon ms-1 btn-secondary">
                                                        <i class="ri-add-line"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <bs-toast id="errorsToastPs" :msg="errors_msg" />
                                        <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                                            <button type="button" @click="clean"
                                                class="btn btn-light btn-border btn-label right me-2">
                                                <i class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                                Annuler
                                            </button>

                                            <load-button btn-type="submit" :loading="formLoading"
                                                class-name="btn-success btn-border btn-label right nexttab nexttab "><i
                                                    class="ri-check-double-line label-icon align-middle fs-16 ms-2"></i>Valider
                                                & sauvegarder</load-button>
                                        </div>
                                    </div>
                                </form>
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
                    <div class="col-sm-6">© Millenium HS</div>
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
                @click="$router.push({ name: 'premiers-soins-list' })">
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
            traitements: [
                {
                    ps_traitement_libelle: "",
                    ps_traitement_type: "",
                    ps_traitement_dosage: "",
                    ps_traitement_unite: "",
                },
            ],
            form: {
                date: "",
                heure: "",
                motif: "",
                obs: "",
                patient_id: "",
            },
            formLoading: false,
            errors_msg: "",
        };
    },
    methods: {
        clean() {
            this.traitements = [
                {
                    ps_traitement_libelle: "",
                    ps_traitement_type: "",
                    ps_traitement_dosage: "",
                    ps_traitement_unite: "",
                },
            ];
            this.form.date = "";
            this.form.heure = "";
            this.form.motif = "";
            this.form.obs = "";
            this.form.patient_id = "";
        },

        submitForm(e) {
            this.formLoading = true;
            let datas = {};
            datas.traitements = this.traitements;
            datas.premier_soin_date_heure = `${this.form.date} ${this.form.heure}`;
            datas.premier_soin_motif = this.form.motif;
            datas.premier_soin_obs = this.form.obs;
            datas.patient_id = this.form.patient_id;
            this.formLoading = true;
            this.$store
                .dispatch("services/createPremiersoins", datas)
                .then((res) => {
                    console.log(JSON.stringify(res));
                    this.formLoading = false;
                    if (res.status !== undefined) {
                        Swal.fire({
                            position: "bottom-end",
                            icon: "success",
                            title: "Premiers soins administrés avec succès !",
                            toast: true,
                            showConfirmButton: false,
                            timer: 3000,
                            showCloseButton: false,
                        });
                        this.clean();
                    }
                    if (res.errors !== undefined) {
                        console.log(JSON.stringify(res));
                        this.errors_msg = res.errors.toString();
                        let toast = document.getElementById("errorsToastPs");
                        new bootstrap.Toast(toast, { delay: 1500 }).show();
                    }
                })
                .catch((err) => {
                    this.formLoading = false;
                    console.log(JSON.stringify(err));
                });
        },
    },
    unmounted() {
        if (this.selectPatient !== null) this.selectPatient.select2("destroy");
    },
    async mounted() {
        let self = this;
        this.selectPatient = $(".patient-select2").select2({
            placeholder: "chargement des patients en cours...",
        });
        let patients = await this.$store.dispatch("services/viewPatientsPending");
        this.selectPatient = $(".patient-select2")
            .select2({
                placeholder: "Sélectionner un patient...",
                data: $.map(patients, function (item) {
                    return {
                        text: `${item.patient_code} ${item.patient_nom} ${item.patient_prenom}`,
                        id: item.id,
                    };
                }),
            })
            .on("change", function (e) {
                self.form.patient_id = $(this).val();
            });
    },
};
</script>
