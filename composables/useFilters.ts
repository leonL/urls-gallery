export function useFilters() {  
  const filterState = useFilterState();

  const arrayFilterKeys = ['issueIds', 'geographicScopeId', 'contentTypeIds'] as const;
  type ArrayFilterKey = typeof arrayFilterKeys[number];

  const hasTags = function(resources: Resource[], filterKey: ArrayFilterKey) {
    const filterTags:string[] = filterState.value[filterKey];
    return resources.filter(resource => {
      let resourceTags = resource[filterKey];
      if (!Array.isArray(resourceTags)) resourceTags = [resourceTags];
      return filterTags.some(activeTags => resourceTags.includes(activeTags));
    });
  }

  const inLanguage = function(resources: Resource[]) {
    return resources.filter(resource => {
      return resource.languageId === filterState.value.languageId;
    });
  }

  const inPubYearRange = function (resources: Resource[]) {
    return resources.filter(r => {
      const filterYearRange = filterState.value.yearPublishedRange;
      let isPubYearInRange = true;
      if (r.pubYear <  filterYearRange.start || r.pubYear > filterYearRange.end) {
        isPubYearInRange = false;
      }
      return isPubYearInRange; 
    });
  }

  return { inLanguage, inPubYearRange, hasTags };
}