<template>
  <!--end tab-pane-->
  <div class="tab-pane fade" id="custom-v-pills-docs" role="tabpanel" aria-labelledby="custom-v-pills-docs-tab">
    <h2 class="fs-18 text-start fw-bold text-uppercase mb-2 mt-3 text-primary">
      Dossier médical <small>(Parcours médical du patient)</small>
    </h2>
    <div class="border border-dashed mt-2 mb-2"></div>

    <div class="row">
      <div class="col-md-3">
        <div class="nav flex-column rounded bg-light pt-3 p-2 nav-pills text-center" id="v-pills-tab" role="tablist"
          aria-orientation="vertical">
          <button class="nav-link mb-2" v-for="i in 10" :key="i" :id="`consult${i}`" data-bs-toggle="pill" role="tab"
            aria-controls="v-pills-home" aria-selected="true">
            Consultation du 01/0{{ i }}/2024
          </button>
        </div>
      </div>
      <!-- end col -->
      <div class="col-md-9">
        <div class="tab-content text-muted mt-4 mt-md-0" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <h1 class="text-secondary-emphasis display-4 fw-bold">
              Consultation du 04/02/2024
            </h1>
            <div class="border border-dashed mt-2 mb-2"></div>
            <div class="table-responsive">
              <table class="table mb-0">
                <tbody class="text-black">
                  <tr>
                    <th scope="row">Motif</th>
                    <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                  </tr>
                  <tr>
                    <th scope="row">Diagnostique médicale</th>
                    <td>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
                      inventore nemo nihil velit modi debitis amet deleniti omnis
                      accusantium molestias. Vel quaerat, labore ullam placeat provident
                      odio ab itaque accusamus?
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Age</th>
                    <td>29 ans</td>
                  </tr>
                  <tr>
                    <th scope="row">Temperature</th>
                    <td>32°C</td>
                  </tr>
                  <tr>
                    <th scope="row">Taille</th>
                    <td>170 cm</td>
                  </tr>
                  <tr>
                    <th scope="row">Fréquence cardiaque</th>
                    <td>80</td>
                  </tr>
                  <tr>
                    <th scope="row">Pression arterielle</th>
                    <td>80</td>
                  </tr>
                  <tr>
                    <th scope="row">Pulsation</th>
                    <td>88</td>
                  </tr>
                  <tr>
                    <th scope="row">Médecin</th>
                    <td>Gaston delimond</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2 class="text-decoration-underline text-secondary mt-3 pb-1 fw-bold">
              Ordonnance
            </h2>
            <!-- Bordered Tables -->
            <table class="table table-striped table-nowrap">
              <thead>
                <tr class="text-dark text-uppercase">
                  <th scope="col">Medicament</th>
                  <th scope="col">Posologie</th>
                  <th scope="col">Nbre unité</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 3" :key="i">
                  <td>Implement new UX</td>
                  <td>500mg 2/Jour</td>
                  <td>4 plaquets</td>
                </tr>
              </tbody>
            </table>

            <h2 class="text-decoration-underline text-secondary mt-3 pb-1 fw-bold">
              Examens médicaux
            </h2>
            <table class="table table-striped table-nowrap">
              <thead>
                <tr class="text-dark text-uppercase">
                  <th scope="col">Examen</th>
                  <th scope="col">Resultat</th>
                  <th scope="col">Obs</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 3" :key="i">
                  <td>Implement new UX</td>
                  <td>Positif</td>
                  <td>Deleniti alias minima pariatur, recusandae adipisci!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--  end col -->
    </div>
  </div>
  <!--end tab-pane-->
</template>

<script>
export default {
  name: "DocsTab",

  props: {
    currentConsult: {
      type: Object,
      default: () => { },
    },
    selectedPatient: {
      type: Object,
      default: () => { },
    },
  },
};
</script>
