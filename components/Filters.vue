<script setup lang="ts">
  import SummaryToggle from './filters/SummaryToggle.vue';
  import Options from './filters/Options.vue';
  import CategorizedCheckboxOptions from './filters/CategorizedCheckboxOptions.vue';
  import YearRange from './filters/YearRange.vue';

  import issuesIcon from "~/assets/issues.png";
  import languageIcon from "~/assets/language.png";
  import contentTypeIcon from "~/assets/content-type.png";
  import geoScopeIcon from "~/assets/globe.png";
  import calendarIcon from "~/assets/calendar.png";

  const fState = useFilterState();
</script>


<template>
  <div id="filters">
    <h1 id="title">{{ $t('filters') }}</h1>
    <Icon v-if="fState.isActive.value" id='clear-button' @click="fState.reset" name="mdi:filter-remove" />

    
    <SummaryToggle :icon="issuesIcon" :heading="$t('issues')" 
      :isActive="fState.hasAnyIssues.value" :isOpen="true" @resetFilter="fState.resetByType('issueIds')">
      <CategorizedCheckboxOptions categoryId="issues" filterId="issueIds" />
    </SummaryToggle>

    <SummaryToggle :icon="calendarIcon" :heading="$t('publicationYear')"
      :isActive="fState.hasCustomYearRange.value" @resetFilter="fState.resetByType('yearPublishedRange')">
      <YearRange />
    </SummaryToggle>

    <SummaryToggle :icon="languageIcon" :heading="$t('language')" 
      :isActive="fState.isLanguageSpecific.value" @resetFilter="fState.resetByType('languageId')"> 
      <Options lookupId="languages" filterId="languageId" :isRadio="true" />
    </SummaryToggle>

    <SummaryToggle :icon="contentTypeIcon" :heading="$t('contentTypesFilter')"
      :isActive="fState.hasAnyContentTypes.value" @resetFilter="fState.resetByType('contentTypeIds')">
      <Options lookupId="contentTypes" filterId="contentTypeIds" />
    </SummaryToggle> 

    <SummaryToggle :icon="geoScopeIcon" :heading="$t('geographicScope')"
      :isActive="fState.hasAnyGeographicScopes.value" @resetFilter="fState.resetByType('geographicScopeId')">
      <Options lookupId="geoScopes" filterId="geographicScopeId"/>
    </SummaryToggle> 
  </div>
</template>

<style scoped>
  h1#title {
    font-weight: bold;
    color: black;
    font-size: 24px;
    margin-bottom: 10px;
    display: inline-block;
  }

  #clear-button {
    color: darkred;
    font-size: larger;
    position: relative;
    cursor: pointer;
    left: 5px;
    top: 3px;
    z-index: 2;
  }
</style>
