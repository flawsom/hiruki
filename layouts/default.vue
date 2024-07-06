<script lang="ts" setup>
</script>

<template>
    <div class="space-y-8">
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