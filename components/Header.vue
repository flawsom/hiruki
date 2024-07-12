<script lang="ts" setup>
const mstate = ref(false);
const sstate = ref(false);
const query = ref(null);
const handleMenuOpen = () => {
    mstate.value = !mstate.value
}
const handleSearchOpen = () => {
    sstate.value = !sstate.value
}
const handleNavigation = (path: string) => {
    navigateTo(path);
    mstate.value = false
    sstate.value = false
}
const handleSearchQuery = () => {
    if (query.value === null || "") {
        return null
    } else {
        navigateTo(`/search/${query.value}`);
        mstate.value = false
        sstate.value = false
        query.value = null
    }
}
</script>

<template>
    <div class="flex justify-between items-center p-4">
        <NuxtLink to="/" class="text-prime text-4xl font-extrabold hover:text-prime/85">Hiruki</NuxtLink>
        <div class="flex items-center gap-4">
            <div class="hidden md:flex justify-center items-center gap-4">
                <NuxtLink to="/explore" class="text-light hover:text-prime">Explore</NuxtLink>
                <NuxtLink to="/bookmarks" class="text-light hover:text-prime">Bookmarks</NuxtLink>
            </div>
            <button type="button" @click="handleSearchOpen" class="text-dark bg-prime outline-none rounded-md p-2 
            hover:bg-prime/85">
                <SearchIcon size="1.2x" />
            </button>
            <button type="button" @click="handleMenuOpen" class="flex md:hidden text-dark bg-prime outline-none 
            rounded-md p-2 hover:bg-prime/85">
                <MenuIcon size="1.2x" />
            </button>
        </div>
    </div>
    <div class="bg-prime/5 flex items-center gap-2 p-2 md:mx-4" v-if="sstate">
        <input type="text" placeholder="Search..." class="text-light bg-prime/5 outline-none rounded-sm 
        w-full py-1.5 px-3" @keyup.enter="handleSearchQuery" v-model="query">
        <button type="button" @click="handleSearchQuery" class="text-dark bg-prime outline-none rounded-sm p-2 
        hover:bg-prime/85">
            <SearchIcon size="1.2x" />
        </button>
    </div>
    <div class="bg-prime/5 flex flex-col items-center gap-2 p-2" v-if="mstate">
        <button type="button" @click="handleNavigation('/explore')" class="text-light text-lg font-normal 
        text-center rounded-sm w-full p-2 hover:bg-prime/5">Explore</button>
        <button type="button" @click="handleNavigation('/bookmarks')" class="text-light text-lg font-normal 
        text-center rounded-sm w-full p-2 hover:bg-prime/5">Bookmarks</button>
    </div>
</template>