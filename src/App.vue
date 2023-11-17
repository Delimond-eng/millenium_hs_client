<template>
	<!-- main router view content -->
	<router-view />
</template>

<script>
import MainTag from "@/template/view/main"
export default {
	name: 'App',
	components: {
		MainTag
	},
}
</script>