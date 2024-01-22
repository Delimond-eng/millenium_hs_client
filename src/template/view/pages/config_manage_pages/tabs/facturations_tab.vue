<template>
    <div role="tabpanel">
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-1">
                    <div class="card-body ">
                        <form class="row" @submit.prevent="submitForm">
                            <div class="col-md-12">
                                <label for="libelle">Facturation libellé <sup class="text-danger">*</sup></label>
                                <input type="text" v-model="form.libelle" class="form-control"
                                    placeholder="Saisir le libellé de la facturation..." required>
                            </div>
                            <div class="col-md-6 mt-2">
                                <label for="libelle">Facturation montant & devise <sup class="text-danger">*</sup></label>
                                <div class="d-flex">
                                    <input type="number" v-model="form.montant" class="form-control flex-fill me-2"
                                        placeholder="montant..." required>
                                    <select class="form-control" style="width: 120px;" v-model="form.montant_devise">
                                        <option value="CDF" selected>CDF</option>
                                        <option value="USD">USD</option>
                                        <option value="EURO">EURO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mt-2">
                                <label for="libelle">Emplacement <sup class="text-danger">*</sup></label>
                                <select class="form-select" v-model="form.emplacement_id" required>
                                    <option label="Sélectionnez un emplacement" selected hidden></option>
                                    <option v-for="(item, index) in configs.emplacements" :key="index" :value="item.id">{{
                                        item.hopital_emplacement_libelle }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-md-12 mt-2">
                                <bs-toast id="errorsToastFac" :msg="errors_msg" />
                                <div class="d-flex align-items-end justify-content-end w-100 mt-4">
                                    <button type="button" class="btn btn-light btn-border btn-label right me-2"><i
                                            class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                        Annuler</button>
                                    <load-button btn-type="submit" :loading="formLoading"
                                        class-name="btn-success btn-border btn-label right nexttab nexttab ">Soumettre la
                                        configuration <i
                                            class="ri-settings-line label-icon align-middle fs-16 ms-2 "></i></load-button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- <div class="card p-2 mt-0">
                    <table class="table table-sm table-nowrap text-dark mt-2">
                        <thead class="bg-primary text-white">
                            <tr>
                                <th scope="col">Designation</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Devise</th>
                                <th scope="col">Emplacement</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody class="text-dark">
                            <tr v-for="(item, index) in facturations" :key="index">
                                <td>{{ item.facturation_config_libelle }}</td>
                                <td>{{ item.facturation_config_montant }}</td>
                                <td>{{ item.facturation_config_montant_devise }}</td>
                                <td><span v-if="item.emplacement">{{ item.emplacement.hopital_emplacement_libelle }}</span>
                                </td>

                                <td><button class="btn btn-soft-danger btn-sm btn-icon"><i
                                            class="ri-delete-bin-line"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
                <div class="card">
                    <div class="card-body">
                        <custom-table v-if="isHopitalDefined"
                            :api-url="`http://127.0.0.1:8000/api/configs.facturations/all/${$user().hopital.id}`"
                            :columns="dataTableColumns" :data-src="'results'" ref="customTableFacturations"
                            :action-buttons="actionButtons" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "FacturationConfig",
    data() {
        return {
            formLoading: false,
            errors_msg: '',
            form: {
                libelle: '',
                montant: '',
                montant_devise: 'CDF',
                emplacement_id: '',
            },
            dataTableColumns: [
                { data: 'facturation_config_libelle', title: "Libelle facture" },
                { data: 'facturation_config_montant', title: 'Montant' },
                { data: 'facturation_config_montant_devise', title: 'devise' },
                { data: 'emplacement.hopital_emplacement_libelle', title: 'Emplacement' }
            ],
            actionButtons: [
                { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger', key: 'delete' },
            ],
        }
    },
    methods: {
        submitForm(e) {
            this.formLoading = true;
            this.$store.dispatch('services/configFacturation', this.form).then((res) => {
                this.formLoading = false;
                if (res.status !== undefined) {
                    Swal.fire({
                        position: "bottom-end",
                        icon: "success",
                        toast: true,
                        title: "Facturation configurée avec succès !",
                        showConfirmButton: false,
                        timer: 3000,
                        showCloseButton: false,
                    });
                    this.$refs.customTableFacturations.reloadData();
                    this.cleanField();
                }
                if (res.errors !== undefined) {
                    this.errors_msg = res.errors.toString();
                    let toast = document.getElementById("errorsToastFac")
                    new bootstrap.Toast(toast, { delay: 1500 }).show();
                    return;
                }
            }).catch(err => this.formLoading = false);
        },
        cleanField() {
            this.form.libelle = '';
            this.form.emplacement_id = '';
            this.form.montant = '';
            this.form.montant_devise = 'CDF'
        }
    },
    computed: {
        configs() {
            return this.$store.getters['services/GET_CONFIGS']
        },
        isHopitalDefined() {
            return this.$user().hopital !== undefined;
        },
    },
}
</script>