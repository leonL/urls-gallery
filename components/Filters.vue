<script setup lang="ts">
  import CheckboxFilterOptions from './filters/CheckboxFilterOptions.vue';
  import { useLookupStore } from '~/stores/lookups';

  const lookupStore = useLookupStore();
  const filterState = useFilterState();
  const { locale } = useI18n();

  const issueCategories = computed(() => {
    const categories = lookupStore.getAllCategoryLabels('issues', locale.value);
    return categories.map(c => ({ id: c.id.toLowerCase(), label: c.name, issueIds: c.lookupIds }));
  });

  function getLabelForIssueId(id: string) {
    return lookupStore.getLabel('issues', id, locale.value);
  }
</script>

<template>
  <div id="filters">
    <h1 id="issues" class="title">{{ $t('filters') }}</h1>
    
    <details id="issue-categories" class="filter" open>
      <summary>
        <img class="icon" src="~/assets/issues.png">
        <h2 class='heading'>{{ $t('issues') }}</h2>
      </summary>
      <details v-for="category in issueCategories" :key="category.id" class="category">
        <summary>
          <span class="label">{{ category.label }}</span>
        </summary>
        <div class="options">
          <label v-for="id in category.issueIds" :key="id">
            <input type="checkbox" :id="id" :value="id" v-model="filterState.issueIds" />
            {{ getLabelForIssueId(id) }}
          </label>
        </div>
      </details>
    </details>

    <details id="content-type" class="filter">
      <summary>
        <img class="icon" src="~/assets/content-type.png">
        <h2 class='heading'>{{ $t('contentTypesFilter') }}</h2>
      </summary>
      <CheckboxFilterOptions lookupId="contentTypes" filterId="contentTypeIds"/>
    </details>
    <details id="geographic-scope" class="filter">
      <summary>
        <img class="globe icon" src="~/assets/globe.png">
        <h2 class='heading'>{{ $t('geographicScope') }}</h2>
      </summary>
      <CheckboxFilterOptions lookupId="geoScopes" filterId="geographicScopeId"/>
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

  .filter summary {
    list-style: none;
  }
  
  .filter > summary::after {
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
  .filter[open] >summary:after {
    top: 0.40em;
    transform: rotate(-45deg);
  }

  details.category {
    margin: 10px 0;
  }
  
  .category > summary {
    font-weight: bold;
    display: flex;
    align-items: center; 
    justify-content: space-between;
    cursor: pointer;
  }
  
  .category .label {
    margin-right: 20%;
    font-size: 15px;
  }
  
  .category > summary::after {
    content: '+';
  }
  .category[open] > summary::after {
    content: '-';
  }
  
  label {
    display: flex;
    gap: 5px;
    align-items: flex-start;
    margin: 10px 0;
    color: black;
    font-size: 14px;
  }

  input[type='checkbox'] {
    width: 12px;
    position: relative;
    top: 1px;
  }
</style>
