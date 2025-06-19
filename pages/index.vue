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
				class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				<div
					v-for="(summary, i) in summaries"
					:key="i"
					class="p-5 rounded-2xl shadow hover:shadow-xl bg-white border-l-4 transition-all duration-200"
					:class="getStatusBorderColor(summary.status)">
					<div class="mb-3">
						<span class="text-xs text-gray-500">Nomor Pesanan</span>
						<p class="text-lg font-bold text-blue-700">
							{{ summary.no_order }}
						</p>
					</div>

					<div class="mb-3">
						<span class="text-xs text-gray-500">Status</span>
						<span
							class="inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1 capitalize"
							:class="getStatusColor(summary.status)">
							{{ summary.status }}
						</span>
					</div>

					<div class="mb-3">
						<span class="text-xs text-gray-500">Estimasi</span>
						<p class="text-sm font-medium text-gray-800">
							{{ summary.time_estimation }}
						</p>
					</div>

					<div>
						<span class="text-xs text-gray-500">Jumlah Order</span>
						<p class="text-sm font-medium text-gray-800">
							{{ summary.order_quantity }}
						</p>
					</div>
				</div>
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
						<span
							class="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
							>Lihat Semua</span
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
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Interface untuk pesanan
interface Summary {
	no_order: string;
	status: string;
	time_estimation: string;
	order_quantity: string;
}

// Data dummy untuk daftar pesanan
const summaries = ref<Summary[]>([
	{
		no_order: '#001',
		status: 'Dalam Antrian',
		time_estimation: '20 Menit',
		order_quantity: '3',
	},
	{
		no_order: '#002',
		status: 'Sedang Dimasak',
		time_estimation: '12 Menit',
		order_quantity: '2',
	},
	{
		no_order: '#003',
		status: 'Selesai',
		time_estimation: '0 Menit',
		order_quantity: '1',
	},
]);

// Interface untuk menu
interface Menu {
	id: number;
	name: string;
	items: string;
	image: string;
}

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
		case 'Dalam Antrian':
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
