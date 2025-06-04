import React, { useState } from 'react';
import StatusCards from '../components/StatusCards';
import BannerSection from '../components/BannerSection';
import ProductList from '../components/ProductList';
import { type ProductStatus } from '../api/productApi';

const StatusPage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<'all' | ProductStatus>('all');
  
  const handleStatusChange = (id: string) => {
    // Convert status card id to product status type
    if (id === 'inProgress') {
      setActiveStatus('progress');
    } else if (id === 'complete' || id === 'error') {
      setActiveStatus(id as ProductStatus);
    } else {
      setActiveStatus('all');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">상태 대시보드</h1>
      <div className="flex flex-col gap-6">
        <BannerSection />
        <StatusCards onStatusChange={handleStatusChange} />
        <ProductList activeStatus={activeStatus} />
      </div>
    </div>
  );
};

export default StatusPage;
