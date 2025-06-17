<template>
	<div>
		<!-- Header -->
		<header class="bg-white shadow py-4">
			<div
				class="max-w-screen-2xl mx-auto px-6 flex justify-between items-center">
				<!-- Logo & Brand -->
				<div class="flex items-center gap-3">
					<img src="/logo-2.png" alt="logo" class="h-10 w-auto" />
					<span class="text-2xl font-bold text-blue-800"
						>Laukita</span
					>
				</div>

				<!-- Navigation Button -->
				<nav>
					<button
						class="border border-blue-500 text-sm px-5 py-2 font-medium text-blue-500 rounded-xl hover:bg-blue-50 transition">
						Panggil Pelayan
					</button>
				</nav>
			</div>
		</header>

		<!-- Content -->
		<main class="max-w-screen-2xl mx-auto px-6 py-8">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Kategori Menu -->
				<div>
					<ul class="flex flex-wrap gap-4 mb-4">
						<li v-for="(menu, i) in menus" :key="i">
							<button
								:class="{
									'bg-blue-100 text-blue-700':
										currentMenu === menu,
									'bg-white border-blue-700 border text-blue-700 ':
										currentMenu !== menu,
								}"
								class="px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-200 transition">
								{{ menu }}
							</button>
						</li>
					</ul>
					<hr class="border-gray-300" />
				</div>

				<!-- Placeholder Area -->
				<div class="text-center text-gray-400 italic">
					<p>Pilih kategori untuk melihat menu...</p>
				</div>
			</div>
		</main>
	</div>
</template>

<script lang="ts" setup>
const menus = ref<String[]>([
	'Hidangan Utama',
	'Hidangan Pembuka',
	'Minuman',
]);

const currentMenu = ref<String>('Hidangan Utama');
</script>
