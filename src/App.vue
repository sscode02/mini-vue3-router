<script setup lang="ts">
// import RouterLink from '../router/router/RouterLink';
import ComponentA from './components/ComponentA.vue'
</script>

<template>
  <ComponentA />
  <RouterLink to="/B" />
  <RouterLink to="/b" />
  <RouterLink to="/c" />
  <RouterLink to="/d" />
  <RouterLink to="/e" />
  <RouterLink to="/f" />
  <RouterLink to="/g" />
  <RouterView />
</template>

<style scoped></style>
