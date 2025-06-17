<template>
    <div class="">
        <div class="p-4 shadow-xl rounded-2xl">
            <div class="flex justify-between">
                <div>
                    <div>
                        <span class="font-bold">
                            Pesanan saat ini
                        </span>
                    </div>
                    <div>
                        <small>
                            Lihat antrian pesanan yang sedang di proses di dapur.Estimasi waktu di tampilkan agar anda bisa menunggu dengan nyaman
                        </small>
                    </div>
                </div>
                <div class="flex flex-col justify-center">
                    <button class="bg-blue-200 font-bold border-blue-700 text-blue-700 rounded-2xl px-5 py-2 cursor-pointer hover:bg-blue-300">
                        Buat Pesanan Baru
                    </button>
                </div>
            </div>

            <hr class="my-2 border-gray-200" />

            <div class="grid grid-cols-4 gap-2">
                <div v-for="i in 8" :key=i class="p-4 border"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
