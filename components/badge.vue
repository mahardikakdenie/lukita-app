<template>
	<span
		class="text-xs text-yellow-500 font-medium bg-yellow-50 px-2 py-1 rounded-full"
		>{{ text }}</span
	>
</template>

<script setup lang="ts">
interface Props {
    text?:string;
}
const props = withDefaults(defineProps<Props>(), {
    text: '⭐ Andalan'
});
</script>
