export function useResourceFilter() {
  const resourceStore = useResourceStore();
  const unfilteredResources = resourceStore.valid;
  const filterState = useFilterState();
  const filters = useFilters();

  const isLanguageFilterActive = computed(() => {
    return filterState.value.languageId !== "both";
  });

  function isTagFilterActive(filterKey: keyof Filter) {
    const tags = filterState.value[filterKey];
    return Array.isArray(tags) && tags.length > 0; 
  } 

  const filteredResources = computed(() => {
    let filtered = filters.inPubYearRange(unfilteredResources);

    if (isTagFilterActive('issueIds')) {
      filtered = filters.hasTags(filtered, 'issueIds');
    }
    if (isTagFilterActive('contentTypeIds')) {
      filtered = filters.hasTags(filtered, 'contentTypeIds');
    } 
    if (isTagFilterActive('geographicScopeId')) {
      filtered = filters.hasTags(filtered, 'geographicScopeId');
    }
    if (isLanguageFilterActive.value) {
      filtered = filters.inLanguage(filtered);
    }

    return filtered;
  });

  return filteredResources;
}