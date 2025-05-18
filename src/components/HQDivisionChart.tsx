import React, { useCallback, useEffect, useState } from 'react';
import type { DivisionData } from '../api/hqDivisionApi';
import { fetchHQDivisionData } from '../api/hqDivisionApi';
import gridBackground from '../assets/hq-division/grid-background.svg';

interface HQDivisionChartProps {
  title?: string;
}

const HQDivisionChart: React.FC<HQDivisionChartProps> = ({
  title = "HQ Division"
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [divisions, setDivisions] = useState<DivisionData[]>([]);

  // Fetch division data on component mount
  useEffect(() => {
    const getDivisions = async () => {
      setLoading(true);
      try {
        const data = await fetchHQDivisionData();
        setDivisions(data);
      } catch (error) {
        console.error("Failed to fetch HQ division data:", error);
      } finally {
        setLoading(false);
      }
    };

    getDivisions();
  }, []);

  // Calculate maximum bar height for the chart
  const maxBarHeight = 60; // px

  // Calculate the bar heights based on data
  const getBarHeights = useCallback((division: DivisionData) => {
    const { level1, level2, level3 } = division.levels;
    
    // Scale bar heights proportionally to maxBarHeight
    const level1Height = (level1 / 45) * maxBarHeight; // Assuming max value is 45
    const level2Height = (level2 / 45) * maxBarHeight;
    const level3Height = (level3 / 45) * maxBarHeight;
    
    return { level1Height, level2Height, level3Height, totalHeight: level1Height + level2Height + level3Height };
  }, [maxBarHeight]);

  if (loading) {
    return (
      <div className="bg-[#101010] rounded-lg p-6 flex items-center justify-center min-h-[300px]">
        <div className="text-white">Loading division data...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#101010] rounded-lg p-6 flex flex-col gap-6">
      {/* Title */}
      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <h2 className="text-white text-lg font-bold">{title}</h2>
        </div>
      </div>        {/* Chart Container */}
      <div className="flex flex-col justify-between items-center h-[230px]">
        {/* Chart */}
        <div className="relative w-full h-[140px]">
          {/* Grid Background */}
          <div className="absolute inset-0 py-[6px]" style={{ height: '88px' }}>
            <img src={gridBackground} alt="Grid" className="w-full h-full" />
          </div>
            {/* Bars Container */}
          <div className="absolute top-0 left-0 right-0 flex items-end gap-1 justify-center" style={{ paddingTop: '6px', height: '88px' }}>
            {divisions.map((division) => {
              const { level1Height, level2Height, level3Height } = getBarHeights(division);
              
              return (                <div key={division.id} className="flex flex-col items-center gap-1 w-[63px] relative">
                  {/* Stacked Bars */}
                  <div className="flex flex-col justify-end items-center w-5 mb-2">
                    {level3Height > 0 && (
                      <div 
                        className="w-full bg-[#C6FF00]" 
                        style={{ height: `${level3Height}px` }}
                      ></div>
                    )}
                    {level2Height > 0 && (
                      <div 
                        className="w-full bg-[#FF9100]" 
                        style={{ height: `${level2Height}px` }}
                      ></div>
                    )}
                    {level1Height > 0 && (
                      <div 
                        className="w-full bg-[#07BFCB]" 
                        style={{ height: `${level1Height}px` }}
                      ></div>
                    )}
                  </div>                  {/* Label */}
                  <div className="text-white text-xs text-right w-full overflow-hidden" 
                       title={division.name}
                       style={{ 
                         transform: 'rotate(-45deg)',
                         transformOrigin: 'right top',
                         whiteSpace: 'nowrap',
                         marginTop: '2px',
                         marginRight: '5px',
                         position: 'absolute',
                         bottom: '-35px',
                         right: '20px',
                         maxWidth: '90px',
                         fontFamily: 'Pretendard, sans-serif',
                         letterSpacing: '-0.25px'
                       }}>
                    {division.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-3 mt-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-[#07BFCB]"></div>
            <span className="text-white text-xs">Level 1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-[#FF9100]"></div>
            <span className="text-white text-xs">Level 2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-[#C6FF00]"></div>
            <span className="text-white text-xs">Level 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HQDivisionChart;
