<template>
    <div class="pads border-top bg-white">
        <div class="subpads d-flex">
            <div class="actionpad d-flex flex-column flex-grow-1 mw-50 p-0 border-end">
                <button @click="$emit('onClientAdded')"
                    class="button set-partner btn btn-warning rounded-0 py-2 flex-shrink-1 fw-bolder">
                    <i class="ri-user-add-line me-1"></i>
                    Client</button><button
                    class="pay validation pay-order-button btn-secondary button btn d-flex flex-column flex-fill align-items-center justify-content-center fw-bolder btn-lg rounded-0">
                    <div class="pay-circle d-flex align-items-center justify-content-center py-2 mb-2">
                        <i class="ri-arrow-right-line"></i>
                    </div>
                    Paiement
                </button>
            </div>
            <div class="w-100 numpad row row-cols-4 gx-0">
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    1
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    2
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    3
                </button>
                <button class="col btn btn-outline-primary py-3 border fw-bolder rounded-0">
                    QTE
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    4
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    5
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    6
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    % REMISE
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    7
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    8
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    9
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    PRIX
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    +/-
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    0
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    ,
                </button>
                <button class="col btn btn-soft-primary py-3 border fw-bolder rounded-0">
                    ⌫
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NumericPad",
};
</script>
