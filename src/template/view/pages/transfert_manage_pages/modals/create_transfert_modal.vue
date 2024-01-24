<template>
    <teleport to="body">
        <div id="transfertsCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Nouveau tranfert </h5>
                        <p class="text-white-50">Veuillez renseigner les infos requises pour un transfert du patient...</p>
                    </div>
                    <div class="modal-body  p-4">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Patient <sup class="text-danger">*</sup> </label>
                                <select id="patientSelect" class="w-100">
                                    <option></option>
                                </select>
                            </div>
                            <div class="mb-2 col-md-8">
                                <label for="hsnom">Hopital concerné <sup class="text-danger">*</sup> </label>
                                <input type="text" v-model="form.transfert_hopital" class="form-control"
                                    id="exampleInputEmail1" placeholder="Entrer le nom de l'hopital concerné..." required>
                            </div>
                            <div class="mb-2 col-md-4">
                                <label for="hsnom">Date & heure du transfert <sup class="text-danger">*</sup> </label>
                                <div class="d-flex">
                                    <input type="date" v-model="date" class="form-control me-1 flex-fill"
                                        id="exampleInputEmail1" required>
                                    <input type="time" v-model="heure" class="form-control flex-grow-0 me-2"
                                        style="width: 100px;" required>
                                </div>
                            </div>
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Motif du transfert <sup class="text-danger">*</sup> </label>
                                <textarea v-model="form.transfert_motif" class="form-control"
                                    placeholder="Entrer le motif du transfert..."></textarea>
                            </div>

                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastTransferts" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button" @click.prevent="$closeBsModal('transfertsCreateModal')"
                                        class="btn btn-light btn-border btn-lg mt-2 text-uppercase me-2">Fermer</button>
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn btn-info btn-border btn-lg mt-2 text-uppercase">Créer</load-button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: 'ExamensConfigModal',
    data() {
        return {
            form: {
                transfert_hopital: '',
                transfert_motif: '',
                transfert_date: '',
                patient_id: ''
            },
            date: '',
            heure: '',
            formLoading: false,
            errors_msg: '',
            select: null
        }
    },
    async mounted() {
        this.$store.dispatch('services/showConfigs');

        //Initialisatiion du dropdown qui charge les patient dispo dans le systeme

        this.select = $('#patientSelect').select2({
            placeholder: 'Chargement patients...'
        });
        let self = this;
        let patients = await this.$store.dispatch('services/viewAllPatients');
        if (this.select !== null) this.select.select2('destroy');
        this.select = $('#patientSelect').select2({
            placeholder: 'Veuillez sélectionner un patient...',
            dropdownParent: $('#transfertsCreateModal'),
            data: $.map(patients, function (item) {
                return {
                    text: `${item.patient_code} : ${item.patient_nom} ${item.patient_prenom}`,
                    id: item.id
                }
            })
        }).on('change', function () {
            let id = $(this).val();
            self.form.patient_id = id;
        });
    },

    methods: {
        submitForm(e) {
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.form.transfert_date = `${this.date} ${this.heure}`;
            this.$store.dispatch('services/createTransfert', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "Le transfert du patient effectué avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$emit('reload');
                    this.form.transfert_hopital = '';
                    this.form.transfert_date = '';
                    this.form.transfert_motif = '';
                    this.form.patient_id = '';
                    this.date = '';
                    this.heure = '';
                    $("#patientSelect").val('').trigger('change');
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastTransferts")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },
        abort() {
            this.form.transfert_hopital = '';
            this.form.transfert_date = '';
            this.form.transfert_motif = '';
            this.form.patient_id = '';
            this.date = '';
            this.heure = '';
            $("#patientSelect").val('').trigger('change');
            this.$closeBsModal('transfertsCreateModal');
        },
    },
    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
    },
}
</script>