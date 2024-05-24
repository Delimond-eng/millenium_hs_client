<template>
  <div>
    <select
      class="form-control"
      :id="id"
      :name="name"
      :disabled="disabled"
      :required="required"
    ></select>
  </div>
</template>

<script>
export default {
  name: "Select2",
  data() {
    return {
      select2: null,
    };
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: [String, Array], // previously was `value: String`
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    options: {
      handler(val) {
        this.setOption(val);
      },
      deep: true,
    },
    modelValue: {
      handler(val) {
        this.setValue(val);
      },
      deep: true,
    },
  },
  methods: {
    setOption(val = []) {
      this.select2.empty();
      this.select2.select2({
        placeholder: this.placeholder,
        ...this.settings,
        data: val,
      });
      this.setValue(this.modelValue);
    },
    setValue(val) {
      if (val instanceof Array) {
        this.select2.val([...val]);
      } else {
        this.select2.val([val]);
      }
      this.select2.trigger("change");
    },
  },
  mounted() {
    this.select2 = $(this.$el)
      .find("select")
      .select2({
        placeholder: this.placeholder,
        ...this.settings,
        data: this.options,
      })
      .on("select2:select select2:unselect", (ev) => {
        this.$emit("update:modelValue", this.select2.val());
        this.$emit("select", ev["params"]["data"]);
      })
      .on("select2:open", function () {
        $(".select2-search__field").attr("placeholder", "Rechercher...");
        $(".select2-dropdown").css(
          "box-shadow",
          "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"
        );
      });
    this.setValue(this.modelValue);
  },
  beforeUnmount() {
    this.select2.select2("destroy");
  },
};
</script>
