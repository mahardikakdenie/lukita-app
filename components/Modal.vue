<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
  >
    <!-- Modal Card -->
    <div
      class="relative w-full max-w-2xl max-h-[90vh] flex flex-col p-6 mx-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
    >
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Header -->
      <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>

      <!-- Body (Scrollable) -->
      <div class="flex-1 overflow-y-auto pr-2 space-y-4">
        <slot>
          <p class="text-sm text-gray-600">
            Ini adalah modal dengan efek blur background. Jika konten terlalu panjang, maka akan otomatis muncul scrollbar.
          </p>
          <!-- Contoh tambahan konten untuk uji coba scroll -->
          <div v-for="n in 20" :key="n" class="py-1">
            Baris dummy ke-{{ n }}
          </div>
        </slot>
      </div>

      <!-- Footer -->
      <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
        <button
          @click="close"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Tutup
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
         <div v-if="isLoading" class="loader"></div>
          <span v-else>Konfirmasi</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
	isOpen: boolean;
	title?: string;
    isLoading?: false;
}>();

const emit = defineEmits<{
	(e: 'on-close', value: boolean): void;
	(e: 'confirm'): void;
}>();

const close = () => {
	emit('on-close', false);
};
</script>
