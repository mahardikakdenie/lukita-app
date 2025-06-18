<template>
	<div class="mt-4">
		<!-- Context -->
		<div class="grid sm:grid-cols-3 gap-2 grid-cols-1">
			<div
				v-for="(menu, i) in menus"
				:key="i"
				class="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
				  <div class="relative w-full h-48">
                        <!-- Loader -->
                        <div
                            v-if="isLoading"
                            class="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded"
                        >
                            <span class="text-gray-400 text-sm">Loading image...</span>
                        </div>

                        <!-- Image -->
                        <img
                            v-if="menu.image"
                            :src="menu.image"
                            alt="Nasi Gudeg Jogja"
                            class="h-48 w-full object-cover transition-opacity duration-300"
                            :class="{ 'opacity-0': isLoading }"
                            @load="isLoading = false"
                            @error="isLoading = false"
                        />
                    </div>

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
<script setup lang="ts">
interface Menu {
    image: string;
    name: string;
    description: string,
    price: string,
    category: string,
    type: string,
}
const menus = ref<Menu[]>([
    {
        image: 'https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg',
        name: 'Nasi Gudeg Jogja',
        description: 'Gudeg Jogja gurih lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
        price: '28.000',
        category: 'hidangan-utama',
        type: '⭐ Andalan',
    },
    {
        image: 'https://sanex.co.id/wp-content/uploads/2024/11/2734.jpg',
        name: 'Nasi Gudeg Goreng',
        description: 'Gudeg Goreng gurih lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
        price: '28.000',
        category: 'hidangan-utama',
        type: '⭐ Andalan',
    },
    {
        image: 'https://cdn1-production-images-kly.akamaized.net/qre6SO9lOT9aiWSDufQLxZaOj_I=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3117261/original/048100200_1588325749-030607000_1467613172-rawon-setan.jpg',
        name: 'Rawon Daging Surabaya',
        description: 'Rawon Daging Surabaya lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
        price: '28.000',
        category: 'hidangan-utama',
        type: '⭐ Andalan',
    },
    {
        image: 'https://buckets.sasa.co.id/v1/AUTH_Assets/Assets/p/website/medias/page_medias/resep_tongseng_solo.jpg',
        name: 'Tongseng Kambing Solo',
        description: 'Tongseng Kambing Solo lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
        price: '28.000',
        category: 'hidangan-utama',
        type: '⭐ Andalan',
    },
    {
        image: 'https://imgx.sonora.id/crop/0x0:0x0/x/photo/2023/03/29/64225543cbfdejpg-20230329033353.jpg',
        name: 'Empal Gebuk Cirebon',
        description: 'Empal Gebuk Cirebon lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
        price: '28.000',
        category: 'hidangan-utama',
        type: '⭐ Andalan',
    },
    {
        image: 'https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/chicken-&-other-poultry-dishes/pecel-madiun/main-header.jpg',
        name: 'Pecel Sayur Madiun',
        description: 'Pecel Sayur Madiun lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
        price: '28.000',
        category: 'hidangan-utama',
        type: '⭐ Andalan',
    },
]);

const isLoading = ref<boolean>(false);
</script>
