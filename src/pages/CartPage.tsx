import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { ShoppingCartIcon, ChevronRightIcon } from '../assets/icons';
import { CartItemRow } from '../components/cart/CartItemRow';
import { OrderSummary } from '../components/cart/OrderSummary';
import { useCart } from '../contexts/CartContext';

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getItemCount } = useCart();
  const navigate = useNavigate();

  if (getItemCount() === 0) {
    return (
      <Section title="Your Cart is Empty" subtitle="Looks like you haven't added any items yet." className="mt-12 sm:mt-16">
        <div className="text-center">
          <ShoppingCartIcon className="w-24 h-24 mx-auto text-neutral-border mb-6" />
          <p className="text-text-secondary mb-8">Browse our resources to find materials that suit your needs.</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/learning-resources')}>
            Explore Resources <ChevronRightIcon />
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Your Shopping Cart" subtitle={`You have ${getItemCount()} item(s) in your cart.`} className="mt-12 sm:mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-neutral-surface rounded-lg border border-neutral-border overflow-hidden">
          <div className="hidden sm:flex px-6 py-3 border-b border-neutral-border text-xs text-text-muted font-semibold uppercase tracking-wider">
            <div className="flex-grow pl-[112px]">Product</div> {/* Approx image + margin width */}
            <div className="w-24 text-right mr-4">Price</div>
            <div className="w-32 text-center mr-4">Quantity</div>
            <div className="w-24 text-right mr-4">Total</div>
            <div className="w-12 text-right"></div> {/* For remove button */}
          </div>
          {cartItems.map(item => (
            <CartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
            />
          ))}
        </div>
        <div className="mt-8 md:flex md:justify-between md:items-start gap-8">
          <div className="md:w-1/2 lg:w-2/3 mb-6 md:mb-0">
             <Button variant="outline" onClick={() => navigate('/learning-resources')}>
                Browse More Resources
            </Button>
          </div>
          <div className="md:w-1/2 lg:w-1/3">
            <OrderSummary total={getCartTotal()} />
            <Button variant="primary" size="lg" className="w-full mt-6" onClick={() => navigate('/checkout')}>
              Proceed to Checkout <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};
