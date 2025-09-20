<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Interface untuk pesanan
interface Summary {
	no_order: string;
	status: string;
	time_estimation: string;
	order_quantity: string;
}

// Dummy cart untuk demo
const cartItems = ref([
	{
		id: 1,
		name: 'Nasi Goreng Seafood',
		price: 35000,
		quantity: 2,
		image: 'https://sanex.co.id/wp-content/uploads/2024/11/2734.jpg',
	},
	{
		id: 2,
		name: 'Es Teh Manis',
		price: 8000,
		quantity: 3,
		image: 'https://cnc-magazine.oramiland.com/parenting/images/Es_Tambring_hot.liputan6.com.width-800.format-webp.webp',
	},
	{
		id: 2,
		name: 'Es Teh Manis',
		price: 8000,
		quantity: 3,
		image: 'https://cnc-magazine.oramiland.com/parenting/images/Es_Tambring_hot.liputan6.com.width-800.format-webp.webp',
	},
	{
		id: 2,
		name: 'Es Teh Manis',
		price: 8000,
		quantity: 3,
		image: 'https://cnc-magazine.oramiland.com/parenting/images/Es_Tambring_hot.liputan6.com.width-800.format-webp.webp',
	},
	{
		id: 2,
		name: 'Es Teh Manis',
		price: 8000,
		quantity: 3,
		image: 'https://cnc-magazine.oramiland.com/parenting/images/Es_Tambring_hot.liputan6.com.width-800.format-webp.webp',
	},
]);

// Format Rupiah
const formatToRupiah = (angka: string): string => {
	const nilai = parseInt(angka, 10);
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(nilai);
};

// Computed
const currentLayout = computed(() => route.meta.layout);
const isOddoTheme = computed(() => currentLayout.value === 'oddo-themes');

// State
const selectedStatus = ref<string>('');
const isAddedToCart = (id: number) => {
	// Dummy: selalu true untuk demo
	return true;
};

// Methods
const openPaymentModal = () => {
	alert('Payment modal opened!');
};

const clearCart = () => {
	if (confirm('Hapus semua item?')) {
		cartItems.value = [];
	}
};

// Efek glow saat hover tombol
const glowButton = (event: MouseEvent) => {
	const el = event.target as HTMLElement;
	el.style.boxShadow = '0 0 15px rgba(147, 51, 234, 0.6)';
	setTimeout(() => {
		el.style.boxShadow = '';
	}, 300);
};
</script>


