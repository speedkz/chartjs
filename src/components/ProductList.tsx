import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import moreArrowIcon from "../assets/icons/more-arrow-icon.svg";
import { productService } from "../api/productApi";

type ProductListProps = {
  activeStatus?: 'all' | 'complete' | 'progress' | 'error';
};

const ProductList: React.FC<ProductListProps> = ({ activeStatus = 'all' }) => {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  // Handle card toggle expansion
  const handleToggleExpand = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };
  
  // Get products from the API service using useEffect
  useEffect(() => {
    const products = productService.getProducts(
      activeStatus,
      undefined // Don't limit products here - we'll handle pagination with visibleCount
    );
    setFilteredProducts(products);
  }, [activeStatus]);
  
  // Load more products when button is clicked
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12); // Load 12 more products
  };
  
  // Calculate which products to display
  const productsToShow = filteredProducts.slice(0, visibleCount);
  
  // Show/hide load more button
  const showLoadMoreButton = visibleCount < filteredProducts.length;

  // Reset visible count and expanded card when activeStatus changes
  useEffect(() => {
    setVisibleCount(12);
    setExpandedCardId(null);
  }, [activeStatus]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center mb-3.5">
        <h2 className="text-2xl font-semibold text-[#222222]">제품등록 현황</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-min">
        {productsToShow.map((product) => {
          const isExpanded = expandedCardId === product.id;
          return (
            <div 
              key={product.id} 
              className={`${isExpanded ? 'row-span-2' : ''} transition-all duration-300`}
            >
              <ProductCard
                date={product.date}
                status={product.status}
                statusText={product.statusText}
                productName={product.productName}
                description={product.description}
                totalSteps={product.totalSteps}
                currentStep={product.currentStep}
                tags={product.tags}
                production={product.production || "생산량 : 1,000kg (1 Ton)"}
                expanded={isExpanded}
                onToggleExpand={() => handleToggleExpand(product.id)}
              />
            </div>
          );
        })}
      </div>
      {showLoadMoreButton && (
        <div className="flex justify-center mt-8">
          <button 
            className="flex items-center gap-2 bg-white rounded-full px-3.5 py-1 text-[#727272] hover:shadow-md transition-shadow"
            onClick={handleLoadMore}
          >
            <span className="text-sm">더보기</span>
            <img src={moreArrowIcon} alt="More" className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
