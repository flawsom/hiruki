<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
const { data, category, explorer } = defineProps(["data", "category", "explorer"]);
const bookmarks = useStorage("bookmarks", { data: [] });
const clearBookmarks = () => {
    bookmarks.value = { data: [] }
}
</script>

<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <p class="text-light text-xl font-bold uppercase">{{ category === 1 ? "Trending Now" : category === 2
                ? "All Time Popular" : category === 3 ? "Upcoming Next Season" : category === 4 ? "Most Favorite" :
                    category === 5 ? "Most Popular Movies" : category === 6 ? "My Bookmarks" :
                        category === 7 ? "Search Results" : "Unknown" }}</p>
            <button type="button" @click="clearBookmarks" class="text-light text-base font-normal 
            hover:text-prime" v-if="category === 6">Clear All</button>
            <NuxtLink :to="category === 1 ? '/trending' : category === 2 ? '/popular' : category === 3
                ? '/upcoming' : category === 4 ? '/favorite' : category === 5 ? '/movies' : '/'" class="text-light 
                text-base font-normal hover:text-prime" v-if="explorer">View More</NuxtLink>
        </div>
        <div :class="`flex justify-center items-center ${category === 6 || 7 ? 'h-72' : 'h-44'}`"
            v-if="data.data.length < 1">
            <p class="text-prime text-xl font-semibold" v-if="category === 6">No Bookmarks</p>
            <p class="text-prime text-xl font-semibold" v-else-if="category === 7">No Result</p>
            <p class="text-prime text-xl font-semibold" v-else>No Data</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2" v-else>
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
            <NuxtLink :to="category === 1 ? '/trending' : category === 2 ? '/popular' : category === 3
                ? '/upcoming' : category === 4 ? '/favorite' : category === 5 ? '/movies' : '/'" v-if="explorer"
                class="relative bg-prime/10 rounded-sm hover:bg-prime/15">
                <div class="absolute inset-0 flex flex-col justify-center items-center">
                    <button type="button" class="text-light">
                        <PlusCircleIcon size="1.2x" />
                    </button>
                    <p class="text-light">View More</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>