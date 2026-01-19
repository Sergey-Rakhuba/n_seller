const itemTypes = [
  { category: 'transport', type: 'truck', title: 'Volvo FH16', validBrands: ['Volvo', 'Scania', 'MAN'] },
  { category: 'transport', type: 'car', title: 'Volkswagen Golf', validBrands: ['VW', 'BMW', 'Mercedes'] },
  { category: 'transport', type: 'motorcycle', title: 'Yamaha MT-07', validBrands: ['Yamaha', 'Honda', 'Kawasaki'] },
  { category: 'agriculture', type: 'tractor', title: 'John Deere 8R', validBrands: ['John Deere', 'Claas', 'Fendt'] },
  { category: 'agriculture', type: 'combine', title: 'Claas Lexion', validBrands: ['Claas', 'John Deere', 'New Holland'] },
  { category: 'agriculture', type: 'general', title: 'Plow attachment', validBrands: ['Generic', 'Kuhn'] },
  { category: 'construction', type: 'excavator', title: 'CAT 320', validBrands: ['Caterpillar', 'Komatsu', 'Hitachi'] },
  { category: 'warehouse', type: 'forklift', title: 'Toyota Traigo', validBrands: ['Toyota', 'Linde', 'Jungheinrich'] },
];

const generateProducts = () => {
  const products = [];
  let id = 1;

  itemTypes.forEach(template => {
    for (let i = 0; i < 15; i++) {
        const brand = template.validBrands[i % template.validBrands.length];
        products.push({
            id: id++,
            category: template.category,
            type: template.type,
            title: `${brand} ${template.title} ${2010 + i}`,
            price: Number((15000 + (i * 1000) + (Math.random() * 5000)).toFixed(2)),
            year: 2010 + i,
            brand: brand,
            model: `${template.title.split(' ')[1] || 'Model'} X${i}`,
            location: i % 2 === 0 ? 'Germany' : 'Poland',
            image: `https://loremflickr.com/640/480/${template.type},${template.category}?lock=${id}`, // Using loremflickr for relevant real images
            specs: {
                mileage: 5000 * i,
                power: 100 + (i * 10) + ' hp',
                fuel: i % 3 === 0 ? 'Diesel' : 'Petrol',
                transmission: i % 2 === 0 ? 'Manual' : 'Auto'
            }
        });
    }
  });

  return products;
};

export const mockProducts = generateProducts();
