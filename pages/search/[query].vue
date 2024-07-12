<script lang="ts" setup>
const route = useRoute();
const { data } = await useFetch(`/api/search?q=${route.params.query}`);
</script>

<template>
    <div class="m-4">
        <Section :data="data" :category="7" :explorer="false" />
    </div>
</template>