<script setup lang="ts">
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
    <header>
      <NuxtLink to="/">
        <img v-if="isLocaleEn" src="~/assets/NBWC_logo_en.png" class="logo" :alt="$t('altTextlogo')">
        <img v-else src="~/assets/NBWC_logo_fr.png" class="logo" :alt="$t('altTextlogo')">
      </NuxtLink>
      <nav>
        <NuxtLink id='home' :to="localePath('index')">{{ $t('home') }}</NuxtLink>
        <NuxtLink :to="localePath('about')">{{ $t('about') }}</NuxtLink>
        <NuxtLink class='locale' :to="$switchLocalePath('fr')">FR</NuxtLink>
        <NuxtLink class='locale' :to="$switchLocalePath('en')">EN</NuxtLink>
      </nav>
    </header>
    <NuxtPage />
  </UApp>
</template>

<style scope>
  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  .logo {
    width: 239px;
  }

  nav {
    align-self: center;
    font-size: 25px;
  }

  nav a {
    color: #000000;
    margin-right: 20px;
    text-decoration: none;
  }

  nav a#home {
    margin-right: 10px;
  }
  
  nav a.router-link-exact-active {
    color: var(--primary-color);
    font-weight: bold;
  }
  
  nav a.locale {
    font-weight: bold;
    margin-right: 5px;
    text-decoration: none;
  }

  nav a.locale.router-link-exact-active {
    border-radius: 27px;
    background-color: var(--primary-color);
    padding: 5px 10px;
    color: #ffffff;
  }

  @media screen and (max-width: 799px) {
    header {
      margin-bottom: 10px;
    }

    .logo {
      width: max(30dvw, 135px);
    }

    nav {
      font-size: max(3dvw, 14px);
    }

    nav a {
      margin-right: 2dvw;
    }

    nav a#home {
      margin-right: 1.5dvw;
    }

    nav a.locale {
      margin-right: 1dvw;
    }

    nav a.locale.router-link-exact-active {
      border-radius: 27px;
      padding: 2px 5px;
    }
  }
</style>