import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuItemProps {
  item: MenuItemType;
  onAdd: (item: MenuItemType) => void;
}

const MenuItem = ({ item, onAdd }: MenuItemProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col" role="listitem">
      <article itemScope itemType="https://schema.org/MenuItem">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={item.image} 
            alt={`${item.name} - ${item.description}`}
            itemProp="image"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        
        <CardHeader className="flex-grow">
          <CardTitle className="text-lg" itemProp="name">{item.name}</CardTitle>
          <CardDescription className="text-sm" itemProp="description">{item.description}</CardDescription>
        </CardHeader>
        
        <CardFooter className="flex items-center justify-between pt-0">
          <span className="text-2xl font-bold text-primary" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <span itemProp="price">{item.price}</span> <span itemProp="priceCurrency" content="UAH">₴</span>
          </span>
          <Button onClick={() => onAdd(item)} size="sm" variant="default" aria-label={`Додати ${item.name} до кошика`}>
            <Plus className="h-4 w-4 mr-1" aria-hidden="true" />
            Додати
          </Button>
        </CardFooter>
      </article>
    </Card>
  );
};

export default MenuItem;
