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
			<DetailOrder />
		</div>
	</div>
</template>

<script lang="ts" setup>
const menus = ref<string[]>([
	'Hidangan Utama',
	'Hidangan Pembuka',
	'Minuman',
	'Pencuci Mulut',
	'Paket Promo',
	'Menu Musiman',
]);
const currentMenu = ref<string>('Hidangan Utama');
</script>
