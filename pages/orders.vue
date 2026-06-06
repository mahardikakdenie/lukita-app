<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLocalDB } from '~/composables/useLocalDB';
import type { Order } from '~/types/interfaces/OrderInterface';

definePageMeta({
	layout: 'default',
});

const { loadOrders, updateOrderStatus } = useLocalDB();

const orders = ref<Order[]>([]);
const activeTab = ref<'all' | 'pending' | 'progress' | 'completed' | 'cancelled'>('all');

const tabItems: Array<{ key: 'all' | 'pending' | 'progress' | 'completed' | 'cancelled'; label: string }> = [
	{ key: 'all', label: 'Semua' },
	{ key: 'pending', label: 'Pending' },
	{ key: 'progress', label: 'Progress' },
	{ key: 'completed', label: 'Selesai' },
	{ key: 'cancelled', label: 'Dibatalkan' },
];

const filteredOrders = computed(() => {
	if (activeTab.value === 'all') return orders.value;
	return orders.value.filter(o => o.status === activeTab.value);
});

const pendingCount = computed(() => orders.value.filter(o => o.status === 'pending').length);

onMounted(async () => {
	orders.value = await loadOrders();
});

async function handleStatusUpdate(orderId: string, status: string) {
	await updateOrderStatus(orderId, status);
	orders.value = await loadOrders();
}

function formatToRupiah(angka: string | number): string {
	const nilai = typeof angka === 'string' ? parseInt(angka, 10) : angka;
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(nilai);
}

function getStatusBadge(status: string) {
	switch (status) {
		case 'pending': return 'bg-yellow-100 text-yellow-800';
		case 'progress': return 'bg-blue-100 text-blue-800';
		case 'completed': return 'bg-emerald-100 text-emerald-800';
		case 'cancelled': return 'bg-red-100 text-red-800';
		default: return 'bg-gray-100 text-gray-600';
	}
}
</script>

<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Header -->
		<header class="sticky top-0 z-20 border-b bg-white px-4 py-4 shadow-sm backdrop-blur-md lg:px-6">
			<div class="mx-auto flex max-w-6xl items-center justify-between">
				<div class="flex items-center gap-3">
					<NuxtLink to="/" class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
					</NuxtLink>
					<div>
						<h1 class="text-xl font-bold text-gray-900">Daftar Pesanan</h1>
						<p v-if="pendingCount > 0" class="text-xs text-orange-600 font-semibold">{{ pendingCount }} pesanan menunggu</p>
					</div>
				</div>
				<button @click="loadOrders().then(r => orders = r)" class="rounded-xl bg-gray-100 p-2.5 text-gray-600 transition hover:bg-gray-200" title="Refresh">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
				</button>
			</div>
		</header>

		<main class="mx-auto max-w-6xl p-4 lg:p-6">
			<!-- Tabs -->
			<div class="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
				<button v-for="tab in tabItems" :key="tab.key" @click="activeTab = tab.key"
					class="whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition"
					:class="activeTab === tab.key ? 'bg-violet-600 text-white shadow-md' : 'bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50'"
				>{{ tab.label }}</button>
			</div>

			<!-- Orders List -->
			<div v-if="filteredOrders.length === 0" class="flex flex-col items-center justify-center py-20">
				<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
				</div>
				<p class="font-medium text-gray-600">Tidak ada pesanan</p>
				<p class="text-sm text-gray-400">Belum ada pesanan masuk.</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				<div v-for="order in filteredOrders" :key="order.id"
					class="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
				>
					<div class="mb-3 flex items-start justify-between">
						<div class="flex items-center gap-2">
							<span class="rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-bold text-orange-700">
								Meja {{ order.table_number || '-' }}
							</span>
						</div>
						<span class="rounded-full px-3 py-1 text-xs font-medium capitalize" :class="getStatusBadge(order.status)">
							{{ order.status === 'progress' ? 'Diproses' : order.status === 'cancelled' ? 'Dibatalkan' : order.status === 'completed' ? 'Selesai' : 'Menunggu' }}
						</span>
					</div>

					<div v-if="order.customer_name" class="mb-2 text-sm text-gray-600">
						<span class="font-semibold">Nama:</span> {{ order.customer_name }}
					</div>

					<div class="mb-4 space-y-1.5 text-sm">
						<div v-if="order.products?.length">
							<div v-for="(p, i) in order.products" :key="i" class="flex justify-between text-gray-600">
								<span class="line-clamp-1">{{ p.name }} <span class="text-gray-400">x{{ p.quantity }}</span></span>
								<span>{{ formatToRupiah(p.price) }}</span>
							</div>
						</div>
						<div v-else class="py-1 text-xs text-gray-400 italic">Cashier order (no item breakdown)</div>
					</div>

					<div v-if="order.note" class="mb-4 rounded-xl bg-yellow-50 px-3 py-2 text-xs italic text-yellow-700 ring-1 ring-yellow-100">
						{{ order.note }}
					</div>

					<div class="mb-4 flex items-center justify-between border-t border-gray-100 pt-3">
						<span class="text-xs font-medium text-gray-500">Total</span>
						<span class="text-lg font-bold text-violet-700">{{ formatToRupiah(order.total_price || '0') }}</span>
					</div>

					<div class="mt-auto grid grid-cols-2 gap-2">
						<button v-if="order.status === 'pending'" @click="handleStatusUpdate(order.id, 'progress')"
							class="rounded-xl bg-orange-500 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
						>Terima</button>
						<button v-if="order.status === 'progress'" @click="handleStatusUpdate(order.id, 'completed')"
							class="col-span-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600"
						>Selesai</button>
						<button v-if="order.status === 'pending'" @click="handleStatusUpdate(order.id, 'cancelled')"
							class="rounded-xl border border-red-200 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50"
						>Tolak</button>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
