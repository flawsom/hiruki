<script lang="ts" setup>
</script>

<template>
    <div class="flex flex-col">
        <div class="bg-light/5 flex flex-col md:flex-row justify-between md:items-center gap-4 p-4">
            <div class="flex flex-col">
                <p class="text-prime text-3xl font-extrabold">Hiruki</p>
                <p class="text-light/75 text-sm font-light md:w-96">This site does not store any files on our server, we
                    only linked to the media which is hosted on 3rd party services.</p>
            </div>
            <div class="flex flex-col gap-2">
                <NuxtLink to="/dmca" class="text-light text-base font-normal hover:text-prime">Dmca</NuxtLink>
                <NuxtLink to="https://github.com/sckoorp/hiruki/issues" target="_blank"
                    class="text-light text-base font-normal hover:text-prime">Bug Report</NuxtLink>
                <NuxtLink to="https://github.com/sckoorp/hiruki" target="_blank"
                    class="text-light text-base font-normal hover:text-prime">Github</NuxtLink>
            </div>
        </div>
        <div class="flex justify-between items-center p-4">
            <p class="text-light text-sm font-light">&copy;{{ new Date().getFullYear() }} Hiruki.xyz - All rights
                reserved</p>
        </div>
    </div>
</template>