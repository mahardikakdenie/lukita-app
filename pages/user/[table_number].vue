<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { useLocalDB } from '~/composables/useLocalDB';

definePageMeta({
	layout: 'default',
});

const route = useRoute();
const tableNumber = route.params.table_number as string;
const { addOrder } = useLocalDB();

// State
const searchQuery = ref('');
const activeCategory = ref('Semua');
const cartItems = ref<any[]>([]);
const isCartOpen = ref(false);
const customerName = ref('');
const orderNote = ref('');
const isSubmitting = ref(false);
const orderSuccess = ref(false);

// Fetch products
const { data: products, pending } = useAsyncData<any[]>('customer-products', async () => {
	const res = await $fetch<any[]>('/api/products');
	return res;
});

// Computed
const categories = computed(() => {
	if (!products.value) return ['Semua'];
	const cats = products.value.map((p) => p.type || p.category);
	return ['Semua', ...new Set(cats.filter(Boolean))];
});

const filteredProducts = computed(() => {
	let items = products.value || [];
	if (activeCategory.value !== 'Semua') {
		items = items.filter((p) => (p.type || p.category) === activeCategory.value);
	}
	if (searchQuery.value.trim()) {
		const q = searchQuery.value.toLowerCase();
		items = items.filter((p) => p.name.toLowerCase().includes(q));
	}
	return items;
});

const totalPrice = computed(() =>
	cartItems.value.reduce((sum, item) => sum + parseInt(item.product.price) * item.quantity, 0)
);

