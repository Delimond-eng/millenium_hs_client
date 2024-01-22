<template>
  <div class="main-content">

    <div class="page-content">
      <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
          <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 class="mb-sm-0">Datatables</h4>

              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item"><a href="javascript: void(0);"
                      class="btn btn-icon btn-secondary text-white-50" @click="refreshData"><i
                        class="ri-refresh-line"></i></a></li>
                </ol>
              </div>

            </div>
          </div>
        </div>
        <!-- end page title -->

        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Basic Datatables</h5>
              </div>
              <div class="card-body">
                <custom-table :api-url="'http://127.0.0.1:8000/api/hospitalisations.all/2'" :columns="dataTableColumns"
                  :data-src="'hospitalisations'" ref="customDataTable" :action-buttons="actionButtons"
                  @actionButtonClick="handleActionButtonClick" />
              </div>
            </div>
          </div><!--end col-->
        </div><!--end row-->
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
  </div>
  <!-- end main content-->
</template>


<script>
export default {
  name: 'DataTables.net',
  data() {
    return {
      dataTableColumns: [
        { data: 'hospitalisation_raison_admission', title: "Raison d'admission" },
        { data: 'patient.patient_nom', title: 'Nom du patient' },
        { data: 'lit.lit_numero', title: 'Numéro du lit' },
        { data: 'lit.type.type_libelle', title: 'Type de lit' },
      ],
      actionButtons: [
        { label: '<i class="ri-delete-bin-3-line"></i>', class: 'btn-soft-danger me-1', key: 'delete' },
        { label: 'Éditer', class: 'btn-soft-secondary', key: 'edit' },
      ],
    }
  },
  methods: {
    refreshData() {
      this.$refs.customDataTable.reloadData();
    },
    handleActionButtonClick(payload) {
      switch (payload.key) {
        case 'delete':
          console.log("delete", JSON.stringify(payload.data));
          break;
        case 'edit':
          console.log("edit", JSON.stringify(payload.data));
          break;
        default:
          break;
      }
    },
  },
}
</script>
