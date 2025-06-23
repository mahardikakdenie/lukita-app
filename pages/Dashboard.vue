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
				<HomeContent :carts="carts" :products="data" :isLoading=pending @add-to-cart="addToCarts" />
			</div>

			<!-- Detail Pesanan -->
			<DetailOrder :orders="carts" @remove-cart="onRemoveCart" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Menu } from '~/components/HomeContent/index.vue';
import { useCarts } from '~/composables/useCarts';

const { carts, addToCart } = useCarts()
const router = useRouter()
const route = useRoute()

// Kategori & Menu
const menus = ref<string[]>([
  'Hidangan Utama',
  'Hidangan Pembuka',
  'Minuman',
  'Pencuci Mulut',
  'Paket Promo',
  'Menu Musiman',
])
const currentMenu = ref<string>('')

// Fetch produk secara reaktif + SSR support
const { data, pending, refresh } = useAsyncData<Menu[]>(
  'products',
  async () => {
    if (!currentMenu.value) {
      const queryCategory = route.query.category

      if (typeof queryCategory === 'string') {
        currentMenu.value = queryCategory
      } else if (Array.isArray(queryCategory)) {
        currentMenu.value = queryCategory[0] || 'Hidangan Utama'
      }
    }
    const category = currentMenu.value.split(' ').join('-').toLowerCase()
    const products = await $fetch<Menu[]>('/api/products', {
      params: { category },
    })
    return products
  },
  {
    watch: [currentMenu],
  }
)

const onChangeMenu = (menu: string) => {
  currentMenu.value = menu
  const category = currentMenu.value.split(' ').join('-').toLowerCase()
  router.push({ query: { ...route.query, category } })
}

const addToCarts = (product: Menu) => {
  addToCart(product)
}

const onRemoveCart = (cartProduct: Menu) => {
  const indexCart = carts.value?.findIndex(
    (cart) => cart?.name === cartProduct?.name
  )
  if (indexCart !== -1 && indexCart !== undefined) {
    carts.value?.splice(indexCart, 1)
  }
}

// Helper untuk capitalize
const capitalizeWords = (str: string): string => {
  return str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

onMounted(async () => {
  let selectedCategory = 'Hidangan Utama'

  const queryCategory = route.query.category

  if (typeof queryCategory === 'string') {
    selectedCategory = queryCategory
  } else if (Array.isArray(queryCategory)) {
    selectedCategory = queryCategory[0] || 'Hidangan Utama'
  }

  // Set currentMenu setelah capitalize
  currentMenu.value = capitalizeWords(selectedCategory)

  // Refresh data jika diperlukan
  await refresh()
})

// Watch route.query.category untuk update dinamis
watch(
  () => route.query.category,
  async (newVal) => {
    let selectedCategory = 'Hidangan Utama'

    if (typeof newVal === 'string') {
      selectedCategory = newVal
    } else if (Array.isArray(newVal)) {
      selectedCategory = newVal[0] || 'Hidangan Utama'
    }

    currentMenu.value = capitalizeWords(selectedCategory)
    await refresh()
  }
)
</script>
