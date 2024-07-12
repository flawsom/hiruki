<script lang="ts" setup>
</script>

<template>
    <div class="flex justify-between items-center p-4">
        <NuxtLink to="/" class="text-prime text-4xl font-extrabold hover:text-prime/85">Hiruki</NuxtLink>
        <div class="flex items-center gap-4">
            <div class="hidden md:flex justify-center items-center gap-4">
                <NuxtLink to="/explore" class="text-light hover:text-prime">Explore</NuxtLink>
                <NuxtLink to="/bookmarks" class="text-light hover:text-prime">Bookmarks</NuxtLink>
            </div>
            <button type="button" class="flex md:hidden text-dark bg-prime outline-none rounded-md p-2 
            hover:bg-prime/85">
                <MenuIcon size="1.2x" />
            </button>
            <button type="button" class="hidden md:flex text-dark bg-prime outline-none rounded-md p-2 
            hover:bg-prime/85">
                <SearchIcon size="1.2x" />
            </button>
        </div>
    </div>
</template>