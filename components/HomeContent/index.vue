<template>
	<div class="mt-4">
		<!-- Context -->
		<div class="grid sm:grid-cols-3 gap-2 grid-cols-1">
			<div
				v-for="(menu, i) in menus"
				:key="i"
				class="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
            >
				<ImageLoader :image="menu.image" />
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
						class="mt-4 w-full py-2 flex justify-center gap-1 text-sm bg-blue-100 text-blue-600 font-semibold rounded-lg border border-blue-300 hover:bg-blue-200 transition cursor-pointer"
                    >
						Tambahkan
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
					</button>
				</div>
			</div>
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
const menus = ref<Menu[]>([
	{
		image: 'https://asset.kompas.com/crops/RKyE9n689Ni8jPjt-iO_1jFuV0w=/203x225:749x589/1200x800/data/photo/2022/12/09/6392a51cdec7d.jpg',
		name: 'Nasi Gudeg Jogja',
		description:
			'Gudeg Jogja gurih lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
		price: '28.000',
		category: 'hidangan-utama',
		type: '⭐ Andalan',
        quantity: 0,
	},
	{
        image: 'https://sanex.co.id/wp-content/uploads/2024/11/2734.jpg',
		name: 'Nasi Gudeg Goreng',
		description:
        'Gudeg Goreng gurih lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
		price: '28.000',
		category: 'hidangan-utama',
		type: '⭐ Andalan',
        quantity: 0,
	},
	{
        image: 'https://cdn1-production-images-kly.akamaized.net/qre6SO9lOT9aiWSDufQLxZaOj_I=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3117261/original/048100200_1588325749-030607000_1467613172-rawon-setan.jpg',
		name: 'Rawon Daging Surabaya',
		description:
        'Rawon Daging Surabaya lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
		price: '28.000',
		category: 'hidangan-utama',
		type: '⭐ Andalan',
        quantity: 0,
	},
	{
        image: 'https://buckets.sasa.co.id/v1/AUTH_Assets/Assets/p/website/medias/page_medias/resep_tongseng_solo.jpg',
		name: 'Tongseng Kambing Solo',
		description:
        'Tongseng Kambing Solo lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
		price: '28.000',
		category: 'hidangan-utama',
		type: '⭐ Andalan',
        quantity: 0,
	},
	{
        image: 'https://imgx.sonora.id/crop/0x0:0x0/x/photo/2023/03/29/64225543cbfdejpg-20230329033353.jpg',
		name: 'Empal Gebuk Cirebon',
		description:
        'Empal Gebuk Cirebon lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
		price: '28.000',
		category: 'hidangan-utama',
		type: '⭐ Andalan',
        quantity: 0,
	},
	{
        image: 'https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/chicken-&-other-poultry-dishes/pecel-madiun/main-header.jpg',
		name: 'Pecel Sayur Madiun',
		description:
        'Pecel Sayur Madiun lengkap dengan Lorem ipsum dolor sitamet, consectetur adipisicing elit.',
		price: '28.000',
		category: 'hidangan-utama',
		type: '⭐ Andalan',
        quantity: 0,
	},
]);


const isLoading = ref<boolean>(false);
</script>
