import { ProductDataInterface } from '../types/productData'

export const productData: ProductDataInterface = {
  pizzas: [
    {
      id: 1,
      name: 'Margherita',
      price: 8.99,
      rating: 4.5,
      imgUrl: '/images/pizzas/Margherita-pizza-2.jpg',
      description:
        'Classic pizza with tomato sauce, mozzarella, and fresh basil.',
    },
    {
      id: 2,
      name: 'Pepperoni',
      price: 10.99,
      rating: 4.7,
      imgUrl: '/images/pizzas/Pepperoni-Pizza-Recipe-Sip-Bite-Go.jpg',
      description: 'Delicious pepperoni slices on a bed of melted cheese.',
    },
    {
      id: 3,
      name: 'BBQ Chicken',
      price: 12.99,
      rating: 4.6,
      imgUrl: '/images/pizzas/bbq-chicken-pizza-feature.jpg',
      description: 'Tangy BBQ sauce with grilled chicken and red onions.',
    },
    {
      id: 4,
      name: 'Veggie Supreme',
      price: 9.99,
      rating: 4.4,
      imgUrl:
        '/images/pizzas/veg-supreme.6fcf716cd4ec19d7723f14b0b84459ec.1.jpg',
      description: 'Loaded with fresh vegetables and topped with mozzarella.',
    },
    {
      id: 5,
      name: 'Hawaiian',
      price: 11.99,
      rating: 4.3,
      imgUrl: '/images/pizzas/hawaiian-pizza-index-65f4641de4b08.jpg',
      description: 'Sweet pineapple and ham on a cheesy base.',
    },
    {
      id: 6,
      name: 'Four Cheese',
      price: 13.99,
      rating: 4.8,
      imgUrl:
        '/images/pizzas/Quattro-formaggi-pizza-square-Inside-the-rustic-kitchen-500x375.jpg',
      description: 'A blend of mozzarella, cheddar, parmesan, and blue cheese.',
    },
  ],
  deals: [
    {
      id: 1,
      name: 'Family Feast',
      price: 29.99,
      rating: 4.9,
      imgUrl: 'https://images.unsplash.com/photo-1601924582976-06f7f5d5d207',
      description:
        'Includes two large pizzas, breadsticks, and a 2-liter soda.',
    },
    {
      id: 2,
      name: "Couple's Combo",
      price: 19.99,
      rating: 4.7,
      imgUrl: 'https://images.unsplash.com/photo-1601924582977-07f8f4d4d108',
      description: 'One medium pizza, a side of wings, and two drinks.',
    },
    {
      id: 3,
      name: 'Party Pack',
      price: 49.99,
      rating: 4.8,
      imgUrl: 'https://images.unsplash.com/photo-1601924582978-08f9f3d3d009',
      description: 'Three large pizzas, two sides, and a 2-liter soda.',
    },
    {
      id: 4,
      name: 'Lunch Special',
      price: 12.99,
      rating: 4.6,
      imgUrl: 'https://images.unsplash.com/photo-1601924582979-09f0f2d2d8f0',
      description: 'Personal pizza with a side salad and a drink.',
    },
    {
      id: 5,
      name: 'Solo Deal',
      price: 8.99,
      rating: 4.4,
      imgUrl: 'https://images.unsplash.com/photo-1601924582980-0af1f1d1d7f1',
      description: 'Small pizza with a side of garlic knots.',
    },
    {
      id: 6,
      name: 'Weekend Special',
      price: 24.99,
      rating: 4.5,
      imgUrl: 'https://images.unsplash.com/photo-1601924582981-0bf2f0d0d6f2',
      description: 'Two large pizzas and a dessert of your choice.',
    },
  ],
  sides: [
    {
      id: 1,
      name: 'Garlic Bread',
      price: 4.99,
      rating: 4.7,
      imgUrl: '/images/sides/Roundabout-Garlic-bread.jpg',
      description: 'Crispy garlic bread with a buttery topping.',
    },
    {
      id: 2,
      name: 'Chicken Wings',
      price: 9.99,
      rating: 4.6,
      imgUrl: '/images/sides/FEATURE_Air-Fryer-Chicken-Wings.jpg',
      description: 'Spicy and tangy chicken wings served with a dipping sauce.',
    },
    {
      id: 3,
      name: 'Mozzarella Sticks',
      price: 6.99,
      rating: 4.5,
      imgUrl: '/images/sides/Homemade-Mozzarella-Sticks-Recipe-1-of-1.jpg',
      description: 'Golden fried mozzarella sticks with marinara sauce.',
    },

    {
      id: 5,
      name: 'Onion Rings',
      price: 5.99,
      rating: 4.3,
      imgUrl:
        '/images/sides/207422_Old-Fashioned-Onion-Rings_82659_Photo-by-Tricia-Winterle-Jaeger-2000-a96820e27cb64cafa8c4925ad027a59d.jpg',
      description: 'Crunchy onion rings with a side of ketchup.',
    },
    {
      id: 6,
      name: 'Jalapenos Poppers',
      price: 6.99,
      rating: 4.2,
      imgUrl:
        '/images/sides/20858-best-ever-jalapeno-poppers-DDMFS-4x3-69772a3d60cd4a63b6dfac0ff415db51.jpg',
      description: 'Jalapenos stuffed with cheese and fried to perfection.',
    },
  ],
  desserts: [
    {
      id: 1,
      name: 'Choc chip Dough Pint',
      price: 5.99,
      rating: 4.8,
      imgUrl:
        '/images/desserts/ETFZ-0000-0008__55800_2f833e81-5dbd-4932-81af-20388bff274b.webp',
      description: 'Warm chocolate cake with a gooey center.',
    },
    {
      id: 2,
      name: 'Cheesecake',
      price: 4.99,
      rating: 4.7,
      imgUrl: 'https://images.unsplash.com/photo-1601924582989-0jjaf58052fa',
      description: 'Creamy cheesecake with a graham cracker crust.',
    },
    {
      id: 3,
      name: 'Tiramisu',
      price: 6.99,
      rating: 4.6,
      imgUrl: 'https://images.unsplash.com/photo-1601924582990-0kkbf47042fb',
      description:
        'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.',
    },
    {
      id: 4,
      name: 'Ice Cream Sundae',
      price: 3.99,
      rating: 4.5,
      imgUrl: 'https://images.unsplash.com/photo-1601924582991-0llcf36032fc',
      description: 'Vanilla ice cream topped with chocolate sauce and nuts.',
    },
    {
      id: 5,
      name: 'Apple Pie',
      price: 4.99,
      rating: 4.4,
      imgUrl: 'https://images.unsplash.com/photo-1601924582992-0mmdd25022fd',
      description: 'Homemade apple pie with a flaky crust.',
    },
    {
      id: 6,
      name: 'Brownie',
      price: 3.99,
      rating: 4.3,
      imgUrl: 'https://images.unsplash.com/photo-1601924582993-0nneeee012fe',
      description: 'Rich and fudgy chocolate brownie.',
    },
  ],
  drinks: [
    {
      id: 1,
      name: 'Coca-Cola',
      price: 1.99,
      rating: 4.5,
      imgUrl: '/images/drinks/coke-15l-AJ-600x600.jpg',
      description: 'Refreshing classic cola.',
    },
    {
      id: 2,
      name: 'Lemonade',
      price: 1.99,
      rating: 4.6,
      imgUrl: 'https://images.unsplash.com/photo-1601924582995-0ppggg1113ff',
      description: 'Freshly squeezed lemonade.',
    },
    {
      id: 3,
      name: 'Iced Tea',
      price: 1.99,
      rating: 4.4,
      imgUrl: 'https://images.unsplash.com/photo-1601924582996-0qqhhh2224ff',
      description: 'Cool and refreshing iced tea.',
    },
    {
      id: 4,
      name: 'Orange Juice',
      price: 2.99,
      rating: 4.7,
      imgUrl: 'https://images.unsplash.com/photo-1601924582997-0rriii3335ff',
      description: 'Freshly squeezed orange juice.',
    },
    {
      id: 5,
      name: 'Mineral Water',
      price: 1.49,
      rating: 4.2,
      imgUrl: 'https://images.unsplash.com/photo-1601924582998-0ssjjj4446ff',
      description: 'Pure and refreshing mineral water.',
    },
    {
      id: 6,
      name: 'Sparkling Water',
      price: 1.99,
      rating: 4.3,
      imgUrl: 'https://images.unsplash.com/photo-1601924582999-0ttkkk5557ff',
      description: 'Carbonated sparkling water.',
    },
  ],
  catering: [
    {
      id: 1,
      name: 'Corporate Lunch',
      price: 199.99,
      rating: 4.9,
      imgUrl: 'https://images.unsplash.com/photo-1601924583000-0uullk6668ff',
      description: 'Assorted sandwiches, salads, and drinks for 20 people.',
    },
    {
      id: 2,
      name: 'Wedding Feast',
      price: 499.99,
      rating: 4.8,
      imgUrl: 'https://images.unsplash.com/photo-1601924583001-0vvmmj7779ff',
      description: 'Gourmet meal with multiple courses for 50 guests.',
    },
    {
      id: 3,
      name: 'Birthday Bash',
      price: 299.99,
      rating: 4.7,
      imgUrl: 'https://images.unsplash.com/photo-1601924583002-0wwnnk888a0f',
      description: 'Finger foods, pizzas, and desserts for 30 people.',
    },
    {
      id: 4,
      name: 'Office Party',
      price: 149.99,
      rating: 4.6,
      imgUrl: 'https://images.unsplash.com/photo-1601924583003-0xxool999b1f',
      description: 'Snacks, pizzas, and drinks for 15 people.',
    },
    {
      id: 5,
      name: 'Holiday Gathering',
      price: 399.99,
      rating: 4.5,
      imgUrl: 'https://images.unsplash.com/photo-1601924583004-0yypppaaa2f0',
      description: 'Festive meals and desserts for 40 guests.',
    },
    {
      id: 6,
      name: 'Picnic Spread',
      price: 99.99,
      rating: 4.4,
      imgUrl: 'https://images.unsplash.com/photo-1601924583005-0zzqqqbbb3f1',
      description: 'Assorted sandwiches, fruits, and drinks for 10 people.',
    },
  ],
}

