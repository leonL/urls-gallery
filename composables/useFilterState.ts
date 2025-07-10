export interface Filter {
  issueIds: string[],
  contentTypeIds: string[],
  geographicScopeId: string[]
}

export function useFilterState() {
  return useState<Filter>('resourceFilter', () => ({
    issueIds: [],
    contentTypeIds: [],
    geographicScopeId: []
  }));
}