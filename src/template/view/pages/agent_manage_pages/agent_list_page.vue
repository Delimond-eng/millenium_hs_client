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
                            <div class="card-header d-flex justify-content-end">
                                <div class="search-box ms-2">
                                    <input type="text" class="form-control search" placeholder="Recherche médecin...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="live-preview">
                                    <div class="table-responsive table-card">
                                        <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col">MATRICULE</th>
                                                    <th scope="col">Nom</th>
                                                    <th scope="col">Prénom</th>
                                                    <th scope="col">Sexe</th>
                                                    <th scope="col">Téléphone</th>
                                                    <th scope="col">Adresse</th>
                                                    <th scope="col">Spécialité</th>
                                                    <th scope="col">Grade</th>
                                                    <th scope="col">Service</th>
                                                    <th scope="col">Fonction</th>
                                                    <th scope="col" style="width: 150px;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>L2113</td>
                                                    <td>Gaston Delimond</td>
                                                    <td>Delimond</td>
                                                    <td>M</td>
                                                    <td>+243813719944</td>
                                                    <td style="text-overflow: ellipsis;">03, Bateke kinshasa Kingabwa</td>
                                                    <td>Cardiologie</td>
                                                    <td>Cardiologie</td>
                                                    <td>Chef de departement</td>
                                                    <td>Médecin traiteur</td>
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
    name: "MedList"
}
</script>