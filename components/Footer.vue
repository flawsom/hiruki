<script lang="ts" setup>
</script>

<template>
    <UCard>
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <ULink to="/" active-class="text-primary text-4xl font-bold" inactive-class="text-4xl font-bold">
                    Hiruki</ULink>
                <p class="md:w-96">This site does not store any files on our server, we
                    only linked to the media which is hosted on 3rd party services.</p>
            </div>
            <div class="flex flex-col gap-2">
                <UButton to="/dmca" icon="i-heroicons-book-open" label="DMCA" variant="ghost" />
                <UButton to="https://github.com/sckoorp/hiruki/issues" target="_blank" icon="i-heroicons-bug-ant"
                    label="Bug Report" variant="ghost" />
            </div>
        </div>
    </UCard>
</template>