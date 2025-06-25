<script setup lang="ts">
  import { useResourceStore } from './stores/resources';
  import { useLookupStore } from './stores/lookups';
  import { useTextStore } from './stores/texts';

  const { locale } = useI18n();
  const localePath = useLocalePath();
  
  const resourceStore = useResourceStore();
  await callOnce('resources', () => resourceStore.fetch());

  const lookupStore = useLookupStore();
  await callOnce('lookups', () => lookupStore.fetch());

  const textStore = useTextStore();
  await callOnce('texts', () => textStore.fetch());

  const isLocaleEn = computed(() => locale.value === 'en');

</script>

<template>
  <UApp>
    <header class="flex items-center justify-between px-8 py-4">
      <NuxtLink to="/">
        <img v-if="isLocaleEn" src="~/assets/NBWC_logo_en.png" class="logo" :alt="$t('altTextlogo')">
        <img v-else src="~/assets/NBWC_logo_fr.png" class="logo" :alt="$t('altTextlogo')">
      </NuxtLink>
      <nav class="flex gap-8">
        <NuxtLink :to="localePath('index')">{{ $t('home') }}</NuxtLink>
        <NuxtLink :to="localePath('about')">{{ $t('about') }}</NuxtLink>
        <NuxtLink :to="$switchLocalePath('fr')">FR</NuxtLink>
        <NuxtLink :to="$switchLocalePath('en')">EN</NuxtLink>
      </nav>
    </header>
    <NuxtPage />
  </UApp>
</template>

<style scope>
  .logo {
    width: 239px;
  }
</style>