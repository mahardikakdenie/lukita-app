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
<!-- {{data}} -->
				<HomeContent :carts="carts" :products="data" :isLoading=pending @add-to-cart="addToCarts" />
			</div>

			<!-- Detail Pesanan -->
			<DetailOrder :orders="carts" @remove-cart="onRemoveCart" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Menu } from '~/components/HomeContent/index.vue'
import { useCarts } from '~/composables/useCarts'

const { carts, addToCart } = useCarts()

// Kategori & Menu
const menus = ref<string[]>([
  'Hidangan Utama',
  'Hidangan Pembuka',
  'Minuman',
  'Pencuci Mulut',
  'Paket Promo',
  'Menu Musiman',
])
const currentMenu = ref<string>('Hidangan Utama')

// Fetch produk secara reaktif + SSR support
const { data,pending ,refresh } = useAsyncData<Menu[]>(
  'products',
  async () => {
    const category = currentMenu.value.split(' ').join('-').toLowerCase()
    const products = await $fetch<Menu[]>('/api/product', {
      params: { category },
    })
    return products
  },
  {
    watch: [currentMenu],
    // initialCache: false,
  }
)

// Fungsi ketika kategori berubah
const onChangeMenu = (menu: string) => {
  currentMenu.value = menu
//   refresh() // refresh data sesuai kategori baru
}

// Fungsi tambah ke keranjang
const addToCarts = (product: Menu) => {
  addToCart(product)
}

// Fungsi hapus dari keranjang
const onRemoveCart = (cartProduct: Menu) => {
  const indexCart = carts.value?.findIndex(
    (cart) => cart?.name === cartProduct?.name
  )
  if (indexCart !== -1 && indexCart !== undefined) {
    carts.value?.splice(indexCart, 1)
  }
}
</script>
