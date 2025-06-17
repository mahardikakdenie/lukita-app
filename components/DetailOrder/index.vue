<template>
	<div class="w-full">
		<div class="shadow-lg rounded-2xl py-5 px-6 bg-white space-y-5">
			<!-- Header -->
			<div>
				<h1 class="text-lg font-bold text-gray-800">Detail Pesanan</h1>
				<hr class="mt-2 border-gray-200" />
			</div>

			<!-- Info Pesanan -->
			<div class="text-sm text-gray-600 space-y-1">
				<p class="font-semibold text-gray-700">#111 - Customer 46</p>
				<p
					class="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full w-max">
					Pesanan aktif
				</p>
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
			<div v-for="i in 2" :key="i" class="flex gap-4">
				<img
					src="https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg"
					alt="Nasi Gudeg"
					class="w-24 h-24 object-cover rounded-xl shadow-sm" />

				<div class="flex-1 space-y-2">
					<div class="flex justify-between items-start">
						<div>
							<h2 class="font-semibold text-sm text-gray-800">
								Nasi Gudeg Jogja
							</h2>
							<Badge />
							<!-- Assuming Badge is a registered component -->
						</div>
						<span class="text-blue-600 font-bold">Rp28.000</span>
					</div>

					<!-- Quantity & Catatan -->
					<div
						class="flex flex-col md:flex-row mt-4 justify-between items-start md:items-center gap-3">
						<!-- Quantity Control -->
						<div class="flex items-center gap-2">
							<button
								class="w-8 h-8 flex items-center justify-center border border-blue-600 text-blue-600 rounded-xl bg-blue-200  hover:bg-blue-100 transition">
								<MinusIcon class="w-4 h-4" />
							</button>
							<input
								readonly
								type="number"
								value="1"
								min="1"
								class="w-14 px-3 py-1.5 text-sm flex justify-center text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
							<button
								class="w-8 h-8 flex items-center justify-center border border-blue-600 text-blue-600 rounded-xl bg-blue-200 hover:bg-blue-100 transition">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

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

            <hr class="border-gray-200 my-2" />

            <div>
                <div class="flex justify-between">
                    <div>
                        <span class="font-bold class text-sm text-gray-500">
                            Subtotal
                        </span>
                    </div>
                    <div>
                        <span class="text-sm">
                            Rp74.000
                        </span>
                    </div>
                </div>
                <div class="flex justify-between mt-2">
                    <div>
                        <span class="font-bold class text-sm text-gray-500">
                            Diskon
                        </span>
                    </div>
                    <div>
                        <span class="text-sm">
                            - Rp10.000
                        </span>
                    </div>
                </div>
                <div class="flex justify-between mt-2">
                    <div>
                        <span class="font-bold class text-sm text-gray-500">
                            Pajak (11%)
                        </span>
                    </div>
                    <div>
                        <span class="text-sm">
                            Rp7.000
                        </span>
                    </div>
                </div>
                <div class="flex justify-between mt-2">
                    <div>
                        <span class="font-bold class text-sm text-gray-500">
                            Total
                        </span>
                    </div>
                    <div>
                        <span class="text-sm">
                            Rp71.400
                        </span>
                    </div>
                </div>
            </div>

            <hr class="border-gray-200 my-2" />

            <div class="w-full">
                <NuxtLink to="/payment" class="bg-blue-200 rounded-xl w-full text-blue-700 font-bold py-2 flex justify-center gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
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
const paymentOptions = ref<string[]>(['Qris', 'Cash', 'Debit']);
</script>
