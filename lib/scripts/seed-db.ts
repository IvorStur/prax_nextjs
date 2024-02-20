import { createDB } from '../../src/lib/db'
import { faker } from '@faker-js/faker'

async function seedDB() {
  console.log('Seeding database...')

  const db = createDB()

  await db.deleteFrom('productsReviews').execute()
  await db.deleteFrom('productsPhotos').execute()
  await db.deleteFrom('products').execute()

  const products = []

  for (let i = 0; i < 100; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
    })
  }

  // const createdProducts = await db.insertInto('products').values(products).returning('id').execute()
  await db.insertInto('products').values(products).execute()
  const createdProducts = await db.selectFrom('products').select('id').execute()

  const reviews = []

  for (const createdProduct of createdProducts) {
    console.log(createdProduct.id)

    const nReviews = faker.number.int({ min: 0, max: 5 })

    for (let i = 0; i < nReviews; i++) {
      reviews.push({
        productId: createdProduct.id,
        username: faker.internet.userName(),
        rating: faker.number.int({ min: 1, max: 5 }),
        content: faker.lorem.sentences({ min: 1, max: 5 }),
      })
    }
  }

  if (reviews.length > 0) {
    await db.insertInto('productsReviews').values(reviews).execute()
  }

  const photos = []

  for (const createdProduct of createdProducts) {
    console.log(createdProduct.id)

    const nPhotos = faker.number.int({ min: 0, max: 5 })

    for (let i = 0; i < nPhotos; i++) {
      photos.push({
        productId: createdProduct.id,
        url: faker.image.urlLoremFlickr({ category: 'technics' }),
      })
    }
  }

  if (photos.length > 0) {
    await db.insertInto('productsPhotos').values(photos).execute()
  }

  console.log('Done')
}

seedDB()
