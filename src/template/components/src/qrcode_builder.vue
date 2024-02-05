<template>
  <vue-qrcode value="Gaston delimond" :width="size" />
</template>

<script>
import VueQrcode from "vue-qrcode";

export default {
  components: {
    VueQrcode,
  },
  props: {
    size: {
      type: Number,
      default: 120,
    },
    content: {
      type: String,
      default: "",
    },
  },
  methods: {
    genererQRCode(value) {
      this.$emit("update:content", value);
    },
  },
};
</script>
