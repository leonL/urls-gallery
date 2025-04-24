<script setup lang="ts">
  import { useResourceStore } from './stores/resources';
  
  const store = useResourceStore();
  await callOnce('resources', () => store.fetchResources())

</script>

<template>
  <div>
    <h1>Resources</h1>
    <div v-if="store.error">
      <p>Error: {{ store.error }}</p>
    </div>
    <ul v-else-if="store.count > 0">
      <li v-for="resource in store.filtered" :key="resource.id">{{ resource.title }}</li>
    </ul>
  </div>
</template>
