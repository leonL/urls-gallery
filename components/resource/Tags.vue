<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import { useLookupStore } from '~/stores/lookups';
  import { isNotEmpty } from '~/utils/base';

  const props = defineProps<{
    r: Resource
  }>();

  const lookupStore = useLookupStore();

  const { locale } = useI18n();

  function formatTagsStr(a: Array<string | undefined>) {
    const filtered = a.filter(item => item !== undefined && item !== '');
    filtered.sort((a, b) => (a ?? '').localeCompare(b ?? '', locale.value));
    return filtered.join("; ");
  }

  const geographicScope = computed(() => {
    const geoScopeId = props.r.geographicScopeId;
    return lookupStore.getLabel('geoScopes', geoScopeId);
  });

  const hasContentType = computed(() => {
    const cTypeIds = props.r.contentTypeIds;
    return isNotEmpty(cTypeIds);
  });

  const contentTypesStr = computed(() => {
    const cTypeIds = props.r.contentTypeIds;
    const cTypesArray = lookupStore.getLabels('contentTypes', cTypeIds);
    return formatTagsStr(cTypesArray);
  });

  const hasIssues = computed(() => {
    const issuesIds = props.r.issueIds;
    return isNotEmpty(issuesIds);
  });

  const issuesStr = computed(() => {
    const issuesIds = props.r.issueIds;
    const issuesArray = lookupStore.getLabels('issues', issuesIds);
    return formatTagsStr(issuesArray);
  });
</script>

<template>
  <div class="tags">
    <div class="tag-list" id="geo-scope">
      <img class="icon" src="~/assets/globe.png" />
      <span>{{ geographicScope }}</span>
    </div>
    <div v-if="hasContentType" class="tag-list" id="content-types">
      <img class="icon" src="~/assets/content-type.png" />
      <span>{{ contentTypesStr }}</span>
    </div>
    <div v-if="hasIssues" class="tag-list" id="issues">
      <img class="icon" src="~/assets/issues.png" />
      <span>{{ issuesStr }}</span>
    </div>
  </div>
</template>

<style scoped>
  .tags {
    margin-top: 16px;
    color: #000000;
  }

  .tags .icon {
    width: 17px;
    height: 17px;
    margin-right: 5px;
    position: relative;
    top: 4px;
  }

  .tags .selected {
    color: var(--primary-color);
    font-weight: bold;
  }

  .tags .selected .semi-colon {
    font-weight: normal;
  }

  .tag-list {
    display: flex;
  }

  @media screen and (max-width: 799px) {
    .tags {
      margin-top: 1dvh;
      font-size: max(12px, 2dvw);
    }
    .tags .icon {
      width: 12px;
      height: 12px;
    }
  }
</style>