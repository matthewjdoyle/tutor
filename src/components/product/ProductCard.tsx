import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../common/Button';
import { ArrowDownTrayIcon, ShoppingCartIcon, EyeIcon } from '../../assets/icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); 
  };
  
  const handleViewPDF = () => {
    if (product.pdfUrl) {
      window.open(product.pdfUrl, '_blank');
    }
  };

  const handleDownloadPDF = () => {
    if (product.pdfUrl) {
      const link = document.createElement('a');
      link.href = product.pdfUrl;
      link.download = product.pdfUrl.split('/').pop() || 'download.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="bg-neutral-surface rounded-xl border border-neutral-border hover:border-brand-primary/50 transition-colors duration-300 flex flex-col transition-shadow hover:shadow-lg">
      <Link to={product.isFree ? '#' : `/store/product/${product.id}`} className="block">
        <div 
          className="w-full h-48 rounded-t-xl bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url(${product.imageUrl})`,
            backgroundPosition: 'top left',
            backgroundSize: '190%' // Enlarge the image to show more detail
          }}
        />
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-semibold mb-2 text-text-primary">{product.name}</h3>
        <p className="text-text-secondary text-sm mb-4 flex-grow">{product.description}</p>
        <div className="mt-auto">
          {product.isFree ? (
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">FREE</span>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleViewPDF}>
                  <EyeIcon className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="primary" size="sm" onClick={handleDownloadPDF}>
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-brand-primary">{product.price}</span>
               <Button variant="primary" size="sm" onClick={handleAddToCart} disabled={isAdded || isInCart}>
                {isAdded ? 'Added!' : isInCart ? 'In Cart' : <><ShoppingCartIcon className="w-4 h-4 mr-2" />Add to Cart</>}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
