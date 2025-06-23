import type { Menu } from "~/components/HomeContent/index.vue";

export interface Order {
    id: string;
    createdAt: string;
    image: string;
    name: string;
    type: string;
    price: string;
    status: string;
    productId: string;
    quantity: number;
    total_price?: string;
    discount_price?: number;
    products?: Menu[],
    type_discount: string;
}
