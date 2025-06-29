import { Product } from '../types/Product';

export const products: Product[] = [
  // Cricket Bats
  {
    id: 'bat-1',
    name: 'Zelion Elite Pro Bat',
    description: 'Premium English willow cricket bat with perfect balance and exceptional power. Handcrafted by master craftsmen for professional players.',
    price: 15999,
    originalPrice: 19999,
    image: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg',
    category: 'bat',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    features: ['English Willow', 'Hand-Finished', 'Professional Grade', 'Perfect Balance'],
    discount: 20
  },
  {
    id: 'bat-2',
    name: 'Zelion Champion Bat',
    description: 'High-quality Kashmir willow bat designed for intermediate to advanced players. Excellent value for money with superior performance.',
    price: 8999,
    originalPrice: 11999,
    image: 'https://images.pexels.com/photos/163452/baseball-bat-ball-game-fun-163452.jpeg',
    category: 'bat',
    inStock: true,
    rating: 4.6,
    reviews: 89,
    features: ['Kashmir Willow', 'Lightweight', 'Durable', 'Great Value'],
    discount: 25
  },
  {
    id: 'bat-3',
    name: 'Zelion Junior Bat',
    description: 'Perfect starter bat for young cricketers. Lightweight design with excellent grip and control for developing players.',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg',
    category: 'bat',
    inStock: true,
    rating: 4.5,
    reviews: 67,
    features: ['Junior Size', 'Lightweight', 'Easy Grip', 'Beginner Friendly'],
    discount: 29
  },

  // Cricket Balls
  {
    id: 'ball-1',
    name: 'Zelion Test Match Ball',
    description: 'Official test match quality leather cricket ball. Hand-stitched with premium leather for professional matches and practice.',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg',
    category: 'ball',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    features: ['Genuine Leather', 'Hand-Stitched', 'Test Match Quality', 'Professional Grade'],
    discount: 25
  },
  {
    id: 'ball-2',
    name: 'Zelion Practice Ball Set',
    description: 'Set of 6 high-quality practice balls. Perfect for training sessions and club matches. Durable construction for extended use.',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.pexels.com/photos/1263347/pexels-photo-1263347.jpeg',
    category: 'ball',
    inStock: true,
    rating: 4.7,
    reviews: 98,
    features: ['Set of 6 Balls', 'Practice Quality', 'Durable', 'Club Standard'],
    discount: 29
  },
  {
    id: 'ball-3',
    name: 'Zelion White Ball',
    description: 'Premium white leather cricket ball for limited overs matches. Excellent visibility and consistent bounce for competitive play.',
    price: 3499,
    originalPrice: 4499,
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
    category: 'ball',
    inStock: true,
    rating: 4.8,
    reviews: 112,
    features: ['White Leather', 'Limited Overs', 'High Visibility', 'Consistent Bounce'],
    discount: 22
  },

  // Equipment
  {
    id: 'equipment-1',
    name: 'Zelion Pro Pads',
    description: 'Professional batting pads with advanced protection and lightweight design. Comfortable fit with superior mobility.',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.pexels.com/photos/28759016/pexels-photo-28759016.jpeg',
    category: 'equipment',
    inStock: true,
    rating: 4.7,
    reviews: 78,
    features: ['Lightweight', 'Advanced Protection', 'Comfortable Fit', 'Professional Grade'],
    discount: 31
  },
  {
    id: 'equipment-2',
    name: 'Zelion Batting Gloves',
    description: 'Premium batting gloves with superior grip and protection. Flexible design for natural hand movement and comfort.',
    price: 3999,
    originalPrice: 5999,
    image: 'https://images.pexels.com/photos/3800517/pexels-photo-3800517.jpeg',
    category: 'equipment',
    inStock: true,
    rating: 4.6,
    reviews: 134,
    features: ['Superior Grip', 'Flexible Design', 'Comfortable', 'Durable'],
    discount: 33
  },

  // Complete Kits
  {
    id: 'kit-1',
    name: 'Zelion Complete Cricket Kit',
    description: 'Everything you need to start playing cricket. Includes bat, pads, gloves, helmet, and carry bag. Perfect for beginners.',
    price: 25999,
    originalPrice: 35999,
    image: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg',
    category: 'kit',
    inStock: true,
    rating: 4.8,
    reviews: 45,
    features: ['Complete Set', 'Beginner Friendly', 'Carry Bag Included', 'Great Value'],
    discount: 28
  }
];