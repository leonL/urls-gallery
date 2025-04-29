<script setup lang="ts">
  import { useResourceStore } from './stores/resources';
  
  const store = useResourceStore();
  await callOnce('resources', () => store.fetchResources())

</script>

<template>
  <div>
    <h1>{{ store.count }} Resources</h1>
    <ul>
      <li v-for="resource in store.filtered" :key="resource.id">
        {{ resource.enTitle }}
      </li>
    </ul>
  </div>
</template>
