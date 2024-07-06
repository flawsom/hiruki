<script lang="ts" setup>
</script>

<template>
    <NuxtLoadingIndicator color="#ADC6FF" />
    <div class="space-y-8 select-none">
        <Header />
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
</style>