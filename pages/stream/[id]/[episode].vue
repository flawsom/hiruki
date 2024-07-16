<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

interface Bookmark {
    id: string;
    title: string;
    cover: string;
    season: string;
    year: string;
}

interface Data {
    stream: any;
    download: any;
    info: {
        id: string;
        title: string;
        cover: string;
        season: string;
        year: string;
        genres: string[];
        description: string;
        format: string;
        status: string;
        score: string;
        episodes: number;
        studio: string;
        characters: { name: string, image: string }[];
    };
    episodes: { episodes: { id: string, episode: number }[] };
}

const route = useRoute();
const toast = useToast();
const bookmarks = useStorage<{ data: Bookmark[] }>("bookmarks", { data: [] });

const { data, error } = await useAsyncData<Data>("stream", async () => {
    try {
        const [stream, download, info, episodes] = await Promise.all([
            $fetch(`/api/stream?id=${route.params.episode}`),
            $fetch(`/api/download?id=${route.params.episode}`),
            $fetch(`/api/info?id=${route.params.id}`),
            $fetch(`/api/episodes?id=${route.params.id}`)
        ]);
        return { stream, download, info, episodes };
    } catch (e) {
        console.error(e);
        return null;
    }
});

function isBookmarked() {
    return bookmarks.value.data.find((item: Bookmark) => item.id == route.params.id) !== undefined;
}

function onAddBookmark() {
    const list = bookmarks.value;
    toast.add({ title: "Successfully Added!" });
    list.data.push({
        id: data.value?.info.id,
        title: data.value?.info.title,
        cover: data.value?.info.cover,
        season: data.value?.info.season,
        year: data.value?.info.year
    });
}

function onRemoveBookmark() {
    const list = bookmarks.value;
    toast.add({ title: "Successfully Removed!" });
    const index = list.data.findIndex((item: Bookmark) => item.id == route.params.id);
    list.data.splice(index, 1);
}

const ready = ref(false);

const items = [
    {
        key: "synopsis",
        label: "Synopsis"
    },
    {
        key: "info",
        label: "Info"
    },
    {
        key: "characters",
        label: "Characters"
    }
];

onMounted(() => {
    ready.value = true;
});
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-4 m-4">
        <div class="flex flex-col gap-2">
            <Player :src="data?.stream.sources.default" />
            <UButton :to="data?.download.link" target="_blank" icon="i-heroicons-arrow-down-circle-20-solid"
                label="Download" variant="solid" size="lg" block />
        </div>
        <div class="flex flex-col w-full md:w-72 gap-2">
            <div class="flex justify-start items-center">
                <p class="text-xl font-bold">Episodes</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                <UButton v-for="episode in data?.episodes.episodes"
                    :key="episode.id"
                    :to="`/stream/${route.params.id}/${episode.id}`"
                    :label="`Episode ${episode.episode}`"
                    variant="soft" size="lg" block />
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 m-4">
        <div class="hidden lg:flex flex-col gap-2">
            <NuxtImg :src="data?.info.cover" :alt="data?.info.title" class="w-56 h-80 rounded-md object-cover" />
            <UButton icon="i-heroicons-bookmark-solid" label="Bookmarked" variant="ghost" size="lg" block
                @click="onRemoveBookmark" v-if="isBookmarked()" />
            <UButton icon="i-heroicons-bookmark" label="Bookmark" variant="ghost" size="lg" block @click="onAddBookmark"
                v-else />
        </div>
        <div class="flex lg:hidden flex-col items-center gap-2">
            <NuxtImg :src="data?.info.cover" :alt="data?.info.title"
                class="w-40 h-60 md:w-48 md:h-72 rounded-md object-cover" />
            <div class="flex flex-col justify-center items-center text-center">
                <p class="text-base font-normal">{{ data?.info.season }} {{ data?.info.year }}</p>
                <p class="text-2xl font-bold line-clamp-3">{{ data?.info.title }}</p>
            </div>
            <UButton icon="i-heroicons-bookmark-solid" label="Bookmarked" variant="ghost" size="lg" block
                @click="onRemoveBookmark" v-if="isBookmarked()" />
            <UButton icon="i-heroicons-bookmark" label="Bookmark" variant="ghost" size="lg" block @click="onAddBookmark"
                v-else />
        </div>
        <div class="flex flex-col gap-2">
            <div class="hidden lg:flex flex-col">
                <p class="text-base font-normal">{{ data?.info.season }} {{ data?.info.year }}</p>
                <p class="text-2xl font-bold line-clamp-2">{{ data?.info.title }}</p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <UButton v-for="genre in data?.info.genres" :label="genre" color="gray" variant="solid" />
            </div>
            <UTabs :items="items" class="w-full">
                <template #item="{ item }">
                    <div v-if="item.key === 'synopsis'">
                        <UCard>
                            <div v-html="data?.info.description" class="text-base font-normal" />
                        </UCard>
                    </div>
                    <div v-else-if="item.key === 'info'" class="space-y-2">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            <div class="space-y-2">
                                <div>
                                    <UAlert title="Format" :description="data?.info.format" v-if="data?.info.format" />
                                    <UAlert title="Format" description="N/A" v-else />
                                </div>
                                <div>
                                    <UAlert title="Status" :description="data?.info.status" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div>
                                    <UAlert title="Score" :description="data?.info.score" v-if="data?.info.score" />
                                    <UAlert title="Score" description="N/A" v-else />
                                </div>
                                <div>
                                    <UAlert title="Episodes" :description="String(data?.info.episodes)"
                                        v-if="data?.info.episodes" />
                                    <UAlert title="Score" description="N/A" v-else />
                                </div>
                            </div>
                        </div>
                        <UAlert title="Studio" :description="data?.info.studio" v-if="data?.info.studio" />
                        <UAlert title="Studio" description="N/A" v-else />
                    </div>
                    <div v-else-if="item.key === 'characters'" class="space-y-2">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-2" v-if="data?.info.characters.length > 0">
                            <div v-for="character in data?.info.characters.slice(0, 9)">
                                <UAlert :title="character.name" :avatar="{ src: character.image, alt: character.name }">
                                    <template #avatar="{ avatar }">
                                        <UAvatar v-bind="avatar" size="xl" img-class="object-cover" />
                                    </template>
                                </UAlert>
                            </div>
                        </div>
                        <div v-else>
                            <UAlert title="Not Available" color="red" variant="soft" />
                        </div>
                    </div>
                </template>
            </UTabs>
        </div>
    </div>
</template>
