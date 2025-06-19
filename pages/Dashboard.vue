<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Kategori Menu -->
			<div class="sm:col-span-2">
				<HeaderMenu
					:menus="menus"
					:current-menu="currentMenu"
					@on-set-menu="onChangeMenu" />
				<hr class="border-gray-200" />

				<HomeContent :carts="carts" @add-to-cart="addToCarts" />
			</div>

			<!-- Detail Pesanan -->
			<DetailOrder :orders="carts" @remove-cart="onRemoveCart" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Menu } from '../components/HomeContent/index.vue';
import { useCarts } from '~/composables/useCarts'

const { carts, addToCart } = useCarts();

const menus = ref<string[]>([
	'Hidangan Utama',
	'Hidangan Pembuka',
	'Minuman',
	'Pencuci Mulut',
	'Paket Promo',
	'Menu Musiman',
]);
const currentMenu = ref<string>('Hidangan Utama');

const addToCarts = (product: Menu) => {
	addToCart(product);
};


const fetchProducts = async () => {
    const products = await $fetch<Menu[]>('/api/product', {
        params: {
            category: currentMenu.value?.split(' ').join('-').toLowerCase(),
        },
    });
};

const onChangeMenu = (menu: string) => {
	currentMenu.value = menu;

	fetchProducts();
};

const onRemoveCart = (cartProduct: Menu) => {
	const indexCart = carts.value?.findIndex(cart => cart?.name === cartProduct?.name);
	if (indexCart !== -1) {
		carts.value?.splice(indexCart, 1);
	}
};
</script>
