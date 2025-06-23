import { Menu } from "~/components/HomeContent/index.vue";

export default defineEventHandler(async (event) => {
	const { category }: { category: string } = getQuery(event);
	const config = useRuntimeConfig();
	const products = await $fetch<Menu[]>(`${config.public.apiBaseUrl}/products`);


	return {
        hidangan_utama: products?.filter(product => product.category === 'hidangan-utama').length,
        hidangan_pembuka: products?.filter(product => product?.category === 'hidangan-pembuka').length,
        minuman: products?.filter(product => product?.category === 'minuman').length,
        pencuci_mulut: products?.filter(product => product?.category === 'pencuci-mulut').length,
        paket_promo: products?.filter(product => product?.category === 'paket-promo').length,
        menu_musiman: products?.filter(product => product?.category === 'menu-musiman').length,
    };
});
