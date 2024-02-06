<template>
    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <!-- start page title -->
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 class="mb-sm-0">Liste des partenaires conventionnés</h4>
                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item">
                                        <a href="javascript: void(0);"
                                            class="btn btn-sm btn-border btn-secondary text-white"
                                            @click="$showBsModal('partenerCreateModal')"><i
                                                class="ri-add-fill me-1 align-bottom"></i> Nouveau partenaire</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end page title -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <custom-table v-if="isHopitalDefined" :api-url="`/parteners.all/${$user().hopital.id}`"
                                    :columns="dataTableColumns" :action-buttons="actionButtons"
                                    @actionButtonClick="handleActionButtonClick" :data-src="'parteners'"
                                    ref="customTableParteners" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- container-fluid -->
        </div>
        <!-- End Page-content -->

        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">© Millenium HS</div>
                    <div class="col-sm-6">
                        <div class="text-sm-end d-none d-sm-block">
                            &copy; Powered by Millenium Horizon
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div class="customizer-setting d-block">
            <div class="btn-secondary text-white rounded-pill shadow-lg btn btn-icon btn-lg p-2"
                @click.prevent="$showBsModal('partenerCreateModal')">
                <i class="ri-add-line fs-22"></i>
            </div>
        </div>
    </div>
    <partener-create-modal @reload-data="refreshData" />
    <input type="file" ref="filePicker" class="hidden" />
</template>

<script>
import PartenerCreateModal from "./modals/partener_create_modal";
import { post } from "@/http";
export default {
    name: "AgentList",
    components: {
        PartenerCreateModal,
    },
    data() {
        return {
            dataTableColumns: [
                { data: "partener_nom", title: "NOM" },
                { data: "partener_adresse", title: "ADRESSE" },
                { data: "partener_contact", title: "CONTACT" },
                {
                    data: null,
                    title: "NBRE AGENTS",
                    render: (data, type, row) => {
                        return row.agents.length.toString().padStart(2, "0");
                    },
                },
            ],
            actionButtons: [
                {
                    label: '<span> <i class="ri-eye-2-line me-2"></i>Voir agents</span>',
                    class: "btn-secondary me-2",
                    key: "view",
                },
                {
                    label:
                        '<span> <i class="ri-attachment-line me-2"></i>Charger agents(Excel)</span>',
                    class: "btn-success me-2",
                    key: "upload",
                },
                {
                    label: '<i class="ri-delete-bin-3-line"></i>',
                    class: "btn-soft-danger",
                    key: "delete",
                },
            ],
        };
    },

    methods: {
        refreshData() {
            this.$refs.customTableParteners.reloadData();
        },
        handleActionButtonClick(payload) {
            switch (payload.key) {
                case "delete":
                    console.log("delete", JSON.stringify(payload.data));
                    break;
                case "view":
                    console.log("AGENTS => ", JSON.stringify(payload.data.agents));
                    break;
                case "upload":
                    this.importExcelFile(payload.data);
                    break;
                default:
                    break;
            }
        },

        async importExcelFile(data) {
            this.$refs.filePicker.click();
            this.$refs.filePicker.addEventListener("change", (event) => {
                const selectedFile = event.target.files[0];
                if (selectedFile !== undefined && selectedFile !== null) {
                    let formData = new FormData();
                    formData.append("partener_id", data.id);
                    formData.append("hopital_id", this.$user().hopital.id);
                    formData.append("created_by", this.$user().id);
                    formData.append("fichier_agent", selectedFile);
                    Swal.fire({
                        text: "Chargement...",
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    post("/partener.agents.import", formData)
                        .then(({ data, status }) => {
                            Swal.close();
                            if (status == 200) {
                                if (data.status == "success") {
                                    Swal.fire({
                                        toast: true,
                                        icon: "success",
                                        title: "Importation des agents effectuée !",
                                        showConfirmButton: false,
                                        timer: 4000,
                                        showCloseButton: false,
                                    });
                                    this.refreshData();
                                } else {
                                    if (data.errors !== undefined) {
                                        Swal.fire({
                                            toast: true,
                                            icon: "warning",
                                            text: res.errors.toString(),
                                            showConfirmButton: false,
                                            timer: 4000,
                                            showCloseButton: false,
                                        });
                                        return;
                                    }
                                }
                            } else {
                                if (data.errors !== undefined) {
                                    Swal.fire({
                                        toast: true,
                                        icon: "warning",
                                        text: res.errors.toString(),
                                        showConfirmButton: false,
                                        timer: 4000,
                                        showCloseButton: false,
                                    });
                                }
                            }
                        })
                        .catch((e) => {
                            Swal.close();
                            console.log(e);
                        });
                }
            });
        },
    },

    computed: {
        isHopitalDefined() {
            return this.$user().hopital !== undefined;
        },
    },
};
</script>
