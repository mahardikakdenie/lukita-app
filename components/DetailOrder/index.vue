<template>
  <div class="w-full">
    <div class="shadow-lg rounded-2xl py-6 px-6 bg-white space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-xl font-bold text-gray-800">Detail Pesanan</h1>
        <hr class="mt-2 border-gray-200" />
      </div>

      <!-- Metode Pembayaran -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</label>
        <div class="flex flex-wrap gap-4">
          <label v-for="(option, i) in paymentOptions" :key="i" class="flex items-center gap-2 text-sm text-gray-700">
            <input
              v-model="selectOption"
              type="radio"
              name="payment"
              :value="option"
              class="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span class="text-sm">{{ option }}</span>
          </label>
        </div>
      </div>

      <!-- Voucher Diskon -->
      <div>
        <label class="text-sm font-medium text-gray-700 block mb-2">Voucher Diskon</label>
        <div class="flex gap-3">
          <input
            v-model="voucherInput"
            type="text"
            placeholder="Masukkan kode voucher"
            class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="fetchDiscount"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="isVoucherLoading"
          >
            <div v-if="isVoucherLoading" class="loader"></div>
            <span v-else>Pakai</span>
          </button>
        </div>
      </div>

      <!-- Badge Voucher Aktif -->
      <div v-if="voucherActive" class="px-4 py-2 bg-green-50 border-l-4 border-green-500 rounded">
        <div class="flex items-center justify-between">
          <p class="text-green-700 font-medium">
            {{ voucherActive.code }} - 
            <span v-if="voucherActive.type === 'percentage'">{{ voucherActive.discount }}%</span>
            <span v-else>Rp{{ formatToRupiah(voucherActive.discount) }}</span> OFF
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <!-- Item Pesanan -->
      <div v-if="orders.length > 0" class="space-y-4">
        <div v-for="(order, i) in orders" :key="i" class="flex gap-4 border-b border-b-gray-300 pb-4 last:border-b-0">
          <ImageLoader :image="order.image" customClass="h-24 w-24 rounded-xl object-cover" />
          <div class="flex-1 space-y-2">
            <div class="flex justify-between items-start">
              <h2 class="font-semibold text-sm text-gray-800">{{ order.name }}</h2>
              <span class="text-blue-600 font-bold text-sm">{{ formatToRupiah(order.price) }}</span>
            </div>
            <Badge v-if="order.type" :text="order.type" status="info" />

            <!-- Quantity Control -->
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center gap-2">
                <button
                  class="w-8 h-8 flex items-center justify-center border border-blue-600 text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                  @click="reduceQuantity(order)"
                >
                  <MinusIcon class="w-4 h-4" />
                </button>
                <input
                  :value="order.quantity"
                  readonly
                  class="w-14 px-2 text-sm text-center border border-gray-300 rounded-md"
                />
                <button
                  class="w-8 h-8 flex items-center justify-center border border-blue-600 text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                  @click="increaseQuantity(order)"
                >
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>
              <button class="text-xs text-blue-700 underline hover:text-blue-900 transition">Tambahkan Catatan</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pesanan Kosong -->
      <div v-else class="py-6 text-center">
        <ImageLoader image="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"  customClass="mx-auto w-16 h-16" />
        <p class="mt-3 text-gray-500">Belum ada pesanan</p>
      </div>

      <!-- Ringkasan Harga -->
      <div class="space-y-3 pt-2">
        <div class="flex justify-between">
          <span class="text-sm text-gray-500">Subtotal</span>
          <span class="text-sm">{{ formatToRupiah(subtotal.toString()) }}</span>
        </div>

        <div v-if="voucherActive" class="flex justify-between text-green-600 font-medium">
          <span>Diskon</span>
          <span>- {{ voucherActive.type === 'percentage' ? `${voucherActive.discount}%` : formatToRupiah(discountPrice.toString()) }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-sm text-gray-500">Pajak (11%)</span>
          <span class="text-sm">{{ formatToRupiah(taxCalculation.toString()) }}</span>
        </div>

        <div class="flex justify-between font-bold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>{{ formatToRupiah(totalPrice.toString()) }}</span>
        </div>
      </div>

      <!-- Tombol Bayar -->
      <div class="pt-2">
        <NuxtLink
          :to="selectOption === 'Tunai' ? '/' : '/payment'"
          class="flex items-center justify-center gap-2 w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-3 rounded-xl transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5 0H21a.75.75 0 0 0 .75-.75v-.75m0 0H3.75M3.75 12H3v-.25A.75.75 0 0 1 3.75 11.25h16.5a.75.75 0 0 1 .75.75v.25m-18 0h18M5.625 7.5h12.75c.621 0 1.125.504 1.125 1.125v1.125a3.375 3.375 0 0 1-3.375 3.375H12a3.375 3.375 0 0 1-3.375-3.375V8.625A1.125 1.125 0 0 1 9.75 7.5h4.5z" />
          </svg>
          Selesaikan Pembayaran
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface Voucher {
    id: string;
    code: string,
    discount: string,
    type: string;
}

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { NuxtLink } from '#components';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';
import type { Menu } from '../HomeContent/index.vue';
import ImageLoader from '../imageLoader.vue';

const props = defineProps<{
	orders: Menu[];
}>();
const emits = defineEmits(['remove-cart']);
const isVoucherLoading = ref<boolean>(false);
const voucherInput = ref<string>('');
const voucherActive = ref<Voucher | null>(null);
const { 
    subtotal,
    taxCalculation,
    totalPrice,
} = useCartSummary(props.orders);

const discountPrice = computed(() => {
  if (!voucherActive.value) return 0;

  const { type, discount } = voucherActive.value;
  if (type === 'percentage') {
    const percentage = parseInt(discount) / 100;
    return subtotal.value * percentage;
  } else if (type === 'fixed_price') {
    return parseFloat(discount || '0');
  }

  return 0;
});


const fetchDiscount = async () => {
  if (!voucherInput.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Input kosong',
      text: 'Silakan masukkan kode voucher terlebih dahulu.',
      confirmButtonText: 'Oke'
    });
    return;
  }

  isVoucherLoading.value = true;

  try {
    const vouchers = await $fetch<Voucher[]>('/api/voucher', {
      method: 'GET'
    });

    const voucher = vouchers?.find((v: Voucher) => v.code === voucherInput.value);

    if (voucher) {
      voucherActive.value = voucher;

      // Toast Notification
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Voucher tersedia dan siap digunakan!',
        text: `Diskon: ${voucher.discount}${voucher.type === 'percentage' ? '%' : ' IDR'}`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Voucher Tidak Valid',
        text: 'Kami tidak menemukan voucher dengan kode tersebut.',
        confirmButtonText: 'Coba Lagi'
      });
    }

  } catch (err) {
    console.error("Error fetching voucher:", err);

    Swal.fire({
      icon: 'error',
      title: 'Gagal Memproses Voucher',
      text: 'Terjadi kesalahan saat memeriksa voucher. Silakan coba lagi nanti.',
      confirmButtonText: 'Tutup'
    });
  } finally {
    isVoucherLoading.value = false;
  }
}

const paymentOptions = ref<string[]>(['Tunai', 'Qris']);
const selectOption = ref<string>('Tunai');
const increaseQuantity = (order: Menu) => {
	if (order.quantity) {
		order.quantity++;
	}
};
const reduceQuantity = (order: Menu) => {
	if (order.quantity) {
		order.quantity--;

		if (order?.quantity === 0) {
			emits('remove-cart', order);
		}
	}
};
</script>
