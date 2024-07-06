<script lang="ts" setup>
const { data } = defineProps(["data"]);
</script>

<template>
    <NuxtLink :to="'/info/' + data.id" class="relative flex flex-col group gap-2">
        <NuxtImg :src="data.cover" :alt="data.title" placeholder class="w-full h-full rounded-sm object-cover" />
        <div class="bg-gradient-to-t from-dark to-transparent absolute inset-0 group-hover:from-dark/85" />
        <div class="absolute bottom-0 left-0 p-2">
            <p class="text-light text-base font-normal line-clamp-2">{{ data.title }}</p>
            <p class="text-light/75 text-sm font-normal">{{ data.year }}</p>
        </div>
    </NuxtLink>
</template>