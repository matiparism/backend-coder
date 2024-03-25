import faker from 'faker';

const generateMockProducts = () => {
  const mockProducts = [];

  for (let i = 0; i < 100; i++) {
    const product = {
      _id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      // Otros campos necesarios
    };

    mockProducts.push(product);
  }

  return mockProducts;
};

export default generateMockProducts;