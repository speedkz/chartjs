// Project timeline data types
export interface ProjectStatus {
  id: string;
  name: string;
  status: "normal" | "warning" | "critical";
}

export interface ProjectPhase {
  requirementDiscussion: number;
  proposal: number;
  approved: number;
  developing: number;
}

export interface ProjectTimelineData {
  project: ProjectStatus;
  phases: ProjectPhase;
}

// Mock API function to fetch project timeline data
export const fetchProjectTimelines = async (): Promise<ProjectTimelineData[]> => {
  // This simulates an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          project: { id: "p1", name: "AI Innovation Hub", status: "normal" },
          phases: { requirementDiscussion: 2, proposal: 6, approved: 3, developing: 4 }
        },
        {
          project: { id: "p2", name: "Cloud Optimization Project", status: "normal" },
          phases: { requirementDiscussion: 3, proposal: 4, approved: 5, developing: 2 }
        },
        {
          project: { id: "p3", name: "Cybersecurity Enhancement Program", status: "warning" },
          phases: { requirementDiscussion: 0, proposal: 3, approved: 4, developing: 5 }
        },
        {
          project: { id: "p4", name: "Data Analytics Initiative", status: "normal" },
          phases: { requirementDiscussion: 4, proposal: 3, approved: 1, developing: 3 }
        },
        {
          project: { id: "p5", name: "Blockchain Integration Task", status: "critical" },
          phases: { requirementDiscussion: 5, proposal: 0, approved: 3, developing: 0 }
        }
      ]);
    }, 500);
  });
};
