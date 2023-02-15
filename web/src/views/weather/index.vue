<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNavigation from './component/SiteNavigation.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation></SiteNavigation>
    <RouterView></RouterView>
  </div>
</template>
