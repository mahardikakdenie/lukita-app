<template>
	<span
        :class="[statusColor]"
		class="text-xs font-mediumpx-2 py-1 rounded-full px-2"
		>{{ text }}</span
	>
</template>

<script setup lang="ts">
interface Props {
    text?:string;
    status?: string;
}
const props = withDefaults(defineProps<Props>(), {
    text: '⭐ Andalan',
    status: 'warning',
});

const statusColor = computed((): string => {
    let classColor = 'bg-yellow-50 text-yellow-500';
    switch (props.status) {
        case 'danger':
            classColor = 'text-red-500 bg-red-50';
            break;
    }

    return classColor;
});
</script>
