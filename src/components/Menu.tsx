import { useState } from "react";
import MenuItem, { MenuItemType } from "./MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import sushiRollImage from "@/assets/sushi-roll.jpg";

const menuItems: MenuItemType[] = [
  // Роли
  {
    id: 1,
    name: "Філадельфія",
    description: "Лосось, крем-сир, огірок, рис, норі",
    price: 219,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 1,
    name: "Філадельфія Люкс",
    description: "Лосось, крем-сир, авокадо, ікра масаго, рис, норі",
    price: 249,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 2,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 3,
    name: "Канада",
    description: "Вугор, крем-сир, огірок, тамаго, краб-кейк, кунжут, рис, норі, унагі соус",
    price: 209,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 4,
    name: "Філадельфія з тунцем",
    description: "Тунець, крем-сир, огірок, рис, норі, ікра масаго",
    price: 199,
    image: sushiRollImage,
    category: "rolls"
  },
  // Сети
  {
    id: 5,
    name: "Сет 'Суші Мікс'",
    description: "20 шт / 405 гр: Філадельфія 1/2, Каліфорнія з лососем в ікрі 1/2, Каліфорнія з крабом в кунжуті 1/2, Макі огірок",
    price: 319,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 6,
    name: "Сет 'Популярний'",
    description: "32 шт / 820 г: Філадельфія, Осака, Каліфорнія з тунцем теріякі, Макі вершковий лосось",
    price: 549,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 7,
    name: "Сет 'Хіт Сет'",
    description: "32 шт /900 г: Чіз рол з креветкою, Філадельфія з беконом, Ніжність, Макі авокадо",
    price: 639,
    image: sushiRollImage,
    category: "sets"
  },
  // Запечені
  {
    id: 8,
    name: "Запечений з лососем",
    description: "Лосось, огірок, тамаго, ікра масаго, рис, норі, унагі соус, кунжут, сирний соус",
    price: 229,
    image: sushiRollImage,
    category: "nigiri"
  },
  {
    id: 9,
    name: "Запечений Чікен",
    description: "Курка теріякі, крем-сир, тамаго, ананас, унагі соус, кунжут, рис, норі, сирний соус",
    price: 189,
    image: sushiRollImage,
    category: "nigiri"
  },
  {
    id: 10,
    name: "Запечений з мідіями і беконом",
    description: "Мідії копчені, бекон, тамаго, унагі соус, рис, норі, кунжут, сирний соус",
    price: 199,
    image: sushiRollImage,
    category: "nigiri"
  },
];

interface MenuProps {
  onAddToCart: (item: MenuItemType) => void;
}

const Menu = ({ onAddToCart }: MenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="container py-16" aria-label="Меню суші">
      <h2 className="text-4xl font-bold text-center mb-12">Наше меню</h2>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8" role="tablist" aria-label="Категорії меню">
          <TabsTrigger value="all">Всі</TabsTrigger>
          <TabsTrigger value="rolls">Роли</TabsTrigger>
          <TabsTrigger value="sets">Сети</TabsTrigger>
          <TabsTrigger value="nigiri">Запечені роли</TabsTrigger>
          <TabsTrigger value="salat">Салат</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {filteredItems.map(item => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAdd={onAddToCart}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Menu;
