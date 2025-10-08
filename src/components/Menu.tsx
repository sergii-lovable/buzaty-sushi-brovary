import { useState } from "react";
import MenuItem, { MenuItemType } from "./MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import sushiRollImage from "@/assets/sushi-roll.jpg";

const menuItems: MenuItemType[] = [
  // Роли
  {
    id: 1,
    name: "Філадельфія",
    description: "Рис, норі, лосось, вершковий сир, огірок",
    price: 219,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 2,
    name: "Каліфорнія",
    description: "Краб, авокадо, огірок, ікра тобіко",
    price: 165,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 3,
    name: "Дракон",
    description: "Вугор, авокадо, огірок, унагі соус",
    price: 215,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 4,
    name: "Спайсі тунець",
    description: "Тунець, спайсі соус, огірок, кунжут",
    price: 175,
    image: sushiRollImage,
    category: "rolls"
  },
  // Сети
  {
    id: 5,
    name: "Сет 'Пузатий'",
    description: "24 шт: Філадельфія, Каліфорнія, Дракон",
    price: 499,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 6,
    name: "Сет 'Премія'",
    description: "32 шт: міх найкращих ролів з лососем і тунцем",
    price: 699,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 7,
    name: "Сет 'Веган'",
    description: "24 шт: роли з авокадо, огірком, тофу",
    price: 399,
    image: sushiRollImage,
    category: "sets"
  },
  // Нігірі
  {
    id: 8,
    name: "Нігірі лосось",
    description: "2 шт свіжого лосося на рисі",
    price: 89,
    image: sushiRollImage,
    category: "nigiri"
  },
  {
    id: 9,
    name: "Нігірі тунець",
    description: "2 шт свіжого тунця на рисі",
    price: 95,
    image: sushiRollImage,
    category: "nigiri"
  },
  {
    id: 10,
    name: "Нігірі вугор",
    description: "2 шт копченого вугра на рисі",
    price: 99,
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
          <TabsTrigger value="nigiri">Нігірі</TabsTrigger>
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
