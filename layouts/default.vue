<template>
	<div>
		<!-- Ganti 'headers' dengan 'Header' jika memang itu komponenmu -->		
		<Headers />
		<main class="max-w-screen-2xl mx-auto px-6 py-8">
			<NuxtPage />
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
