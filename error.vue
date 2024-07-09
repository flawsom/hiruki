<script lang="ts" setup>
const error = useError();
const handleError = () => {
    clearError({ redirect: "/" });
}
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-2 h-screen">
        <button type="button" class="text-light bg-prime/10 text-lg font-medium 
        rounded-sm py-1 px-2">{{ error.statusCode }}</button>
        <p class="text-prime text-4xl font-bold">Dang</p>
        <p class="text-light text-lg font-normal text-center">It looks like something broke...</p>
        <button @click="handleError" class="text-dark bg-prime text-base font-medium text-center 
        w-28 outline-none rounded-sm p-2 hover:bg-prime/85">Go Home</button>
    </div>
</template>