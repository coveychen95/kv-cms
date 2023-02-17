<template>
  <header class="sticky top-0 shadow-lg bg-weather-primary">
    <nav
      class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row"
    >
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3">
        <i class="text-2xl fa-solid fa-sun"></i>
        <p class="text-2xl">The Local Weather</p>
      </RouterLink>
      <div class="flex justify-end flex-1 gap-3">
        <i
          @click="toggleModal"
          class="text-xl duration-150 cursor-pointer fa-solid fa-circle-info hover:text-weather-secondary"
        ></i>
        <i
          @click="addCity"
          v-if="route.query"
          class="text-xl duration-150 cursor-pointer fa-solid fa-plus hover:text-weather-secondary"
        ></i>
      </div>
    </nav>
  </header>

  <BaseModal :modalValue="isModal" @closeModal="toggleModal">
    <div>
      <h1 class="mb-1 text-2xl">About:</h1>
      <p class="mb-4">
        The Local Weather allows you to track the current and future weather or
        cities of your choosing.
      </p>
      <h2 class="text-2xl">How it works:</h2>
      <ol class="mb-4 list-decimal list-inside">
        <li>Search for your city by entering the name into the search bar.</li>
        <li>
          Select a city by clicking the "+" icon in the top right. This will
          save the city to view at o later time on the home page.
        </li>
      </ol>
      <h2 class="text-2xl">Removing a city:</h2>
      <p>
        If you no longer wish to track a city, simply select the city within the
        home page. At the bottom of the page, there will be an option to delete
        the city.
      </p>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { uid } from 'uid'
import BaseModal from './BaseModal.vue'
const STORAGE_KEY_SAVED_CITIES = 'saved-cities'

const route = useRoute()
const router = useRouter()

const savedCities = ref<Array<any>>([])

const addCity = () => {
  const localCities = localStorage.getItem(STORAGE_KEY_SAVED_CITIES)
  if (localCities) {
    savedCities.value = JSON.parse(localCities)
  }
  const [city, state] = (route.params.city as string).split('-')
  const locationObj = {
    id: uid(),
    state,
    city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  }

  savedCities.value.push(locationObj)

  localStorage.setItem(
    STORAGE_KEY_SAVED_CITIES,
    JSON.stringify(savedCities.value)
  )

  let query = { ...route.query }
  delete query.preview
  query.id = locationObj.id
  router.replace({ query })
}

const isModal = ref(false)
const toggleModal = () => {
  isModal.value = !isModal.value
}
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3 cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3 cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
