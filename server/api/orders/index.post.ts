import { z } from 'zod';
import { defineEventHandler, readBody, createError } from 'h3';

const CartItemSchema = z.object({
	type_discount: z.string(),
	discount_price: z.string(),
	total_price: z.string(),
	status: z.string(),
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const result = CartItemSchema.safeParse(body);

	if (!result.success) {
		// Ubah error menjadi struktur yang lebih mudah dibaca
		const errors: Record<string, string[]> = {};

		result.error.errors.forEach((err) => {
			const path = err.path.join('.');
			if (!errors[path]) {
				errors[path] = [];
			}
			errors[path].push(err.message);
		});

		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			data: {
				message: 'Validasi gagal',
				errors,
			},
		});
	}

	const config = useRuntimeConfig();
  await $fetch(`${config.public.apiBaseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  });

	// Simpan pesanan ke database atau lakukan logika lain
	return {
		success: true,
		message: 'Pesanan berhasil dibuat',
	};
});
