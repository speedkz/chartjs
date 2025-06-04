import React, { useEffect, useState } from 'react';
import gridIcon from '../assets/status-icons/grid-icon.svg';
import checkBrokenIcon from '../assets/status-icons/check-broken-icon.svg';
import clockBackwardIcon from '../assets/status-icons/clock-backward-icon.svg';
import annotationXIcon from '../assets/status-icons/annotation-x-icon.svg';
import { statusCardData, productService } from '../api/productApi';

type StatusCardProps = {
  id: string;
  title: string;
  count: string | number;
  iconBgColor: string;
  cardBgColor: string;
  isActive: boolean;
  icon: string;
  onClick: (id: string) => void;
};

const StatusCard: React.FC<StatusCardProps> = ({ 
  id, 
  title, 
  count, 
  iconBgColor, 
  cardBgColor,
  isActive, 
  icon,
  onClick 
}) => {
  return (
    <div 
      className={`flex flex-row items-center gap-4 px-6 py-5 pr-10 rounded-3xl ${
        isActive ? cardBgColor : 'bg-white border border-[#EBEBEB]'
      } flex-1 cursor-pointer transition-colors duration-200 hover:shadow-md`}
      onClick={() => onClick(id)}
    >
      <div className="relative">
        <div className={`w-12 h-12 rounded-full ${iconBgColor}`}>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={icon} alt={title} className="w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center flex-1">
        <div className="flex flex-row justify-between w-full">
          <p className={`text-xl ${isActive ? 'text-white' : 'text-[#222222]'}`}>{title}</p>
          <p className={`text-[42px] font-bold ${isActive ? 'text-white' : 'text-[#222222]'}`}>{count}</p>
        </div>
      </div>
    </div>
  );
};

type StatusCardsProps = {
  onStatusChange?: (id: string) => void;
};

const StatusCards: React.FC<StatusCardsProps> = ({ onStatusChange }) => {
  const [activeCardId, setActiveCardId] = useState<string>('all');
  const [statusCards, setStatusCards] = useState<Array<any>>([]);
  
  const handleCardClick = (id: string) => {
    setActiveCardId(id);
    if (onStatusChange) {
      onStatusChange(id);
    }
  };
  
  // Use useEffect to get counts from product service and prevent unnecessary re-renders
  useEffect(() => {
    const counts = productService.getStatusCounts();
    
    // Map status card data with icons and counts
    const cards = [
      {
        ...statusCardData[0],
        count: counts.all.toString(),
        icon: gridIcon
      },
      {
        ...statusCardData[1],
        count: counts.complete.toString(),
        icon: checkBrokenIcon
      },
      {
        ...statusCardData[2],
        count: counts.progress.toString(),
        icon: clockBackwardIcon
      },
      {
        ...statusCardData[3],
        count: counts.error.toString(),
        icon: annotationXIcon
      }
    ];
    
    setStatusCards(cards);
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="flex flex-row gap-3 w-full">
      {statusCards.map(card => (
        <StatusCard
          key={card.id}
          id={card.id}
          title={card.title}
          count={card.count}
          iconBgColor={card.iconBgColor}
          cardBgColor={card.cardBgColor}
          isActive={activeCardId === card.id}
          icon={card.icon}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default StatusCards;
