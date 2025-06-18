<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Kategori Menu -->
			<div class="sm:col-span-2">
				<HeaderMenu
					:menus="menus"
					:current-menu="currentMenu"
					@on-set-menu="(menu) => (currentMenu = menu)" />
				<hr class="border-gray-200" />

				<HomeContent />
			</div>

			<!-- Detail Pesanan -->
			<DetailOrder :orders="selectedMenus" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Menu } from '../components/HomeContent/index.vue';

const menus = ref<string[]>([
	'Hidangan Utama',
	'Hidangan Pembuka',
	'Minuman',
	'Pencuci Mulut',
	'Paket Promo',
	'Menu Musiman',
]);
const currentMenu = ref<string>('Hidangan Utama');
const selectedMenus = ref<Menu[]>([
    {
		image: 'https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg',
		name: 'Nasi Gudeg Jogja',
		description:
			'Gudeg Jogja gurih lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
		price: '28.000',
		category: 'hidangan-utama',
		type: '⭐ Andalan',
		quantity: 1,
	},
]);
</script>
