<template>
  <!--  dt-responsive nowrap overflow-x-hidden -->
  <table ref="dataTable" class="table table-striped align-middle" style="width: 100%"></table>
</template>

<script>
export default {
  name: "DataTablesComponent",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    dataSrc: {
      type: String,
      default: "",
    },
    actionButtons: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      required: true,
    },
    actionsHeaderLabel: {
      type: String,
      default: "Actions",
    },
  },
  data() {
    return {
      table: null,
    };
  },
  methods: {
    initializeDataTable() {
      const columnsWithButtons = [...this.columns];
      if (this.actionButtons.length > 0) {
        columnsWithButtons.push({
          title: this.actionsHeaderLabel,
          data: null,
          createdCell: (cell, cellData, rowData, rowIndex, colIndex) => {
            cell.innerHTML = this.actionButtons
              .map((button) => {
                return `<button data-id="${rowData.id}" class="btn btn-sm action-btn ${button.class}" data-key="${button.key}" title="${button.tooltip}">${button.label}</button>`;
              })
              .join("");
          },
        });
      }

      this.table = $(this.$refs.dataTable).DataTable({
        autoWidth: true,
        ajax: {
          url: `${this.$baseURL}${this.apiUrl}`,
          type: "GET",
          dataType: "json",
          dataSrc: this.dataSrc,
        },
        columns: columnsWithButtons,
        language: {
          searchPlaceholder: "Recherche personnalisée...",
          search: "",
          buttons: {
            copy: "Copier",
            csv: "CSV",
            excel: "Excel",
            pdf: "PDF",
            print: "Imprimer",
          },
          sProcessing: "Traitement en cours...",
          sSearch: "Rechercher&nbsp;:",
          sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
          sInfo:
            "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
          sInfoEmpty:
            "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
          sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
          sInfoPostFix: "",
          sLoadingRecords: "Chargement en cours...",
          sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
          sEmptyTable: "Aucune donn&eacute;e disponible dans le tableau",
          oPaginate: {
            sFirst: "Premier",
            sPrevious: "Pr&eacute;c&eacute;dent",
            sNext: "Suivant",
            sLast: "Dernier",
          },
          oAria: {
            sSortAscending: ": activer pour trier la colonne par ordre croissant",
            sSortDescending:
              ": activer pour trier la colonne par ordre d&eacute;croissant",
          },
        },
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "print"],
      });

      if (this.actionButtons.length > 0) {
        $(this.$refs.dataTable).on("click", ".action-btn", this.handleAction);
      }
    },
    reloadData() {
      this.table.ajax.reload();
    },
    handleAction(event) {
      const rowId = $(event.currentTarget).data("id");
      const rowData = this.table.row($(event.currentTarget).closest("tr")).data();
      const buttonKey = $(event.currentTarget).data("key");
      this.$emit("actionButtonClick", { key: buttonKey, data: rowData });
    },
  },
  mounted() {
    this.initializeDataTable();
  },
};
</script>

<style scoped>
.table tbody th,
.table tbody td {
  width: 100% !important;
}
</style>
