
export type ProductStatus = 'progress' | 'complete' | 'error';

export type ProductTag = {
  text: string;
  highlight?: boolean;
};

export type Product = {
  id: number;
  date: string;
  status: ProductStatus;
  statusText: string;
  productName: string;
  description: string;
  step: number;
  totalSteps: number;
  currentStep: number;
  tags: ProductTag[];
  production?: string;
};

export const statusTexts = {
  progress: "진행중",
  complete: "산출완료",
  error: "산출오류"
};

export const statusColors = {
  all: {
    main: '#726D6D',
    bg: 'bg-[#726D6D]',
    iconBg: 'bg-white',
  },
  complete: {
    main: '#59C464',
    bg: 'bg-[#59C464]',
    iconBg: 'bg-[#E6FFE8]',
  },
  progress: {
    main: '#447FEC',
    bg: 'bg-[#447FEC]',
    iconBg: 'bg-[#E8F0FF]',
  },
  error: {
    main: '#FA5B56',
    bg: 'bg-[#FA5B56]',
    iconBg: 'bg-[#FFEEEE]',
  },
};

export const statusCardData = [
  {
    id: 'all',
    title: '전체',
    count: '924',
    iconBgColor: 'bg-white',
    cardBgColor: 'bg-[#726D6D]',
  },
  {
    id: 'complete',
    title: '완료',
    count: '879',
    iconBgColor: 'bg-[#E6FFE8]',
    cardBgColor: 'bg-[#59C464]',
  },
  {
    id: 'inProgress',
    title: '진행중',
    count: '45',
    iconBgColor: 'bg-[#E8F0FF]',
    cardBgColor: 'bg-[#447FEC]',
  },
  {
    id: 'error',
    title: '오류',
    count: '12',
    iconBgColor: 'bg-[#FFEEEE]',
    cardBgColor: 'bg-[#FA5B56]',
  }
];

export const baseProducts: Product[] = [
  {
    id: 1,
    date: "2025-01-01",
    status: "progress",
    statusText: "진행중",
    productName: "ADHESIVE-STRUCTURAL",
    description:
      "입력한 모델 설명 문구 출력 입력한 모델 설명 문구 출력입력한 모델 설명 문구 출력입력한 모델 설명 문구 출력입력한 모델 설명 문구 출력 입력한 모델 설명 문구 출력입력한 모델 설명 문구 출력 문구 출력 문구 출력 입력한 모델 설명 문구 출력 입력한 모델 설명 문구 출력입력한 모델 설명 문구 출력입력한 모델 설명 문구 출력입력한 모델 설명 문구 출력 입력한 모델 설명 문구 출력",
    step: 3,
    totalSteps: 4,
    currentStep: 3,
    production: "생산량 : 1,000kg (1 Ton)",
    tags: [{ text: "2024" }, { text: "24.01~25.01" }, { text: "단일" }],
  },
  {
    id: 2,
    date: "2025-01-01",
    status: "progress",
    statusText: "진행중",
    productName: "ADHESIVE-STRUCTURAL",
    description:
      "입력한 모델 설명 문구 출력 입력한 모델 설명 문구 입력한 모델 설명 문구 출력 입력한 모델 설명 문구",
    step: 1,
    totalSteps: 4,
    currentStep: 1,
    tags: [
      { text: "2024" },
      { text: "24.01~25.01" },
      { text: "복수", highlight: true },
      { text: "KR" },
      { text: "경산공장" },
    ],
  },
  {
    id: 3,
    date: "2025-01-01",
    status: "error",
    statusText: "산출오류",
    productName: "ADHESIVE-STRUCTURAL",
    description:
      "입력한 모델 설명 문구 출력 입력한 모델 설명 문구 입력한 모델 설명 문구 출력 입력한 모델 설명 문구",
    step: 1,
    totalSteps: 4,
    currentStep: 1,
    tags: [{ text: "2024" }, { text: "24.01~25.01" }, { text: "단일" }],
  },
  {
    id: 4,
    date: "2025-01-01",
    status: "progress",
    statusText: "진행중",
    productName: "ADHESIVE-STRUCTURAL",
    description:
      "입력한 모델 설명 문구 출력 입력한 모델 설명 문구 입력한 모델 설명 문구 출력 입력한 모델 설명 문구",
    step: 1,
    totalSteps: 4,
    currentStep: 1,
    tags: [
      { text: "2024" },
      { text: "24.01~25.01" },
      { text: "복수", highlight: true },
    ],
  },
  {
    id: 5,
    date: "2025-01-01",
    status: "complete",
    statusText: "산출완료",
    productName: "ADHESIVE-STRUCTURAL",
    description:
      "입력한 모델 설명 문구 출력 입력한 모델 설명 문구 입력한 모델 설명 문구 출력 입력한 모델 설명 문구",
    step: 4,
    totalSteps: 4,
    currentStep: 4,
    tags: [{ text: "2024" }, { text: "24.01~25.01" }, { text: "단일" }],
  },
  {
    id: 6,
    date: "2025-01-01",
    status: "progress",
    statusText: "진행중",
    productName: "ADHESIVE-STRUCTURAL",
    description:
      "입력한 모델 설명 문구 출력 입력한 모델 설명 문구 입력한 모델 설명 문구 출력 입력한 모델 설명 문구",
    step: 1,
    totalSteps: 4,
    currentStep: 1,
    tags: [{ text: "2024" }, { text: "24.01~25.01" }, { text: "단일" }],
  },
];

// Function to generate more product data
export const generateMoreProducts = (startId: number, count: number): Product[] => {
  const statuses: ProductStatus[] = ["progress", "complete", "error"];
  
  return Array.from({ length: count }).map((_, index) => {
    const id = startId + index;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const step = randomStatus === "complete" ? 4 : Math.floor(Math.random() * 4) + 1;
    
    return {
      id,
      date: "2025-01-01",
      status: randomStatus,
      statusText: statusTexts[randomStatus],
      productName: `ADHESIVE-STRUCTURAL-${id}`,
      description:
        "입력한 모델 설명 문구 출력 입력한 모델 설명 문구 입력한 모델 설명 문구 출력 입력한 모델 설명 문구",
      step,
      totalSteps: 4,
      currentStep: step,
      production: `생산량 : ${1000 + id * 10}kg (${(1000 + id * 10) / 1000} Ton)`,
      tags: [
        { text: "2024" }, 
        { text: "24.01~25.01" }, 
        { text: id % 3 === 0 ? "복수" : "단일", highlight: id % 3 === 0 }
      ],
    };
  });
};

// Generate all products (base + additional) for use in components
export const getAllProducts = (): Product[] => {
  return [...baseProducts, ...generateMoreProducts(7, 20)];
};

// Service functions for product data
export const productService = {
  getProducts: (statusFilter?: string, limit?: number): Product[] => {
    const allProducts = getAllProducts();
    
    // Filter by status if provided
    const filtered = statusFilter && statusFilter !== 'all'
      ? allProducts.filter(product => {
          // Map 'inProgress' to 'progress' for compatibility
          return product.status === (statusFilter === 'inProgress' ? 'progress' : statusFilter);
        })
      : allProducts;
    
    // Apply limit if provided
    return limit ? filtered.slice(0, limit) : filtered;
  },
  
  getProductById: (id: number): Product | undefined => {
    return getAllProducts().find(product => product.id === id);
  },
  
  getStatusCounts: () => {
    const allProducts = getAllProducts();
    const counts = {
      all: allProducts.length,
      complete: 0,
      progress: 0,
      error: 0
    };
    
    allProducts.forEach(product => {
      counts[product.status]++;
    });
    
    return counts;
  }
};
