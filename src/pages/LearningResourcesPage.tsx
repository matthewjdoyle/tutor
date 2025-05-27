import React from 'react';
import { Section } from '../components/common/Section';
import { ProductCard } from '../components/product/ProductCard';
import { ExternalResourceCard } from '../components/externalResource/ExternalResourceCard';
import { storeProductsData, freeResourcesData, externalLearningResourcesData } from '../data';
import { Product } from '../types';


export const LearningResourcesPage: React.FC = () => { 
  const allProducts: Product[] = [...storeProductsData, ...freeResourcesData];
  allProducts.sort((a, b) => {
    if (a.isFree && !b.isFree) return 1; 
    if (!a.isFree && b.isFree) return -1; 
    return a.name.localeCompare(b.name); 
  });

  return (
    <>
      <Section 
        title="Learning Resources" 
        subtitle="Explore high-quality resources, including free downloads and premium study aids."
        className="mt-12 sm:mt-16 mb-12 sm:mb-16"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>
      <Section 
        title="Explore Other Useful Resources" 
        subtitle="A curated list of external websites to further support your learning journey."
        className="bg-neutral-muted-bg border-t border-neutral-border mt-12 sm:mt-16 mb-12 sm:mb-16"
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {externalLearningResourcesData.map(resource => (
            <ExternalResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </Section>
    </>
  );
};
