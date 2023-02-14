<script setup lang="ts">
import AsyncCity from './component/AsyncCity.vue'
</script>

<template>
  <div>
    <Suspense>
      <AsyncCity></AsyncCity>
      <template #fullback>
        <p>loading...</p>
      </template>
    </Suspense>
    
  </div>
</template>
