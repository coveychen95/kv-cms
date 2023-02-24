<template>
  <div>
    <!-- <Viewer :value="content" :plugins="plugins"></Viewer> -->
    <Editor v-model="content" :plugins="plugins"></Editor>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// @ts-ignore
import { Editor, Viewer } from '@bytemd/vue-next'
import 'bytemd/dist/index.css'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'

const content = ref('')
const plugins = [gfm(), highlight(), math()]
</script>
