<script setup lang="ts">
    defineProps({
        title: String,
        icon: Array<string>,
        classes: String
    });
</script>

<template>
    <button :class="`btn btn-primary ${classes}`">
        <div class="btn-shadow"></div>
        <h3 class="btn-content"><font-awesome-icon :icon="[... icon]" class="btn-icon" /><span class="btn-title">{{ title }}</span></h3>
    </button>
</template>