import { computed } from 'vue'

export interface OrderItem {
  price?: string | number
  quantity?: number
  [key: string]: any
}

export const useCartSummary = (orders: OrderItem[] | null | undefined) => {
  const subtotal = computed((): number => {
    if (!orders || !Array.isArray(orders)) return 0

    return orders.reduce((sum, order) => {
      const price = parseInt(order?.price as string) || 0
      const quantity = order?.quantity || 0
      return sum + price * quantity
    }, 0)
  })

  const taxCalculation = computed(() => {
    return subtotal.value * (11 / 100)
  })

  const totalPrice = computed(() => {
    return subtotal.value - taxCalculation.value
  })

  // Format ke Rupiah (opsional)
  const formattedSubtotal = computed(() =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(subtotal.value)
  )

  const formattedTax = computed(() =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(taxCalculation.value)
  )

  const formattedTotalPrice = computed(() =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(totalPrice.value)
  )

  return {
    subtotal,
    taxCalculation,
    totalPrice,
    formattedSubtotal,
    formattedTax,
    formattedTotalPrice,
  }
}
