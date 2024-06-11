<template>
    <div id="pharmacy-product-details-modal" class="modal fade zoomIn" tabindex="-1" aria-labelledby="myModalLabel"
        aria-hidden="true" style="display: none;">
        <form class="modal-dialog modal-xl modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myModalLabel">Produit : <span v-if="item">{{ item.produit_libelle
                            }}</span></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <ul class="nav nav-pills nav-customs nav-danger mb-3" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-bs-toggle="tab" href="#border-navs-approv" role="tab"
                                    aria-selected="true">Approvisionnement</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#border-navs-classement" role="tab"
                                    aria-selected="false" tabindex="-1">Expirés</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#border-navs-transfert" role="tab"
                                    aria-selected="false" tabindex="-1">Transferés</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#border-navs-retour" role="tab"
                                    aria-selected="false" tabindex="-1">Retournés</a>
                            </li>
                        </ul>
                        <div class="border border-dashed mt-2 mb-2"></div>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active show" id="border-navs-approv" role="tabpanel">
                                <approv-tab v-if="item" :produit="item"></approv-tab>
                            </div>
                            <div class="tab-pane" id="border-navs-classement" role="tabpanel">
                                <classement-tab v-if="item" :produit="item"></classement-tab>
                            </div>
                            <div class="tab-pane" id="border-navs-transfert" role="tabpanel">
                                <transfert-tab v-if="item" :produit="item"></transfert-tab>
                            </div>
                            <div class="tab-pane" id="border-navs-retour" role="tabpanel">
                                <retour-tab v-if="item" :produit="item"></retour-tab>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-end">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div><!-- /.modal-content -->
        </form><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
import ApprovTab from './tabs/approv_view_tab.vue';
import ClassementTab from './tabs/classement_view_tab.vue';
import TransfertTab from './tabs/transfert_view_tab.vue';
import RetourTab from './tabs/retour_view_tab.vue';
export default {
    name: 'PharmacyProductDetailsModal',
    components: {
        ApprovTab,
        ClassementTab,
        TransfertTab,
        RetourTab
    },
    props: {
        item: {
            default: () => { },
            type: Object
        }
    },
}
</script>