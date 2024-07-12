export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { q } = getQuery(event);
    const data: any = await $fetch(`${config.apiurl}/api/search?q=${q}`);
    return data
});