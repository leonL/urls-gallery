<script setup lang="ts">
  import { useResourceStore } from './stores/resources';
  import { useLookupStore } from './stores/lookups';
  
  const resourceStore = useResourceStore();
  await callOnce('resources', () => resourceStore.fetch());

  const lookupStore = useLookupStore();
  await callOnce('lookups', () => lookupStore.fetch());
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </nav>
  </header>
  <NuxtPage />
</template>