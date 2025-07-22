export function useFilters() {  
  const filterState = useFilterState();
  const filter = filterState.filter;

  const arrayFilterKeys = ['issueIds', 'geographicScopeId', 'contentTypeIds'] as const;
  type ArrayFilterKey = typeof arrayFilterKeys[number];

  const hasTags = function(resources: Resource[], filterKey: ArrayFilterKey) {
    const filterTags:string[] = filter.value[filterKey];
    return resources.filter(resource => {
      let resourceTags = resource[filterKey];
      if (!Array.isArray(resourceTags)) resourceTags = [resourceTags];
      return filterTags.some(activeTags => resourceTags.includes(activeTags));
    });
  }

  const inLanguage = function(resources: Resource[]) {
    return resources.filter(resource => {
      return resource.languageId === filter.value.languageId;
    });
  }

  const inPubYearRange = function (resources: Resource[]) {
    return resources.filter(r => {
      const filterYearRange = filter.value.yearPublishedRange;
      let isPubYearInRange = true;
      if (r.pubYear <  filterYearRange.start || r.pubYear > filterYearRange.end) {
        isPubYearInRange = false;
      }
      return isPubYearInRange; 
    });
  }

  return { inLanguage, inPubYearRange, hasTags };
}