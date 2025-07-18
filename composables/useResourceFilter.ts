export function useResourceFilter() {
  const resourceStore = useResourceStore();
  const unfilteredResources = resourceStore.valid;
  
  const filterState = useFilterState();

  const isLanguageFilterActive = computed(() => {
    return filterState.value.languageId !== "both";
  });

  const arrayFilterKeys = ['issueIds', 'geographicScopeId', 'contentTypeIds'] as const;
  type ArrayFilterKey = typeof arrayFilterKeys[number];

  const filteredResources = computed(() => {
    let filteredResources = unfilteredResources;
    
    arrayFilterKeys.forEach((filterKey: ArrayFilterKey) => {
      const activeFilterTags:string[] = filterState.value[filterKey];
      if (activeFilterTags.length > 0) {
        filteredResources = filteredResources.filter(resource => {
          let resourceTags = resource[filterKey];
          if (!Array.isArray(resourceTags)) resourceTags = [resourceTags];
          return activeFilterTags.some(activeTags => resourceTags.includes(activeTags));
        });
      }
    });

    if (isLanguageFilterActive.value) {
      filteredResources = filteredResources.filter(resource => {
        return resource.languageId === filterState.value.languageId;
      });
    }

    filteredResources = filteredResources.filter(r => {
      const filterYearRange = filterState.value.yearPublishedRange;
      let isPubYearInRange = true;
      if (r.pubYear <  filterYearRange.start || r.pubYear > filterYearRange.end) {
        isPubYearInRange = false;
      }
      return isPubYearInRange; 
    });

    return filteredResources;
  });

  return filteredResources;
}