<template>
	<div class="min-h-screen bg-gray-50 p-4">
		<div class="mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<!-- Sidebar: Cart + Keypad (Clean Version) -->
				<div class="col-span-3">
					<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-full flex flex-col">

						<!-- Cart Items -->
						<div class="flex-1 overflow-y-auto mb-5 pr-1">
							<h3 class="font-semibold text-gray-800 text-sm mb-3 flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
								Keranjang ({{ cartItems.length }})
							</h3>

							<div v-if="cartItems.length > 0" class="space-y-2 max-h-48 overflow-y-auto pr-1">
								<div
									v-for="product in cartItems"
									:key="product.id"
									class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition group"
								>
									<div class="flex-1">
										<p class="text-sm font-medium text-gray-800 truncate">{{ product.name }}</p>
										<p class="text-xs text-gray-500">{{ formatToRupiah(product.price.toString()) }} × {{ product.quantity }}</p>
									</div>

									<div class="flex items-center space-x-1 ml-3">
										<button
											class="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
											@click.stop="product.quantity > 1 ? product.quantity-- : null"
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
											</svg>
										</button>
										<span class="text-sm font-medium w-6 text-center text-gray-800">{{ product.quantity }}</span>
										<button
											class="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
											@click.stop="product.quantity++"
										>
											<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
											</svg>
										</button>
									</div>

									<button
										class="ml-2 p-1 text-gray-400 hover:text-red-500 transition"
										@click.stop="cartItems = cartItems.filter(p => p.id !== product.id)"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0020.138 21H3.862a2 2 0 01-1.995-1.858L1 7m5 4v6m4-6v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3" />
										</svg>
									</button>
								</div>
							</div>

							<div v-else class="text-center py-6 text-gray-500 text-sm bg-gray-50 rounded-xl">
								Keranjang kosong
							</div>
						</div>

						<!-- Summary -->
						<div class="bg-gray-50 p-4 rounded-xl mb-5 border border-gray-200">
							<div class="flex justify-between text-xs text-gray-600 mb-1">
								<span>Subtotal</span>
								<span class="font-medium text-gray-800">{{ formatToRupiah(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toString()) }}</span>
							</div>
							<div class="flex justify-between text-base font-bold text-gray-900">
								<span>Total</span>
								<span>{{ formatToRupiah(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toString()) }}</span>
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="grid grid-cols-3 gap-2 mb-5">
							<button
								v-for="action in ['Refund', 'Notes', 'Promo', 'Reset', 'Rewards', 'Order']"
								:key="action"
								class="text-xs py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
							>
								{{ action }}
							</button>
						</div>

						<!-- Keypad -->
						<div class="grid grid-cols-4 gap-2 mb-4">
							<button
								v-for="num in [1,2,3,4,5,6,7,8,9,'+/-',0,'.']"
								:key="num"
								class="aspect-square bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg flex items-center justify-center text-lg transition active:bg-gray-300"
							>
								{{ num }}
							</button>
						</div>

						<!-- Payment Button -->
						<button
							@click="openPaymentModal"
							:disabled="cartItems.length === 0"
							class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold rounded-xl transition"
						>
							⚡ Bayar Sekarang
						</button>
					</div>
				</div>

				<!-- Main Content: Product Catalog -->
				<div class="col-span-9">
					<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-full flex flex-col">

						<!-- Search & Filter -->
						<div class="mb-5">
							<div class="flex flex-col sm:flex-row gap-3">
								<div class="relative flex-1">
									<input
										type="text"
										placeholder="Cari produk..."
										class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
									/>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</div>

								<div class="flex space-x-2 overflow-x-auto pb-1 hide-scrollbar">
									<button
										v-for="category in ['Semua', 'Makanan', 'Minuman', 'Paket', 'Promo']"
										:key="category"
										class="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full text-xs font-medium whitespace-nowrap transition"
									>
										{{ category }}
									</button>
								</div>
							</div>
						</div>

						<!-- Product Grid -->
						<div class="flex-1 overflow-y-auto hide-scrollbar pb-4">
							<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
								<div
									v-for="product in [
										{ id: 1, name: 'Nasi Goreng Seafood', price: 35000, image: 'https://sanex.co.id/wp-content/uploads/2024/11/2734.jpg' },
										{ id: 2, name: 'Es Teh Manis', price: 8000, image: 'https://cnc-magazine.oramiland.com/parenting/images/Es_Tambring_hot.liputan6.com.width-800.format-webp.webp' },
										{ id: 3, name: 'Ayam Goreng', price: 25000, image: 'https://asset.kompas.com/crops/4QxS0jKQqzV7qk5nXZvY6oQjR4I=/0x0:998x665/750x500/data/photo/2023/03/07/64072e0b2d6a7.jpg' },
										{ id: 4, name: 'Jus Alpukat', price: 15000, image: 'https://img.lovepik.com/free-png/20211209/lovepik-avocado-juice-png-image_401401828_wh860.png' },
										{ id: 5, name: 'Paket Nasi + Ayam', price: 40000, image: 'https://cdn.idntimes.com/content-images/post/20200813/1-1-d54d1e8556322633847385540915013e_600x400.jpg' },
									]"
									:key="product.id"
									class="group bg-white rounded-xl border border-gray-200 hover:shadow-md transition cursor-pointer"
								>
									<div class="h-28 overflow-hidden rounded-t-xl">
										<img
											:src="product.image"
											:alt="product.name"
											class="w-full h-full object-cover group-hover:scale-105 transition"
										/>
									</div>
									<div class="p-3">
										<h3 class="font-medium text-gray-800 text-sm line-clamp-2 mb-1">{{ product.name }}</h3>
										<p class="text-indigo-600 font-bold text-sm mb-2">{{ formatToRupiah(product.price.toString()) }}</p>
										<button
											class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition active:scale-95"
										>
											+ Tambah
										</button>
									</div>
								</div>
							</div>
						</div>

						<!-- Footer Tip -->
						<div class="mt-auto pt-4 border-t border-gray-200">
							<p class="text-center text-xs text-gray-500">
								Pilih produk → sesuaikan jumlah → tekan <span class="font-medium text-indigo-600">“Bayar Sekarang”</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.hide-scrollbar {
	scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
	display: none;
}
</style>
