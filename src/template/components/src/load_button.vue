<template>
  <button v-if="btnType === 'button'" @click="$emit('click', $event)" :type="btnType" :disabled="loading"
    class="btn btn-border btn-load" :class="className">
    <svg class="me-2" width="22" v-show="loading" fill="#FFFFFF" height="22" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <circle class="spinner_S1WN" cx="4" cy="12" r="3" />
      <circle class="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" />
      <circle class="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" />
    </svg>
    <span>
      <slot></slot>
    </span>
  </button>
  <button v-else :type="btnType" :disabled="loading" class="btn btn-border btn-load" :class="className">
    <svg class="me-2" v-show="loading" style="height: 22px; width: 22px" fill="#FFFFFF" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <circle class="spinner_S1WN" cx="4" cy="12" r="3" />
      <circle class="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" />
      <circle class="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" />
    </svg>
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "LoadButton",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },

    btnType: {
      type: String,
      default: "button",
      validator: (val) => ["button", "submit", "reset"].includes(val.toLocaleLowerCase()),
    },
  },
};
</script>

<style>
.spinner_S1WN {
  animation: spinner_MGfb 0.8s linear infinite;
  animation-delay: -0.8s;
}

.spinner_Km9P {
  animation-delay: -0.65s;
}

.spinner_JApP {
  animation-delay: -0.5s;
}

@keyframes spinner_MGfb {

  93.75%,
  100% {
    opacity: 0.2;
  }
}
</style>
