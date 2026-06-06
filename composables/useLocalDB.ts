import { get, set, update } from 'idb-keyval';
import type { Order } from '~/types/interfaces/OrderInterface';

const STORE_KEY = 'orders';

export const useLocalDB = () => {
    async function loadOrders(): Promise<Order[]> {
        const orders = await get<Order[]>(STORE_KEY);
        return orders || [];
    }

    async function addOrder(order: Omit<Order, 'id' | 'createdAt'>) {
        const orders = await loadOrders();
        const newOrder: Order = {
            ...order,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: order.status || 'pending',
        };
        orders.push(newOrder);
        await set(STORE_KEY, orders);
        return newOrder;
    }

    async function updateOrderStatus(orderId: string, status: string) {
        await update<Order[]>(STORE_KEY, (oldOrders) => {
            const orders = oldOrders || [];
            const index = orders.findIndex(o => o.id === orderId);
            if (index !== -1) {
                orders[index].status = status;
            }
            return [...orders];
        });
    }

    async function clearAllOrders() {
        await set(STORE_KEY, []);
    }

    return {
        loadOrders,
        addOrder,
        updateOrderStatus,
        clearAllOrders
    };
};
