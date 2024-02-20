<template>
  <teleport to="body">
    <div
      id="partenerInfosModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      style="display: none"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 overflow-hidden">
          <div class="modal-body login-modal p-4">
            <h5 class="text-white fs-20">
              Les agents pour le partenaire sélectionné !
            </h5>
          </div>
          <div class="modal-body p-4">

            <div class="row">
              <div class="col-md-12">


                <div class="live-preview" v-if="data">
                  <div class="table-responsive">
                    <table class="table table-bordered align-middle table-nowrap mb-0">
                      <thead>
                      <tr>
                        <th scope="col">Matricule</th>
                        <th scope="col">N° Convention</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Sexe</th>
                        <th scope="col">Etat civil</th>
                        <th scope="col">Nbre Enfants</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in data" :key="index">
                        <td class="fw-medium">{{item.agent_matricule}}</td>
                        <td class="fw-medium">{{item.agent_num_convention}}</td>
                        <td>{{item.agent_nom}}</td>
                        <td>{{item.agent_prenom}}</td>
                        <td>{{item.agent_sexe}}</td>
                        <td>{{item.agent_etat_civil}}</td>
                        <td>{{item.agent_nbre_efts}}</td>
                      </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="d-flex justify-content-end align-items-end">
                  <button
                      type="button"
                      @click.prevent="$closeBsModal('partenerInfosModal')"
                      class="btn btn-light btn-border btn-lg mt-4 text-uppercase"
                  >
                    Fermer
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { post } from "@/http";
export default {
  name: "PartenerAgentsModal",
  props:{
    data:{}
  }
};
</script>
