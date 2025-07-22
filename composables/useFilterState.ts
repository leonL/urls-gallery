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

function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function useFilterState() {
  const resourceStore = useResourceStore();

  const hasIssues = computed(() => filter.value.issueIds.length > 0);
  const isLanguageSpecific = computed(() => filter.value.languageId !== "both");

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
          end: getCurrentYear()
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
      end: getCurrentYear() 
    } 
  }));

  return { filter, hasIssues, isLanguageSpecific, resetByType }
}