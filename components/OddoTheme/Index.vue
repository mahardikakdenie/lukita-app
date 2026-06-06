<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Swal from 'sweetalert2';
import { useLocalDB } from '~/composables/useLocalDB';
import type { Order } from '~/types/interfaces/OrderInterface';

interface OddoProduct {
	id: string;
	image: string;
	name: string;
	description: string;
	price: string;
	category: string;
	type: string;
	quantity: number;
}

interface CartItem {
	product: OddoProduct;
	quantity: number;
}

// ── State ──────────────────────────────────────────
const searchQuery = ref('');
const activeCategory = ref('Semua');
const cartItems = ref<CartItem[]>([]);
const isIncomingOrdersOpen = ref(false);
const allOrders = ref<Order[]>([]);

const { loadOrders, addOrder: dbAddOrder, updateOrderStatus: dbUpdateOrderStatus } = useLocalDB();

// ── Data fetch ─────────────────────────────────────
const { data, pending } = useAsyncData<OddoProduct[]>(
	'oddo-products',
	async () => {
		const products = await $fetch<OddoProduct[]>('/api/products');
		return products;
	}
);

// ── Fetch Orders from IndexedDB ────────────────────
async function fetchOrders() {
	try {
		allOrders.value = await loadOrders();
	} catch (err) {
		console.error('Failed to load from IndexedDB:', err);
	}
}

const incomingOrders = computed(() =>
	allOrders.value.filter(
		(o) => o.source === 'customer' && ['pending', 'progress'].includes(o.status)
	)
);

let pollingInterval: any = null;
onMounted(() => {
	fetchOrders();
	pollingInterval = setInterval(fetchOrders, 5000); // 5s poll IDB
});
onUnmounted(() => {
	if (pollingInterval) clearInterval(pollingInterval);
});

// ── Computed ───────────────────────────────────────
const categories = computed(() => {
	if (!data.value) return ['Semua'];
	const cats = data.value.map((p) => p.type);
	return ['Semua', ...new Set(cats)];
});

