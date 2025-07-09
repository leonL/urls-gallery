<script setup lang="ts">
  import CheckboxFilterOptions from './CheckboxFilterOptions.vue';
</script>

<template>
  <div id="filters">
    <h1 id="issues" class="title">{{ $t('filters') }}</h1>
    <details id="issues" class="filter">
      <summary>
        <img class="icon" src="~/assets/issues.png">
        <h2 class='heading'>{{ $t('issues') }}</h2>
      </summary>
      <CheckboxFilterOptions lookupId="issues" filterId="issueIds"/>
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
