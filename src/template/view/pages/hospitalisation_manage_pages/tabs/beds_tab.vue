<template>
    <div class="tab-pane active show" id="home" role="tabpanel">
        <div class="row">
            <div class="col-12 col-md-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Gestion des lits<sup class="text-danger text-lowercase fw-normal"></sup>
                    </h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="me-2"><a href="javascript:void(0)" class="btn btn-soft-success"><i
                                        class="ri-add-line me-1"></i> Nouveau lit</a>
                            </li><!--v-if-->
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BedTab",
}
</script>