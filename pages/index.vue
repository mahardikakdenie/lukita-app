<template>
	<div class="space-y-8">
		<!-- SECTION: Pesanan Saat Ini -->
		<section class="p-6 bg-white rounded-2xl shadow-lg">
			<div class="flex flex-col md:flex-row justify-between gap-4">
				<div class="space-y-2">
					<h2 class="text-xl font-bold text-gray-800">
						📦 Pesanan Saat Ini
					</h2>
					<p class="text-sm text-gray-600">
						Lihat antrian pesanan yang sedang diproses. Estimasi
						waktu membantu Anda menunggu dengan nyaman.
					</p>
				</div>

				<div class="flex items-center justify-end">
					<button
						@click="$router.push('/dashboard')"
						class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-2 transition-all duration-200 flex items-center gap-2">
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

			<!-- List Pesanan -->
			<div
				v-if="!pending && data && data.length > 0"
				class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				<div
					v-for="(summary, i) in data"
					:key="i"
					class="p-6 rounded-2xl shadow-md hover:shadow-lg bg-white border-l-4 transition-all duration-300"
					:class="getStatusBorderColor(summary.status)">
					<!-- Header -->
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-lg font-semibold text-gray-800">
							{{ summary.name }}
						</h3>
						<span
							class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full capitalize"
							:class="getStatusColor(summary.status)">
							{{ summary.status }}
						</span>
					</div>

					<!-- Grid Info -->
					<div class="grid grid-cols-2 gap-4 text-sm">
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
								{{ summary.quantity }}
							</p>
						</div>
					</div>

					<!-- Action Button (Optional) -->
					<div
						class="mt-5 pt-5 border-t border-gray-100 flex justify-end">
						<button
							class="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
							@click="openModal(summary)">
							View Details →
						</button>
					</div>
				</div>
			</div>

			<div v-if="pending" class="flex justify-center py-8">
				<div class="loader"></div>
			</div>

			<!-- Catatan Kecil -->
			<div class="mt-6 text-sm text-gray-600">
				<span class="text-red-500 font-semibold">Catatan:</span>
				Waktu estimasi bersifat perkiraan dan dapat berubah.
			</div>
		</section>

		<!-- SECTION: Daftar Menu -->
		<section class="p-6 bg-white rounded-2xl shadow-lg">
			<h2 class="text-xl font-bold text-gray-800 mb-4">🍽️ Daftar Menu</h2>

			<!-- Grid Menu -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
									{{ menu.items }} item
								</p>
							</div>
						</div>
					</div>

					<div
						class="border-t border-gray-200 p-3 flex items-center justify-between">
						<NuxtLink
							:to="`/dashboard?category=${menu.name?.replace(' ', '-').toLowerCase()}`"
							class="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
							>Lihat Semua</NuxtLink
						>
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
				@on-close="isModal = false">
				<!-- Slot: Detail Order -->
				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<img
							:src="order?.image"
							alt="Product Image"
							class="w-16 h-16 object-cover rounded-md" />
						<div>
							<h3 class="font-semibold text-gray-800">
								{{ order?.name }}
							</h3>
							<p class="text-sm text-gray-600">
								ID: {{ order?.id }}
							</p>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span class="block text-xs text-gray-500"
								>Tanggal</span
							>
							<p class="text-gray-800">{{ order?.createdAt }}</p>
						</div>
						<div>
							<span class="block text-xs text-gray-500"
								>Jumlah</span
							>
							<p class="text-gray-800">{{ order?.quantity }}</p>
						</div>
						<div>
							<span class="block text-xs text-gray-500"
								>Harga</span
							>
							<p class="text-gray-800">{{ order?.price }}</p>
						</div>
						<div>
							<span class="block text-xs text-gray-500"
								>Kategori</span
							>
							<p class="text-gray-800">{{ order?.type }}</p>
						</div>
					</div>

					<!-- Status Form -->
					<div>
						<label
							for="status"
							class="block text-sm font-medium text-gray-700 mb-1"
							>Status Saat Ini:</label
						>
						<select
							v-model="selectedStatus"
							id="status"
							class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
							<option value="pending">Pending</option>
							<option value="progress">Progress</option>
							<option value="shipped">Shipped</option>
							<option value="completed">Completed</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</div>
				</div>
			</Modal>
		</teleport>
	</div>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components';
import { ref } from 'vue';
import type { Order } from '~/types/interfaces/OrderInterface';

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

// Interface untuk menu
interface Menu {
	id: number;
	name: string;
	items: string;
	image: string;
}

const order = ref<Order | null>(null);

const openModal = (orderData: Order) => {
	order.value = orderData;
	isModal.value = !isModal.value;
	selectedStatus.value = orderData.status;
};

const menus = ref<Menu[]>([
	{
		id: 1,
		name: 'Hidangan Utama',
		items: '15',
		image: 'https://example.com/menu-utama.jpg',
	},
	{
		id: 2,
		name: 'Minuman',
		items: '8',
		image: 'https://example.com/minuman.jpg',
	},
	{
		id: 3,
		name: 'Pencuci Mulut',
		items: '5',
		image: 'https://example.com/dessert.jpg',
	},
	{
		id: 4,
		name: 'Paket Promo',
		items: '3',
		image: 'https://example.com/promo.jpg',
	},
	{
		id: 5,
		name: 'Hidangan Pembuka',
		items: '10',
		image: 'https://example.com/appetizer.jpg',
	},
	{
		id: 6,
		name: 'Menu Musiman',
		items: '5',
		image: 'https://example.com/seasonal.jpg',
	},
]);

// Fungsi warna badge status
const getStatusColor = (status: string) => {
	switch (status) {
		case 'progress':
			return 'bg-yellow-100 text-yellow-800';
		case 'Sedang Dimasak':
			return 'bg-blue-100 text-blue-800';
		case 'Selesai':
			return 'bg-green-100 text-green-800';
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
