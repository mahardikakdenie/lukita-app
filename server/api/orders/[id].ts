export default defineEventHandler(async (event) => {
    const params = event.context.params;

    if (!params) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Params tidak ditemukan',
        });
    }

    const { id } = params;

    const body = await readBody(event);

    const config = useRuntimeConfig();

    const response = await $fetch(`${config.public.apiBaseUrl}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    });

    return {
        success: true,
        message: 'Berhasil Update data',
        response,
    };
});
