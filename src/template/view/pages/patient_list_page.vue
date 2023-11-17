<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des patients</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="#/home/patient/create"
                                            class="btn btn-success btn-sm text-white"><i class="ri-add-line"></i>
                                            Création nouveau agent</a></li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">

                        <div class="card">
                            <div class="card-header d-flex justify-content-end">
                                <div class="search-box ms-2">
                                    <input type="text" class="form-control search" placeholder="Search...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="live-preview">
                                    <div class="table-responsive table-card">
                                        <table class="table align-middle table-nowrap table-striped-columns mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col" style="width: 46px;">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="cardtableCheck">
                                                            <label class="form-check-label" for="cardtableCheck"></label>
                                                        </div>
                                                    </th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col" style="width: 150px;">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="cardtableCheck01">
                                                            <label class="form-check-label" for="cardtableCheck01"></label>
                                                        </div>
                                                    </td>
                                                    <td><a href="#" class="fw-medium">#VL2110</a></td>
                                                    <td>William Elmore</td>
                                                    <td>07 Oct, 2021</td>
                                                    <td>$24.05</td>
                                                    <td><span class="badge bg-success">Paid</span></td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-light">Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="cardtableCheck02">
                                                            <label class="form-check-label" for="cardtableCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td><a href="#" class="fw-medium">#VL2109</a></td>
                                                    <td>Georgie Winters</td>
                                                    <td>07 Oct, 2021</td>
                                                    <td>$26.15</td>
                                                    <td><span class="badge bg-success">Paid</span></td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-light">Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="cardtableCheck03">
                                                            <label class="form-check-label" for="cardtableCheck03"></label>
                                                        </div>
                                                    </td>
                                                    <td><a href="#" class="fw-medium">#VL2108</a></td>
                                                    <td>Whitney Meier</td>
                                                    <td>06 Oct, 2021</td>
                                                    <td>$21.25</td>
                                                    <td><span class="badge bg-danger">Refund</span></td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-light">Details</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="cardtableCheck04">
                                                            <label class="form-check-label" for="cardtableCheck04"></label>
                                                        </div>
                                                    </td>
                                                    <td><a href="#" class="fw-medium">#VL2107</a></td>
                                                    <td>Justin Maier</td>
                                                    <td>05 Oct, 2021</td>
                                                    <td>$25.03</td>
                                                    <td><span class="badge bg-success">Paid</span></td>
                                                    <td>
                                                        <button type="button" class="btn btn-sm btn-light">Details</button>
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
                @click.prevent="$router.push('/home/patient/create')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
</template>