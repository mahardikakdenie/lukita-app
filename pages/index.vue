<template>
	<div>
		<!-- SECTION: Pesanan Saat Ini -->
		<div class="p-6 shadow-xl rounded-2xl bg-white">
			<!-- Header -->
			<div class="flex flex-col md:flex-row justify-between gap-4">
				<div class="space-y-1">
					<h2 class="text-xl font-bold text-gray-800">📦 Pesanan Saat Ini</h2>
					<p class="text-sm text-gray-600">
						Lihat antrian pesanan yang sedang diproses. Estimasi waktu membantu Anda menunggu dengan nyaman.
					</p>
				</div>
				<div class="flex items-center justify-end">
					<button
						@click="$router.push('/dashboard')"
						class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-2 transition">
						+ Buat Pesanan Baru
					</button>
				</div>
			</div>

			<!-- List Pesanan -->
			<div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				<div
					v-for="(summary, i) in summaries"
					:key="i"
					class="p-5 rounded-2xl shadow-sm hover:shadow-md bg-gray-50 transition duration-200">
					<div class="mb-2">
						<p class="text-xs text-gray-500">Nomor Pesanan</p>
						<p class="text-lg font-bold text-blue-700">{{ summary.no_order }}</p>
					</div>
					<div class="mt-2">
						<p class="text-xs text-gray-500">Status</p>
						<p
							class="inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1"
							:class="getStatusColor(summary.status)">
							{{ summary.status }}
						</p>
					</div>
					<div class="mt-3">
						<p class="text-xs text-gray-500">Estimasi</p>
						<p class="text-sm font-medium text-gray-800">
							{{ summary.time_estimation }}
						</p>
					</div>
					<div class="mt-3">
						<p class="text-xs text-gray-500">Jumlah Order</p>
						<p class="text-sm font-medium text-gray-800">
							{{ summary.order_quantity }}
						</p>
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div class="mt-6 text-sm font-medium text-gray-600">
				<span class="text-red-500 font-semibold">Catatan:</span>
				<span> Waktu estimasi bersifat perkiraan dan dapat berubah.</span>
			</div>
		</div>

		<!-- SECTION: Daftar Menu -->
		<div class="p-6 shadow-xl rounded-2xl bg-white mt-6">
			<div class="mb-4">
				<h2 class="text-xl font-bold text-gray-800">🍽️ Daftar Menu</h2>
			</div>

			<!-- Menu Cards -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				<div
					v-for="i in 6"
					:key="i"
					class="rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-200 shadow-sm">
					<div class="flex gap-4 p-4">
						<img
							class="rounded-2xl w-16 h-16 object-cover"
							src="https://img.lovepik.com/png/20231126/thanksgiving-day-dish-icon-to-set-a-dinner-menu-i_704879_wh1200.png"
							alt="Menu Image" />
						<div class="flex flex-col justify-center">
							<p class="font-semibold text-gray-800">Hidangan Utama</p>
							<p class="text-sm text-gray-500">15 Menu</p>
						</div>
					</div>
					<div class="border-t border-gray-200 p-3 flex items-center justify-between">
						<span class="text-blue-600 text-sm font-medium cursor-pointer hover:underline">Lihat Semua</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 text-blue-600">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface Summary {
	no_order: string;
	status: string;
	time_estimation: string;
	order_quantity: string;
}

const summaries = ref<Summary[]>([
	{ no_order: '#001', status: 'Dalam Antrian', time_estimation: '20 Menit', order_quantity: '3' },
	{ no_order: '#002', status: 'Sedang Dimasak', time_estimation: '12 Menit', order_quantity: '2' },
	{ no_order: '#003', status: 'Selesai', time_estimation: '0 Menit', order_quantity: '1' }
]);

const getStatusColor = (status: string) => {
	switch (status) {
		case 'Dalam Antrian': return 'bg-yellow-100 text-yellow-800';
		case 'Sedang Dimasak': return 'bg-blue-100 text-blue-800';
		case 'Selesai': return 'bg-green-100 text-green-800';
		default: return 'bg-gray-100 text-gray-800';
	}
};
</script>
