<template>
    <div id="hospitalisations" role="tabpanel">
        <div class="row">
            <div class="col-12 col-md-12 mb-2">
                <div class=" d-sm-flex align-items-center justify-content-between">
                    <h5 class="mb-sm-0 text-uppercase fw-semibold">Hospitalisation des patients<sup
                            class="text-danger text-lowercase fw-normal"></sup>
                    </h5>
                    <button @click="$showBsModal('hospitalisationCreateModal')" class="btn btn-soft-success"><i
                            class="ri-add-line me-1"></i> Nouvelle hospitalisation</button>
                </div>
            </div>

            <div class="col-md-12 mb-3">
                <div class="search-box">
                    <input type="text" class="form-control" v-model="search" id="searchMemberList"
                        placeholder="Recherche patient...">
                    <i class="ri-search-line search-icon"></i>
                </div>
            </div>

            <div class="col-md-12">
                <div class="table-responsive table-card text-center">
                    <table class="table align-middle table-nowrap table-striped-columns mb-0 mt-2">
                        <thead class="table-light">
                            <tr>
                                <th scope="col">Date & heure admission</th>
                                <th scope="col">Date & heure fin</th>
                                <!-- <th scope="col">Raison d'admission</th> -->
                                <th scope="col">Numéro lit</th>
                                <th scope="col">Nbre jrs</th>
                                <th scope="col">Jrs restants</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Service</th>
                                <th scope="col">Responsable</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in datas.hospitalisations" :key="index">
                                <td>{{ data.hospitalisation_start_At }}</td>
                                <td>{{ data.hospitalisation_end_At }}</td>
                                <!--  <td>{{ data.hospitalisation_raison_admission }}</td> -->
                                <td><span v-if="data.lit">{{ data.lit.lit_numero }}</span></td>
                                <td class="fw-medium">{{ data.count.toString().padStart(2, '0') }}</td>
                                <td class="fw-medium" :class="data.count_rest === 0 ? 'text-danger' : 'text-success'">{{
                                    data.count_rest.toString().padStart(2, '0') }}</td>
                                <td><span v-if="data.patient"><span class="fw-medium">{{ data.patient.patient_code }}</span>
                                        {{ data.patient.patient_nom }}
                                        {{ data.patient.patient_prenom }}</span></td>
                                <td><span v-if="data.lit.service">{{ data.lit.service.service_libelle }}</span></td>
                                <td><span v-if="data.agent"><span class="fw-medium">{{ data.agent.agent_matricule }}</span>
                                        {{ data.agent.agent_nom }} {{
                                            data.agent.agent_prenom }}</span></td>
                                <td :class="data.count_rest <= 0 ? 'text-warning' : 'text-success'"><i
                                        class="ri-checkbox-blank-circle-fill fs-17 align-middle"></i>
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-load btn-sm me-1" @click="triggerTranfert(data)">
                                        <span> Transferer</span>
                                    </button>
                                    <button class="btn btn-warning btn-load btn-sm me-1">
                                        <!-- <svg-loading v-if="loaded === data.consult_id" color="#13b69f"
                                            size="18"></svg-loading> -->
                                        <span>Clôturer</span>
                                    </button>
                                    <button class="btn btn-soft-danger btn-sm btn-icon">
                                        <!-- <svg-loading v-if="loadedDetail === data.consult_id" color="#0C8BCF"
                                            size="18"></svg-loading> -->
                                        <i class="ri-delete-bin-3-line"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <state-empty v-if="datas.hospitalisations === undefined || datas.hospitalisations.length === 0"
                        title="Données non disponible !" description="Aucune hospitalisation répertorié !"></state-empty>
                </div>
            </div>
        </div>
    </div>

    <!-- modal create new -->
    <teleport to="body">
        <div id="hospitalisationCreateModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Creation de l'hospitalisation du patient</h5>
                        <p class="text-white-50">Veuillez renseigner tous les champs pour effectuer cette opération !</p>
                    </div>
                    <div class="modal-body  p-4">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">Date & heure admission <sup class="text-danger">*</sup> </label>
                                <div class="d-flex">
                                    <input type="date" v-model="form_leading.start_at.date"
                                        class="form-control me-1 flex-fill" id="exampleInputEmail1" required>
                                    <input type="time" class="form-control flex-grow-0" style="width: 100px;"
                                        v-model="form_leading.start_at.hour">
                                </div>
                            </div>
                            <div class="mb-2 col-md-6">
                                <label for="hsnom">Date & heure fin admission <sup class="text-danger">*</sup> </label>
                                <div class="d-flex">
                                    <input type="date" v-model="form_leading.end_at.date"
                                        class="form-control me-1 flex-fill" id="exampleInputEmail1" required>
                                    <input type="time" class="form-control flex-grow-0" style="width: 100px;"
                                        v-model="form_leading.end_at.hour">
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="hsnom">Patient concerné <sup class="text-danger">*</sup> </label>
                                <select class="w-100" id="patientSelect">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div>
                                    <label for="iconInputNom" class="form-label">Lit concerné <sup
                                            class="text-danger">*</sup></label>
                                    <select class="form-select" v-model="form.lit_id">
                                        <option label="Sélectionner un lit..." selected hidden></option>
                                        <option v-for="(item, index) in datas.litDispos" :key="index" :value="item.id">
                                            {{
                                                item.lit_numero }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div>
                                    <label for="iconInputNom" class="form-label">Service/emplacement <sup
                                            class="text-danger">*</sup></label>
                                    <select class="form-select" v-model="form.service_id">
                                        <option label="Sélectionner un service..." selected hidden></option>
                                        <option v-for="(item, index) in configs.services" :key="index" :value="item.id">
                                            {{
                                                item.service_libelle }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="hsnom">Responsable de service <sup class="text-danger">*</sup> </label>
                                <select class="w-100" id="agentSelect">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="reason">Raison admission</label>
                                <textarea class="form-control" placeholder="Entrer la raison d'admission..."
                                    v-model="form.hospitalisation_raison_admission"></textarea>
                            </div>

                            <div class="col-md-12">
                                <!-- show some errors -->
                                <bs-toast id="borderedToastErrors81" :msg="errors_msg" />
                                <!-- buttons -->
                                <div class="d-flex justify-content-end align-items-end">
                                    <button type="button"
                                        @click.prevent="$closeBsModal('hospitalisationCreateModal'); abort();"
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
    <!-- modal end -->


    <!-- modal transfert -->
    <teleport to="body">
        <div id="transfertModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="modal-body login-modal p-4">
                        <h5 class="text-white fs-20">Transfert de patient</h5>
                        <p class="text-white-50">Veuillez sélectionnez un lit de destination pour transférer un patient !
                        </p>
                    </div>
                    <div class="modal-body  p-2">
                        <form class="row m-0" @submit.prevent='submitTransfert'>
                            <div class="mb-2 col-md-12">
                                <label for="hsnom">Date & heure admission <sup class="text-danger">*</sup> </label>
                                <div class="d-flex">
                                    <input type="date" v-model="form_leading.start_at.date"
                                        class="form-control me-1 flex-fill" id="exampleInputEmail1" required>
                                    <input type="time" class="form-control flex-grow-0 me-2" style="width: 100px;"
                                        v-model="form_leading.start_at.hour" required>
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn btn-success w-25 btn-border text-uppercase">Transférer</load-button>
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="hsnom">Raison de transfert <sup class="text-danger">*</sup> </label>
                                <textarea class="form-control" v-model="form_transfert.transfert_raison"
                                    placeholder="Saisir la raison du tranfert..." required></textarea>

                                <bs-toast id="borderedToastErrors82" :msg="errors_msg" />
                                <!-- buttons -->

                            </div>
                        </form>
                        <div class="row">
                            <label :for="`check_${index}`" class="col-md-3 form-check form-check-success"
                                v-for="(data, index) in datas.litDispos" :key="index">
                                <div
                                    class="card card-height-100 ribbon-box ribbon-fill right border shadow-none cursor-pointer">
                                    <div class="card-body">
                                        <input class="form-check-input position-absolute" style="top:10px; left:30px"
                                            type="checkbox" :id="`check_${index}`" @change="checkSelect(data, $event)">
                                        <div class="ribbon fs-10 fw-bold"
                                            :class="data.lit_status.includes('dispo') ? 'ribbon-success' : 'ribbon-warning'">
                                            {{ data.lit_status.includes('dispo') ? 'Dispo' :
                                                data.lit_status }}
                                        </div>
                                        <div class="ribbon-content">

                                            <div class="mb-4 pb-2">
                                                <img :src="data.lit_status.includes('dispo') ?
                                                    'assets/images/companies/hospital-bed-2.png' :
                                                    'assets/images/companies/hospital-bed-3.png'" alt=""
                                                    class="avatar-md">
                                            </div>
                                            <h6 class="fs-15 fw-bold mb-1">Lit n° {{ data.lit_numero
                                            }}
                                            </h6>
                                            <span v-if="data.type" class="text-info fs-10 mb-2 fw-semibold">{{
                                                data.type.type_libelle
                                            }}</span>
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <span class="fs-12"><i class=" ri-hospital-line me-1 align-bottom"></i>
                                                        <span v-if="data.service">{{
                                                            data.service.service_libelle }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <state-empty v-if="datas.litDispos === undefined || datas.litDispos.length === 0"
                            title="Aucune information répertoriée !"
                            description="Il n'y a aucun lit disponible pour l'instant !"></state-empty>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
    <!-- modal end -->
</template>

<script>
export default {
    name: "hospitalisationsTab",
    data() {
        return {
            form: {
                hospitalisation_start_At: "",
                hospitalisation_end_At: "",
                hospitalisation_raison_admission: "",
                patient_id: "",
                service_id: "",
                lit_id: "",
                service_responsable_id: "",
            },
            form_leading: {
                start_at: {
                    date: '',
                    hour: ''
                },
                end_at: {
                    date: '',
                    hour: ''
                }
            },
            errors_msg: '',
            formLoading: false,
            search: '',
            selectedBedId: '',
            selectedHospitalisationId: '',
            form_transfert: {
                hospitalisation_id: '',
                lit_origine_id: '',
                lit_destination_id: '',
                transfert_date_heure: "",
                transfert_raison: "",
            }
        }
    },

    methods: {
        submitForm(e) {
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.form.hospitalisation_start_At = `${this.form_leading.start_at.date} ${this.form_leading.start_at.hour}`;
            this.form.hospitalisation_end_At = `${this.form_leading.end_at.date} ${this.form_leading.end_at.hour}`;
            this.$store.dispatch('hospitalisation/addHospitalisation', this.form).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "Nouvelle hospitalisation créé avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('hospitalisation/viewAllDatas');
                    this.abort()
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastErrors81")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },
        submitTransfert(e) {
            this.formLoading = true;
            /**
             * Dispatch vuex action createHospital
             * @argument form this.form
            */
            this.form_transfert.transfert_date_heure = `${this.form_leading.start_at.date} ${this.form_leading.start_at.hour}`;
            this.$store.dispatch('hospitalisation/transfererLit', this.form_transfert).then((res) => {
                console.log(res);
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        toast: true,
                        title: "Transfert du lit effectué avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$store.dispatch('hospitalisation/viewAllDatas');
                    this.abort()
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("borderedToastErrors82")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch((err) => {
                this.formLoading = false
                console.log(JSON.stringify(err));
            });
        },
        checkSelect(data, event) {
            const checkboxes = document.querySelectorAll('.form-check-input');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            event.target.checked = true;
            this.form_transfert.lit_destination_id = data.id
        },
        triggerTranfert(data) {
            this.form_transfert.hospitalisation_id = data.id;
            this.form_transfert.lit_origine_id = data.lit_id;
            this.$showBsModal('transfertModal');
        },

        abort() {
            this.form_leading.end_at.date = "";
            this.form_leading.end_at.hour = "";
            this.form_leading.start_at.date = "";
            this.form_leading.start_at.hour = "";
            this.form.patient_id = "";
            this.form.service_id = "";
            this.form.hospitalisation_raison_admission = "";
            $("#agentSelect").val('').trigger('change');
            $("#patientSelect").val('').trigger('change');
        }
    },

    async mounted() {
        let self = this;
        $('#patientSelect').select2({
            placeholder: 'Chargement des patients en cours...',
        });
        $('#agentSelect').select2({
            placeholder: 'Chargement des agents en cours...',
        });
        let patients = await this.$store.dispatch('services/viewAllPatients');
        let agents = await this.$store.dispatch('services/viewAllAgents');
        $('#patientSelect').select2({
            dropdownParent: $('#hospitalisationCreateModal'),
            placeholder: 'Sélectionner un patient...',
            allowClear: true,
            data: $.map(patients, function (item) {
                return {
                    text: `${item.patient_code} ${item.patient_nom} ${item.patient_prenom}`,
                    id: item.id
                }
            })
        }).on('change', function (e) {
            self.form.patient_id = $(this).val();
        });

        $('#agentSelect').select2({
            dropdownParent: $('#hospitalisationCreateModal'),
            placeholder: 'Sélectionner un agent...',
            allowClear: true,
            data: $.map(agents, function (item) {
                return {
                    text: `${item.agent_matricule} ${item.agent_nom} ${item.agent_prenom}`,
                    id: item.id
                }
            })
        }).on('change', function (e) {
            self.form.service_responsable_id = $(this).val();
        });
    },
    computed: {
        datas() {
            return this.$store.getters['hospitalisation/GET_ALL_DATAS'];
        },
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        }
    }
}
</script>