<script setup lang="ts">
import type { Resource } from '~/stores/resources';
import Accreditation from '~/components/resource/Accreditation.vue';
import Tags from '~/components/resource/Tags.vue';

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
  return isNotBlank(props.r.docUrl[rLang.value]);
});

const hasTranslationDocUrl = computed(() => {
  return isNotBlank(props.r.docUrl[rTransLang.value]);
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
  if (hasTranslation.value) {
    const r = props.r;
    const lang = rTransLang.value;
    url = hasTranslationDocUrl.value ? r.docUrl[lang] : r.webUrl[lang];
  }
  return url;
});

const notes = computed(() => {
  return props.r.notes[locale.value];
});

const hasNotes = computed(() => {
  return isNotBlank(notes.value);
});

function isNotBlank(s: string) {
  return s !== undefined && s !== '';
}
</script>

<template>
  <li class="resource">
    <h1 class="title">
      <a :href="url" target="_blank">{{ title }}</a>
      <span class="pdf" v-if="hasDocUrl">PDF</span>
    </h1>

    <Accreditation :r="props.r" />

    <div v-if="hasNotes" class="notes">
      <MDC :value="notes" />
    </div>

    <div v-if="hasTranslation" class="translation">
      <span class="available">
        {{ $t('availableIn') }}
        <a :href="translationUrl" target="_blank">{{ $t(`${rTransLang}`) }}</a>
      </span>
    </div>

    <Tags :r="props.r" />
  </li>
</template>