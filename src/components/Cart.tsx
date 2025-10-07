import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { MenuItemType } from "./MenuItem";

export interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Ваше замовлення</SheetTitle>
          <SheetDescription>
            Перегляньте та підтвердіть ваше замовлення
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-muted-foreground text-lg mb-2">Ваш кошик порожній</p>
            <p className="text-sm text-muted-foreground">Додайте щось смачненьке!</p>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price} ₴</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="h-8 w-8 ml-auto"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                <span>Всього:</span>
                <span className="text-primary">{total} ₴</span>
              </div>
              
              <Button 
                className="w-full" 
                size="lg" 
                variant="hero"
                onClick={onCheckout}
              >
                Оформити замовлення
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
