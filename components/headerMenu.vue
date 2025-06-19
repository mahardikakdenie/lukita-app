<template>
	<ul
		class="flex flex-nowrap gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 py-2 px-1 rounded-lg bg-white">
		<li v-for="(menu, i) in menus" :key="i" class="shrink-0">
			<button
                @click="onSetMenu(menu)"
				class="px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer"
				:class="
					currentMenu === menu
						? 'bg-blue-100 text-blue-700 border-blue-700 border'
						: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
				">
				{{ menu }}
			</button>
		</li>
	</ul>
</template>
<script setup lang="ts">
const props = defineProps<{
  menus: string[];
  currentMenu: string,
}>();

const emit = defineEmits(['on-set-menu']);

const onSetMenu = (menu: string): void => {
    emit('on-set-menu', menu);
}
</script>
