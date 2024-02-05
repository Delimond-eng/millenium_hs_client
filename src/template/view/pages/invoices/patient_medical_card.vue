<template>
  <div class="print-section" style="position: fixed; top: 0; width: 100%; padding: 20px">
    <div class="mx-0 my-0 card border card-border-primary" style="max-width: 500px">
      <div class="card-header text-white" id="card-hd">
        <div class="d-flex align-items-start justify-content-between" v-if="data">
          <div class="flex-shrink-0 text-start">
            <img :src="$user().hopital.hopital_logo" alt="patientQrcode" style="height: 50px" />
            <h5 class="fs-12 fw-bold text-bg-dark text-uppercase mb-0">
              {{ $user().hopital.hopital_nom }}
            </h5>
            <small class="fw-semibold mt-1">{{
              $user().hopital.emplacement.hopital_emplacement_libelle
            }}</small>
          </div>
          <div class="flex-shrink-0 text-start">
            <small class="fw-semibold mt-1 text-uppercase">Adresse</small>
            <h5 class="fs-12 fw-normal text-bg-dark mb-2">
              {{ $user().hopital.emplacement.hopital_emplacement_adresse }}
            </h5>
          </div>
        </div>
      </div>
      <div class="card-body mt-1 mb-1">
        <div class="text-bg-light bg-gradient p-4 rounded-3 mb-3" v-if="data">
          <div class="card-number fs-20 fw-bold text-uppercase text-primary" id="card-num-elem">
            {{ data.patient_nom }} {{ data.patient_prenom }}
          </div>
          <div class="row mt-3">
            <div class="col-4">
              <div class="fs-12 fw-semibold text-uppercase">n° ID</div>
              <div id="card-holder-elem" class="fw-medium fs-14">
                {{ data.patient_code }}
              </div>
            </div>
            <div class="col-6">
              <div class="fs-12 text-uppercase">Date de naissance</div>
              <div id="card-holder-elem" class="fw-medium fs-14">
                {{ data.patient_datenais }}
              </div>
            </div>
            <div class="col-2">
              <div>
                <div class="fs-12 text-uppercase">Sexe</div>
                <div id="card-holder-elem" class="fw-medium fs-14">
                  {{ data.patient_sexe }}
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-end mt-3">
              <h2 class="fs-12 fw-bold">NOM DU RESPONSABLE & SIGNATURE</h2>
              <div class="position-absolute" style="right: 0; bottom: -12px">
                <qrcode-builder :content="JSON.stringify(data)" :size="40"></qrcode-builder>
              </div>
            </div>
          </div>
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
