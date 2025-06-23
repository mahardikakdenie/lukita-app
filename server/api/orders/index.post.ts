import { z } from 'zod';
import { defineEventHandler, readBody, createError } from 'h3';

const CartItemSchema = z.object({
	productId: z.number({ required_error: 'productId wajib diisi' }),
	quantity: z.number().min(1, { message: 'quantity minimal 1' }),
	name: z.string(),
	type: z.string(),
	price: z.string(),
	status: z.string(),
});

const CartSchema = z.array(CartItemSchema);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const result = CartSchema.safeParse(body);

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
	for (let index = 0; index < body.length; index++) {
		const element = body[index];
		await $fetch(`${config.public.apiBaseUrl}/orders`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: element,
		});
	}

	// Simpan pesanan ke database atau lakukan logika lain
	return {
		success: true,
		message: 'Pesanan berhasil dibuat',
	};
});
