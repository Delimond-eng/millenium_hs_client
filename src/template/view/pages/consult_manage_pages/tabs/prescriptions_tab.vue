<template>
    <!--end tab-pane-->
    <div class="tab-pane fade" id="custom-v-pills-messages" role="tabpanel" aria-labelledby="custom-v-pills-messages-tab">
        <h6 class="fs-14 text-start mb-2 mt-3 text-primary">Veuillez prescrire le
            patient !</h6>
        <div class="border border-dashed"></div>

        <form @submit.prevent="submitFormPrescriptions">
            <div class="row d-flex mt-2 p-2 text-dark">
                <div class="col-md-6">
                    <label for="traitement">Traitement <sup class="text-danger">*</sup></label>
                    <div class="d-flex">
                        <input type="text" class="form-control flex-fill me-2" v-model="inputs.traitement"
                            placeholder="Traitement...">
                        <select class="form-select" style="width: 120px;" v-model="inputs.traitement_type">
                            <option label="Type" selected hidden></option>
                            <option value="Comprimés">Comprimés</option>
                            <option value="Comprimés">Injectables</option>
                            <option value="Gélules">Gélules</option>
                            <option value="Sirops">Sirops</option>
                            <option value="Solutions buvables">Solutions buvables
                            </option>
                        </select>
                    </div>

                </div>
                <div class="col-md-6">
                    <label for="traitement">Durée de traitement <sup class="text-danger">*</sup></label>
                    <div class="d-flex">
                        <input type="number" v-model="inputs.duree" class="form-control flex-fill me-2"
                            placeholder="Durée en nombre...">
                        <select class="form-select" style="width: 120px;" v-model="inputs.duree_unite">
                            <option label="Unité" selected hidden></option>
                            <option value="Jours">Jours</option>
                            <option value="Semaines">Semaines</option>
                            <option value="Mois">Mois</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-6 mt-2">
                    <label for="dosage">Dosage <sup class="text-danger">*</sup></label>
                    <div class="d-flex">
                        <input type="number" v-model="inputs.dosage" class="form-control flex-fill me-2"
                            placeholder="Dosage">
                        <select class="form-select" style="width:120px" v-model="inputs.dosage_unite" required>
                            <option label="unité" selected hidden></option>
                            <option value="mg">mg</option>
                            <option value="µg">µg</option>
                            <option value="mL">mL</option>
                            <option value="Goutte">Goutte</option>
                        </select>
                    </div>

                </div>


                <div class="col-md-1 mt-2">
                    <label for="dosage" style="visibility: hidden">..</label>
                    <input type="text" value="X" readOnly class="form-control text-center">
                </div>
                <div class="col-md-5 mt-2">
                    <label for="traitement">Fréquence <sup class="text-danger">*</sup></label>
                    <div class="d-flex">
                        <input type="number" v-model="inputs.frequence" class="form-control flex-fill me-2"
                            placeholder="Freq.... ">
                        <select class="form-select me-2" style="width: 120px;" v-model="inputs.frequence_unite">
                            <option label="Unité" selected hidden></option>
                            <option value="Jours">Jour</option>
                            <option value="Semaines">Semaine</option>
                            <option value="Mois">Mois</option>
                        </select>
                        <button type="button" @click.prevent="addTempItem" style="width: 70px;"
                            class="btn btn-soft-primary btn-icon"><i class="ri-add-line"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Small Tables -->
            <table class="table table-sm table-nowrap text-dark mt-2" v-if="tempPrescriptions.length > 0">
                <thead class="bg-primary text-white">
                    <tr>
                        <th scope="col">Traitement</th>
                        <th scope="col">Type</th>
                        <th scope="col">Durée de traitement</th>
                        <th scope="col">Dosage</th>
                        <th scope="col">Fréquence/unité</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody class="text-dark">
                    <tr v-for="(data, index) in tempPrescriptions" :key="index">
                        <td>{{ data.traitement }}</td>
                        <td>{{ data.traitement_type }}</td>
                        <td>{{ data.duree }} {{ data.duree_unite }}</td>
                        <td>{{ data.dosage }} {{ data.dosage_unite }}</td>
                        <td>{{ data.frequence }} / {{ data.frequence_unite }}</td>
                        <td><button @click.prevent="tempPrescriptions.splice(index, 1)"
                                class="btn btn-soft-danger btn-sm btn-icon"><i class="ri-delete-bin-line"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>


            <bs-toast id="errorsToast5" :msg="errors_msg" />
            <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                <button type="button" class="btn btn-light btn-border btn-label right me-2"><i
                        class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                    Annuler</button>

                <load-button btn-type="submit" :loading="formLoadingPrescriptions"
                    class-name="btn-success btn-border btn-label right nexttab nexttab "><i
                        class="ri-check-double-line label-icon align-middle fs-16 ms-2 "></i>Valider
                    Soumettre la préscription</load-button>
            </div>
        </form>
    </div>
    <!--end tab-pane-->
