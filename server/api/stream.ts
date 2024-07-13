export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { id } = getQuery(event);
    const data: any = await $fetch(`${config.apiurl}/api/stream?episodeid=${id}`);
    return data
});