// server/api/catalog.ts
export default defineEventHandler(async () => {
  const res = await $fetch('https://my-json-server.typicode.com/mahardikakdenie/db-catalog-json/products')
  return res
})
