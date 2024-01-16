<template>
    <div class="noresult d-flex justify-content-center align-items-center" :style="expanded ? 'height:300px' : ''">
        <div class="text-center" v-show="!isLoading">
            <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon>
            <h5 class="mt-2">{{ title }}</h5>
            <p class="text-muted mb-0">{{ description }}.
            </p>
        </div>

        <div class="text-center" v-show="isLoading">
            <lord-icon src="https://cdn.lordicon.com/pbbsmkso.json" trigger="loop"
                colors="primary:#405189,secondary:#08a88a" style="width:75px;height:75px"></lord-icon>
            <h6 class="mt-2">chargement en cours...</h6>
        </div>
    </div>
</template>

<script>
export default {
    name: "StateEmpty",


    computed: {
        isLoading() {
            return this.$store.getters['services/GET_LOADING']
        }
    },

    props: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        expanded: {
            type: Boolean,
            default: true,
        }
    }
}
</script>