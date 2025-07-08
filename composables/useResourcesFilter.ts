import { useResourceStore, type Resource } from '~/stores/resources';

interface ResourceFilter {
  resources: Ref<Resource[]>;
  filterState: Ref<ResourceFilterState>;
}

interface ResourceFilterState {
  geographicScopeId: string[];
}

export function useResourcesFilter(): ResourceFilter {
  const resourceStore = useResourceStore();
  const validResources = resourceStore.valid;

  const filterState = useState<ResourceFilterState>('resourceFilter', () => ({
    geographicScopeId: []
  }));

  const resources = computed(() => {
    let filteredResources = validResources;
    Object.entries(filterState.value).forEach(([key, value]) => {
      if (value.length > 0) {
        filteredResources = filteredResources.filter(r => {
          return (value as string[]).includes(r[key as keyof ResourceFilterState]);
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