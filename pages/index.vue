<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Kategori Menu -->
			<div class="sm:col-span-2">
				<ul
					class="flex flex-nowrap gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 py-2 px-1 rounded-lg bg-white">
					<li v-for="(menu, i) in menus" :key="i" class="shrink-0">
						<button
							@click="currentMenu = menu"
							class="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap"
							:class="
								currentMenu === menu
									? 'bg-blue-100 text-blue-700 border-blue-700 border'
									: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
							">
							{{ menu }}
						</button>
					</li>
				</ul>
				<hr class="border-gray-200" />

				<div class="mt-4">
					<!-- Context -->
					<div class="grid sm:grid-cols-3 gap-2 grid-cols-1">
						<div
							v-for="i in 3"
							:key="i"
							class="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
							<img
								src="https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg"
								alt="Nasi Gudeg Jogja"
								class="h-48 w-full object-cover" />

							<div class="p-4">
								<!-- Title -->
								<h3
									class="text-base font-semibold text-gray-800 mb-1">
									Nasi Gudeg Jogja
								</h3>

								<!-- Description -->
								<p class="text-sm text-gray-600 line-clamp-2">
									Gudeg Jogja gurih lengkap dengan Lorem ipsum
									dolor sit amet, consectetur adipisicing
									elit.
								</p>

								<!-- Price and Tag -->
								<div
									class="flex justify-between items-center mt-3">
									<span class="text-blue-600 font-bold"
										>Rp28.000</span
									>
									<span
										class="text-sm text-yellow-500 font-medium bg-yellow-50 px-2 py-1 rounded-full"
										>⭐ Andalan</span
									>
								</div>

								<!-- Button -->
								<button
									class="mt-4 w-full py-2 bg-blue-100 text-blue-600 font-semibold rounded-lg border border-blue-300 hover:bg-blue-200 transition cursor-pointer">
									Tambahkan
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Detail Pesanan -->
			<div class="w-full">
				<div class="shadow-lg rounded-xl py-4 px-5 bg-white space-y-4">
					<!-- Header -->
					<div class="">
						<h1 class="text-lg font-semibold text-gray-800">
							Detail Pesanan
						</h1>
					</div>
					<hr class="border-gray-200" />

					<!-- Info -->
					<div class="text-sm text-gray-600">
						<span class="block font-bold text-gray-700 text-sm"
							>#111 - Customer 46</span
						>
						<span class="text-xs text-gray-400">Pesanan aktif</span>
					</div>

					<!-- Payment Methods -->
					<div>
						<span
							class="block text-sm font-medium text-gray-700 mb-2">
							Metode Pembayaran
						</span>

						<div class="flex flex-row gap-2">
							<label
								v-for="(option, i) in paymentOptions"
								:key="i"
								class="inline-flex items-center gap-2">
								<input
									type="radio"
									:name="option"
									:value="option"
									class="text-blue-600 focus:ring-blue-500" />
								<small class="font-medium">{{ option }}</small>
							</label>
						</div>
					</div>

					<!-- Voucher Digital -->
					<div class="space-y-2">
						<div>
							<small class="text-gray-700 font-semibold text-sm"
								>Voucher Diskon</small
							>
						</div>
						<div class="grid grid-cols-3 gap-3 items-center">
							<div class="col-span-2">
								<input
									type="text"
									placeholder="Masukkan kode voucher"
									class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
							</div>
							<div>
								<button
									class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition">
									Pakai
								</button>
							</div>
						</div>
					</div>
					<hr class="border-gray-200 mt-5" />
					<div>
						<div class="grid grid-cols-3 gap-2">
							<div>
								<img src="https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg" class="rounded-xl" alt="" srcset="">
							</div>

							<div class="col-span-2">
								<div class="flex justify-between">
									<div>
										<span class="font-semibold text-sm">Nasi Gudeg Jogja</span>
										<br>
										<span
										class="text-sm text-yellow-500 font-medium bg-yellow-50 px-2 py-1 rounded-full"
										>⭐ Andalan</span
									>
									</div>

									<div>
										<span class="text-blue-600 font-bold"
										>Rp28.000</span
									>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const menus = ref<string[]>(['Hidangan Utama', 'Hidangan Pembuka', 'Minuman']);

const currentMenu = ref<string>('Hidangan Utama');

const paymentOptions = ref<string[]>(['Qris', 'Cash', 'Debit']);
</script>
