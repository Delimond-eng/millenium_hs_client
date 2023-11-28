<template>
    <!-- Begin page -->
    <div id="layout-wrapper">

        <!-- header -->
        <header-layout></header-layout>
        <!-- sidebar -->
        <sidebar-layout></sidebar-layout>

        <!-- Vertical Overlay-->
        <div class="vertical-overlay"></div>

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <router-view />
        <!-- end main content-->

    </div>

    <!-- END layout-wrapper -->
</template>

<script>

import HeaderLayout from "@/template/view/layouts/header.layout";
import sidebarLayout from "@/template/view/layouts/sidebar.layout";
import ServiceSettingsCanvas from "../modals/modal_setting_service"

export default {
    name: "HomeSecure",
    components: {
        HeaderLayout,
        sidebarLayout,
        ServiceSettingsCanvas,
    },
    mounted() {
        this.$store.dispatch('services/showConfigs');
    }
}
</script>