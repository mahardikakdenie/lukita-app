export default defineEventHandler(async () => {
	const config = useRuntimeConfig();
	const carts = await $fetch(
		`${config.public.apiBaseUrl}/orders`,
	);
	return carts;
});
