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
  <div>
    <h1 class="title">{{ $t('filters') }}</h1>
    <div class="issues filter">
      <div class="toggle">
        <img class="icon" src="~/assets/issues.png">
        <h2 class='heading'>{{ $t('issues') }}</h2>
      </div>
      <div class="options">
        <label v-for="option in issueOptions" :key="option.value">
          <input type="checkbox" :value="option.value" v-model="filterState.issueIds" />
          {{ option.label }}
        </label>
      </div>
    </div>
    <div class="content-type filter">
      <div class="toggle">
        <img class="icon" src="~/assets/content-type.png">
        <h2 class='heading'>{{ $t('contentTypesFilter') }}</h2>
      </div>
      <div class="options">
        <label v-for="option in contentTypeOptions" :key="option.value">
          <input type="checkbox" :value="option.value" v-model="filterState.contentTypeIds" />
          {{ option.label }}
        </label>
      </div>
    </div>
    <div class="geographic-scope filter">
      <div class="toggle">
        <img class="globe icon" src="~/assets/globe.png">
        <h2 class='heading'>{{ $t('geographicScope') }}</h2>
      </div>
      <div class="options">
        <label v-for="option in geoScopeOptions" :key="option.value">
          <input type="checkbox" :value="option.value" v-model="filterState.geographicScopeId" />
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .title {
    font-weight: bold;
    color: black;
    font-size: 24px;
    margin-bottom: 10px;
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
    margin-right: 30px;
    font-size: 18px;
    font-weight: bold;
  }

  label {
    display: block;
    margin: 10px 0;
    color: black;
    font-size: 18px;
  }
</style>
