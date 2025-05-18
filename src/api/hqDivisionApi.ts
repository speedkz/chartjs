// HQ Division data types
export interface DivisionLevel {
  level1: number;
  level2: number;
  level3: number;
}

export interface DivisionData {
  id: string;
  name: string;
  levels: DivisionLevel;
}

// Mock API function to fetch HQ division data
export const fetchHQDivisionData = async (): Promise<DivisionData[]> => {
  // This simulates an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: "div1", 
          name: "AI클라우드사업부", 
          levels: { level1: 15, level2: 15, level3: 15 } 
        },
        { 
          id: "div2", 
          name: "Biztech i/DX", 
          levels: { level1: 28, level2: 4, level3: 0 } 
        },
        { 
          id: "div3", 
          name: "Entrue", 
          levels: { level1: 15, level2: 15, level3: 15 } 
        },
        { 
          id: "div4", 
          name: "금융", 
          levels: { level1: 15, level2: 0, level3: 0 } 
        },
        { 
          id: "div5", 
          name: "디지털비즈니스사업부", 
          levels: { level1: 15, level2: 15, level3: 0 } 
        },
        { 
          id: "div6", 
          name: "스마트팩토리사업부", 
          levels: { level1: 15, level2: 15, level3: 0 } 
        },
        { 
          id: "div7", 
          name: "엔터프라이즈솔루션사업부", 
          levels: { level1: 15, level2: 15, level3: 0 } 
        },
        { 
          id: "div8", 
          name: "통신", 
          levels: { level1: 15, level2: 0, level3: 0 } 
        }
      ]);
    }, 500); // Simulate network delay
  });
};
