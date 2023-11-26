<template>
    <div :id="id" class="toast toast-border-danger overflow-hidden w-100 mt-2" role="alert" aria-live="assertive"
        aria-atomic="true">
        <div class="toast-body">
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                    <lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop"
                        colors="primary:#f06548,secondary:#F7704B" style="width:30px;height:30px"></lord-icon>
                </div>
                <div class="flex-grow-1">
                    <h6 class="mb-0">{{ msg }}
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AlertMessage",
    props: {
        id: {
            type: String
        },
        msg: {
            type: String
        }
    }
}
</script>