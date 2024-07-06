<script lang="ts" setup>
const { value } = defineProps(["value"]);
</script>

<template>
    <div class="flex justify-between items-center">
        <p class="text-light text-xl font-bold uppercase">{{ value }}</p>
    </div>
</template>