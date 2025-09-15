<script setup lang="ts">
  import SummaryToggle from './filters/SummaryToggle.vue';
  import Options from './filters/Options.vue';
  import YearRange from './filters/YearRange.vue';

  import issuesIcon from "~/assets/issues.png";
  import languageIcon from "~/assets/language.png";
  import contentTypeIcon from "~/assets/content-type.png";
  import geoScopeIcon from "~/assets/globe.png";
  import calendarIcon from "~/assets/calendar.png";

  const props = withDefaults(defineProps<{
    isIssuesOpen?: boolean
  }>(), {
    isIssuesOpen: true
  });

  const fState = useFilterState();
</script>


<template>
  <h1 id="title">{{ $t('filters') }}</h1>
  <div id="filters">
    <Icon v-if="fState.isActive.value" id='clear-button' @click="fState.reset" name="mdi:filter-remove" />

    <SummaryToggle :icon="issuesIcon" :heading="$t('issues')" 
      :isActive="fState.hasAnyIssues.value" :isOpen="isIssuesOpen" @resetFilter="fState.resetByType('issueIds')">
      <Options lookupId="issues" filterId="issueIds" />
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

  #filters {
    max-height: 87vh;
    overflow-y: scroll;
    border-bottom: 1px dotted pink;
    scrollbar-width: none;
  }

  #filters * {
    outline: none;
  }

  @media screen and (max-width: 799px) {
    #filters {
      border: none;
    }
  }
</style>
