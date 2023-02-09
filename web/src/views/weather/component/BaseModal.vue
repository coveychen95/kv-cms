<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalValue" class="absolute top-0 left-0 flex justify-center w-full h-screen px-8 bg-black bg-opacity-30"></div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
  defineEmits(['close-modal'])
  defineProps({
    modalValue: {
      type: Boolean,
      default: false
    }
  })
</script>