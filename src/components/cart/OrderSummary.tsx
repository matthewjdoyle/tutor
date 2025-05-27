import React from 'react';

interface OrderSummaryProps {
  total: number;
}
export const OrderSummary: React.FC<OrderSummaryProps> = ({ total }) => {
  const subtotal = total;
  const grandTotal = subtotal; // No tax/shipping for digital goods for now

  return (
    <div className="bg-neutral-muted-bg p-6 rounded-lg border border-neutral-border">
      <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">Order Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-text-primary pt-2 border-t border-neutral-border mt-2">
          <span>Total</span>
          <span>£{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
