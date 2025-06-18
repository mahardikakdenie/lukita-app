<template>
	<div class="w-full">
		<div class="shadow-lg rounded-2xl py-5 px-6 bg-white space-y-5">
			<!-- Header -->
			<div>
				<h1 class="text-lg font-bold text-gray-800">Detail Pesanan</h1>
				<hr class="mt-2 border-gray-200" />
			</div>

			<!-- Metode Pembayaran -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2"
					>Metode Pembayaran</label
				>
				<div class="flex flex-wrap gap-3">
					<label
						v-for="(option, i) in paymentOptions"
						:key="i"
						class="flex items-center gap-2 text-sm text-gray-700">
						<input
                            v-model="selectOption"
							type="radio"
							name="payment"
							:value="option"
							class="text-blue-600 focus:ring-blue-500" />
						<span>{{ option }}</span>
					</label>
				</div>
			</div>

			<!-- Voucher Diskon -->
			<div>
				<label class="text-sm font-medium text-gray-700 block mb-2"
					>Voucher Diskon</label
				>
				<div class="flex gap-3">
					<input
						type="text"
						placeholder="Masukkan kode voucher"
						class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
					<button
						class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition">
						Pakai
					</button>
				</div>
			</div>

			<hr class="border-gray-200" />

			<!-- Item Pesanan -->
			<div v-if="orders.length > 0" class="flex flex-col gap-4">
                <div v-for="(order, i) in orders" :key="i" class="flex gap-4">
                    <ImageLoader :image="order.image" customClass="h-24 w-24 rounded-2xl" />

                    <div class="flex-1 space-y-2">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="font-semibold text-sm text-gray-800">
                                    {{ order.name }}
                                </h2>
                                <Badge />
                                <!-- Assuming Badge is a registered component -->
                            </div>
                            <span class="text-blue-600 font-bold text-sm">{{ formatToRupiah(order.price) }}</span>
                        </div>

                        <!-- Quantity & Catatan -->
                        <div
                            class="flex flex-col md:flex-row mt-4 justify-between items-start md:items-center gap-3">
                            <!-- Quantity Control -->
                            <div class="flex items-center gap-2">
                                <button
                                    class="w-8 h-8 flex items-center cursor-pointer justify-center border border-blue-600 text-blue-600 rounded-xl bg-blue-200 hover:bg-blue-100 transition"
                                    @click="reduceQuantity(order)"
                                >
                                    <MinusIcon class="w-4 h-4" />
                                </button>
                                <input
                                    :value="order.quantity"
                                    readonly
                                    type="number"
                                    min="0"
                                    class="w-14 px-3 py-1.5 text-sm flex justify-center text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button
                                    class="w-8 h-8 flex items-center cursor-pointer justify-center border border-blue-600 text-blue-600 rounded-xl bg-blue-200 hover:bg-blue-100 transition"
                                    @click="increaseQuantity(order)"
                                >
                                    <PlusIcon class="w-4 h-4" />
                                </button>
                            </div>

                            <!-- Catatan -->
                            <button
                                class="text-sm text-blue-700 underline hover:text-blue-900 transition">
                                Tambahkan Catatan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="p-3 flex justify-center">
                <Badge text="Tidak ada pesanan" status="danger" />
            </div>

			<hr class="border-gray-200 my-2" />

			<div>
				<div class="flex justify-between">
					<div>
						<span class="font-bold class text-sm text-gray-500">
							Subtotal
						</span>
					</div>
					<div>
						<span class="text-sm"> {{ subtotal }} </span>
					</div>
				</div>
				<div class="flex justify-between mt-2">
					<div>
						<span class="font-bold class text-sm text-gray-500">
							Diskon
						</span>
					</div>
					<div>
						<span class="text-sm"> - Rp10.000 </span>
					</div>
				</div>
				<div class="flex justify-between mt-2">
					<div>
						<span class="font-bold class text-sm text-gray-500">
							Pajak (11%)
						</span>
					</div>
					<div>
						<span class="text-sm"> Rp7.000 </span>
					</div>
				</div>
				<div class="flex justify-between mt-2">
					<div>
						<span class="font-bold class text-sm text-gray-500">
							Total
						</span>
					</div>
					<div>
						<span class="text-sm"> Rp71.400 </span>
					</div>
				</div>
			</div>

			<hr class="border-gray-200 my-2" />

			<div class="w-full">
				<NuxtLink
					to="/payment"
					class="bg-blue-200 rounded-xl w-full text-blue-700 font-bold py-2 flex justify-center gap-2 cursor-pointer hover:bg-blue-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
					</svg>

					Selesaikan Pembayaran
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';
import type { Menu } from '../HomeContent/index.vue';
import ImageLoader from '../imageLoader.vue';
import { useCarts } from '~/composables/useCarts'

const props = defineProps<{
    orders: Menu[],
}>();

const emits = defineEmits(['remove-cart']);

const subtotal = computed(() => {
  if (!props.orders || !Array.isArray(props.orders)) return 0

  const total = props.orders.reduce((sum, order) => {
    const price = parseInt(order?.price) || 0
    const quantity = order?.quantity || 0
    return sum + (price * quantity)
  }, 0)

  return formatToRupiah(total.toString());
})
const paymentOptions = ref<string[]>(['Tunai', 'Qris']);
const selectOption = ref<string>('Tunai');
const increaseQuantity = (order: Menu) => {
    if (order.quantity) {
        order.quantity++;
    }
}
const reduceQuantity = (order: Menu) => {
    if (order.quantity) {
        order.quantity--;

        if (order?.quantity === 0) {
            emits('remove-cart', order);
        }
    }
}
</script>
