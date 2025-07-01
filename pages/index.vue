<script setup lang="ts">
  import { useTextStore } from '~/stores/texts';

  const textStore = useTextStore();

  const { locale } = useI18n();

  const subtitleMarkdown = computed(() => {
    return textStore.getByType('subtitle', locale.value);
  });
</script>

<template>
  <div>
    <div class='titles'>
      <h1 class="title">{{ $t('homeTitle') }}</h1>
      <h3 class="subtitle">
        <MDC :value="subtitleMarkdown" unwrap="p" />
      </h3>
    </div>

    <div class='gallery'>
      <div class="filters">
        <!-- <IssuesFilters />  -->
        <Filters />
      </div>

      <div class='index'>
        <ResourceList />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  }

  .filters {
    width: 30%;
    flex-grow: 1; 
  }

  .index {
    width: 70%;
    position: relative;
  }
</style>
