import type { Filter } from '~/composables/useFilterState';

export function useResourceFilter() {
  const resourceStore = useResourceStore();
  const unfilteredResources = resourceStore.valid;
  
  const filterState = useFilterState();

  const activeArrayFilters = computed(() => {
    return Object.fromEntries(
      Object.entries(filterState.value).filter(([_, fValue]) => Array.isArray(fValue) && fValue.length > 0)
    );
  });

  const isLanguageFilterActive = computed(() => {
    return filterState.value.languageId !== "both";
  });

  const filteredResources = computed(() => {
    let filteredResources = unfilteredResources;
    
    Object.entries(activeArrayFilters.value).forEach(([filterId, activeTags]) => {
      const activeFilterTags:string[] = activeTags;
      filteredResources = filteredResources.filter(resource => {
        let resourceTags = resource[filterId as keyof Filter];
        if (!Array.isArray(resourceTags)) resourceTags = [resourceTags];
        return activeFilterTags.some(activeTags => resourceTags.includes(activeTags));
      });
    });

    if (isLanguageFilterActive.value) {
      filteredResources = filteredResources.filter(resource => {
        return resource.languageId === filterState.value.languageId;
      });
    }

    return filteredResources;
  });

  return filteredResources;
}