<template>
	<div>
		<!-- Ganti 'headers' dengan 'Header' jika memang itu komponenmu -->		
		<!-- <Headers /> -->
		<main class="mx-auto px-6 py-8 w-full">
			<div
				class="flex items-center justify-center min-h-screen bg-gray-50">
				<div class="text-center">
					<!-- <div
						class="w-12 h-12 border-4 border-t-indigo-600 border-gray-300 rounded-full animate-spin mx-auto"></div> -->
						<div>
							<img src="/loading.gif" alt="" srcset="">
						</div>
					<p class="mt-4 text-gray-600">Memuat layout...</p>
				</div>
			</div>
			<nuxt-page />
		</main>
	</div>
</template>

<script setup lang="ts">
useSeoMeta({
	title: 'Laukita - Mahardikakdenie Portofolio',
	ogTitle: 'Mahardikakdenie Portofolio',
	description:
		'This is Mahardikakdenie Portofolio, let me tell you all about it.',
	ogDescription: 'This is my amazing site, let me tell you all about it.',
	ogImage: 'https://your-domain.com/logo-2.png',
	twitterCard: 'summary_large_image',
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

* {
	font-family: 'Poppins', sans-serif;
}

</style>