// [
//   {
//     "Value Range": [
//       {
//         "description": "Cream Fraiche base, garlic sauce, mozzarella, oregano",
//         "imgUrl": "''",
//         "name": "Cheesy Garlic",
//         "price": 8.99
//       },
//       {
//         "description": "Tomato base, ham, pineapple, mozzarella",
//         "imgUrl": "''",
//         "name": "Hawaiian",
//         "price": 8.99
//       },
//       {
//         "description": "Tomato base, lots of pepperoni, mozzarella",
//         "imgUrl": "''",
//         "name": "Pepperoni",
//         "price": 8.99
//       },
//       {
//         "description": "BBQ base, beef, onion, mozzarella",
//         "imgUrl": "''",
//         "name": "Beef & Onion",
//         "price": 8.99
//       },
//       {
//         "description": "Tomato base, pineapple, mozzarella",
//         "imgUrl": "''",
//         "name": "Pineapple Pizza",
//         "price": 8.99
//       },
//       {
//         "description": "Tomato base, ham, mozzarella",
//         "imgUrl": "''",
//         "name": "Ham & Cheese",
//         "price": 8.99
//       },
//       {
//         "description": "Tomato base, lots of cheese",
//         "imgUrl": "''",
//         "name": "Cheese",
//         "price": 8.99
//       },
//       {
//         "description": "Tomato base, bacon, mozzarella, aioli",
//         "imgUrl": "''",
//         "name": "Bacon & Aioli",
//         "price": 8.99
//       }
//     ]
//   },
//   {
//     "Favourite Range": [
//       {
//         "description": "Tomato base, mushroom, pepperoni, mozzarella, oregano",
//         "imgUrl": "''",
//         "name": "Manhattan",
//         "price": 11.99
//       },
//       {
//         "description": "Tomato base, tomato, mozzarella, oregano, basil swirl",
//         "imgUrl": "''",
//         "name": "Margherita",
//         "price": 11.99
//       },
//       {
//         "description": "Tomato base, double ham, double pineapple, diced bacon, onion, capsicum & mozzarella",
//         "imgUrl": "''",
//         "name": "Dough Boarder",
//         "price": 11.99
//       },
//       {
//         "description": "Tomato base, pepperoni, jalapenos, mozzarella",
//         "imgUrl": "''",
//         "name": "Spicy Pepperoni",
//         "price": 11.99
//       },
//       {
//         "description": "Tomato base, ham, pineapple, bacon, mozzarella",
//         "imgUrl": "''",
//         "name": "Pacificano",
//         "price": 11.99
//       },
//       {
//         "description": "Tomato base, mozzarella, string cheese, parmesan cheese",
//         "imgUrl": "''",
//         "name": "The Cheese Factor",
//         "price": 11.99
//       }
//     ]
//   },
//   {
//     "Chicken Range": [
//       {
//         "description": "BBQ base, Southern-style fried chicken, red onion, mozzarella, creamy ranch swirl",
//         "imgUrl": "''",
//         "name": "Fried Chicken and Bacon",
//         "price": 12.99
//       },
//       {
//         "description": "Tomato base, garlic sauce, caramelized onion, chicken, jalapenos, chili flakes, mozzarella",
//         "imgUrl": "''",
//         "name": "Chipotle Chicken and Caramelized Onion",
//         "price": 12.99
//       },
//       {
//         "description": "Tomato base, garlic sauce, spinach, fresh avocado, chicken, mozzarella, creamy basil swirl",
//         "imgUrl": "''",
//         "name": "Chicken and Avocado",
//         "price": 12.99
//       },
//       {
//         "description": "Cream Fraiche base, caramelized onion, spinach, mushrooms, onions, chicken, feta, jalapenos, peri peri and hollandaise swirl",
//         "imgUrl": "''",
//         "name": "The Runway",
//         "price": 12.99
//       },
//       {
//         "description": "Tomato base, spinach, onion, tomatoes, peri peri chicken, peri peri swirl",
//         "imgUrl": "''",
//         "name": "Peri Peri Chicken",
//         "price": 12.99
//       },
//       {
//         "description": "Cranberry base, spinach, tomatoes, chicken, mozzarella, cranberry swirl",
//         "imgUrl": "''",
//         "name": "Cranberry Chicken Island",
//         "price": 12.99
//       },
//       {
//         "description": "Butter sauce base, spinach, tomatoes, chicken, camembert, feta, cranberry swirl",
//         "imgUrl": "''",
//         "name": "Chicken Camembert & Feta",
//         "price": 12.99
//       },
//       {
//         "description": "BBQ base, onion, capsicum, tomatoes, mushrooms, chicken, hollandaise swirl",
//         "imgUrl": "''",
//         "name": "Indian Butter Chicken",
//         "price": 12.99
//       }
//     ]
//   },
//   {
//     "Meat Range": [
//       {
//         "description": "BBQ base, Angus beef, onions, mozzarella, mayo swirl",
//         "imgUrl": "''",
//         "name": "The Cheeseburger",
//         "price": 9.99
//       }
//     ]
//   }
// ]
