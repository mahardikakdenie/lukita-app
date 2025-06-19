<template>
	<div class="mt-6">
		<!-- Loader -->
		<div v-if="isLoading" class="flex justify-center py-8">
			<div class="loader"></div>
		</div>

		<!-- Menu Grid -->
		<div
			v-else-if="!isLoading && products && products.length > 0"
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			<div
				v-for="menu in products"
				:key="menu.name"
				class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition hover:bg-gray-100">
				<ImageLoader :image="menu.image" class="w-full object-cover" />
				<div class="p-3">
					<div class="py-1">
						<Badge :text="menu.type" />
					</div>
					<h3 class="font-semibold">{{ menu.name }}</h3>
					<p class="text-sm text-gray-600 line-clamp-2">
						{{ menu.description }}
					</p>
					<div class="flex justify-between items-center mt-3">
						<span class="text-blue-600 font-bold">{{
							formatToRupiah(menu.price)
						}}</span>
						<button
							@click="addCart(menu)"
							:disabled="carts.some((c) => c.name === menu.name)"
							class="text-xs px-3 py-1 rounded-full bg-white border border-blue-500 text-blue-600 disabled:bg-blue-100 disabled:text-blue-400">
							{{
								carts.some((c) => c.name === menu.name)
									? '✔ Ditambahkan'
									: '+ Tambah'
							}}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div
			v-else-if="!isLoading && products && products.length === 0"
			class="flex flex-col items-center justify-center py-12 px-4 text-center">
			<!-- Gambar -->
			<ImageLoader
				image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIZVOSdT_3y4XlZsUo3nTkVvHR27gli2UxwRRRP1bealcPxUgkBRYjeHQIg9fKPo_4JP0&usqp=CAU"
				customClass="w-56 h-56 object-contain mb-4" />

			<!-- Pesan Utama -->
			<h3 class="text-lg font-semibold text-gray-800 mb-2">
				Tidak Ada Data
			</h3>
			<p class="text-sm text-gray-500 mb-6 max-w-xs">
				Tidak ada menu tersedia untuk kategori ini. Silakan pilih
				kategori lain.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface Menu {
	image: string;
	name: string;
	description: string;
	price: string;
	category: string;
	type: string;
	quantity?: number;
}

const props = defineProps<{
	carts: Menu[];
	products: Menu[] | null;
	isLoading: Boolean;
}>();

const emits = defineEmits(['add-to-cart']);

const addCart = (product: Menu) => {
	emits('add-to-cart', product);
};
</script>

<style>
.loader {
	width: 24px;
	height: 24px;
	border: 4px solid #cbd5e0;
	border-top-color: #3b82f6;
	border-radius: 50%;
	animation: spin 0.6s linear infinite;
}
@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
