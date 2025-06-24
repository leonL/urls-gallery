<script setup lang="ts">
</script>

<template>
  <div>
    <div class='titles'>
      <h1 class="title">
        {{ $t('homeTitle') }} 
      </h1>
      <!-- <h3 class="subtitle" v-html="$md.render(subtitle)"></h3> -->
    </div>

    <div class='gallery'>
      <!-- // <div class="filters">
        <IssuesFilters /> 
        <Filters />
      </div> -->

      <div class='index'>
        <ResourceList />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .titles {
    margin-bottom: 40px;
  }

  .title {
    font-size: 48px;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 10px;
  }
</style>
