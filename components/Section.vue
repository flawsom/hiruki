<script lang="ts" setup>
const { data, category } = defineProps(["data", "category"]);
</script>

<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <p class="text-light text-xl font-bold uppercase">{{ category === 1 ? "Trending Now" : category === 2
                ? "All Time Popular" : category === 3 ? "Upcoming Next Season" : category === 4 ? "Most Favorite" :
                    category === 5 ? "Most Popular Movies" : "Unknown" }}</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <NuxtLink v-for="anime in data.data" :to="'/info/' + anime.id" class="relative flex flex-col group gap-2">
                <NuxtImg :src="anime.cover" :alt="anime.title" placeholder
                    class="w-full h-full rounded-sm object-cover" />
                <div class="bg-gradient-to-t from-dark to-transparent absolute inset-0 
                    group-hover:from-dark/95" />
                <div class="absolute bottom-0 left-0 p-2">
                    <p class="text-light text-sm font-medium line-clamp-2 group-hover:text-prime">
                        {{ anime.title }}</p>
                    <p class="text-light/75 text-sm font-normal">{{ anime.season }} {{ anime.year }}</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>