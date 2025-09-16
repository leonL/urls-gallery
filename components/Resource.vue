<script setup lang="ts">
  import type { Resource } from '~/stores/resources';
  import Accreditation from '~/components/resource/Accreditation.vue';
  import Tags from '~/components/resource/Tags.vue';
  import { isNotBlank } from '~/utils/base';

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

<style scoped>
  li.resource {
    list-style: none;
    border-bottom: 0.9px #979797 solid;
    margin-top: 5px;
    padding-bottom: 10px;
  }

  .title {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 1.4rem;
  }

  .title .pdf {
    font-size: 11px;
    font-weight: 600;
    color: #5f5f5f;
    padding: 2px 5px;
    border-radius: 11px;
    background-color: #e2e2e2;
    position: relative;
    bottom: 4px;
    left: 4px;
  }

  .title a:not(:hover) {
    color: var(--primary-color);
    text-decoration: none;
  }

  .notes {
    margin-top: 20px;
    font-size: 18px;
    color: #000000;
  }

  .translation {
    margin-top: 25px;
    font-size: 16px;
    color: #000000;
    font-weight: bold;
  }

  @media screen and (max-width: 799px) {
    .title {
      font-size: max(15px, 2.8vw);
    }
    
    .notes {
      font-size: max(13px, 2.3vw);
    }

    .translation {
      font-size: max(11px, 2.1vw);
      margin-top: 15px;
    }
  }
</style>