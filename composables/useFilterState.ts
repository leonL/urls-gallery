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

  const hasIssues = computed(() => filter.value.issueIds.length > 0);
  const isLanguageSpecific = computed(() => filter.value.languageId !== "both");
  const hasCustomYearRange = computed(() => {
    return filter.value.yearPublishedRange.start !== resourceStore.earliestPublicationYear ||
    filter.value.yearPublishedRange.end !== currentYear;
  });
  const hasContentTypes = computed(() => filter.value.contentTypeIds.length > 0);
  const hasGeographicScopes = computed(() => filter.value.geographicScopeId.length > 0);

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
  
  const filter = useState<Filter>('resourceFilter', () => ({
    issueIds: [],
    contentTypeIds: [],
    geographicScopeId: [],
    languageId: "both",
    yearPublishedRange: {
      start: resourceStore.earliestPublicationYear,
      end: currentYear 
    } 
  }));

  return { filter, hasIssues, isLanguageSpecific, hasCustomYearRange, 
    hasContentTypes, hasGeographicScopes, resetByType }
}