export default defineEventHandler(async () => {
  const carts = await $fetch('https://my-json-server.typicode.com/mahardikakdenie/db-catalog-json/carts');
  return carts;
});
