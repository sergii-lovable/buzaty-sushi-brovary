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
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardDescription className="text-sm">{item.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="flex items-center justify-between pt-0">
        <span className="text-2xl font-bold text-primary">{item.price} ₴</span>
        <Button onClick={() => onAdd(item)} size="sm" variant="default">
          <Plus className="h-4 w-4 mr-1" />
          Додати
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
