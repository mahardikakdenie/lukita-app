import type { Menu } from "~/components/HomeContent/index.vue";

export const useCarts = () => {
    const carts = ref<Menu[]>([]);

    const addToCart = (product: Menu) => {
        
        const existingItem = carts?.value?.find(cart => cart?.name === product.name);
        
        console.log("🚀 ~ addToCart ~ !existingItem:", !existingItem)
        if (!existingItem) {
            carts.value.push({ ...product, quantity: product?.quantity ? product?.quantity : 1 });
        }
    };


    return {
        carts,
        addToCart,
    };
}
