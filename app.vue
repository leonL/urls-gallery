<script setup lang="ts">
  import { useResourceStore } from './stores/resources';
  import { useLookupStore } from './stores/lookups';

  const { locales, setLocale } = useI18n();
  
  const resourceStore = useResourceStore();
  await callOnce('resources', () => resourceStore.fetch());

  const lookupStore = useLookupStore();
  await callOnce('lookups', () => lookupStore.fetch());
</script>

<template>
  <UApp>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
        <button v-for="locale in locales" @click="setLocale(locale.code)">
          {{ locale.name }}
        </button>
      </nav>
    </header>
    <h1>{{ $t('welcome') }}</h1>
    <NuxtPage />
  </UApp>
</template>