// Monthly project level data types
export interface MonthlyProjectLevel {
  month: string;
  level1: number;
  level2: number;
  level3: number;
}

export interface MonthlyProjectData {
  category: string;
  data: MonthlyProjectLevel[];
}

// Mock API function to fetch monthly project level data
export const fetchMonthlyProjectLevels = async (category: string): Promise<MonthlyProjectData> => {
  // This simulates an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Different data based on category
      switch (category.toLowerCase()) {
        case 'construction':
          resolve({
            category: 'Construction',
            data: [
              { month: 'Feb', level1: 30, level2: 25, level3: 15 },
              { month: 'Mar', level1: 35, level2: 15, level3: 20 },
              { month: 'Apr', level1: 40, level2: 30, level3: 10 }
            ]
          });
          break;
        case 'transportation':
          resolve({
            category: 'Transportation', 
            data: [
              { month: 'Feb', level1: 20, level2: 30, level3: 10 },
              { month: 'Mar', level1: 25, level2: 20, level3: 15 },
              { month: 'Apr', level1: 35, level2: 25, level3: 20 }
            ]
          });
          break;
        case 'telecommunication':
        default:
          resolve({
            category: 'Telecommunication',
            data: [
              { month: 'Feb', level1: 25, level2: 20, level3: 10 },
              { month: 'Mar', level1: 30, level2: 25, level3: 15 },
              { month: 'Apr', level1: 45, level2: 35, level3: 25 }
            ]
          });
          break;
      }
    }, 500);
  });
};
