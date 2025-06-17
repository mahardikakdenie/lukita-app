<template>
	<div class="mt-4">
		<!-- Context -->
		<div class="grid sm:grid-cols-3 gap-2 grid-cols-1">
			<div
				v-for="i in 6"
				:key="i"
				class="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
				<img
					src="https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg"
					alt="Nasi Gudeg Jogja"
					class="h-48 w-full object-cover" />

				<div class="p-4">
					<!-- Title -->
					<h3 class="text-base font-semibold text-gray-800 mb-1">
						Nasi Gudeg Jogja
					</h3>

					<!-- Description -->
					<p class="text-sm text-gray-600 line-clamp-2">
						Gudeg Jogja gurih lengkap dengan Lorem ipsum dolor sit
						amet, consectetur adipisicing elit.
					</p>

					<!-- Price and Tag -->
					<div class="flex justify-between items-center mt-3">
						<span class="text-blue-600 font-bold">Rp28.000</span>
						<Badge />
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
</template>
<script setup lang="ts"></script>
