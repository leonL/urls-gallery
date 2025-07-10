import type { Filter } from '~/composables/useFilterState';

export function useResourceFilter() {
  const resourceStore = useResourceStore();
  const unfilteredResources = resourceStore.valid;
  
  const filterState = useFilterState();
  const activeFilters = computed(() => {
    return Object.fromEntries(
      Object.entries(filterState.value).filter(([_, arr]) => Array.isArray(arr) && arr.length > 0)
    );
  });

  const filteredResources = computed(() => {
    let filteredResources = unfilteredResources;
    Object.entries(activeFilters.value).forEach(([filterId, activeTags]) => {
      const activeFilterTags:string[] = activeTags;
      filteredResources = filteredResources.filter(resource => {
        let resourceTags = resource[filterId as keyof Filter];
        if (!Array.isArray(resourceTags)) resourceTags = [resourceTags];

        return activeFilterTags.some(activeTags => resourceTags.includes(activeTags));
      });
    }); 
    return filteredResources;
  });

  return filteredResources;
}