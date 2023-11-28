<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des médecins</h4>

                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                          <div class="card-body">
                            <div class="row g-2">
                              <div class="col-sm-6">
                                <div class="search-box">
                                  <input type="text" class="form-control" id="searchMemberList" placeholder="Recherche médecin, par nom ou par matricule...">
                                  <i class="ri-search-line search-icon"></i>
                                </div>
                              </div>
                              <!--end col-->
                              <div class="col-sm-auto ms-auto">
                                <div class="list-grid-nav hstack gap-1">

                                  <!--
                                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1" style="">
                                    <li><a class="dropdown-item" href="#">All</a></li>
                                    <li><a class="dropdown-item" href="#">Last Week</a></li>
                                    <li><a class="dropdown-item" href="#">Last Month</a></li>
                                    <li><a class="dropdown-item" href="#">Last Year</a></li>
                                  </ul>
                                  -->
                                  <button class="btn btn-success btn-border addMembers-modal" @click="$router.push('/home/med/create')"><i class="ri-add-fill me-1 align-bottom"></i> Nouveau agent</button>
                                </div>
                              </div>
                              <!--end col-->
                            </div>
                            <!--end row-->
                          </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="live-preview">
                                    <div class="table-responsive table-card">
                                        <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col">MATRICULE</th>
                                                    <th scope="col">Nom complet</th>
                                                    <th scope="col">Sexe</th>
                                                    <th scope="col">Téléphone</th>
                                                    <th scope="col">Date naissance</th>
                                                    <!--<th scope="col">Adresse</th>-->
                                                    <th scope="col">Spécialité</th>
                                                    <th scope="col">Grade</th>
                                                    <th scope="col">Service</th>
                                                    <th scope="col">Fonction</th>
                                                    <th scope="col" style="width: 150px;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in agents" :key="index">
                                                    <td>{{ item.agent_matricule }}</td>
                                                    <td>{{ item.agent_nom }} {{ item.agent_prenom }}</td>

                                                    <td>{{ item.agent_sexe }}</td>
                                                    <td>{{ item.agent_telephone }}</td>
                                                    <td>{{ item.agent_datenais }}</td>
                                                    <!-- <td style="text-overflow: ellipsis;">{{ item.agent_adresse }}</td>-->
                                                    <td>{{ item.agent_specialite }}</td>
                                                    <td><span v-if="item.grade">{{ item.grade.grade_libelle }}</span></td>
                                                    <td><span v-if="item.service">{{ item.service.service_libelle }}</span>
                                                    </td>
                                                    <td><span v-if="item.fonction">{{ item.fonction.fonction_libelle
                                                    }}</span></td>
                                                    <td>
                                                        <button type="button"
                                                            class="btn btn-sm btn-info me-2">Editer</button>
                                                        <button type="button" class="btn btn-sm btn-light"><i
                                                                class="ri-delete-bin-3-line"></i></button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- end col -->
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
            <div class="btn-success text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$router.push('/home/med/create')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AgentList",
    mounted() {
        this.$store.dispatch('services/viewAllAgents');
    },
    computed: {
        agents() {
            return this.$store.getters['services/GET_AGENTS'];
        }
    },
}
</script>