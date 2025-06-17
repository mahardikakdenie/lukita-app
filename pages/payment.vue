<template>
  <div class="flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
    <!-- Heading -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">
        Silakan Scan QR untuk Menyelesaikan Transaksi
      </h1>
      <p class="text-gray-600 mt-2 text-sm">
        Kode ini hanya berlaku untuk satu kali pembayaran
      </p>
    </div>

    <!-- QR Image -->
    <div class="bg-white p-4 rounded-xl shadow-md">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0ORK5AQ7Y8QHA2JU6LJeK9MQ42RBy7JYiwxnOBY-rnO9AigisyDM7Zy4DnqpTXh1fPU&usqp=CAU"
        alt="QR Code"
        class="w-64 h-64 object-contain"
      />
    </div>

    <!-- Info tambahan / tombol -->
    <div class="mt-6 text-center">
      <p class="text-gray-500 text-sm">
        Setelah pembayaran berhasil, halaman akan dialihkan otomatis.
      </p>
      <button
        class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
      >
        Cek Status Pembayaran
      </button>
    </div>
  </div>
</template>
