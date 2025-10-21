import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="Суші">🍣</span>
          <div>
            <h1 className="text-xl font-bold text-primary">Пузаті суші</h1>
            <div className="text-xs text-muted-foreground" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div itemProp="addressLocality">м. Бровари, Грушевського 7, пн-вихідний</div>
              <a 
                href="tel:+380771720707" 
                className="hover:text-primary transition-colors"
                itemProp="telephone"
              >
                +38 (077) 172 07 07
              </a>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          onClick={onCartClick}
          aria-label={`Кошик покупок${cartCount > 0 ? `, ${cartCount} товарів` : ', порожній'}`}
        >
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          {cartCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              aria-hidden="true"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
