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
    id: 13,
    name: "Сет 'Суші Мікс'",
    description: "20 шт / 405 гр: Філадельфія 1/2, Каліфорнія з лососем в ікрі 1/2, Каліфорнія з крабом в кунжуті 1/2, Макі огірок",
    price: 319,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 14,
    name: "Сет 'Фієста'",
    description: "20 шт / 480 гр: Філадельфія 1/2, Каліфорнія з крабом в ікрі 1/2, Каліфорнія з тунцем теріякі 1/2, Лавв Чіз Торі 1/2, Макі вершковий лосось 1/2",
    price: 319,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 15,
    name: "Сет 'Запечений'",
    description: "24 шт / 740 гр: Запечений Філадельфія, Запечений з мідіями і беконом, Запечений Чікен",
    price: 399,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 16,
    name: "Сет 'Популярний'",
    description: "32 шт / 820 г: Філадельфія, Осака, Каліфорнія з тунцем теріякі, Макі вершковий лосось",
    price: 549,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 17,
    name: "Сет 'Філадельфія Плюс'",
    description: "26 шт / 800 гр: Філадельфія з лососем с/с, Лава Чіз Торі, Канада, Крім-суші з лососем 2шт",
    price: 569,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 18,
    name: "Сет 'Фішка'",
    description: "32 шт / 920 гр: Філадельфія, Філадельфія Грін, Каліфорнія з беконом, Норвезький",
    price: 619,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 19,
    name: "Сет 'Хіт Сет'",
    description: "32 шт /900 г: Чіз рол з креветкою, Філадельфія з беконом, Ніжність, Макі авокадо",
    price: 639,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 20,
    name: "Сет 'Комбі Сет'",
    description: "32 шт /1000 г: Філадельфія 50/50, Ніжність, Запечений Чікен, Запечений з лососем 1/2, Запечений з тунцем теріякі 1/2",
    price: 649,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 21,
    name: "Сет 'Фаворит'",
    description: "48 шт /1550 г: Філадельфія з лососем с/с, Чіз рол з лососем, Канада, Філадельфія Грін, Запечений з лососем, Запечений з тунцем теріякі",
    price: 999,
    image: sushiRollImage,
    category: "sets"
  },
  {
    id: 22,
    name: "Сет 'Пузаті суші'",
    description: "64 шт /1750 г: Філадельфія, Ніжність, Канада, Філадельфія з тунцем, Філадельфія з лососем та тунцем, Каліфорнія з беконом, Каліфорнія з лососем с/с в ікрі, Норвезький",
    price: 1499,
    image: sushiRollImage,
    category: "sets"
  },
  // Запечені
  {
    id: 23,
    name: "Запечений з лососем",
    description: "Лосось, огірок, тамаго, ікра масаго, рис, норі, унагі соус, кунжут, сирний соус",
    price: 229,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 24,
    name: "Запечений Чікен",
    description: "Курка теріякі, крем-сир, тамаго, ананас, унагі соус, кунжут, рис, норі, сирний соус",
    price: 189,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 25,
    name: "Запечений з мідіями і беконом",
    description: "Мідії копчені, бекон, тамаго, унагі соус, рис, норі, кунжут, сирний соус",
    price: 199,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 26,
    name: "Запечений з тунцем теріякі",
    description: "Тунець теріякі, тамаго, огірок, унагі соус, рис, норі, кунжут, сирний соус",
    price: 199,
    image: sushiRollImage,
    category: "zapecheni"
  },
  {
    id: 27,
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
    id: 29,
    name: "Каліфорнія з креветкою в кунжуті",
    description: "Креветка, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 30,
    name: "Каліфорнія з беконом в кунжуті",
    description: "Бекон, огірок, майонез, рис, норі, унагі соус, кунжут",
    price: 179,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 31,
    name: "Каліфорнія з тунцем теріякі",
    description: "Тунець, огірок, майонез, рис, норі, унагі соус, кунжут",
    price: 199,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 32,
    name: "Каліфорнія з вугрем в кунжуті",
    description: "Вугор, огірок, майонез, рис, норі, унагі соус, кунжут",
    price: 229,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 33,
    name: "Каліфорнія з лососем в кунжуті",
    description: "Лосось, авокадо, майонез, рис, норі, унагі соус, кунжут",
    price: 199,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 34,
    name: "Каліфорнія з лососем слабосолоним",
    description: "Лосось, авокадо, майонез, рис, норі, кунжут",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 35,
    name: "Каліфорнія з крабом в ікрі",
    description: "Краб-кейк, авокадо, майонез, рис, норі, ікра масаго",
    price: 199,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 36,
    name: "Каліфорнія з лососем в ікрі",
    description: "Лосось, авокадо, майонез, рис, норі, ікра масаго",
    price: 219,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 37,
    name: "Каліфорнія з тунцем в ікрі",
    description: "Тунець, авокадо, майонез, рис, норі, ікра масаго",
    price: 219,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 38,
    name: "Каліфорнія з лососем слабосоленим в ікрі",
    description: "Лосось с/с, авокадо, майонез, рис, норі, ікра масаго",
    price: 209,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  {
    id: 39,
    name: "Каліфорнія з креветкою в ікрі",
    description: "Креветка, авокадо, майонез, рис, норі, ікра масаго",
    price: 229,
    image: sushiRollImage,
    category: "kalifornija"
  },  
  // Суші / крім-суші
  {
    id: 40,
    name: "Суші-Лосось",
    description: "Лосось, рис",
    price: 49,
    image: sushiRollImage,
    category: "krim-sushi"
  },
 {
    id: 41,
    name: "Суші-Лосось слабосолений",
    description: "Лосось с/с, рис",
    price: 59,
    image: sushiRollImage,
    category: "krim-sushi"
  },
 {
    id: 42,
    name: "Креветка",
    description: "Креветка, рис",
    price: 59,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  {
    id: 43,
    name: "Тунець",
    description: "Тунець, рис",
    price: 49,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  {
    id: 44,
    name: "Вугор",
    description: "Вугор, рис, унагі соус, кунжут",
    price: 69,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  {
    id: 45,
    name: "Крім-суші з лососем",
    description: "Лосось, рис, крем-сир, норі",
    price: 49,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  {
    id: 46,
    name: "Крім-суші з лососем сабосоленим",
    description: "Лосось с/с, рис, крем-сир, норі",
    price: 59,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  {
    id: 47,
    name: "Крім-суші з креветкою",
    description: "Креветка, рис, крем-сир, норі",
    price: 59,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  {
    id: 48,
    name: "Крім-суші з тунцем",
    description: "Тунець, рис, крем-сир, норі",
    price: 49,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  {
    id: 49,
    name: "Крім-суші з вугрем",
    description: "Вугор рис, крем-сир, норі, унагі соус, кунжут",
    price: 69,
    image: sushiRollImage,
    category: "krim-sushi"
  },
  // Макі / футо-макі
  {
    id: 50,
    name: "Макі огірок",
    description: "Огірок, кунжут, рис, норі",
    price: 69,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 51,
    name: "Хіяші макі",
    description: "Суміш водоростей, горіховий соус, рис, норі",
    price: 79,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 52,
    name: "Макі авокадо",
    description: "Авокадо, кунжут, рис, норі, унагі соус",
    price: 79,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 53,
    name: "Макі лосось",
    description: "Лосось, рис, норі",
    price: 99,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 54,
    name: "Макі вершковий лосось",
    description: "Лосось, крем-сир, рис, норі",
    price: 109,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 55,
    name: "Макі тунець",
    description: "Тунець, рис, норі",
    price: 99,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 56,
    name: "Макі лосось слабосолений",
    description: "Лосось с/с, рис, норі",
    price: 109,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 57,
    name: "Макі лосось хіяші",
    description: "Лосось, чука, горіховий соус, кунжут, рис, норі",
    price: 109,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 58,
    name: "Макі вугор",
    description: "Вугор, унагі соус, кунжут, рис, норі",
    price: 129,
    image: sushiRollImage,
    category: "futo-maki"
  },
  {
    id: 60,
    name: "Макі вершкова креветка",
    description: "Креветка, крем-сир, рис, норі",
    price: 119,
    image: sushiRollImage,
    category: "futo-maki"
  },
  // Оригінальні роли / ЧІЗ РОЛИ
  {
    id: 61,
    name: "Канада",
    description: "Вугор, крем-сир, огірок, тамаго, краб-кейк, кунжут, рис, норі, унагі соус",
    price: 209,
    image: sushiRollImage,
    category: "original"
  },
  {
    id: 62,
    name: "Лава Чіз Торі",
    description: "Курка теріякі, крем-сир, тамаго, соус лава, рис, норі",
    price: 189,
    image: sushiRollImage,
    category: "original"
  },
  {
    id: 63,
    name: "Ніжність",
    description: "Лосось, крем-сир, тамаго, крабовий соус, рис, норі",
    price: 209,
    image: sushiRollImage,
    category: "original"
  },
  {
    id: 64,
    name: "Осака",
    description: "Лосось с/с, креветка, ікра масаго, крем-сир, огірок, рис, норі",
    price: 229,
    image: sushiRollImage,
    category: "original"
  },
  {
    id: 65,
    name: "Червоний дракон",
    description: "Вугор, лосось, тамаго, авокадо, ікра масаго, майонез, рис, норі",
    price: 309,
    image: sushiRollImage,
    category: "original"
  },
  {
    id: 66,
    name: "Чіз рол з лососем",
    description: "Лосось, крем-сир, огірок, тамаго, унагі соус, кунжут, сир Чедер, рис, норі",
    price: 199,
    image: sushiRollImage,
    category: "original"
  },
  {
    id: 67,
    name: "Чіз рол з креветкою",
    description: "Креветка, крем-сир, огірок, тамаго, унагі соус, кунжут, сир Чедер, рис, норі",
    price: 229,
    image: sushiRollImage,
    category: "original"
  },
  {
    id: 68,
    name: "Чіз рол з вугрем",
    description: "Вугор, крем-сир, огірок, тамаго, унагі соус, кунжут, сир Чедер, рис, норі",
    price: 239,
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
          <TabsTrigger value="original">ОРИГІНАЛЬНІ РОЛИ / ЧІЗ РОЛИ</TabsTrigger>
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
