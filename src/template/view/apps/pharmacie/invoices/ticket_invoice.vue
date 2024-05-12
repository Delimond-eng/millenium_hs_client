<template>
    <div class="print-section" style="position: fixed; top: 0">
        <div class="row">
            <div class="col-lg-12">
                <div class="card-header border-bottom-dashed p-4 mb-2">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <img :src="user.hopital.hopital_logo" class="card-logo" alt="patientQrcode"
                                style="height: 50px" />
                        </div>
                        <div class="flex-shrink-0 mt-sm-0 mt-3">
                            <h6>
                                <span class="text-muted fw-normal">Adresse:</span><span id="legal-register-no">{{
                                user.pharmacie.pharmacie_adresse
                            }}</span>
                            </h6>
                            <h6 class="border-bottom border-bottom-dashed pb-2">
                                <span class="text-muted fw-normal">Contact :</span><span id="email">{{
                                    user.pharmacie.pharmacie_telephone }}</span>
                            </h6>
                            <h6>
                                <span class="text-muted fw-normal">Date : </span><span id="email">{{
                                `${item.created_at}` }}</span>
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
                    Pharmacie Facture N° : {{ item.ticket_code }}
                </h2>
                <!--end card-body-->
            </div>
            <!--end col-->
            <div class="col-lg-12">
                <div class="card-body p-4">
                    <div class="table-responsive">
                        <table class="table table-borderless text-center table-nowrap align-middle mb-0">
                            <thead>
                                <tr class="table-active">
                                    <th scope="col" style="width: 50px">#</th>
                                    <th scope="col">Produit</th>
                                    <th scope="col">Qté</th>
                                    <th scope="col">PU</th>
                                    <th scope="col" class="text-end">PT</th>
                                </tr>
                            </thead>
                            <tbody id="products-list">
                                <tr class="border-bottom border-bottom-groove text-center"
                                    v-for="(data, index) in item.items" :key="index">
                                    <th scope="row">{{ `${index + 1}`.padStart(2, "0") }}</th>
                                    <td class="text-start">
                                        <span class="fw-medium">{{ data.produit.produit_libelle }}</span>
                                    </td>
                                    <td>{{ data.operation_qte }}</td>
                                    <td>{{ data.produit_prix }} {{ data.produit_prix_devise }}</td>
                                    <td class="text-end">
                                        {{ parseFloat(data.produit_prix) * parseInt(data.operation_qte)
                                        }}{{ data.produit_prix_devise }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!--end table-->
                    </div>
                    <div class="mt-2">
                        <table class="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                            style="width: 300px">
                            <tbody>
                                <tr>
                                    <td>Total HT</td>
                                    <td class="text-end">
                                        {{ item.ticket_paiement }} ${{ item.ticket_devise }}
                                    </td>
                                </tr>
                                <tr class="border-top border-top-groove fs-15">
                                    <td>TVA</td>
                                    <td class="text-end">0 %</td>
                                </tr>
                                <tr class="border-top border-top-groove fs-15">
                                    <th scope="row">Total TTC</th>
                                    <th class="text-end">
                                        {{ item.ticket_paiement }} {{ item.ticket_devise }}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <!--end table-->
                    </div>

                    <div class="mt-3">
                        <h6 class="text-muted text-uppercase fw-semibold mb-3">
                            Détails de paiement:
                        </h6>
                        <p class="text-muted mb-1">
                            Mode de paiement:
                            <span class="fw-medium" id="payment-method">Cash</span>
                        </p>
                        <p class="text-muted mb-1">
                            Client :
                            <span v-if="item.client" class="fw-medium" id="card-holder-name">{{
                                item.client.client_nom
                                }}</span>
                        </p>
                        <p class="text-muted mb-1">
                            Téléphone:
                            <span v-if="item.client" class="fw-medium" id="card-number">{{
                                item.client.client_phone
                                }}</span>
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
    name: "TicketInvoice",

    props: {
        item: {
            type: Object,
            default: () => { },
        },
    },

    computed: {
        user() {
            return this.$store.getters["auth/GET_USER"];
        },
    },
};
</script>
