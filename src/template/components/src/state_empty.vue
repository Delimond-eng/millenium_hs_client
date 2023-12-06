<template>
    <div class="noresult d-flex justify-content-center align-items-center" :style="expanded ? 'height:300px' : ''">
        <div class="text-center">
            <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon>
            <h5 class="mt-2">{{ title }}</h5>
            <p class="text-muted mb-0">{{ description }}.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "StateEmpty",

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