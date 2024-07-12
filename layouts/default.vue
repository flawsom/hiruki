<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
useStorage("bookmarks", { data: [] });
</script>

<template>
    <NuxtLoadingIndicator color="#ADC6FF" />
    <Header />
    <div class="space-y-8 select-none">
        <slot />
        <Footer />
    </div>
</template>

<style>
* {
    @apply font-outfit scroll-smooth transition-all
}

body {
    @apply bg-background
}

::-webkit-scrollbar {
    @apply w-[5px]
}

::-webkit-scrollbar-thumb {
    @apply bg-prime rounded-md hover:bg-prime/75
}

::-webkit-scrollbar-track {
    @apply bg-transparent
}
</style>