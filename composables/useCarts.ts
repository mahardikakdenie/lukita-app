import type { Menu } from "~/components/HomeContent/index.vue";

export const useCarts = () => {
    const carts = ref<Menu[]>([]);

    const addToCart = async (product: Menu) => {
        
        const existingItem = carts?.value?.find(cart => cart?.name === product.name);
        
        if (!existingItem) {
            carts.value.push({ ...product, quantity: 1 });
        }
    };


    return {
        carts,
        addToCart,
    };
}
