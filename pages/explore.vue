<script lang="ts" setup>
const { data } = await useAsyncData("explorer", async () => {
    const [trending, popular, upcoming, favorite, movies] = await Promise.all([
        await $fetch("/api/trending?page=1&per=15"),
        await $fetch("/api/popular?page=1&per=15"),
        await $fetch("/api/upcoming?page=1&per=15"),
        await $fetch("/api/favorite?page=1&per=15"),
        await $fetch("/api/movies?page=1&per=15")
    ]);
    return { trending, popular, upcoming, favorite, movies }
});
</script>

<template>
    <div class="space-y-8 m-4">
        <Section :data="data?.trending" :category="1" :explorer="true" />
        <Section :data="data?.popular" :category="2" :explorer="true" />
        <Section :data="data?.upcoming" :category="3" :explorer="true" />
        <Section :data="data?.favorite" :category="4" :explorer="true" />
        <Section :data="data?.movies" :category="5" :explorer="true" />
    </div>
</template>