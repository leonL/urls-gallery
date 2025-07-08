import { useResourceStore, type Resource } from '~/stores/resources';

interface ResourceFilter {
  resources: Ref<Resource[]>,
  filterState: Ref<ResourceFilterState>
}

interface ResourceFilterState {
  geographicScopeId: string[],
  contentTypeIds: string[]
}

export function useResourcesFilter(): ResourceFilter {
  const resourceStore = useResourceStore();
  const validResources = resourceStore.valid;

  const filterState = useState<ResourceFilterState>('resourceFilter', () => ({
    geographicScopeId: [],
    contentTypeIds: []
  }));

  const resources = computed(() => {
    let filteredResources = validResources;
    Object.entries(filterState.value).forEach(([key, value]) => {
      if (value.length > 0) {
        const filterIds = value as string[];
        filteredResources = filteredResources.filter(r => {
          let resourceIds = r[key as keyof ResourceFilterState];
          if (!Array.isArray(resourceIds)) resourceIds = [resourceIds];
          return filterIds.some(item => resourceIds.includes(item));
        })
      }
    });
    return filteredResources;
  });

  return {
    resources,
    filterState
  }
}