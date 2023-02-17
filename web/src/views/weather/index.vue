<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNavigation from './component/SiteNavigation.vue'
import CityList from './component/CityList.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation></SiteNavigation>
    <RouterView></RouterView>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>