const filteredProducts = computed(() => {
	let items = data.value || [];
	if (activeCategory.value !== 'Semua') {
		items = items.filter((p) => p.type === activeCategory.value);
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

const pendingCount = computed(() =>
	incomingOrders.value.filter(o => o.status === 'pending').length
);

// ── Cart methods ───────────────────────────────────
function addToCart(product: OddoProduct) {
	const existing = cartItems.value.find(
		(item) => item.product.id === product.id
	);
	if (existing) {
		existing.quantity++;
	} else {
		cartItems.value.push({ product, quantity: 1 });
	}
}

function removeFromCart(productId: string) {
	cartItems.value = cartItems.value.filter(
		(item) => item.product.id !== productId
	);
}

function incrementCart(productId: string) {
	const item = cartItems.value.find((i) => i.product.id === productId);
	if (item) item.quantity++;
}

function decrementCart(productId: string) {
	const item = cartItems.value.find((i) => i.product.id === productId);
	if (!item) return;
	if (item.quantity <= 1) {
		removeFromCart(productId);
	} else {
		item.quantity--;
	}
}

function clearCart() {
	cartItems.value = [];
}

// ── Status Update ──────────────────────────────────
async function updateOrderStatus(orderId: string, newStatus: string) {
	try {
		await dbUpdateOrderStatus(orderId, newStatus);
		await fetchOrders();
		Swal.fire({
			toast: true,
			position: 'top-end',
			icon: 'success',
			title: `Pesanan #${orderId} diupdate ke ${newStatus}`,
			showConfirmButton: false,
			timer: 2000
		});
	} catch (err) {
		Swal.fire('Error', 'Gagal update status pesanan', 'error');
	}
}

// ── Keypad ─────────────────────────────────────────
const keypadInput = ref('');
function keypadPress(key: string | number) {
	keypadInput.value += String(key);
}
function keypadClear() {
	keypadInput.value = '';
}

// ── Payment ────────────────────────────────────────
function openPaymentModal() {
	const total = totalPrice.value;
	const msg = `Total: ${formatToRupiah(String(total))}\n\nBayar sekarang?`;
	if (confirm(msg)) {
		clearCart();
		alert('✅ Pembayaran berhasil diproses!');
	}
}

// ── Format Rupiah ──────────────────────────────────
function formatToRupiah(angka: string): string {
	const nilai = parseInt(angka, 10);
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(nilai);
}
</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
		<div class="mx-auto max-w-[1800px] relative">
			<div class="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-violet-300/30 blur-3xl"></div>
			<div class="pointer-events-none absolute top-24 right-0 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl"></div>

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
				<!-- Sidebar: Cart + Keypad -->
				<div class="col-span-1 lg:col-span-4 xl:col-span-3">
					<div class="sticky top-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-violet-200/30 border border-white/60 p-5 flex flex-col min-h-[calc(100vh-3rem)]">
						<div class="flex items-center justify-between mb-4">
							<div>
								<p class="text-xs uppercase tracking-[0.2em] text-violet-500 font-semibold">Order Desk</p>
								<h3 class="text-xl font-bold text-gray-900 mt-1">Keranjang</h3>
							</div>
							<div class="flex gap-2">
								<button
									@click="isIncomingOrdersOpen = true"
									class="relative rounded-full bg-orange-50 p-2.5 text-orange-600 hover:bg-orange-100 transition shadow-sm ring-1 ring-orange-100"
									title="Pesanan Meja"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
									<span v-if="pendingCount > 0" class="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
										{{ pendingCount }}
									</span>
								</button>
								<span class="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">{{ cartCount }} item</span>
							</div>
						</div>

						<!-- Cart Items -->
						<div class="flex-1 overflow-y-auto mb-5 pr-1 hide-scrollbar">
							<div v-if="cartItems.length > 0" class="space-y-3">
								<div
									v-for="item in cartItems"
									:key="item.product.id"
									class="group flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-violet-200"
								>
									<img :src="item.product.image" :alt="item.product.name" class="h-14 w-14 rounded-xl object-cover ring-1 ring-gray-100" />
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-semibold text-gray-900">{{ item.product.name }}</p>
										<p class="text-xs text-gray-500">{{ formatToRupiah(item.product.price) }} × {{ item.quantity }}</p>
									</div>
									<div class="flex items-center gap-1 rounded-full bg-gray-50 p-1">
										<button class="grid h-8 w-8 place-items-center rounded-full bg-white text-gray-600 shadow-sm transition hover:bg-violet-50 hover:text-violet-700" @click.stop="decrementCart(item.product.id)">
											<span class="text-base leading-none">−</span>
										</button>
										<span class="w-8 text-center text-sm font-semibold text-gray-900">{{ item.quantity }}</span>
										<button class="grid h-8 w-8 place-items-center rounded-full bg-white text-gray-600 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700" @click.stop="incrementCart(item.product.id)">
											<span class="text-base leading-none">+</span>
										</button>
									</div>
									<button class="ml-1 rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500" @click.stop="removeFromCart(item.product.id)">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0020.138 21H3.862a2 2 0 01-1.995-1.858L1 7m5 4v6m4-6v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3" />
										</svg>
									</button>
								</div>
							</div>
							<div v-else class="rounded-2xl border border-dashed border-violet-200 bg-violet-50/60 px-4 py-8 text-center text-sm text-gray-500">
								Keranjang kosong
							</div>
						</div>

						<!-- Summary -->
						<div class="mb-5 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 p-4 ring-1 ring-violet-100">
							<div class="mb-2 flex justify-between text-xs text-gray-600">
								<span>Subtotal</span>
								<span class="font-semibold text-gray-900">{{ formatToRupiah(totalPrice.toString()) }}</span>
							</div>
							<div class="flex justify-between text-base font-bold text-gray-900">
								<span>Total</span>
								<span>{{ formatToRupiah(totalPrice.toString()) }}</span>
							</div>
						</div>

						<!-- Keypad -->
						<div class="mb-4">
							<div class="mb-2 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-2.5 ring-1 ring-gray-200">
								<input readonly type="text" :value="keypadInput || '0'" class="w-full bg-transparent text-right text-2xl font-bold text-gray-900 outline-none" />
								<button v-if="keypadInput" class="ml-2 rounded-full p-1 text-gray-400 hover:text-red-500" @click="keypadClear">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
								</button>
							</div>
							<div class="grid grid-cols-4 gap-2">
								<button v-for="num in [1,2,3,4,5,6,7,8,9,'C',0,'.']" :key="num" class="aspect-square rounded-2xl bg-white text-base font-semibold text-gray-800 shadow-sm ring-1 ring-gray-100 transition hover:bg-violet-50 hover:text-violet-700 active:scale-95" @click="num === 'C' ? keypadClear() : keypadPress(num)">{{ num }}</button>
							</div>
						</div>

						<button @click="openPaymentModal" :disabled="cartItems.length === 0" class="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:bg-gray-300">
							⚡ Bayar Sekarang
						</button>
					</div>
				</div>

				<!-- Main Content: Product Catalog -->
				<div class="col-span-1 lg:col-span-8 xl:col-span-9">
					<div class="flex h-full min-h-[calc(100vh-2rem)] flex-col rounded-3xl bg-white/75 backdrop-blur-xl p-5 shadow-2xl ring-1 ring-white/70 md:p-6">
						<!-- Top Bar -->
						<div class="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
							<div>
								<p class="text-xs uppercase tracking-[0.2em] text-violet-500 font-semibold">Catalog</p>
								<h2 class="mt-1 text-3xl font-bold text-gray-900">Pilih Menu</h2>
							</div>
							<div class="flex w-full flex-col gap-3 sm:flex-row xl:w-auto xl:min-w-[420px]">
								<div class="relative flex-1">
									<input v-model="searchQuery" type="text" placeholder="Cari produk..." class="w-full rounded-2xl border border-gray-200 bg-white px-11 py-3 text-sm focus:ring-4 focus:ring-violet-100 outline-none" />
									<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
								</div>
								<div class="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
									<button v-for="category in categories" :key="category" @click="activeCategory = category" class="whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition" :class="activeCategory === category ? 'bg-violet-600 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-violet-50'">{{ category }}</button>
								</div>
							</div>
						</div>

						<!-- Product Grid -->
						<div class="hide-scrollbar flex-1 overflow-y-auto pb-4">
							<div v-if="pending" class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
								<div v-for="n in 8" :key="n" class="h-72 animate-pulse rounded-3xl bg-gray-100"></div>
							</div>
							<div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
								<div v-for="product in filteredProducts" :key="product.id" class="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-2xl">
									<div class="relative h-44 overflow-hidden">
										<img :src="product.image" :alt="product.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
										<div class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-violet-700">{{ product.type }}</div>
									</div>
									<div class="p-4">
										<h3 class="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">{{ product.name }}</h3>
										<div class="mb-4 flex items-center justify-between">
											<p class="text-base font-bold text-violet-700">{{ formatToRupiah(product.price) }}</p>
										</div>
										<button @click="addToCart(product)" class="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] active:scale-95">+ Tambah</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Incoming Orders Drawer -->
		<div v-if="isIncomingOrdersOpen" class="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" @click.self="isIncomingOrdersOpen = false">
			<div class="h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
				<div class="flex items-center justify-between border-b p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
					<div>
						<h2 class="text-xl font-bold">Pesanan Meja Masuk</h2>
						<p class="text-xs opacity-90">Pantau pesanan dari customer secara real-time</p>
					</div>
					<button @click="isIncomingOrdersOpen = false" class="rounded-full bg-white/20 p-2 hover:bg-white/30 transition">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
					</button>
				</div>

				<div class="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
					<div v-if="incomingOrders.length === 0" class="py-20 text-center">
						<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v7m18 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2m18 0h-2M4 13H6m14 0V9a2 2 0 00-2-2H4a2 2 0 00-2 2v4" /></svg>
						</div>
						<p class="text-gray-500">Tidak ada pesanan meja aktif</p>
					</div>

					<div v-for="order in incomingOrders" :key="order.id" class="rounded-2xl border p-4 shadow-sm transition hover:shadow-md border-gray-100 bg-white ring-1 ring-gray-100">
						<div class="mb-3 flex items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-700">Meja {{ order.table_number }}</span>
								<span v-if="order.status === 'pending'" class="flex h-2 w-2 animate-ping rounded-full bg-red-500"></span>
							</div>
							<span class="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">{{ order.status }}</span>
						</div>

						<div v-if="order.customer_name" class="mb-2 text-sm font-semibold text-gray-800">Atas Nama: <span class="text-orange-600">{{ order.customer_name }}</span></div>

						<div class="mb-3 space-y-1">
							<div v-for="(p, i) in order.products" :key="i" class="flex justify-between text-xs text-gray-600">
								<span>{{ p.name }} x{{ p.quantity }}</span>
								<span>{{ formatToRupiah(p.price) }}</span>
							</div>
						</div>

						<div v-if="order.note" class="mb-3 rounded-lg bg-yellow-50 p-2 text-[11px] text-yellow-700 italic border border-yellow-100">
							Catatan: {{ order.note }}
						</div>

						<div class="mb-4 flex items-center justify-between border-t pt-3 border-gray-50">
							<span class="text-xs font-medium text-gray-500">Total Tagihan</span>
							<span class="text-lg font-bold text-violet-700">{{ formatToRupiah(order.total_price || '0') }}</span>
						</div>

						<div class="grid grid-cols-2 gap-2">
							<button v-if="order.status === 'pending'" @click="updateOrderStatus(order.id as string, 'progress')" class="rounded-xl bg-orange-500 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600 shadow-sm">Terima</button>
							<button v-if="order.status === 'progress'" @click="updateOrderStatus(order.id as string, 'completed')" class="rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600 shadow-sm col-span-2">Selesai & Bayar</button>
							<button v-if="order.status === 'pending'" @click="updateOrderStatus(order.id as string, 'cancelled')" class="rounded-xl border border-red-200 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50">Tolak</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.hide-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: rgba(124, 58, 237, 0.3) transparent;
}
.hide-scrollbar::-webkit-scrollbar { width: 4px; }
.hide-scrollbar::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.2); border-radius: 999px; }
</style>
