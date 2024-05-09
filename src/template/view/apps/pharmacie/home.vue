<template>
  <div>
    <!-- Header -->
    <header-layout />
    <!-- End Header -->

    <!-- Vertical Overlay-->
    <div class="vertical-overlay"></div>

    <router-view></router-view>

    <footer-layout />
  </div>
</template>

<script>
import HeaderLayout from "./layouts/header.vue";
import FooterLayout from "./layouts/footer.vue";
export default {
  name: "SellerHome",
  components: {
    HeaderLayout,
    FooterLayout,
  },
  mounted() {
    this.addAttributes();
    this.$store.dispatch("pharmacie/viewPharmacieProducts");
    this.$store.dispatch("pharmacie/viewAllCategories");
    this.$store.dispatch("pharmacie/viewDailySellerReport");
  },
  unmounted() {
    this.removeAttributes();
  },

  methods: {
    addAttributes() {
      // Ajoutez vos attributs à la balise HTML (ici, <html>) ici
      document.documentElement.setAttribute("data-layout", "horizontal");
      document.documentElement.setAttribute("data-layout-style", "");
      document.documentElement.setAttribute("data-layout-position", "fixed");
      document.documentElement.setAttribute("data-topbar", "dark");
      /*       document.body.classList.add("overflow-hidden"); */
    },
    removeAttributes() {
      // Supprimez vos attributs de la balise HTML (ici, <html>) ici
      document.documentElement.removeAttribute("data-layout");
      document.documentElement.removeAttribute("data-layout-style");
      document.documentElement.removeAttribute("data-layout-position");
      document.documentElement.removeAttribute("data-topbar");
    },
  },
};
</script>
