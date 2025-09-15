<script setup lang="ts">
  const textStore = useTextStore();
  const { locale } = useI18n();
  const { width } = useWindowSize();

  const isSmallScreen = computed(() => width.value < 800);

  const subtitleMarkdown = computed(() => {
    return textStore.getByType('subtitle', locale.value);
  });

</script>

<template>
  <div id='page'>
    <div id='titles'>
      <h1 id="title">{{ $t('homeTitle') }}</h1>
      <h3 class="subtitle">
        <MDC :value="subtitleMarkdown" unwrap="p" />
      </h3>
    </div>

    <div id='gallery'>
      <ClientOnly>
        <div id="sidebar" v-if="!isSmallScreen">
          <Filters />
        </div>
      </ClientOnly>

      <div id='main'>
        <ResourceList />
      </div>
    </div>
  </div>
</template>

<style scoped>
  #page {
    height: 100%;
  }

  #titles {
    margin-bottom: 20px;
  }

  #title {
    font-size: 48px;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0px;
  }

  .subtitle {
    font-size: 24px;
    font-weight: initial;
    color: #767676;
  }

  #gallery {
    position: relative;
    display: flex;
    max-height: 95vh;
    overflow-y: hidden;
  }
  
  #sidebar {
    width: 25%;
    flex-grow: 1;
    padding-right: 30px;
  }
  
  #main {
    width: 75%;
  }

  @media screen and (max-width: 799px) {
    #title {
      font-size: max(20px, 6vw);
    }

    .subtitle {
      font-size: max(12px, 3vw);
    }
    
    #sidebar {
      width: 0;
    }
    
    #main {
      width: 100%;
    }

  }
</style>