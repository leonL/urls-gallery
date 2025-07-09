<script setup lang="ts">
  import { useLookupStore } from '~/stores/lookups';

  const { locale } = useI18n();
  const filterState = useResourcesFilter().filterState;
  const lookupStore = useLookupStore();

  const issueOptions = computed(() => {
    const labels = lookupStore.getAllLabels('issues', locale.value);
    return labels.map(label => ({ value: label.id.toLowerCase(), label: label.name }));
  });

  const contentTypeOptions = computed(() => {
    const labels = lookupStore.getAllLabels('contentTypes', locale.value);
    return labels.map(label => ({ value: label.id.toLowerCase(), label: label.name }));
  });
  
  const geoScopeOptions = computed(() => {
    const labels = lookupStore.getAllLabels('geoScopes', locale.value);
    return labels.map(label => ({ value: label.id.toLowerCase(), label: label.name }));
  });

</script>

<template>
  <div id="filters">
    <h1 id="issues" class="title">{{ $t('filters') }}</h1>
    <details class="filter">
      <summary>
        <img class="icon" src="~/assets/issues.png">
        <h2 class='heading'>{{ $t('issues') }}</h2>
      </summary>
      <div class="options">
        <label v-for="option in issueOptions" :key="option.value">
          <input type="checkbox" :id="option.value" :value="option.value" v-model="filterState.issueIds" />
          {{ option.label }}
        </label>
      </div>
    </details>
    <details id="content-type" class="filter">
      <summary>
        <img class="icon" src="~/assets/content-type.png">
        <h2 class='heading'>{{ $t('contentTypesFilter') }}</h2>
      </summary>
      <div class="options">
        <label v-for="option in contentTypeOptions" :key="option.value">
          <input type="checkbox" :id="option.value" :value="option.value" v-model="filterState.contentTypeIds" />
          {{ option.label }}
        </label>
      </div>
    </details>
    <details id="geographic-scope" class="filter">
      <summary>
        <img class="globe icon" src="~/assets/globe.png">
        <h2 class='heading'>{{ $t('geographicScope') }}</h2>
      </summary>
      <div class="options">
        <label v-for="option in geoScopeOptions" :key="option.value">
          <input type="checkbox" :id="option.value" :value="option.value" v-model="filterState.geographicScopeId" />
          {{ option.label }}
        </label>
      </div>
    </details>
  </div>
</template>

<style scoped>
  .title {
    font-weight: bold;
    color: black;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .filter {
    margin-bottom: 15px;
  }

  .icon {
    float: left;
    margin-right: 5px;
    position: relative;
    top: 2px;
  }

  .icon.globe {
    width: 19px;
    height: 19px;
  }

  .heading {
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    position: relative;
    bottom: 1px;
  }

  label {
    display: flex;
    gap: 5px;
    align-items: flex-start;
    margin: 10px 0;
    color: black;
    font-size: 16px;
  }

  input[type='checkbox'] {
    position: relative;
    top: 2px;
  }

  summary {
    list-style: none;
    &::after {
      float: right;
      border-style: solid;
      border-width: 0.15em 0.15em 0 0;
      content: '';
      height: 0.45em;
      width: 0.45em;
      position: relative;
      top: 0.20em;
      transform: rotate(135deg);
    }
    [open] &::after {
      top: 0.40em;
      transform: rotate(-45deg);
    }
  }
</style>
