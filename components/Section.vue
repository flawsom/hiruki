<script lang="ts" setup>
import { useStorage } from "@vueuse/core";

const toast = useToast();
const bookmarks = useStorage("bookmarks", { data: [] });
const { data, category, explorer, pagination } = defineProps(["data", "category", "explorer", "pagination"]);

function onClearAll() {
    toast.add({ title: "Successfully Cleared!" });
    bookmarks.value = { data: [] }
}
</script>

<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <p class="text-xl font-bold uppercase">{{ category === 1 ? "Trending Now" : category === 2
                ? "All Time Popular" : category === 3 ? "Upcoming Next Season" : category === 4 ? "Most Favorite" :
                    category === 5 ? "Most Popular Movies" : category === 6 ? "My Bookmarks" :
                        category === 7 ? "Search Results" : "Unknown" }}</p>
            <UButton icon="i-heroicons-trash" label="Clear All" variant="ghost" @click="onClearAll"
                v-if="category === 6" />
            <UButton :to="category === 1 ? '/trending/1' : category === 2 ? '/popular/1' : category === 3
                ? '/upcoming/1' : category === 4 ? '/favorite/1' : category === 5 ? '/movies/1' : '/'"
                icon="i-heroicons-paper-airplane-20-solid" label="View More" variant="ghost" v-if="explorer" />
        </div>
        <div :class="`flex justify-center items-center ${category === 6 || 7 ? 'h-80' : 'h-44'}`"
            v-if="data.data.length < 1">
            <p class="text-xl font-semibold" v-if="category === 6">No Bookmarks</p>
            <p class="text-xl font-semibold" v-else-if="category === 7">No Result</p>
            <p class="text-xl font-semibold" v-else>No Data</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2" v-else>
            <ULink v-for="anime in data.data" :to="`/info/${anime.id}`"
                class="relative flex flex-col overflow-hidden rounded-md group gap-2">
                <NuxtImg :src="anime.cover" :alt="anime.title" placeholder
                    class="w-full h-full rounded-md object-cover transition-transform group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent rounded-sm" />
                <div class="absolute bottom-0 left-0 p-2">
                    <p class="text-base font-medium line-clamp-2">{{ anime.title }}</p>
                    <p class="text-base font-normal">{{ anime.season }} {{ anime.year }}</p>
                </div>
            </ULink>
        </div>
    </div>
    <div class="flex justify-between items-center" v-if="data.pagination" v-show="pagination">
        <UButton :to="category === 1 ? `/trending/${data.pagination.currentPage - 1}`
            : category === 2 ? `/popular/${data.pagination.currentPage - 1}`
                : category === 3 ? `/upcoming/${data.pagination.currentPage - 1}`
                    : category === 4 ? `/favorite/${data.pagination.currentPage - 1}`
                        : category === 5 ? `/movies/${data.pagination.currentPage - 1}` : '/'"
            icon="i-heroicons-arrow-small-left-20-solid" label="Previous" variant="ghost"
            :disabled="data.pagination.currentPage <= 1" />
        <p class="text-base font-medium">Page {{ data.pagination.currentPage }}</p>
        <UButton :to="category === 1 ? `/trending/${data.pagination.currentPage + 1}`
            : category === 2 ? `/popular/${data.pagination.currentPage + 1}`
                : category === 3 ? `/upcoming/${data.pagination.currentPage + 1}`
                    : category === 4 ? `/favorite/${data.pagination.currentPage + 1}`
                        : category === 5 ? `/movies/${data.pagination.currentPage + 1}` : '/'"
            icon="i-heroicons-arrow-small-right-20-solid" label="Next" variant="ghost" trailing
            :disabled="!data.pagination.hasNextPage" />
    </div>
</template>