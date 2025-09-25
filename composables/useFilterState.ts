export interface Filter {
  issueIds: string[],
  contentTypeIds: string[],
  geographicScopeId: string[],
  languageId: string
}

export function useFilterState() {
  const initialFilterState = <Filter>{
    issueIds: [],
    contentTypeIds: [],
    geographicScopeId: [],
    languageId: "both"
  }

  const hasAnyIssues = computed(() => filter.value.issueIds.length > 0);
  const isLanguageSpecific = computed(() => filter.value.languageId !== "both");
  const hasAnyContentTypes = computed(() => filter.value.contentTypeIds.length > 0);
  const hasAnyGeographicScopes = computed(() => filter.value.geographicScopeId.length > 0);

  const isActive = computed(() => {
    return hasAnyIssues.value || 
      isLanguageSpecific.value ||
      hasAnyContentTypes.value || 
      hasAnyGeographicScopes.value;
  }); 

  const hasIssues = (issueIds: string[]): boolean => {
    return issueIds.some(id => filter.value.issueIds.includes(id));
  };

  const removeIssues = (issueIds: string[]) => {
    filter.value.issueIds = filter.value.issueIds.filter(id => !issueIds.includes(id));
  };

  const resetByType = (type: keyof Filter) => {
    switch (type) {
      case 'issueIds':
        filter.value.issueIds = [];
        break;
      case 'contentTypeIds':
        filter.value.contentTypeIds = [];
        break;
      case 'geographicScopeId':
        filter.value.geographicScopeId = [];
        break;
      case 'languageId':
        filter.value.languageId = "both";
        break;
    }
  };

  const reset = () => {
    filter.value = structuredClone(initialFilterState);
  }

  const filter = useState<Filter>('resourceFilter', () => (structuredClone(initialFilterState)));

  return { filter, isActive, hasAnyIssues, isLanguageSpecific, reset,
    hasAnyContentTypes, hasAnyGeographicScopes, resetByType, hasIssues, removeIssues }
}