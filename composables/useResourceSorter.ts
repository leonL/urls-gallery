export function useResourceSorter() {
  const filteredResources = useResourceFilter();

  const sortByDateType = useState('sortByDateType', () => 'added');

  const sortedResources = computed(() => {
    const resourcesCopy = [...filteredResources.value];
    const sorted = resourcesCopy.sort((aResource, bResource) => {
      let aDate, bDate;
      
      if (sortByDateType.value === "added") {
        aDate = new Date(aResource.dateAdded),
        bDate = new Date(bResource.dateAdded);
      } else {
        aDate = new Date(aResource.pubYear, aResource.pubMonth || 0, aResource.pubDay || 1),
        bDate = new Date(bResource.pubYear, bResource.pubMonth || 0, bResource.pubDay || 1);
      }

      if (aDate < bDate) {
        return 1;
      } else if (aDate > bDate) {
        return -1;
      } else {
        return 0
      }

    });
    return sorted;
  });

  return sortedResources;
}