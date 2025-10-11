import { useState } from "react";
import MenuItem, { MenuItemType } from "./MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import sushiRollImage from "@/assets/sushi-roll.jpg";

const menuItems: MenuItemType[] = [
  // Філадельфія меню
  {
    id: 1,
    name: "Філадельфія",
    description: "Лосось, крем-сир, огірок, рис, норі",
    price: 219,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 2,
    name: "Філадельфія Люкс",
    description: "Лосось, крем-сир, авокадо, ікра масаго, рис, норі",
    price: 249,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 3,
    name: "Філадельфія з лососем та креветкою",
    description: "Лосось, креветка, крем-сир, авокадо, рис, норі",
    price: 309,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 4,
    name: "Філадельфія з лососем слабосоленим",
    description: "Лосось с/с, крем-сир, огірок, ікра масаго, рис, норі",
    price: 239,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 5,
    name: "Філадельфія Дабл з лососем",
    description: "Лосось - подвійна порція, крем-сир, авокадо, рис, норі",
    price: 349,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 6,
    name: "Філадельфія Грін",
    description: "Водорості, горіховий соус, кунжут, крем-сир, огірок, рис, норі",
    price: 189,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 7,
    name: "Філадельфія з беконом",
    description: "Бекон, крем-сир, помідор, рис, норі",
    price: 189,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 8,
    name: "Філадельфія з авокадо",
    description: "Авокадо, лосось, крем-сир, огірок, унагі соус, рис, норі",
    price: 209,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 9,
    name: "Філадельфія з тунцем",
    description: "Тунець, крем-сир, огірок, ікра масаго, рис, норі",
    price: 199,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 10,
    name: "Філадельфія з лососем і тунцем",
    description: "Лосось, тунець, крем-сир, авокадо, ікра масаго, рис, норі",
    price: 309,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 11,
    name: "Філадельфія 50/50",
    description: "Лосось, вугор, крем-сир, огірок, унагі соус, рис, норі",
    price: 259,
    image: sushiRollImage,
    category: "rolls"
  },
  {
    id: 12,
    name: "Філадельфія з вугрем",
    description: "Вугор, крем-сир, огірок, унагі соус, кунжут, рис, норі",
    price: 249,
    image: sushiRollImage,
    category: "rolls"
  },  
   // Набори / Сети
  {
    id: 16,
    name: "Сет 'Суші Мікс'",
    description: "20 шт / 405 гр: Філадельфія 1/2, Каліфорнія з лососем в ікрі 1/2, Каліфорнія з крабом в кунжуті 1/2, Макі огірок",
    price: 319,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 17,
    name: "Сет 'Фієста'",
    description: "20 шт / 480 гр: Філадельфія 1/2, Каліфорнія з крабом в ікрі 1/2, Каліфорнія з тунцем теріякі 1/2, Лавв Чіз Торі 1/2, Макі вершковий лосось 1/2",
    price: 319,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 18,
    name: "Сет 'Запечений'",
    description: "24 шт / 740 гр: Запечений Філадельфія, Запечений з мідіями і беконом, Запечений Чікен",
    price: 399,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 19,
    name: "Сет 'Популярний'",
    description: "32 шт / 820 г: Філадельфія, Осака, Каліфорнія з тунцем теріякі, Макі вершковий лосось",
    price: 549,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 20,
    name: "Сет 'Філадельфія Плюс'",
    description: "26 шт / 800 гр: Філадельфія з лососем с/с, Лава Чіз Торі, Канада, Крім-суші з лососем 2шт",
    price: 569,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 21,
    name: "Сет 'Фішка'",
    description: "32 шт / 920 гр: Філадельфія, Філадельфія Грін, Каліфорнія з беконом, Норвезький",
    price: 619,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 22,
    name: "Сет 'Хіт Сет'",
    description: "32 шт /900 г: Чіз рол з креветкою, Філадельфія з беконом, Ніжність, Макі авокадо",
    price: 639,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 23,
    name: "Сет 'Комбі Сет'",
    description: "32 шт /1000 г: Філадельфія 50/50, Ніжність, Запечений Чікен, Запечений з лососем 1/2, Запечений з тунцем теріякі 1/2",
    price: 649,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 24,
    name: "Сет 'Фаворит'",
    description: "48 шт /1550 г: Філадельфія з лососем с/с, Чіз рол з лососем, Канада, Філадельфія Грін, Запечений з лососем, Запечений з тунцем теріякі",
    price: 999,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 25,
    name: "Сет 'Пузаті суші'",
    description: "64 шт /1750 г: Філадельфія, Ніжність, Канада, Філадельфія з тунцем, Філадельфія з лососем та тунцем, Каліфорнія з беконом, Каліфорнія з лососем с/с в ікрі, Норвезький",
    price: 1499,
    image: sushiRollImage,
    category: "sets"
  },
  // Запечені
  {
    id: 26,
    name: "Запечений з лососем",
    description: "Лосось, огірок, тамаго, ікра масаго, рис, норі, унагі соус, кунжут, сирний соус",
    price: 229,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 27,
    name: "Запечений Чікен",
    description: "Курка теріякі, крем-сир, тамаго, ананас, унагі соус, кунжут, рис, норі, сирний соус",
    price: 189,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 28,
    name: "Запечений з мідіями і беконом",
    description: "Мідії копчені, бекон, тамаго, унагі соус, рис, норі, кунжут, сирний соус",
    price: 199,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 28,
    name: "Запечений з тунцем теріякі",
    description: "Тунець теріякі, тамаго, огірок, унагі соус, рис, норі, кунжут, сирний соус",
    price: 199,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 28,
    name: "Запечений Філадельфія",
    description: "Лосось, крем-сир, тамаго, огірок, унагі соус, рис, норі, кунжут, сирний соус",
    price: 209,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 28,
    name: "Запечений з вугрем",
    description: "Вугор, тамаго, авокадо, крем-сир, унагі соус, рис, норі, кунжут, сирний соус",
    price: 239,
    image: sushiRollImage,
    category: "zapecheni"
  },
 // Каліфорнія меню
   {
    id: 13,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з беконом в кунжуті",
    description: "Бекон, огірок, майонез, рис, норі, унагі соус, кунжут",
    price: 179,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з тунцем теріякі",
    description: "Тунець, огірок, майонез, рис, норі, унагі соус, кунжут",
    price: 199,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з вугрем в кунжуті",
    description: "Вугор, огірок, майонез, рис, норі, унагі соус, кунжут",
    price: 229,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з лососем в кунжуті",
    description: "Лосось, авокадо, майонез, рис, норі, унагі соус, кунжут",
    price: 199,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з лососем слабосолоним",
    description: "Лосось, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 13,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  // Суші / крім-суші
  {
    id: 30,
    name: "Сашимі з лосося",
    description: "8 шт свіжого філе лосося, імбир, васабі, соєвий соус",
    price: 199,
    image: sushiRollImage,
    category: "sashimi"
  },
  {
    id: 31,
    name: "Сашимі з тунця",
    description: "8 шт свіжого філе тунця, імбир, васабі, соєвий соус",
    price: 219,
    image: sushiRollImage,
    category: "sashimi"
  },
  {
    id: 32,
    name: "Сашимі Мікс",
    description: "12 шт асорті: лосось, тунець, вугор, імбир, васабі",
    price: 329,
    image: sushiRollImage,
    category: "sashimi"
  },
  // Чіз роли
  {
    id: 33,
    name: "Нігірі з лососем",
    description: "2 шт свіжого лосося на рисі з васабі",
    price: 89,
    image: sushiRollImage,
    category: "nigiri-sushi"
  },
  {
    id: 34,
    name: "Нігірі з тунцем",
    description: "2 шт свіжого тунця на рисі з васабі",
    price: 95,
    image: sushiRollImage,
    category: "nigiri-sushi"
  },
  {
    id: 35,
    name: "Нігірі з вугрем",
    description: "2 шт копченого вугра на рисі з унагі соусом",
    price: 99,
    image: sushiRollImage,
    category: "nigiri-sushi"
  },
  {
    id: 36,
    name: "Нігірі з креветкою",
    description: "2 шт тигрової креветки на рисі",
    price: 85,
    image: sushiRollImage,
    category: "nigiri-sushi"
  },
  // Оригінальні роли
  {
    id: 14,
    name: "Канада",
    description: "Вугор, крем-сир, огірок, тамаго, краб-кейк, кунжут, рис, норі, унагі соус",
    price: 209,
    image: sushiRollImage,
    category: "original"
  },
   // Салат Чука
  {
    id: 29,
    name: "Салат Чука",
    description: "Класичний японський салат із водоростей з горіховим соусом",
    price: 129,
    image: sushiRollImage,
    category: "salat"
  },
   // Напої
  {
    id: 43,
    name: "Coca-Cola 0.33л",
    description: "Класична кола в банці",
    price: 40,
    image: sushiRollImage,
    category: "drinks"
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
        <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-8" role="tablist" aria-label="Категорії меню">
          <TabsTrigger value="all">ВСІ</TabsTrigger>
          <TabsTrigger value="rolls">ФІЛАДЕЛЬФІЯ МЕНЮ</TabsTrigger>
          <TabsTrigger value="sets">НАБОРИ / СЕТИ</TabsTrigger>
          <TabsTrigger value="zapecheni">ЗАПЕЧЕНІ РОЛИ</TabsTrigger>
          <TabsTrigger value="kalifornija">КАЛІФОРНІЯ МЕНЮ</TabsTrigger>
          <TabsTrigger value="krim-sushi">СУШІ / КРІМ-СУШІ</TabsTrigger>
          <TabsTrigger value="futo-maki">МАКІ / ФУТО-МАКІ</TabsTrigger>
          <TabsTrigger value="original">ОРИГІНАЛЬНІ РОЛИ</TabsTrigger>
          <TabsTrigger value="salat">САЛАТ ЧУКА</TabsTrigger>
          <TabsTrigger value="drinks">НАПОЇ</TabsTrigger>      
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
