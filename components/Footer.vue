<script lang="ts" setup>
</script>

<template>
    <UContainer class="p-4">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <ULink to="/" class="text-4xl font-bold">
                    Ani.MoM</ULink>
                <p class="md:w-96">This site does not store any files on our server, we
                    only linked to the media which is hosted on 3rd party services.</p>
            </div>
            <div class="flex flex-col gap-2">
                <UButton to="/dmca" icon="i-heroicons-book-open" label="DMCA" variant="ghost" />
                <UButton to="#" icon="i-heroicons-bug-ant"
                    label="Bug Report" variant="ghost" />
            </div>
        </div>
    </UContainer>
</template>
