// server/routes/products.post.ts
export default defineEventHandler(async (event) => {
  // Ambil body dari request
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body is required',
    });
  }

  try {
    const products = [
        {
            "image": "https://ik.imagekit.io/tvlk/blog/2024/02/shutterstock_2290658291.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2",
            "name": "Dessert Box Lotus Biscoff",
            "description": "etiap gigitan menghadirkan kombinasi tekstur yang begitu memikat, dari kelembutan creaminess hingga renyahnya biskuit. Tertarik mencobanya?",
            "price": "18000",
            "category": "pencuci-mulut",
            "type": "⭐ Andalan",
            "quantity": 0
        },
        {
            "image": 'https://ik.imagekit.io/tvlk/blog/2024/02/shutterstock_2094697135.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
            "name": "Semolina Pudding",
            "description": "Hidangan puding yang memikat ini terbuat dari campuran tepung semolina, yang merupakan tepung halus yang dihasilkan dari gandum durum, dan susu atau air.",
            "price": "10000",
            "category": "pencuci-mulut",
            "type": "⭐ Andalan",
            "quantity": 0
        },
        {
            "image": 'https://ik.imagekit.io/tvlk/blog/2024/02/shutterstock_158416475.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
            "name": "Apple Pie",
            "description": "Dengan lapisan kulit pie yang renyah dan isian apel yang manis dengan sentuhan rempah yang khas, setiap suapan Apple Pie membawa kenikmatan yang tak terlupakan.",
            "price": "18000",
            "category": "pencuci-mulut",
            "type": "⭐ Andalan",
            "quantity": 0
        },
        {
            "image": 'https://ik.imagekit.io/tvlk/blog/2024/02/shutterstock_2191159461.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
            "name": "Klappertaart",
            "description": "Klappertaart merupakan paduan antara kelapa, kental manis, dan remah-remah roti.",
            "price": "18000",
            "category": "pencuci-mulut",
            "type": "⭐ Andalan",
            "quantity": 0
        },
        {
            "image": 'https://ik.imagekit.io/tvlk/blog/2024/02/shutterstock_618817076.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
            "name": "Banoffee Pie",
            "description": "Banoffee pie adalah sajian pencuci mulut yang menakjubkan, dengan kombinasi yang luar biasa dari pisang, karamel, dan krim segar yang disajikan di atas crust yang renyah.",
            "price": "18000",
            "category": "pencuci-mulut",
            "type": "⭐ Andalan",
            "quantity": 0
        },
        {
            "image": 'https://ik.imagekit.io/tvlk/blog/2024/02/shutterstock_271030991.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2',
            "name": "Pretzel",
            "description": "Pretzel yang renyah dengan garam di atasnya adalah pilihan alternatif yang menarik bagi mereka yang menginginkan sesuatu yang berbeda setelah makan.",
            "price": "18000",
            "category": "pencuci-mulut",
            "type": "⭐ Andalan",
            "quantity": 0
        },
    ];
    const config = useRuntimeConfig();

    // Kirim POST request ke external API
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        // for temporary this code is comment
        // const response = await $fetch(`${config.public.apiBaseUrl}/products`, {
        //     method: 'POST',
        //     body: element,
        // });
    }

    // Kembalikan hasil ke client
    return {
      message: 'Produk berhasil ditambahkan!',
    //   data: response,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal menambahkan produk ke server',
      data: error,
    });
  }
});
