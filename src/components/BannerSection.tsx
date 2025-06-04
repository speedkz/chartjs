import banner1 from '../assets/banners/banner1.png';
import banner2 from '../assets/banners/banner2.png';

function Banner({ type }) {
  const isRegister = type === 'register';
  return (
    <div className="rounded-3xl shadow-md flex justify-between items-center gap-5 px-10 py-5 h-40 bg-white overflow-hidden">
      <div className="flex flex-col justify-center gap-3 h-full">
        <div>
          <h2 className="text-2xl font-bold text-[#2B3238]">
            {isRegister 
              ? '산출 대상 제품을 등록해 주세요' 
              : '검색 대상 제품을 입력해 주세요'
            }
          </h2>
        </div>
        <div>
          <button className="bg-[#333333] border border-[#CCCCCC] text-[#686868] px-[18px] py-2 rounded-full text-base">
            {isRegister ? '제품 등록하기' : '제품 검색하기'}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img 
          src={isRegister ? banner1 : banner2} 
          alt={isRegister ? "Product Registration Banner" : "Product Search Banner"} 
          className="h-40 max-w-full object-contain"
        />
      </div>
    </div>
  );
}

function BannerSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      <Banner type="register" />
      <Banner type="search" />
    </div>
  );
}

export default BannerSection;