const cartCount = computed(() =>
	cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

// Cart methods
function addToCart(product: any) {
	const existing = cartItems.value.find((item) => item.product.id === product.id);
	if (existing) {
		existing.quantity++;
	} else {
		cartItems.value.push({ product, quantity: 1 });
	}
}

function decrementCart(productId: string) {
	const item = cartItems.value.find((i) => i.product.id === productId);
	if (!item) return;
	if (item.quantity <= 1) {
		cartItems.value = cartItems.value.filter((i) => i.product.id !== productId);
	} else {
		item.quantity--;
	}
}

function incrementCart(productId: string) {
	const item = cartItems.value.find((i) => i.product.id === productId);
	if (item) item.quantity++;
}

// Helpers
function formatToRupiah(angka: string | number): string {
	const nilai = typeof angka === 'string' ? parseInt(angka, 10) : angka;
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(nilai);
}

// Submit Order
async function submitOrder() {
	if (cartItems.value.length === 0) return;
	isSubmitting.value = true;

	const payload = {
		source: 'customer',
		table_number: tableNumber,
		customer_name: customerName.value,
		note: orderNote.value,
		products: cartItems.value.map(c => ({ ...c.product, quantity: c.quantity })),
		total_price: String(totalPrice.value),
		status: 'pending',
		type_discount: 'none',
		discount_price: '0'
	};

	try {
		await addOrder(payload as any);

		orderSuccess.value = true;
		cartItems.value = [];
		isCartOpen.value = false;
	} catch (err) {
		Swal.fire('Gagal', 'Terjadi kesalahan saat mengirim pesanan', 'error');
	} finally {
		isSubmitting.value = false;
	}
}
</script>

<template>
	<div class="min-h-screen bg-gray-50 pb-24">
		<!-- Success State -->
		<div v-if="orderSuccess" class="flex min-h-screen flex-col items-center justify-center p-6 text-center">
			<div class="mb-6 rounded-full bg-emerald-100 p-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h1 class="mb-2 text-2xl font-bold text-gray-900">Pesanan Diterima!</h1>
			<p class="mb-8 text-gray-600">Pesanan Anda untuk Meja {{ tableNumber }} sedang disiapkan. Silakan tunggu di meja.</p>
			<button @click="orderSuccess = false" class="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-700">
				Pesan Lagi
			</button>
		</div>

		<!-- Menu State -->
		<div v-else>
			<!-- Header -->
			<header class="sticky top-0 z-20 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-md">
				<div class="mx-auto flex max-w-3xl items-center justify-between">
					<div>
						<h1 class="text-xl font-bold text-gray-900">Menu Cafe</h1>
						<p class="text-sm font-semibold text-violet-600">Meja {{ tableNumber }}</p>
					</div>
					<button @click="isCartOpen = true" class="relative rounded-full bg-violet-50 p-3 text-violet-700 hover:bg-violet-100 transition">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
						</svg>
						<span v-if="cartCount > 0" class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
							{{ cartCount }}
						</span>
					</button>
				</div>
			</header>

			<main class="mx-auto max-w-3xl p-4">
				<!-- Search -->
				<div class="mb-6 relative">
					<input v-model="searchQuery" type="text" placeholder="Cari menu favoritmu..." class="w-full rounded-2xl border-none bg-white p-4 pl-12 text-sm shadow-sm ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-violet-400 transition" />
					<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>

				<!-- Categories -->
				<div class="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
					<button v-for="category in categories" :key="category" @click="activeCategory = category" class="whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition" :class="activeCategory === category ? 'bg-violet-600 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50'">
						{{ category }}
					</button>
				</div>

				<!-- Product List -->
				<div v-if="pending" class="grid grid-cols-2 gap-4 sm:grid-cols-3">
					<div v-for="n in 6" :key="n" class="h-60 animate-pulse rounded-2xl bg-gray-200"></div>
				</div>

				<div v-else-if="filteredProducts.length === 0" class="py-12 text-center">
					<p class="text-4xl">☹️</p>
					<h3 class="mt-4 font-semibold text-gray-800">Menu tidak ditemukan</h3>
					<p class="mt-1 text-sm text-gray-500">Coba kata kunci lain atau kategori lain</p>
				</div>

				<div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3">
					<div v-for="product in filteredProducts" :key="product.id" class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
						<div class="relative aspect-square overflow-hidden bg-gray-100">
							<img :src="product.image" :alt="product.name" class="h-full w-full object-cover" />
						</div>
						<div class="flex flex-1 flex-col justify-between p-3">
							<div>
								<h3 class="line-clamp-2 text-sm font-semibold text-gray-900">{{ product.name }}</h3>
								<p class="mt-1 text-xs text-gray-500 line-clamp-1">{{ product.description }}</p>
							</div>
							<div class="mt-3 flex items-center justify-between">
								<p class="text-sm font-bold text-violet-700">{{ formatToRupiah(product.price) }}</p>
								<button @click="addToCart(product)" class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition hover:bg-violet-200 hover:scale-105 active:scale-95">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>

		<!-- Cart Drawer (Bottom Sheet on mobile) -->
		<div v-if="isCartOpen" class="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm transition-opacity" @click.self="isCartOpen = false">
			<div class="relative flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white sm:mx-auto">
				<div class="flex items-center justify-between border-b border-gray-100 p-4">
					<h2 class="text-lg font-bold text-gray-900">Keranjang Pesanan</h2>
					<button @click="isCartOpen = false" class="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="flex-1 overflow-y-auto p-4 hide-scrollbar">
					<div v-if="cartItems.length > 0" class="space-y-4">
						<div v-for="item in cartItems" :key="item.product.id" class="flex gap-3">
							<img :src="item.product.image" class="h-16 w-16 rounded-xl object-cover ring-1 ring-gray-100" />
							<div class="flex flex-1 flex-col justify-between py-1">
								<div class="flex justify-between">
									<h4 class="text-sm font-semibold text-gray-900">{{ item.product.name }}</h4>
									<p class="text-sm font-bold text-gray-900">{{ formatToRupiah(item.product.price) }}</p>
								</div>
								<div class="flex items-center justify-between">
									<p class="text-xs text-gray-500">x {{ item.quantity }}</p>
									<div class="flex items-center gap-2 rounded-full border border-gray-200 p-1">
										<button @click="decrementCart(item.product.id)" class="grid h-6 w-6 place-items-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"><span class="text-xs font-bold leading-none">−</span></button>
										<span class="w-4 text-center text-xs font-bold">{{ item.quantity }}</span>
										<button @click="incrementCart(item.product.id)" class="grid h-6 w-6 place-items-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"><span class="text-xs font-bold leading-none">+</span></button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="py-12 text-center">
						<p class="text-gray-400">Keranjang masih kosong</p>
					</div>

					<!-- Form Tambahan -->
					<div v-if="cartItems.length > 0" class="mt-6 space-y-4 border-t border-gray-100 pt-6">
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-700">Nama (Opsional)</label>
							<input v-model="customerName" type="text" placeholder="Atas nama siapa?" class="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition" />
						</div>
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-700">Catatan Khusus (Opsional)</label>
							<textarea v-model="orderNote" rows="2" placeholder="Misal: Jangan pakai daun bawang, pedas dikit" class="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"></textarea>
						</div>
					</div>
				</div>

				<div class="border-t border-gray-100 bg-white p-4">
					<div class="mb-4 flex items-center justify-between">
						<span class="font-semibold text-gray-600">Total Harga</span>
						<span class="text-xl font-bold text-violet-700">{{ formatToRupiah(totalPrice) }}</span>
					</div>
					<button @click="submitOrder" :disabled="cartItems.length === 0 || isSubmitting" class="w-full flex items-center justify-center gap-2 rounded-2xl bg-violet-600 p-4 font-bold text-white transition hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
						<div v-if="isSubmitting" class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
						<span>Kirim Pesanan (Ke Kasir)</span>
					</button>
				</div>
			</div>
		</div>

		<!-- Sticky Bottom Cart Summary (Only shows when cart not open and items exist) -->
		<div v-if="cartCount > 0 && !isCartOpen" class="fixed bottom-4 left-4 right-4 z-10 mx-auto max-w-3xl">
			<button @click="isCartOpen = true" class="flex w-full items-center justify-between rounded-2xl bg-violet-600 p-4 text-white shadow-xl shadow-violet-600/30 transition hover:bg-violet-700 active:scale-95">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 font-bold">{{ cartCount }}</div>
					<span class="font-semibold">Lihat Keranjang</span>
				</div>
				<span class="font-bold">{{ formatToRupiah(totalPrice) }}</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.hide-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #d1d5db transparent;
}
.hide-scrollbar::-webkit-scrollbar {
	width: 4px;
}
.hide-scrollbar::-webkit-scrollbar-thumb {
	background: #d1d5db;
	border-radius: 999px;
}
</style>
