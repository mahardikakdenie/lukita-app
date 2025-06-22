import { Menu } from "~/components/HomeContent/index.vue";

export default defineEventHandler(async (event) => {
	const { category }: { category: string } = getQuery(event);
	const config = useRuntimeConfig();
	const res = await $fetch(`${config.public.apiBaseUrl}/products`);
    
    let products: any = res;

    if (category) {
		products = products?.filter((product: Menu) => product?.category === category);
    };

	return products;
});
