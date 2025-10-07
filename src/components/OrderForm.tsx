import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "./Cart";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderComplete: () => void;
}

const OrderForm = ({ isOpen, onClose, items, total, onOrderComplete }: OrderFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Формуємо дані замовлення
    const orderDetails = items.map(item => 
      `${item.name} x${item.quantity} - ${item.price * item.quantity} ₴`
    ).join('\n');

    // URL вашої Google Form (замініть на свій)
    // Інструкція: створіть Google Form з полями: Ім'я, Телефон, Адреса, Замовлення, Коментар, Сума
    // Отримайте prefilled URL та замініть entry.XXXXX на відповідні ID полів
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
    
    const formBody = new URLSearchParams({
      "entry.YOUR_NAME_FIELD_ID": formData.name,
      "entry.YOUR_PHONE_FIELD_ID": formData.phone,
      "entry.YOUR_ADDRESS_FIELD_ID": formData.address,
      "entry.YOUR_ORDER_FIELD_ID": orderDetails,
      "entry.YOUR_COMMENT_FIELD_ID": formData.comment,
      "entry.YOUR_TOTAL_FIELD_ID": `${total} ₴`
    });

    try {
      // Відправка через fetch з mode: 'no-cors'
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString()
      });

      toast({
        title: "Замовлення прийнято! 🎉",
        description: "Ми зв'яжемося з вами найближчим часом",
      });

      onOrderComplete();
      onClose();
      
      // Очищення форми
      setFormData({
        name: "",
        phone: "",
        address: "",
        comment: ""
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Помилка",
        description: "Не вдалося надіслати замовлення. Спробуйте ще раз",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Оформлення замовлення</DialogTitle>
          <DialogDescription>
            Заповніть форму, і ми зв'яжемося з вами для підтвердження
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Ім'я *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ваше ім'я"
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+380 XX XXX XX XX"
            />
          </div>

          <div>
            <Label htmlFor="address">Адреса доставки *</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Вулиця, будинок, квартира"
            />
          </div>

          <div>
            <Label htmlFor="comment">Коментар</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Побажання до замовлення"
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Сума замовлення:</span>
              <span className="text-2xl font-bold text-primary">{total} ₴</span>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              variant="hero"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Відправка..." : "Підтвердити замовлення"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
