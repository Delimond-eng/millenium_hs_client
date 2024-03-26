<template>
    <input ref="autocompleteInput" id="autocompleteInput" class="form-control" :placeholder="placeholder" type="text"
        dir="ltr" spellcheck="false" autocomplete="off" autocapitalize="off" />
</template>

<script>
export default {
    name: "AutocompleteWidget",
    props: {
        data: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: "Recherche...",
        },
        selectedKey: {
            type: String,
            default: "",
        },
        selectedLabel: {
            type: String,
            default: "",
        },
    },
    mounted() {
        this.initAutoComplete();
    },
    methods: {
        initAutoComplete() {
            let self = this;
            new autoComplete({
                selector: "#autocompleteInput",
                placeholder: this.placeholder,
                data: {
                    src: $.map(this.data, (item) =>
                        typeof item === "object" ? item[this.selectedLabel] : item
                    ),
                    cache: true,
                },
                resultsList: {
                    element: (list, data) => {
                        if (!data.results.length) {
                            var noResults = document.createElement("div");
                            noResults.setAttribute("class", "no_result");
                            noResults.innerHTML =
                                '<span>Aucun resultat pour "' + data.query + '"</span>';
                            list.prepend(noResults);
                        }
                    },
                    noResults: true,
                },
                events: {
                    input: {
                        selection: function (event) {
                            let selectedValue = event.detail.selection.value;
                            self.$refs.autocompleteInput.value = selectedValue;
                            let selectedItem = self.data.find((item) => {
                                if (typeof item === "object") {
                                    return item[self.selectedLabel] === selectedValue;
                                } else {
                                    return item === selectedValue;
                                }
                            });
                            if (self.selectedKey) {
                                self.$emit("onSelected", selectedItem[self.selectedKey]);
                            } else {
                                self.$emit("onSelected", selectedItem);
                            }
                        }.bind(this),
                    },
                },
            });
        },
    },
};
</script>
