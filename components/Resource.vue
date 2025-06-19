<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import { useLookupStore } from '~/stores/lookups';

  const lookupStore = useLookupStore();
  
  const props = defineProps<{
    r: Resource
  }>();

  const { locale } = useI18n();
  
  const hasTranslation = computed(() => {
    return props.r.languageId === 'both';
  });

  const rLang = computed(() => {
    return hasTranslation.value ? locale.value : props.r.languageId as 'en' | 'fr';
  });

  const title = computed(() => {
    return props.r.title[rLang.value];
  });

  const hasDocUrl = computed(() => {
    const docUrl = props.r.docUrl[rLang.value];
    return docUrl !== '';
  });

  const hasTranslationDocUrl = computed(() => {
    const docUrl = props.r.docUrl[rTransLang.value];
    return docUrl !== '';
  });

  const url = computed(() => {
    const url = hasDocUrl.value ? props.r.docUrl[rLang.value] : props.r.webUrl[rLang.value];
    return url;
  });

  const rTransLang = computed(() => {
    return rLang.value === 'en' ? "fr" : "en";
  });

  const translationUrl = computed(() => {
    let url = '';
    if (hasTranslation) {
      const r = props.r;
      const lang = rTransLang.value;
      url = hasTranslationDocUrl.value ? r.docUrl[lang] : r.webUrl[lang];
    }
    return url;
  });

  const hasAuthor = computed(() => {
    return props.r.author !== undefined &&  props.r.author !== '';
  });

  const hasOrganizations = computed(() => {
    return props.r.organizationIds !== undefined &&  props.r.organizationIds.length > 0;
  });

  const organizations = computed(() => {
    const orgIds = props.r.organizationIds;
    const orgsArray = lookupStore.getLabels('organizations', orgIds, rLang.value);
    return orgsArray.join(", ");
  });

  const hasPublication = computed(() => {
    return props.r.publicationId !== '';
  });

  const publication = computed(() => {
    const pubId = props.r.publicationId;
    return lookupStore.getLabel('publications', pubId, rLang.value);
  });

  const publicationDate = computed(() => {
    const pubYear = props.r.pubYear;
    let pubDateStr = String(pubYear);

    if (props.r.pubMonth !== undefined) {
      let pubDateObj = new Date(pubYear, props.r.pubMonth);
      let dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
      let timeFormatLocale = locale.value === 'en' ? 'en-US' : 'fr';

      if (props.r.pubDay !== undefined) {
        dateFormat.day = 'numeric';
        pubDateObj.setDate(props.r.pubDay);
      }

      pubDateStr = new Intl.DateTimeFormat(timeFormatLocale, dateFormat).format(pubDateObj);
    }

    return pubDateStr;
  });

  const notes = computed(() => {
    return props.r.notes[locale.value];
  });

  const hasNotes = computed(() => {
    return notes.value !== undefined && notes.value !== '';
  });

  const geographicScope = computed(() => {
    const geoScopeId = props.r.geographicScopeId;
    return lookupStore.getLabel('geoScopes', geoScopeId, rLang.value);
  });

  const hasContentType = computed(() => {
    const cTypeIds = props.r.contentTypeIds;
    return isNotEmpty(cTypeIds);
  });

  const contentTypesStr = computed(() => {
    const cTypeIds = props.r.contentTypeIds;
    const cTypesArray = lookupStore.getLabels('contentTypes', cTypeIds, locale.value)
    return formatTagsStr(cTypesArray);
  });

  const hasIssues = computed(() => {
    const issuesIds = props.r.issueIds;
    return isNotEmpty(issuesIds);
  });

  const issuesStr = computed(() => {
    const issuesIds = props.r.issueIds;
    const issuesArray = lookupStore.getLabels('issues', issuesIds, locale.value);
    return formatTagsStr(issuesArray);
  });

  function formatTagsStr(a: Array<string | undefined>) {
    const filtered = a.filter(item => item !== undefined).filter(item => item !== '');
    filtered.sort((a, b) => a.localeCompare(b, locale.value));
    return filtered.join("; ")
  }

  function isNotEmpty(a: Array<any>) {
    return a !== undefined && a.length > 0;
  }

</script>

<template>
  <li class="resource">

    <h1 class="title">
      <a :href="url" target="_blank">{{ title }}</a>
      <span class="pdf" v-if="hasDocUrl">PDF</span>
    </h1>

     <div class="accreditation">
      <div>
        <span v-if="hasAuthor">{{ props.r.author }}</span>
        <span v-if="hasAuthor && hasOrganizations"> &#8226; </span>
        <span v-if="hasOrganizations">{{ organizations }}</span>
      </div>
      <div v-if="hasPublication" class="publication">
        <span>{{ publication }}</span>
      </div>
      <div class="publication-date">
        <span>{{ $t('published') }} {{ publicationDate }}</span>
      </div>
     </div>

     <div v-if="hasNotes" class="notes">
       <MDC :value="notes" />
     </div>

     <div v-if="hasTranslation" class="translation">
      <span class="available">
        {{ $t('availableIn') }}
        <a :href="translationUrl" target="_blank">{{ $t(`${rTransLang}`) }}</a>
      </span> 
    </div>

    <div class='tags'>
      <div class='tag-list' id='geo-scope'>
        <img class="icon" src="~/assets/globe.png">
        <span>{{ geographicScope }}</span>
      </div>
      <div v-if="hasContentType" class='tag-list' id='content-types'>
        <img class="icon" src="~/assets/content-type.png">
        <span>{{ contentTypesStr }}</span> 
      </div>
      <div v-if="hasIssues" class='tag-list' id='issues'>
        <img class="icon" src="~/assets/issues.png">
        <span>{{ issuesStr }}</span> 
      </div>
    </div>

  </li>
</template>