export interface Filter {
  issueIds: string[],
  contentTypeIds: string[],
  geographicScopeId: string[],
  languageId: string,
  yearPublishedRange: {
    start: number,
    end: number
  }
}

export function useFilterState() {
  const resourceStore = useResourceStore();

  const currentYear = new Date().getFullYear();

  const initialFilterState = {
    issueIds: [],
    contentTypeIds: [],
    geographicScopeId: [],
    languageId: "both",
    yearPublishedRange: {
      start: resourceStore.earliestPublicationYear,
      end: currentYear 
    } 
  }

  const hasAnyIssues = computed(() => filter.value.issueIds.length > 0);
  const isLanguageSpecific = computed(() => filter.value.languageId !== "both");
  const hasCustomYearRange = computed(() => {
    return filter.value.yearPublishedRange.start !== resourceStore.earliestPublicationYear ||
    filter.value.yearPublishedRange.end !== currentYear;
  });
  const hasAnyContentTypes = computed(() => filter.value.contentTypeIds.length > 0);
  const hasAnyGeographicScopes = computed(() => filter.value.geographicScopeId.length > 0);

  const isActive = computed(() => {
    return hasAnyIssues.value || 
      isLanguageSpecific.value || 
      hasCustomYearRange.value || 
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
      case 'yearPublishedRange':
        filter.value.yearPublishedRange = {
          start: resourceStore.earliestPublicationYear,
          end: currentYear
        };
        break;
    }
  };

  const reset = () => {
    filter.value = initialFilterState;
  }

  const filter = useState<Filter>('resourceFilter', () => (initialFilterState));


  return { filter, isActive, hasAnyIssues, isLanguageSpecific, hasCustomYearRange, reset,
    hasAnyContentTypes, hasAnyGeographicScopes, resetByType, hasIssues, removeIssues }
}