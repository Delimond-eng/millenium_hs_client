<template>
    <div class="print-section" style="position: fixed; top: 0">
        <div class="row" v-if="item.length > 0">
            <div class="col-lg-12">
                <div class="card-header border-bottom-dashed p-4 mb-2">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <img :src="user.hopital.hopital_logo" class="card-logo" alt="patientQrcode"
                                style="height: 50px" />
                        </div>
                        <div class="flex-shrink-0 mt-sm-0 mt-3">
                            <h4 class="text-uppercase fw-bold bg-black text-white">
                                {{ user.hopital.emplacement.hopital_emplacement_libelle }}
                            </h4>
                            <h6>
                                <span class="text-muted fw-normal">Adresse:</span><span id="legal-register-no">{{
                                    user.hopital.emplacement.hopital_emplacement_adresse
                                }}</span>
                            </h6>
                            <h6>
                                <span class="text-muted fw-normal">Date : </span><span id="email">{{
                                    item[0].consult_examen_create_At }}</span>
                            </h6>
                        </div>
                    </div>
                </div>
                <!--end card-header-->
            </div>
            <!--end col-->

            <!--end col-->
            <div class="col-lg-12">
                <h2 class="text-center fw-bold text-uppercase">
                    Prescription examen N° : {{ item[0].code }}
                </h2>
                <!--end card-body-->
            </div>
            <!--end col-->
            <div class="col-lg-12">
                <div class="card-body p-4">
                    <div class="table-responsive">
                        <table class="table table-bordered border-dark text-center table-nowrap align-middle mb-0">
                            <thead class="border-dark">
                                <tr>
                                    <th scope="col" style="width: 50px">#</th>
                                    <th scope="col">Examen</th>
                                    <th scope="col">Prix</th>
                                </tr>
                            </thead>
                            <tbody id="products-list">
                                <tr class="text-center" v-for="(data, index) in item" :key="index">
                                    <th scope="row">{{ `${index + 1}`.padStart(2, "0") }}</th>
                                    <td class="text-start">
                                        <span class="fw-medium">{{ data.examen.examen_labo_libelle }}</span>
                                    </td>
                                    <td>
                                        {{ data.examen.examen_labo_prix }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!--end table-->
                    </div>

                    <div class="mt-5" v-if="item">
                        <h6 class="text-muted text-uppercase fw-semibold mb-3">Médecin</h6>
                        <p class="text-muted mb-1 fw-medium">
                            {{ item[0].agent.agent_nom }} {{ item[0].agent.agent_prenom }}
                        </p>
                    </div>
                </div>
                <!--end card-body-->
            </div>
            <!--end col-->
        </div>
    </div>
</template>

<script>
export default {
    name: "PrescriptionExamenInvoice",

    props: {
        item: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        user() {
            return this.$store.getters["auth/GET_USER"];
        },
    },
};
</script>
