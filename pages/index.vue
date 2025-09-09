<script setup lang="ts">
  import { useTextStore } from '~/stores/texts';

  const textStore = useTextStore();

  const { locale } = useI18n();

  const subtitleMarkdown = computed(() => {
    return textStore.getByType('subtitle', locale.value);
  });
</script>

<template>
  <div id="index">
    <div class='titles'>
      <h1 class="title">{{ $t('homeTitle') }}</h1>
      <h3 class="subtitle">
        <MDC :value="subtitleMarkdown" unwrap="p" />
      </h3>
    </div>

    <div class='gallery'>
      <!-- <div class="sidebar">
        <Filters />
      </div> -->

      <div class='index'>
        <ResourceList />
      </div>
    </div>
  </div>
</template>

<style scoped>
  #index {
    height: 100%;
  }

  .titles {
    margin-bottom: 20px;
  }

  .title {
    font-size: 48px;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0px;
  }

  .subtitle {
    font-size: 24px;
    font-weight: initial;
    color: #767676;
  }

  .gallery {
    display: flex;
    height: 100vh;
    overflow-y: hidden;
  }
  
  .sidebar {
    width: 25%;
    flex-grow: 1;
    padding-right: 30px;
    overflow-y: auto;
    scrollbar-width: none;
  }
  
  .index {
    width: 75%;
    position: relative;
    overflow-y: auto;
    scrollbar-width: none;
  }
</style>
