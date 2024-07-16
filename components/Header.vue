<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";

const scrolled = ref(false);
const modal = ref(false);
const state = reactive({ query: undefined });
const items = [
    [{ to: "/explore", label: "Explore", icon: "i-heroicons-fire" }],
    [{ to: "/bookmarks", label: "Bookmarks", icon: "i-heroicons-bookmark" }]
];

function onPageScroll() {
    scrolled.value = window.scrollY > 0
}

function onSearchSubmit({ data }: FormSubmitEvent<any>) {
    if (state.query !== undefined) {
        modal.value = false
        navigateTo(`/search/${data.query}`);
        state.query = undefined
    }
}

onMounted(() => {
    window.addEventListener("scroll", onPageScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", onPageScroll);
});
</script>

<template>
    <!-- HEADER NAVBAR -->
    <div :class="{ 'bg-gray backdrop-filter backdrop-blur-lg bg-opacity-30': scrolled }"
        class="sticky top-0 z-10 flex justify-between items-center py-2 px-4">
        <ULink to="/" class="text-primary text-4xl font-bold">Hiruki</ULink>
        <div class="flex items-center gap-4">
            <div class="hidden md:flex items-center gap-2">
                <div class="flex items-center">
                    <UButton to="/explore" icon="i-heroicons-fire" label="Explore" variant="ghost" />
                    <UButton to="/bookmarks" icon="i-heroicons-bookmark" label="Bookmarks" variant="ghost" />
                </div>
                <UButton icon="i-heroicons-magnifying-glass-16-solid" variant="soft" size="lg" @click="modal = true" />
                <Mode />
            </div>
            <div class="flex md:hidden items-center gap-4">
                <UButton icon="i-heroicons-magnifying-glass-16-solid" variant="soft" size="lg" @click="modal = true" />
                <Mode />
                <UDropdown :items="items">
                    <UButton icon="i-heroicons-bars-3-16-solid" variant="soft" size="lg" />
                </UDropdown>
            </div>
        </div>
    </div>

    <!-- SEARCH MODAL -->
    <UModal v-model="modal">
        <UForm :state="state" class="flex items-center gap-4 p-4" @submit="onSearchSubmit">
            <UButtonGroup orientation="horizontal" class="w-full" size="xl">
                <UFormGroup name="query" class="w-full" required>
                    <UInput v-model="state.query" placeholder="Search..." variant="none"
                        icon="i-heroicons-magnifying-glass-16-solid" />
                </UFormGroup>
                <UButton type="submit" icon="i-heroicons-magnifying-glass-16-solid" variant="soft" />
            </UButtonGroup>
        </UForm>
    </UModal>
</template>