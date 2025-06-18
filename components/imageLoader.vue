<template>
	<div class="relative">
		<!-- Loader -->
		<div
			v-if="isLoading"
			class="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded">
			<span class="text-gray-400 text-sm">Loading image...</span>
		</div>

		<!-- Image -->
		<img
			v-if="image"
			:src="image"
			alt="image-alt"
			class="`object-cover transition-opacity duration-300 rounded-2xl`"
			:class="[{ 'opacity-0': isLoading }, customClass]"
			@load="isLoading = false"
			@error="isLoading = false" />
	</div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
	image: string;
	customClass?: string;
}>(), {
	customClass: 'h-48 w-full',
});

const isLoading = ref<boolean>(false);
</script>
