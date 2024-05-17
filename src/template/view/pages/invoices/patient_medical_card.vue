<template>
  <div class="print-section" style="position: fixed; top: 0; width: 100%; padding: 20px">
    <div class="mx-20 my-20 card w-100 rounded-0" style="border: 4px solid #000000">
      <div class="card-header">
        <div class="d-flex align-items-start justify-content-between" v-if="data">
          <div class="flex-shrink-0 text-start">
            <img :src="$user().hopital.hopital_logo" alt="patientQrcode" style="height: 50px" />
          </div>
          <div class="flex-shrink-0 text-end w-25">
            <h5 class="fs-18 fw-semibold text-bg-dark mb-2">
              <i class="ri-map-pin-2-line me-2"></i>
              {{ $user().hopital.emplacement.hopital_emplacement_libelle }}
            </h5>
            <small class="fw-normal mt-1">{{
          $user().hopital.emplacement.hopital_emplacement_adresse
        }}</small>
          </div>
        </div>
      </div>
      <div class="card-body d-flex justify-content-between align-items-center">
        <div class="text-bg-light bg-gradient p-4 rounded-3 mb-3" v-if="data">
          <div class="card-number fs-36 fw-bold text-uppercase" id="card-num-elem">
            {{ data.patient_nom }} {{ data.patient_prenom }}
          </div>
          <div class="row mt-3">
            <div class="col-4">
              <div class="fs-12 fw-semibold text-uppercase">n° ID</div>
              <div id="card-holder-elem" class="fw-semibold fs-14">
                {{ data.patient_code }}
              </div>
            </div>
            <div class="col-6">
              <div class="fs-12 text-uppercase">Date de naissance</div>
              <div id="card-holder-elem" class="fw-semibold fs-14">
                {{ data.patient_datenais }}
              </div>
            </div>
            <div class="col-2">
              <div>
                <div class="fs-12 text-uppercase">Sexe</div>
                <div id="card-holder-elem" class="fw-semibold fs-14">
                  {{ data.patient_sexe }}
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-end mt-3">
              <h2 class="fs-12 fw-bold">NOM DU RESPONSABLE & SIGNATURE</h2>
            </div>
          </div>
        </div>
        <div>
          <qrcode-builder :content="JSON.stringify(data)" :size="150"></qrcode-builder>
        </div>
      </div>
      <!-- end card div elem -->
    </div>
  </div>
</template>
<script>
export default {
  name: "PatientCardPrint",

  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
};
</script>

<style>
.card-print {
  height: 400px;
  width: 400px;
  display: none;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>
