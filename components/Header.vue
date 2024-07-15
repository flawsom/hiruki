<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";

const modal = ref(false);
const state = reactive({ query: undefined });
const items = [
    [{ to: "/explore", label: "Explore", icon: "i-heroicons-fire" }],
    [{ to: "/bookmarks", label: "Bookmarks", icon: "i-heroicons-bookmark" }]
];

function onSearchSubmit({ data }: FormSubmitEvent<any>) {
    if (state.query !== undefined) {
        modal.value = false
        navigateTo(`/search/${data.query}`);
        state.query = undefined
    }
}
</script>

<template>
    <!-- HEADER NAVBAR -->
    <div class="flex justify-between items-center p-4">
        <ULink to="/" active-class="text-primary text-4xl font-bold" inactive-class="text-4xl font-bold">Hiruki</ULink>
        <div class="flex items-center gap-4">
            <div class="hidden md:flex items-center gap-2">
                <div class="flex items-center">
                    <UButton to="/explore" icon="i-heroicons-fire" label="Explore" variant="ghost" />
                    <UButton to="/bookmarks" icon="i-heroicons-bookmark" label="Bookmarks" variant="ghost" />
                </div>
                <UButton icon="i-heroicons-magnifying-glass-16-solid" @click="modal = true" />
            </div>
            <div class="flex md:hidden items-center gap-4">
                <UButton icon="i-heroicons-magnifying-glass-16-solid" @click="modal = true" />
                <UDropdown :items="items">
                    <UButton icon="i-heroicons-bars-3-16-solid" />
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
                <UButton type="submit" icon="i-heroicons-magnifying-glass-16-solid" />
            </UButtonGroup>
        </UForm>
    </UModal>
</template>