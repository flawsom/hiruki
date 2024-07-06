export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { page, per } = getQuery(event);
    const data: any = await $fetch(`${config.apiurl}/api/trending?page=${page}&per=${per}`);
    return data
});