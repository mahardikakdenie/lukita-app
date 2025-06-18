<template>
	<div class="relative w-full h-48">
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
			alt="Nasi Gudeg Jogja"
			class="h-48 w-full object-cover transition-opacity duration-300"
			:class="{ 'opacity-0': isLoading }"
			@load="isLoading = false"
			@error="isLoading = false" />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	image: string;
}>();

const isLoading = ref<boolean>(false);
</script>
