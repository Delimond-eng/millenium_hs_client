<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Assignation patient</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header align-items-start justify-content-center d-flex flex-column mb-0">
                                <h4 class="card-title mb-0 flex-grow-1">Assignez un patient à un médecin</h4>
                                <p class="mt-2 text-muted">Veuillez sélectionner le patient dont vous voulez assigner puis
                                    sélectionner un médecin concerné !
                                    !</p>
                            </div>
                            <div class="card-body">
                                <load-state :processing="processing">
                                    <form @submit.prevent="submitForm">
                                        <div class="row d-flex align-items-center justify-content-center align-content-center">
                                          <div class="col-md-8">
                                            <div class="row">
                                              <div class="col-lg-6">

                                                <label  class="form-label">Sélectionnez un patient
                                                  concerné
                                                  <sup class="text-danger">*</sup></label>
                                                <select class="patient-select2 select2" name="state" required>
                                                  <option></option>
                                                </select>
                                              </div>
                                              <div class="col-lg-6">
                                                <label class="form-label">Sélectionnez le médecin
                                                  concerné
                                                  <sup class="text-danger">*</sup></label>
                                                <select class="med-select2 select2" name="state" required>
                                                  <option></option>
                                                </select>
                                              </div>
                                              <div class="col-md-12">
                                                <bs-toast id="errorsToast3" :msg="errors_msg" />
                                                <div class="row d-flex align-content-center justify-content-center">
                                                    <div class="col-md-6">
                                                      <div
                                                          class="d-flex align-items-center justify-content-center w-100 mt-4">

                                                          <load-button btn-type="submit" :loading="formLoading"
                                                                     class-name="btn-success btn-border btn-label right nexttab nexttab me-4 w-100 flex-fill"><i
                                                            class="ri-link label-icon align-middle fs-16 ms-2 "></i>Assigner</load-button>

                                                          <button type="button"
                                                                  class="btn btn-light btn-border btn-label right flex-fill w-100"><i
                                                              class="ri-restart-line label-icon align-middle fs-16 ms-2"></i>
                                                            Annuler
                                                          </button>
                                                      </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                    </form>
                                </load-state>

                            </div>
                        </div>
                    </div>
                    <!-- end col -->
                </div>

            </div>
            <!-- container-fluid -->
        </div>
        <!-- End Page-content -->

        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        © Millenium HS
                    </div>
                    <div class="col-sm-6">
                        <div class="text-sm-end d-none d-sm-block">
                            &copy; Powered by Millenium Horizon
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div class="customizer-setting d-block">
            <div class="btn-info text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$router.push('/home/patients/list')">
                <i class="ri-list-check-2 fs-22"></i>
            </div>
        </div>
    </div>
</template>

<script>
import LoadButton from "@/template/components/src/load_button";
export default {
    name: "PatientAssign",
  components: {LoadButton},
  data() {
        return {
            selectPatient: null,
            selectMedecin: null,
            processing: false,
            formLoading:false,
            form:{
              patient_id:'',
              agent_id:''
            }
        }
    },
    unmounted() {
        this.selectPatient.select2('destroy');
        this.selectMedecin.select2('destroy');
    },
    async mounted() {
        this.selectPatient = $(".patient-select2").select2({ placeholder: 'Sélectionnez un patient...' });
        this.selectMedecin = $(".med-select2").select2({ placeholder: 'Sélectionnez un médecin...', });
        await this.init();
    },

    methods: {
        async init() {
            this.processing = true;
            let self = this;
            let agents = await this.$store.dispatch('services/viewAllAgents');
            let patients = await this.$store.dispatch('services/viewRecentPatients');
            this.processing = false;
            /**
             * DESTROY AND SELECT PATIENTS
            */
            this.selectPatient.select2('destroy');
            this.selectPatient = $(".patient-select2").select2({
                placeholder: 'Sélectionnez un patient...',
                data: $.map(patients, function (item) {
                    return {
                        text: `${item.patient_code} : ${item.patient_nom} ${item.patient_prenom}`,
                        id: item.id
                    }
                })
            }).on('change', function (){
              console.log($(this).val())
              self.form.patient_id = $(this).val();
            });

            /**
             * DESTROY AND RELOAD SELECT MEDECIN
            */
            this.selectMedecin.select2('destroy');
            this.selectMedecin = $(".med-select2").select2({
                placeholder: 'Sélectionnez un médecin...',
                data: $.map(agents, function (item) {
                    return {
                        text: `${item.agent_matricule} : ${item.agent_nom} ${item.agent_prenom}`,
                        id: item.id
                    }
                })
            }).on('change', function (){
              console.log($(this).val())
              self.form.agent_id = $(this).val();
            });
        },

        submitForm(e) {
          this.formLoading = true;
          this.$store.dispatch('services/assignPatient', this.form).then((res)=>{
            this.formLoading = false;
            if(res.status !== undefined){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Patient créé avec succès !",
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: false,
              });
              $(".patient-select2").val('').trigger('change');
              $(".med-select2").val('').trigger('change');
            }

            if (res.errors !== undefined) {
              console.log(JSON.stringify(res));
              this.errors_msg = res.errors.toString();
              let toast = document.getElementById("errorsToast3")
              new bootstrap.Toast(toast, { delay: 1500 }).show();
            }
          }).catch((err)=>{
            this.formLoading = false;
          })
        }
    },

}
</script>