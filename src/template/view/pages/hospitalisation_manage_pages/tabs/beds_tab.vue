<template>
    <div class="tab-pane active" id="home" role="tabpanel">
        <div class="row">
            <div class="col-12 col-md-12">
                <div class=" d-sm-flex align-items-center justify-content-between">
                    <h5 class="mb-sm-0 text-uppercase fw-semibold">Gestion des lits<sup
                            class="text-danger text-lowercase fw-normal"></sup>
                    </h5>
                    <button class="btn btn-soft-primary"><i class="ri-add-line me-1"></i> Nouveau
                        lit</button>
                </div>
            </div>
            <div class="col-md-12">
                <div class="table-responsive table-card mt-2">
                    <table class="table align-middle table-nowrap table-striped-columns mb-0 mt-2">
                        <thead class="table-light">
                            <tr>
                                <th scope="col">Numéro lit</th>
                                <th scope="col">Type</th>
                                <th scope="col">Service</th>
                                <th scope="col">Créer par</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in datas.lits" :key="index">
                                <td>{{ data.lit_numero }}</td>
                                <td><span v-if="data.service">{{ data.service.service_libelle }}</span></td>
                                <td><span v-if="data.type">{{ data.type.type_libelle }}</span></td>
                                <td><span v-if="data.user">{{ data.user.name }}</span></td>

                                <td :class="data.lit_status !== 'disponible' ? 'text-warning' : 'text-success'"><i
                                        class="fs-16 align-middle"
                                        :class="data.lit_status !== 'disponible' ? 'ri-hotel-bed-fill' : 'ri-check-double-fill'"></i>
                                    {{ data.lit_status }}
                                </td>
                                <td>
                                    <button v-if="data.lit_status !== 'disponible'"
                                        class="btn btn-soft-success btn-load btn-sm me-1">
                                        <!-- <svg-loading v-if="loaded === data.consult_id" color="#13b69f"
                                            size="18"></svg-loading>
                                        <span v-else>Valider</span> -->
                                        Disponibiliser
                                    </button>
                                    <button class="btn btn-soft-info btn-sm" v-if="data.lit_status === 'occupé'">
                                        <!-- <svg-loading v-if="loadedDetail === data.consult_id" color="#0C8BCF"
                                            size="18"></svg-loading> -->
                                        <span> <i class="ri-eye-line"></i>Voir
                                            détails</span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <state-empty v-if="datas.lits === undefined || datas.lits.length === 0"
                        title="Aucun informations répertorié !"
                        description="Il y a aucun examen en attente !"></state-empty>
                </div>

            </div>
            <div class="col-md-3">
                <div class="card card-height-100 card-animate cursor-pointer ribbon-box ribbon-fill right border no-shadow">
                    <div class="card-body">
                        <div class="ribbon ribbon-success">dispo</div>
                        <div class="ribbon-content">
                            <div class="dropdown float-end">
                                <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <a class="dropdown-item" href="Javascript:void(0)"><i
                                            class="ri-edit-2-line text-secondary me-2"></i> Editer</a>
                                    <a class="dropdown-item" href="Javascript:void(0)"><i
                                            class="ri-delete-bin-line text-danger me-2"></i>Supprimer</a>
                                    <a class="dropdown-item" href="Javascript:void(0)"><i
                                            class="ri-arrow-right-double-line text-info me-2"></i>Entrer</a>
                                </div>
                            </div>
                            <div class="mb-4 pb-2">
                                <img src="assets/images/companies/hospital-bed-1.png" alt="" class="avatar-md">
                            </div>
                            <a href="javascript:void(0)">
                                <h6 class="fs-15 fw-semibold">LEOEOA</h6>
                            </a>
                            <p class="text-muted mb-0">
                                <span class="fs-12"><i class="ri-phone-find-line align-bottom"></i>
                                    Pédiatrie
                                </span><br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BedTab",

    computed: {
        datas() {
            return this.$store.getters['hospitalisation/GET_ALL_DATAS'];
        }
    }
}
</script>