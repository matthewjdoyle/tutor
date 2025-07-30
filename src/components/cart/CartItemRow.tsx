import React from 'react';
import { CartItem } from '../../types';
import { Button } from '../common/Button';
import { TrashIcon } from '../../assets/icons';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center py-5 px-4 sm:px-6 border-b border-neutral-border last:border-b-0">
      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mr-4 border border-neutral-border" />
      <div className="flex-grow">
        <h3 className="text-md sm:text-lg font-heading font-semibold text-text-primary">{item.name}</h3>
        <p className="text-sm text-text-muted">{item.category}</p>
        <p className="text-md font-semibold text-brand-primary mt-1 sm:hidden">{item.price}</p>
      </div>
      <div className="hidden sm:block w-24 text-md font-semibold text-brand-primary text-right mr-4">{item.price}</div>
      <div className="w-28 sm:w-32 flex items-center justify-center mr-2 sm:mr-4">
        <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 h-8 w-8 !rounded-md" aria-label="Decrease quantity">-</Button>
        <input
          type="number"
          aria-label="Quantity"
          value={item.quantity}
          onChange={handleQuantityChange}
          onBlur={() => item.quantity < 1 && onUpdateQuantity(item.id, 1)} 
          className="w-10 h-8 text-center border-y border-neutral-border mx-1 text-text-primary bg-neutral-surface focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
          min="1"
        />
        <Button size="sm" variant="outline" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 h-8 w-8 !rounded-md" aria-label="Increase quantity">+</Button>
      </div>
      <div className="w-24 text-md font-semibold text-text-primary text-right mr-2 sm:mr-4">
        {item.numericPrice ? `£${(item.numericPrice * item.quantity).toFixed(2)}` : 'N/A'}
      </div>
      <Button variant="danger" size="sm" onClick={() => onRemoveItem(item.id)} className="p-2 !rounded-md" aria-label="Remove item">
        <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </div>
  );
};
