<script setup lang="ts">

  const props = withDefaults(defineProps<{
    icon: string,
    heading: string,
    isActive?: boolean,
    isOpen?: boolean
  }>(), {
    isActive: false,
    isOpen: false
  });

</script>

<template>
  <details class="filter" :open="isOpen">
    <summary>
      <img class="icon" :src="props.icon">
      <h2 class='heading'>{{ heading }}</h2>
      <Icon v-if="props.isActive" id='clear-button' @click.prevent="$emit('resetFilter')" name="mdi:filter-remove" />
    </summary>
    <slot></slot>
  </details>
</template>

<style scoped>
  .filter {
    margin-bottom: 15px;
  }
  
  .filter summary {
    list-style: none;
    position: relative;
    cursor: pointer;
  }

  .icon {
    float: left;
    margin-right: 5px;
    position: relative;
    top: 2px;
    height: 13px;
  }

  .heading {
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    position: relative;
    bottom: 3px;
  }
  
  .filter > summary::after {
    float: right;
    border-style: solid;
    border-width: 0.15em 0.15em 0 0;
    content: '';
    height: 0.45em;
    width: 0.45em;
    position: relative;
    top: 0.20em;
    transform: rotate(135deg);
  }
  .filter[open] >summary:after {
    top: 0.40em;
    transform: rotate(-45deg);
  }

  #clear-button {
    position: relative;
    left: 5px;
    top: 2px;
    color: red;
    z-index: 2;
  }
</style>