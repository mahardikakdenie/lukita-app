<template>
	<div class="space-y-8">
		<!-- LOADING STATE -->
		<ClientOnly>
			<div
				v-if="!layoutReady"
				class="flex items-center justify-center min-h-screen bg-gray-50">
				<div class="text-center">
					<div
						class="w-12 h-12 border-4 border-t-indigo-600 border-gray-300 rounded-full animate-spin mx-auto"></div>
					<p class="mt-4 text-gray-600">Memuat layout...</p>
				</div>
			</div>
			<div v-if="activeLayout === 'default' && layoutReady">
				<!-- SECTION: Pesanan Saat Ini -->
				<section class="p-6 bg-white rounded-2xl shadow-lg">
					<div
						class="flex flex-col md:flex-row justify-between gap-4">
						<div class="space-y-2">
							<h2 class="text-xl font-bold text-gray-800">
								📦 Pesanan Saat Ini
							</h2>
							<p class="text-sm text-gray-600">
								Lihat antrian pesanan yang sedang diproses.
								Estimasi waktu membantu Anda menunggu dengan
								nyaman.
							</p>
						</div>

						<div class="flex items-center justify-end">
							<button
								@click="$router.push('/dashboard')"
								class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 cursor-pointer py-2 transition-all duration-200 flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									class="w-4 h-4">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 4v16m8-8H4" />
								</svg>
								Buat Pesanan Baru
							</button>
						</div>
					</div>

					<div v-if="pending" class="flex justify-center py-8">
						<div class="loader"></div>
					</div>
					<!-- List Pesanan -->
					<div
						v-else-if="!pending && data && data.length > 0"
						class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
						<div
							v-for="(summary, i) in data"
							:key="i"
							class="p-6 rounded-2xl shadow-md hover:shadow-xl bg-white border-l-4 transition-all duration-300 transform hover:-translate-y-1"
							:class="getStatusBorderColor(summary.status)">
							<!-- Header -->
							<div class="flex justify-between items-start mb-4">
								<h3
									class="text-lg font-semibold text-gray-800 truncate">
									Status
								</h3>
								<span
									class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full capitalize"
									:class="getStatusColor(summary.status)">
									{{ summary.status }}
								</span>
							</div>

							<!-- Info Grid -->
							<div class="grid grid-cols-2 gap-4 text-sm mb-5">
								<div>
									<span class="block text-xs text-gray-500"
										>Order ID</span
									>
									<p class="font-medium text-gray-800">
										#{{ summary.id }}
									</p>
								</div>
								<div class="text-right">
									<span class="block text-xs text-gray-500"
										>Quantity</span
									>
									<p class="font-medium text-gray-800">
										{{
											summary.products?.reduce(
												(sum: any, product: any) =>
													sum +
													(product.quantity || 0),
												0
											) ?? 0
										}}
									</p>
								</div>
							</div>

							<div class="space-y-2 text-sm mb-5">
								<!-- Diskon (hanya muncul jika ada) -->
								<div
									v-if="
										summary.type_discount &&
										summary.discount_price
									"
									class="flex justify-between items-center">
									<span class="text-xs text-gray-500"
										>Diskon / Potongan</span
									>
									<p
										class="font-semibold text-red-600 text-xs">
										-
										{{
											formatToRupiah(
												summary.discount_price.toString()
											)
										}}
									</p>
								</div>

								<!-- Placeholder jika tidak ada diskon -->
								<div
									v-else
									class="flex justify-between items-center h-5"></div>

								<!-- Total -->
								<div
									class="flex justify-between items-center pt-2 border-t border-gray-100 mt-1">
									<span
										class="text-xs text-gray-600 font-medium"
										>Total</span
									>
									<p class="font-bold text-lg text-gray-900">
										{{
											formatToRupiah(
												summary.total_price || '0'
											)
										}}
									</p>
								</div>
							</div>

							<!-- Action Button -->
							<div
								class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
								<button
									class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
									@click="openModal(summary)">
									View Details →
								</button>
							</div>
						</div>
					</div>

					<div
						v-else-if="!pending && data && data.length === 0"
						class="flex flex-col items-center justify-center py-12 px-4 text-center">
						<!-- Gambar -->
						<img
							src="https://cdn-icons-png.flaticon.com/512/7466/7466140.png"
							alt="Tidak ada pesanan"
							class="w-24 h-24 mb-4 opacity-70" />

						<h3 class="text-xl font-semibold text-gray-800 mb-2">
							Belum Ada Pesanan Masuk
						</h3>
						<p class="text-gray-500 mb-6 max-w-md">
							Saat ini belum ada pesanan masuk. Silakan periksa
							kembali nanti.
						</p>
					</div>

					<!-- Catatan Kecil -->
					<div class="mt-6 text-sm text-gray-600">
						<span class="text-red-500 font-semibold">Catatan:</span>
						Waktu estimasi bersifat perkiraan dan dapat berubah.
					</div>
				</section>

				<!-- SECTION: Daftar Menu -->
				<section class="p-6 bg-white rounded-2xl shadow-lg">
					<h2 class="text-xl font-bold text-gray-800 mb-4">
						🍽️ Daftar Menu
					</h2>

					<!-- Grid Menu -->
					<div
						class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						<div
							v-for="menu in menus"
							:key="menu.id"
							class="rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 shadow-sm hover:shadow-md flex flex-col justify-between h-full">
							<div class="p-4">
								<div class="flex gap-4">
									<img
										class="rounded-xl w-16 h-16 object-cover"
										src="https://img.lovepik.com/png/20231126/thanksgiving-day-dish-icon-to-set-a-dinner-menu-i_704879_wh1200.png"
										:alt="menu.name" />
									<div class="flex flex-col justify-center">
										<p class="font-semibold text-gray-800">
											{{ menu.name }}
										</p>
										<p class="text-sm text-gray-500">
											{{ summaryData?.[menu.key] ?? 0 }}
											item
										</p>
									</div>
								</div>
							</div>

							<div
								class="border-t border-gray-200 p-3 flex items-center justify-between">
								<NuxtLink
									:to="`/dashboard?category=${menu.name
										?.replace(' ', '-')
										.toLowerCase()}`"
									class="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
									>Lihat Semua
								</NuxtLink>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									class="w-5 h-5 text-blue-600">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</div>
					</div>
				</section>

				<teleport to="body">
					<Modal
						:is-open="isModal"
						title="Order Detail"
						@on-close="isModal = false"
						@confirm="updateOrder">
						<!-- Slot: Detail Order -->
						<div class="space-y-6">
							<!-- Form Update Status -->
							<div
								class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
								<h4 class="font-semibold text-gray-700 mb-3">
									Ubah Status Pesanan
								</h4>
								<div>
									<label
										for="status"
										class="block text-sm font-medium text-gray-700 mb-1">
										Status Saat Ini:
									</label>
									<select
										v-model="selectedStatus"
										id="status"
										class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white">
										<option
											v-for="(status, i) in statusOptions"
											:key="i"
											:value="status">
											{{
												capitalizeWords(
													status.replace('_', ' ')
												)
											}}
										</option>
									</select>
								</div>
							</div>
							<!-- Daftar Produk -->
							<div
								class="mb-4 space-y-4 overflow-y-auto h-[70%] pr-2">
								<!-- Ganti 'max-h-60' sesuai kebutuhan -->
								<div
									v-for="(product, i) in order?.products"
									:key="i"
									class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
									<div class="flex items-start gap-4">
										<!-- Gambar Produk -->
										<img
											:src="product?.image"
											alt="Product Image"
											class="w-16 h-16 object-cover rounded-lg" />

										<!-- Detail Produk -->
										<div class="flex-1">
											<h3
												class="font-semibold text-gray-800 text-lg">
												{{ product?.name }}
											</h3>

											<!-- Grid Info -->
											<div
												class="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
												<div>
													<span
														class="block text-xs text-gray-500"
														>Jumlah</span
													>
													<p
														class="text-gray-800 font-medium">
														{{ product?.quantity }}
													</p>
												</div>
												<div>
													<span
														class="block text-xs text-gray-500"
														>Harga</span
													>
													<p
														class="text-gray-800 font-medium">
														{{
															formatToRupiah(
																product?.price.toString() ??
																	''
															)
														}}
													</p>
												</div>
												<div>
													<span
														class="block text-xs text-gray-500"
														>Kategori</span
													>
													<p
														class="text-gray-800 font-medium">
														{{ product?.type }}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal>
				</teleport>
			</div>
			<OddoTheme v-if="isOddoTheme && layoutReady" />
		</ClientOnly>
	</div>
</template>

<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts';
import { NuxtLink } from '#components';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import type { Order } from '~/types/interfaces/OrderInterface';

// setPageLayout(themeNames.value);

// definePageMeta({
// 	layout: 'default',
// })

const route = useRoute();
const config = useRuntimeConfig();
const AVAILABLE_LAYOUTS = ['default', 'oddo-themes'] as const;
type AvailableLayout = (typeof AVAILABLE_LAYOUTS)[number];

// // ✅ Gunakan ref reaktif, bukan route.meta.layout
const activeLayout = ref<string>('default');
const isOddoTheme = computed(() => activeLayout.value === 'oddo-themes');

// Di <script setup>
const layoutReady = ref(false); // ✅ Tambahkan

const url = useRequestURL();
onBeforeMount(() => {
	const hostname = url.hostname;
	// Pisahkan subdomain
	const parts = hostname.split('.');
	const subdomain = parts.length > 2 ? parts[0] : null;

	let layout = config.public.defaultLayout;
	if (subdomain && AVAILABLE_LAYOUTS.includes(subdomain as AvailableLayout)) {
		layout = subdomain;
	} else if (!AVAILABLE_LAYOUTS.includes(layout as AvailableLayout)) {
		layout = 'default';
	}

	activeLayout.value = layout; // ✅ Tetap di sini, untuk render template
	layoutReady.value = true;
});

onMounted(() => {
	setPageLayout(activeLayout.value as LayoutKey);
});

const isAddedToCart = () => {};

// Interface untuk pesanan
interface Summary {
	no_order: string;
	status: string;
	time_estimation: string;
	order_quantity: string;
}

const isModal = ref<boolean>(false);
const selectedStatus = ref<string>('');

const { data, pending } = useAsyncData<Order[]>('orders', async () => {
	const orders = await $fetch<Order[]>('/api/orders');

	return orders;
});

// Untuk products
const {
	data: summaryData,
	pending: summaryPending,
	refresh: refreshsummary,
} = useAsyncData<any>('products/summary', async () => {
	const products = await $fetch<any>('/api/products/summary');
	return products;
});

// Interface untuk menu
interface Menu {
	id: number;
	name: string;
	items: string;
	image: string;
}

const order = ref<Order | null>(null);

const statusOptions = ref<string[]>([
	'pending',
	'progress',
	'completed',
	'cancelled',
]);

const openModal = (orderData: Order) => {
	order.value = orderData;
	isModal.value = !isModal.value;
	selectedStatus.value = orderData.status;
};

// Dummy cart untuk demo
const cartItems = ref([
	{
		id: 1,
		name: 'Nasi Goreng Seafood',
		price: 35000,
		quantity: 2,
		image: 'https://img.lovepik.com/png/20231126/thanksgiving-day-dish-icon-to-set-a-dinner-menu-i_704879_wh1200.png',
	},
	{
		id: 2,
		name: 'Es Teh Manis',
		price: 8000,
		quantity: 3,
		image: 'https://img.lovepik.com/png/20231126/thanksgiving-day-dish-icon-to-set-a-dinner-menu-i_704879_wh1200.png',
	},
]);

// Fungsi Helper
const subtotal = computed(() =>
	cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const discount = ref(5000); // contoh diskon tetap, bisa diubah jadi input
const tax = computed(() => Math.round(subtotal.value * 0.1));
const total = computed(() => subtotal.value - discount.value + tax.value);

const loyaltyPointsWon = computed(() => Math.floor(subtotal.value / 1000)); // 1 point per 1000
const loyaltyPointsUsed = ref(0);

// Fungsi Cart
const increaseQty = (index: number) => {
	cartItems.value[index].quantity += 1;
};
const decreaseQty = (index: number) => {
	if (cartItems.value[index].quantity > 1) {
		cartItems.value[index].quantity -= 1;
	}
};
const removeItem = (index: number) => {
	cartItems.value.splice(index, 1);
};
const clearCart = () => {
	cartItems.value = [];
};

// Format Rupiah
const formatToRupiah = (angka: string | number): string => {
	const number = typeof angka === 'string' ? parseInt(angka) : angka;
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(number);
};

// Modal Bayar (placeholder)
const openPaymentModal = () => {
	Swal.fire({
		title: 'Pembayaran',
		html: `
      <div class="text-left">
        <p><strong>Total:</strong> ${formatToRupiah(total.value)}</p>
        <p class="text-sm text-gray-500 mt-2">Silakan pilih metode pembayaran.</p>
      </div>
    `,
		showCancelButton: true,
		confirmButtonText: 'Bayar Tunai',
		cancelButtonText: 'Bayar Digital',
		reverseButtons: true,
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire(
				'✅ Berhasil!',
				'Pembayaran tunai berhasil diproses.',
				'success'
			);
			clearCart();
		} else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire('📱 QRIS', 'Silakan scan QR untuk bayar.', 'info');
		}
	});
};

const menus = ref<any>([
	{
		id: 1,
		name: 'Hidangan Utama',
		key: 'hidangan_utama',
		items: '15',
		image: 'https://example.com/menu-utama.jpg',
	},
	{
		id: 2,
		name: 'Minuman',
		key: 'minuman',
		items: '8',
		image: 'https://example.com/minuman.jpg',
	},
	{
		id: 3,
		name: 'Pencuci Mulut',
		key: 'pencuci_mulut',
		items: '5',
		image: 'https://example.com/dessert.jpg',
	},
	{
		id: 4,
		name: 'Paket Promo',
		key: 'paket_promo',
		items: '3',
		image: 'https://example.com/promo.jpg',
	},
	{
		id: 5,
		name: 'Hidangan Pembuka',
		key: 'hidangan_pembuka',
		items: '10',
		image: 'https://example.com/appetizer.jpg',
	},
	{
		key: 'menu_musiman',
		id: 6,
		name: 'Menu Musiman',
		items: '5',
		image: 'https://example.com/seasonal.jpg',
	},
]);

// Fungsi warna badge status
const getStatusColor = (status: string) => {
	switch (status) {
		case 'pending':
			return 'bg-yellow-100 text-yellow-800';
		case 'progress':
			return 'bg-blue-100 text-blue-800';
		case 'completed':
			return 'bg-green-100 text-green-800';
		case 'cancelled':
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};

// Border color sesuai status
const getStatusBorderColor = (status: string) => {
	switch (status) {
		case 'Dalam Antrian':
			return 'border-yellow-400';
		case 'Sedang Dimasak':
			return 'border-blue-400';
		case 'Selesai':
			return 'border-green-400';
		default:
			return 'border-gray-200';
	}
};

// Helper untuk capitalize
const capitalizeWords = (str: string): string => {
	return str
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
};

const isLoadingUpdate = ref<boolean>(false);
const updateOrder = async () => {
	isLoadingUpdate.value = true;
	const params = {
		status: selectedStatus.value, // ✅ Sudah benar
	};

	const res = await $fetch(`/api/orders/${order?.value?.id ?? ''}`, {
		method: 'PUT',
		body: params,
	});
	isModal.value = false;

	if (res?.success) {
		isLoadingUpdate.value = false;
		const index =
			data.value?.findIndex(
				(orderItem) => orderItem?.id === order?.value?.id
			) ?? -1;

		if (index !== -1 && data?.value?.[index]) {
			data.value[index].status = selectedStatus.value;

			Swal.fire({
				toast: true,
				position: 'bottom-end',
				icon: 'success',
				title: 'Status Pesanan Berhasil Di Update',
				text: res?.message,
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer);
					toast.addEventListener('mouseleave', Swal.resumeTimer);
				},
			});
		}
	}
};
</script>

<style scoped>
.card-enter-active,
.card-leave-active {
	transition: all 0.3s ease-in-out;
}

.card-enter-from,
.card-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
