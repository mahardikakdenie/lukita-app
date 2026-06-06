# IndexedDB Local Sync and Orders Page Plan

## Context
The user wants to use **IndexedDB** as a temporary local database to avoid API limitations and allow instant local synchronization between the customer table ordering page (`/user/[table_number]`) and the cashier POS (`/`). They also want an **Orders** page/menu, and navigation from the POS to this page.

Since IndexedDB is client-side, the frontend components will read/write directly to IndexedDB when running in the browser, bypassing the server APIs for orders. Since both the cashier and customer run under the same origin (`localhost:3002`), they share the same IndexedDB store.

## Implementation Details

### 1. IndexedDB Helper Composable: `composables/useLocalDB.ts`
We will create a helper composable that uses `idb-keyval` (already installed) or native IndexedDB to manage orders:
- `loadOrders()`: Fetch array of orders.
- `addOrder(order)`: Add new order with generated ID, timestamp, and default pending status.
- `updateOrderStatus(orderId, status)`: Find order and update its status.
- `clearAllOrders()`: Reset store.

### 2. Orders List Page: `pages/orders.vue`
A new page to view all orders (cashier POS orders and customer table orders).
- Tabs for statuses: "Pending", "In Progress", "Completed", "Cancelled".
- Shows Table Number, Customer Name, Note, items list, total price.
- Action buttons: "Accept" (to progress), "Complete", "Cancel".
- A button to go back to POS page.

### 3. POS Cashier Navigation & Integration: `components/OddoTheme/Index.vue`
- Add navigation button (e.g. "Lihat Semua Pesanan" or "Daftar Pesanan" icon/button) in the sidebar or top bar of POS.
- Redirect to `/orders`.
- Update POS to save its own cashier orders to IndexedDB using `addOrder()`.
- Update POS incoming orders section to read from IndexedDB `loadOrders()` instead of `/api/orders` polling.
- Update POS status changes to use `updateOrderStatus()`.

### 4. Customer Page Integration: `pages/user/[table_number].vue`
- Update ordering action to write directly to IndexedDB `addOrder()` instead of POSTing to `/api/orders`.

## Verification Flow
1. Open `/user/3` in Tab A. Add item and click "Kirim Pesanan".
2. Open `/` in Tab B. Click "Incoming Orders" icon. The order from Table 3 is immediately listed.
3. Accept the order in Tab B.
4. Go to `/orders` page (via navigation button in POS). Verify the order is listed under "In Progress".
5. Complete the order. Verify it moves to "Completed".
