<template>
  <table ref="dataTable" class="table table-bordered dt-responsive nowrap overflow-x-hidden table-striped align-middle"
    style="width:100%">
  </table>
</template>

<script>
export default {
  name: 'DataTablesComponent',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    dataSrc: {
      type: String,
      default: '',
    },
    actionButtons: {
      type: Array,
      default: () => [],
    },

    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      table: null,
    };
  },
  methods: {
    initializeDataTable() {
      const columnDefs = [];
      // Ajoutez les boutons d'action dynamiquement
      if (this.actionButtons.length > 0) {
        const actionsColumn = {
          targets: -1,
          render: (data, type, row) => {
            return this.actionButtons.map((button) => {
              return `<button data-id="${row.id}" class="btn btn-sm ${button.class}">${button.label}</button>`;
            }).join('');
          },
        };

        columnDefs.push(actionsColumn);
      }
      this.table = $(this.$refs.dataTable).DataTable({
        autoWidth: true,
        ajax: {
          url: `${this.$baseURL}${this.apiUrl}`,
          type: 'GET',
          dataType: 'json',
          dataSrc: this.dataSrc,
        },
        columns: this.columns,
        createdRow: (row, data, dataIndex) => {
          // Ajoutez les boutons d'action dynamiquement
          if (this.actionButtons.length > 0) {
            const actionsCell = row.insertCell(-1);
            actionsCell.className = 'actions-cell';
            this.actionButtons.forEach((button) => {
              const btn = document.createElement('button');
              btn.className = `btn btn-sm ${button.class}`;
              btn.innerHTML = button.label;
              btn.addEventListener('click', () => {
                this.$emit('actionButtonClick', { key: button.key, data });
              });
              actionsCell.appendChild(btn);
            });
          }
        },
        language: {
          searchPlaceholder: "Recherche personnalisée...",
          search: '',
          buttons: {
            copy: "Copier",
            csv: "CSV",
            excel: "Excel",
            pdf: 'PDF',
            print: "Imprimer"
          },
          sProcessing: "Traitement en cours...",
          sSearch: "Rechercher&nbsp;:",
          sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
          sInfo: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
          sInfoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
          sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
          sInfoPostFix: "",
          sLoadingRecords: "Chargement en cours...",
          sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
          sEmptyTable: "Aucune donn&eacute;e disponible dans le tableau",
          oPaginate: {
            sFirst: "Premier",
            sPrevious: "Pr&eacute;c&eacute;dent",
            sNext: "Suivant",
            sLast: "Dernier"
          },
          oAria: {
            sSortAscending: ": activer pour trier la colonne par ordre croissant",
            sSortDescending: ": activer pour trier la colonne par ordre d&eacute;croissant"
          }
        },
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'print'],
      });
      if (this.actionButtons.length > 0) {
        $(this.$refs.dataTable).on('click', '.action-btn', this.handleAction);
      }
    },
    reloadData() {
      this.table.ajax.reload();
    },
    handleAction(event) {
      const rowId = $(event.currentTarget).data('id');
      const rowData = this.table.row($(event.currentTarget).closest('tr')).data();
    }
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