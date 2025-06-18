<template>
	<div class="mt-4">
		<!-- Context -->
		<div v-if="!pending" class="grid sm:grid-cols-3 gap-2 grid-cols-1">
			<div
				v-for="(menu, i) in data"
				:key="i"
				class="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
            >
				<ImageLoader :image="menu.image" />
				<div class="p-4">
					<!-- Title -->
					<h3 class="text-base font-semibold text-gray-800 mb-1">
						{{ menu.name }}
					</h3>

					<!-- Description -->
					<p class="text-sm text-gray-600 line-clamp-2">
						{{ menu.description }}
					</p>

					<!-- Price and Tag -->
					<div class="flex justify-between items-center mt-3">
						<span class="text-blue-600 font-bold">Rp{{ formatToRupiah(menu.price) }}</span>
						<Badge :text="menu.type" />
					</div>

					<!-- Button -->
					<button
						class="mt-4 w-full py-2 flex justify-center gap-1 text-sm bg-blue-100 text-blue-600 font-semibold rounded-lg border border-blue-300 hover:bg-blue-200 cursor-pointer transition disabled:cursor-not-allowed"
                        @click="addCart(menu)"
                        :disabled="carts.some(cart => cart?.name === menu?.name)"
                    >
						{{ carts.some(cart => cart?.name === menu?.name) ? 'Sudah ditambahkan' : 'Tambahkan' }}
                        <svg v-if="!carts.some(cart => cart?.name === menu?.name)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
					</button>
				</div>
			</div>
		</div>

        <div v-else>
            <div class="loader"></div>
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
    carts: Menu[],
}>()

const { data, pending, error } = await useFetch<Menu[]>('/api/product', {
  server: true,
  params: {
    type: 'hidangan-utama'
  }
});

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