</template>


<script>
export default {
    name: 'PrescriptionsTab',
    data() {
        return {
            formLoadingPrescriptions: false,
            inputs: {
                traitement: '',
                traitement_type: '',
                duree: '',
                duree_unite: '',
                dosage: '',
                dosage_unite: '',
                frequence: '',
                frequence_unite: '',
            },
            tempPrescriptions: []
        }
    },

    methods: {
        submitFormPrescriptions(e) {
            if (this.currentConsult === null) {

                this.errors_msg =
                    "Veuillez consulter le patient avant de le prescrire !";
                let toast = document.getElementById("errorsToast5");
                new bootstrap.Toast(toast, { delay: 2000 }).show();
                return;
            }
            let user = JSON.parse(localStorage.getItem("user-data"));
            for (let p of this.tempPrescriptions) {
                p.consult_id = this.currentConsult.id;
                p.hopital_id = user.hopital.id;
                p.emplacement_id = user.hopital.emplacement.id;
                p.created_by = user.id;
            }
            let form = {
                prescriptions: this.tempPrescriptions,
            };

            this.formLoadingPrescriptions = true;
            this.$store
                .dispatch("services/addPrescriptions", form)
                .then((res) => {
                    console.log(JSON.stringify(res));
                    this.formLoadingPrescriptions = false;
                    if (res.status !== undefined) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Prescriptions ajoutées avec succès !",
                            showConfirmButton: false,
                            timer: 3000,
                            showCloseButton: false,
                        });
                        $('#examens-tab').click();
                    }
                    if (res.errors !== undefined) {
                        console.log(JSON.stringify(res));
                        this.errors_msg = res.errors.toString();
                        let toast = document.getElementById("errorsToast5");
                        new bootstrap.Toast(toast, { delay: 2000 }).show();
                    }
                })
                .catch((err) => {
                    this.formLoadingPrescriptions = false;
                    console.log(JSON.stringify(err));
                });
        },

        addTempItem() {
            let data = this.inputs;
            this.tempPrescriptions.push({
                traitement: data.traitement,
                traitement_type: data.traitement_type,
                duree: data.duree,
                duree_unite: data.duree_unite,
                dosage: data.dosage,
                dosage_unite: data.dosage_unite,
                frequence: data.frequence,
                frequence_unite: data.frequence_unite,
            });
            this.clean();
        },

        clean() {
            this.inputs.traitement = '';
            this.inputs.traitement_type = '';
            this.inputs.duree = '';
            this.inputs.duree_unite = '';
            this.inputs.dosage = '';
            this.inputs.dosage_unite = '';
            this.inputs.frequence = '';
            this.inputs.frequence_unite = '';
        }
    },



    props: {
        currentConsult: {
            type: Object,
            default: () => { }
        },
        selectedPatient: {
            type: Object,
            default: () => { }
        }
    }
}
</script>