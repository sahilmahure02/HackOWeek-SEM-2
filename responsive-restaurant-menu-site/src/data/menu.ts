export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'Starters' | 'Main Course' | 'Desserts' | 'Drinks';
  image?: string;
}

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Bruschetta",
    description: "Grilled bread topped with diced tomatoes, fresh basil, garlic, and olive oil.",
    price: "$8.50",
    category: "Starters",
    image: "/starter.jpg",
  },
  {
    id: 2,
    name: "Crispy Calamari",
    description: "Lightly battered squid served with spicy marinara sauce and lemon wedges.",
    price: "$12.00",
    category: "Starters",
  },
  {
    id: 3,
    name: "Stuffed Mushrooms",
    description: "Button mushrooms filled with herb-seasoned breadcrumbs and melted parmesan.",
    price: "$10.50",
    category: "Starters",
  },
  // Main Course
  {
    id: 4,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet served with roasted asparagus and lemon butter sauce.",
    price: "$24.00",
    category: "Main Course",
    image: "/main.jpg",
  },
  {
    id: 5,
    name: "Filet Mignon",
    description: "8oz premium beef tenderloin with garlic mashed potatoes and red wine reduction.",
    price: "$32.00",
    category: "Main Course",
  },
  {
    id: 6,
    name: "Truffle Risotto",
    description: "Creamy Arborio rice with wild mushrooms, parmesan, and a drizzle of truffle oil.",
    price: "$21.00",
    category: "Main Course",
  },
  // Desserts
  {
    id: 7,
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    price: "$9.00",
    category: "Desserts",
  },
  {
    id: 8,
    name: "Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla bean ice cream.",
    price: "$10.00",
    category: "Desserts",
    image: "/dessert.jpg",
  },
  {
    id: 9,
    name: "New York Cheesecake",
    description: "Rich and creamy cheesecake with a graham cracker crust and berry coulis.",
    price: "$8.50",
    category: "Desserts",
  },
  // Drinks
  {
    id: 10,
    name: "Signature Margarita",
    description: "Premium tequila, fresh lime juice, and agave nectar with a salt rim.",
    price: "$12.00",
    category: "Drinks",
    image: "/drink.jpg",
  },
  {
    id: 11,
    name: "Espresso Martini",
    description: "Freshly brewed espresso, vodka, and coffee liqueur shaken until frothy.",
    price: "$13.00",
    category: "Drinks",
  },
  {
    id: 12,
    name: "Sparkling Lemonade",
    description: "House-made lemonade with fresh mint and a splash of soda water.",
    price: "$5.00",
    category: "Drinks",
  },
];
