import { Menu } from "~/components/HomeContent/index.vue";

export default defineEventHandler(async (event) => {
	const { category }: { category: string } = getQuery(event);
	const res = await $fetch(
		'https://my-json-server.typicode.com/mahardikakdenie/db-catalog-json/products'
	);
    
    let products: any = res;

    if (category) {
		products = products?.filter((product: Menu) => product?.category === category);
    }
	console.log("🚀 ~ defineEventHandler ~ !category:", category)

	return products;
});
