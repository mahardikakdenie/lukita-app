import { z } from 'zod'

const CartSchema = z.object({
  productId: z.number({
    required_error: 'productId wajib diisi',
    invalid_type_error: 'productId harus berupa number'
  }),
  quantity: z.number().min(1, { message: 'quantity minimal 1' })
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsed = CartSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: parsed.error.flatten()
    })
  }

  const cartData = parsed.data

  // Simulasi data baru
  const newCart = {
    id: Date.now().toString(),
    ...cartData
  }

  // Kirim ke fake API (tidak akan tersimpan)
  const res = await fetch('https://my-json-server.typicode.com/mahardikakdenie/db-catalog-json/carts', {
    method: 'POST', // fake only
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCart)
  })

  // Meskipun API ini tidak menyimpan, kita kembalikan seolah-olah sukses
  return newCart
})
