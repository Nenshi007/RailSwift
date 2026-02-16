
import { Station, Train, TrainClassType, FoodItem } from './types';

export const CITY_LIST = [
  "Mumbai", "Delhi", "Surat", "Ahmedabad", "Bengaluru", "Chennai", "Hyderabad",
  "Kolkata", "Jaipur", "Vadodara", "Pune", "Nagpur", "Lucknow", "Patna",
  "Indore", "Bhopal", "Varanasi", "Gorakhpur", "Rajkot", "Kanpur",
  "Nashik", "Ranchi", "Amritsar", "Agra", "Goa", "Jodhpur",
  "Udaipur", "Madgaon", "Hapa", "Surendranagar", "Anand", "Bharuch"
];

const PRICE_MAP: Record<TrainClassType, number> = {
  '1A': 3200,
  '2A': 2100,
  '3A': 1450,
  'SL': 550,
  'CC': 850,
  'EC': 1800,
  '2S': 180
};

const CLASS_NAMES: Record<TrainClassType, string> = {
  '1A': 'First AC',
  '2A': 'Second AC',
  '3A': 'Third AC',
  'SL': 'Sleeper',
  'CC': 'AC Chair Car',
  'EC': 'Exec. Chair Car',
  '2S': 'Second Sitting'
};

const generateClasses = (types: string[]) => {
  return types.map(t => ({
    type: t as TrainClassType,
    name: CLASS_NAMES[t as TrainClassType] || t,
    price: PRICE_MAP[t as TrainClassType] || 500,
    available: Math.floor(Math.random() * 100) + 5
  }));
};

export const TRAINS: Train[] = [
  {
    id: "12951",
    number: "12951",
    name: "Mumbai Rajdhani Express",
    from: "Mumbai Central",
    to: "New Delhi",
    departure: "16:35",
    arrival: "08:35",
    duration: "16h 00m",
    classes: generateClasses(["SL", "3A", "2A", "1A"])
  },
  {
    id: "12009",
    number: "12009",
    name: "Shatabdi Express",
    from: "Mumbai Central",
    to: "Ahmedabad",
    departure: "06:00",
    arrival: "12:45",
    duration: "06h 45m",
    classes: generateClasses(["CC", "EC"])
  },
  {
    id: "12627",
    number: "12627",
    name: "Karnataka Express",
    from: "New Delhi",
    to: "Bengaluru",
    departure: "21:15",
    arrival: "06:40",
    duration: "33h 25m",
    classes: generateClasses(["SL", "3A", "2A"])
  }
];

export const OFFERS = [
  { id: 1, title: 'Summer Special', discount: '20% OFF', code: 'SUMMER20', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'First Booking', discount: '₹200 OFF', code: 'RAILNEW', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'Bank Offer', discount: '10% Cashback', code: 'HDFC10', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
];

export const FOOD_ITEMS: FoodItem[] = [
  { id: 'f1', name: 'Veg Maharaja Thali', price: 250, category: 'Meal', description: 'Complete meal with Paneer, Dal, Rice, and Roti.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f2', name: 'Chicken Biryani', price: 320, category: 'Meal', description: 'Spicy Hyderabadi style Dum Biryani.', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f3', name: 'Masala Dosa', price: 120, category: 'Snack', description: 'Crispy dosa with potato filling and chutney.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f4', name: 'Club Sandwich', price: 150, category: 'Snack', description: 'Fresh veggies and cheese on toasted bread.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f5', name: 'Cold Coffee', price: 80, category: 'Beverage', description: 'Refreshing iced coffee with cream.', image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f6', name: 'Mango Lassi', price: 60, category: 'Beverage', description: 'Traditional yogurt drink with mango pulp.', image: 'https://images.unsplash.com/photo-1571006682868-04d4db47ad7c?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f7', name: 'Paneer Tikka Meal', price: 280, category: 'Meal', description: 'Grilled paneer served with butter naan and salad.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f8', name: 'Dal Makhani Rice', price: 190, category: 'Meal', description: 'Slow cooked black lentils with steamed basmati rice.', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f9', name: 'Butter Chicken', price: 350, category: 'Meal', description: 'Creamy tomato gravy with tender chicken chunks.', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f10', name: 'Egg Curry Meal', price: 210, category: 'Meal', description: 'Two boiled eggs in spicy gravy with tandoori roti.', image: 'https://images.unsplash.com/photo-1548940740-204726a19db3?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f11', name: 'Vada Pav (2 pcs)', price: 70, category: 'Snack', description: 'Mumbai style potato fritter in bun with spicy chutney.', image: 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f12', name: 'Samosa Chat', price: 90, category: 'Snack', description: 'Crushed samosas topped with curd and tamarind sauce.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb4709a?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f13', name: 'Cheese Pizza Slice', price: 110, category: 'Snack', description: 'Large slice of extra cheesy margherita pizza.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f14', name: 'Pav Bhaji', price: 160, category: 'Meal', description: 'Spiced vegetable mash served with buttered buns.', image: 'https://images.unsplash.com/photo-1626132646529-500637532738?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f15', name: 'Masala Chai', price: 30, category: 'Beverage', description: 'Strong tea brewed with ginger and cardamom.', image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f16', name: 'Orange Juice', price: 90, category: 'Beverage', description: 'Freshly squeezed oranges with a dash of mint.', image: 'https://images.unsplash.com/photo-1613478223719-2ab80260f423?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f17', name: 'Gulab Jamun (2 pcs)', price: 60, category: 'Snack', description: 'Soft milk solids dumplings in sugar syrup.', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f18', name: 'Veg Hakka Noodles', price: 180, category: 'Meal', description: 'Stir-fried noodles with crunchy vegetables.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f19', name: 'Chicken 65', price: 240, category: 'Snack', description: 'Deep fried spicy chicken chunks with curry leaves.', image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f20', name: 'Ice Tea', price: 70, category: 'Beverage', description: 'Chilled tea with lemon and honey flavor.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f21', name: 'Fish Curry Rice', price: 380, category: 'Meal', description: 'Goan style fish curry served with white rice.', image: 'https://images.unsplash.com/photo-1626508035297-0ae27442d543?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f22', name: 'Mutton Korma', price: 420, category: 'Meal', description: 'Slow cooked mutton in a rich yogurt based gravy.', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f23', name: 'French Fries', price: 100, category: 'Snack', description: 'Crispy golden fries with peri-peri seasoning.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f24', name: 'Chole Bhature', price: 170, category: 'Meal', description: 'Spicy chickpeas with fluffy deep-fried bread.', image: 'https://images.unsplash.com/photo-1626132646529-500637532738?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f25', name: 'Hot Chocolate', price: 120, category: 'Beverage', description: 'Rich creamy cocoa with melted marshmallows.', image: 'https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f26', name: 'Spring Rolls', price: 130, category: 'Snack', description: 'Crispy rolls stuffed with seasoned vegetables.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f27', name: 'Veg Pulao', price: 160, category: 'Meal', description: 'Fragrant rice cooked with garden fresh vegetables.', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f28', name: 'Chicken Burger', price: 180, category: 'Snack', description: 'Juicy chicken patty with lettuce and mayo.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f29', name: 'Mineral Water', price: 20, category: 'Beverage', description: '1 Liter chilled purified mineral water.', image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=200&h=200&q=80' },
  { id: 'f30', name: 'Sweet Corn Soup', price: 90, category: 'Beverage', description: 'Warm comforting soup with golden corn kernels.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=200&h=200&q=80' },
];
