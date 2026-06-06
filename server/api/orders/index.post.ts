import { z } from 'zod';
import { defineEventHandler, readBody, createError } from 'h3';

const CustomerProductSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().optional(),
	price: z.string().optional(),
	quantity: z.number().optional(),
	image: z.string().optional(),
	type: z.string().optional(),
});

const OrderSchema = z.object({
	total_price: z.string({ required_error: 'total_price wajib diisi' }),
	status: z.string({ required_error: 'status wajib diisi' }),
	type_discount: z.string().optional().default('none'),
	discount_price: z.string().optional().default('0'),
	// Customer self-order fields
	source: z.enum(['cashier', 'customer']).optional().default('cashier'),
	table_number: z.string().optional(),
	customer_name: z.string().optional(),
	note: z.string().optional(),
	products: z.array(CustomerProductSchema).optional(),
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const result = OrderSchema.safeParse(body);

	if (!result.success) {
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
		body: result.data,
	});

	return {
		success: true,
		message: 'Pesanan berhasil dibuat',
	};
});
