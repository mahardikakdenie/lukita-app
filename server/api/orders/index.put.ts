export const defineEventHandler = (async (event: any) => {
    const body = await readBody(event);
    console.log("🚀 ~ defineEventHandler ~ body:", body);

    const config = useRuntimeConfig();
    await $fetch(`${config.public.apiBaseUrl}/orders`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    });
})
