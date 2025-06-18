export default defineEventHandler(async (event) => {
    const { type } = getQuery(event)
    console.log("🚀 ~ defineEventHandler ~ type:", type)
  const res = await $fetch('https://my-json-server.typicode.com/mahardikakdenie/db-catalog-json/products')
  return res
})
