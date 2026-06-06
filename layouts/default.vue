<template>
	<div>
		<main class="mx-auto w-full px-6 py-8">
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
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

* {
	font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
