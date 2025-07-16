<script setup lang="ts">
  import SummaryToggle from './filters/SummaryToggle.vue';
  import CategorizedCheckboxOptions from './filters/CategorizedCheckboxOptions.vue';
  import CheckboxOptions from './filters/CheckboxOptions.vue';

  import issuesIcon from "~/assets/issues.png";
  import contentTypeIcon from "~/assets/content-type.png";
  import geoScopeIcon from "~/assets/globe.png";
</script>


<template>
  <div id="filters">
    <h1 id="title">{{ $t('filters') }}</h1>
    
    <SummaryToggle :icon="issuesIcon" :heading="$t('issues')" :isOpen="true"> 
      <CategorizedCheckboxOptions categoryId="issues" filterId="issueIds" />
    </SummaryToggle>

    <SummaryToggle :icon="contentTypeIcon" :heading="$t('contentTypesFilter')">
      <CheckboxOptions lookupId="contentTypes" filterId="contentTypeIds" />
    </SummaryToggle> 

    <SummaryToggle :icon="geoScopeIcon" :heading="$t('geographicScope')">
      <CheckboxOptions lookupId="geoScopes" filterId="geographicScopeId"/>
    </SummaryToggle> 
  </div>
</template>

<style scoped>
  h1#title {
    font-weight: bold;
    color: black;
    font-size: 24px;
    margin-bottom: 10px;
  }
</style>
