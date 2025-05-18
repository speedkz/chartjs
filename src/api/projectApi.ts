// Project data types
export interface Project {
  id: string;
  name: string;
  size: number;
}

// Mock API function to fetch project size data
export const fetchProjectSizes = async (): Promise<Project[]> => {
  // This simulates an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "p1", name: "AI Innovation Hub - Enterprise Solution", size: 34.1 },
        { id: "p2", name: "Cloud Optimization Project - Premium Resources", size: 13.3 },
        { id: "p3", name: "Data Analytics Initiative - Real-time Processing", size: 20.1 },
        { id: "p4", name: "Cybersecurity Enhancement Program - Advanced Protection", size: 26.9 },
        { id: "p5", name: "Cloud Integration Task - Multi-platform Support", size: 3.0 }
      ]);
    }, 500); // Simulate network delay
  });
};
