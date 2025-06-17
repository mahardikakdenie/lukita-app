<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Kategori Menu -->
			<div class="sm:col-span-2">
				<HeaderMenu
					:menus="menus"
					:current-menu="currentMenu"
					@on-set-menu="(menu) => (currentMenu = menu)" />
				<hr class="border-gray-200" />

				<HomeContent />
			</div>

			<!-- Detail Pesanan -->
			<div class="w-full">
				<div class="shadow-lg rounded-2xl py-5 px-6 bg-white space-y-5">
					<!-- Header -->
					<div>
						<h1 class="text-lg font-bold text-gray-800">
							Detail Pesanan
						</h1>
						<hr class="mt-2 border-gray-200" />
					</div>

					<!-- Info Pesanan -->
					<div class="text-sm text-gray-600 space-y-1">
						<p class="font-semibold text-gray-700">
							#111 - Customer 46
						</p>
						<p
							class="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full w-max">
							Pesanan aktif
						</p>
					</div>

					<!-- Metode Pembayaran -->
					<div>
						<label
							class="block text-sm font-medium text-gray-700 mb-2"
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
						<label
							class="text-sm font-medium text-gray-700 block mb-2"
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
					<div class="flex gap-4">
						<img
							src="https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg"
							alt="Nasi Gudeg"
							class="w-24 h-24 object-cover rounded-xl shadow-sm" />

						<div class="flex-1 space-y-2">
							<div class="flex justify-between items-start">
								<div>
									<h2
										class="font-semibold text-sm text-gray-800">
										Nasi Gudeg Jogja
									</h2>
									<Badge />
									<!-- Assuming Badge is a registered component -->
								</div>
								<span class="text-blue-600 font-bold"
									>Rp28.000</span
								>
							</div>

							<!-- Quantity & Catatan -->
							<div
								class="flex flex-col md:flex-row mt-4 justify-between items-start md:items-center gap-3">
								<!-- Quantity Control -->
								<div class="flex items-center gap-2">
									<button
										class="w-8 h-8 flex items-center justify-center border border-blue-600 text-blue-600 rounded-full hover:bg-blue-100 transition">
										<MinusIcon class="w-4 h-4" />
									</button>
									<input
										readonly
										type="number"
										value="1"
										min="1"
										class="w-14 px-3 py-1.5 text-sm flex justify-center text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
									<button
										class="w-8 h-8 flex items-center justify-center border border-blue-600 text-blue-600 rounded-full hover:bg-blue-100 transition">
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
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';
const menus = ref<string[]>([
	'Hidangan Utama',
	'Hidangan Pembuka',
	'Minuman',
	'Pencuci Mulut',
	'Paket Promo',
	'Menu Musiman',
]);
const currentMenu = ref<string>('Hidangan Utama');
const paymentOptions = ref<string[]>(['Qris', 'Cash', 'Debit']);
</script>
