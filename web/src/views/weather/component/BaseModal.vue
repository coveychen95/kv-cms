<template>
  <Teleport to="body">
    
    <Transition name="modal-outer">
      <div
        v-show="modalValue"
        class="absolute top-0 left-0 flex justify-center w-full h-screen px-8 bg-black bg-opacity-30"
      >
        <Transition name="modal-inner">
          <div v-if="modalValue" class="self-start max-w-screen-md p-4 mt-32 text-black bg-white ">
            <slot></slot>
            <button
              @click="$emit('close-modal')"
              class="px-6 py-2 mt-8 text-white bg-weather-primary"
            >Close</button>
          </div>
        </Transition>
        
      </div>
      
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