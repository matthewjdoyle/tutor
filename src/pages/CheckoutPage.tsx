import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { OrderSummary } from '../components/cart/OrderSummary';
import { useCart } from '../contexts/CartContext';

export const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: ''
  });

  useEffect(() => {
    if (getItemCount() === 0 && !isSubmitting) {
      navigate('/cart');
    }
  }, [getItemCount, navigate, isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Checkout Data (Digital):", formData, cartItems); 
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation', { state: { orderNumber: `ORD-${Date.now()}` } });
      setIsSubmitting(false);
    }, 1500);
  };

  if (getItemCount() === 0 && !isSubmitting) { 
      return (
        <Section title="Checkout" subtitle="Your cart is empty.">
            <div className="text-center">
                <p className="text-text-secondary mb-6">Please add items to your cart before proceeding to checkout.</p>
                <Button variant="primary" onClick={() => navigate('/learning-resources')}>Return to Resources</Button>
            </div>
        </Section>
      );
  }

  return (
    <Section title="Checkout" subtitle="Please fill in your details to complete the purchase.">
      <div className="max-w-4xl mx-auto md:flex md:space-x-12">
        <div className="md:w-3/5 bg-neutral-surface p-8 rounded-xl border border-neutral-border mb-8 md:mb-0">
          <h3 className="text-2xl font-heading font-semibold text-text-primary mb-6">Your Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Full Name" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required autoComplete="name"/>
            <Input label="Email Address" type="email" name="email" id="email" value={formData.email} onChange={handleChange} required autoComplete="email"/>
            
            <div className="pt-6 border-t border-neutral-border">
                 <p className="text-sm text-text-muted mb-4">Payment details would be collected here via a secure gateway (e.g., Stripe Elements). This is a demo.</p>
                <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting} disabled={isSubmitting || getItemCount() === 0}>
                    {isSubmitting ? 'Processing Order...' : 'Place Order'}
                </Button>
            </div>
          </form>
        </div>

        <div className="md:w-2/5">
          <div className="sticky top-24">
            <OrderSummary total={getCartTotal()} />
            <div className="mt-6 bg-neutral-surface p-6 rounded-xl border border-neutral-border">
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-3">Items in your order:</h4>
                <ul className="space-y-2 max-h-60 overflow-y-auto text-sm">
                    {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between items-center text-text-secondary">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>£{(item.numericPrice ? item.numericPrice * item.quantity : 0).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
