import React from "react";
import arrowIcon from "../assets/icons/arrow-icon.svg";
import { statusColors } from "../api/productApi";

type StepIndicatorProps = {
  totalSteps: number;
  currentStep: number;
  status: "progress" | "complete" | "error";
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
  status,
}) => {
  const getColor = (step) => {
    if (step > currentStep) {
      return "bg-[#EDEDED]";
    }
    // Use status-matching colors from the status cards for the progress bar
    if (status === "error") return `bg-[${statusColors.error.main}]`; // Red from error status card
    if (status === "complete") return `bg-[${statusColors.complete.main}]`; // Green from complete status card
    return `bg-[${statusColors.progress.main}]`;
  };

  return (
    <div className="flex flex-row gap-[3px] w-full">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-3 flex-1 ${getColor(index + 1)} ${
            index === 0
              ? "rounded-l-[10px] rounded-r-[2px]"
              : index === totalSteps - 1
              ? "rounded-r-[10px] rounded-l-[2px]"
              : "rounded-[2px]"
          }`}
        />
      ))}
    </div>
  );
};

type TagProps = {
  text: string;
  variant?: "default" | "highlight";
};

const Tag: React.FC<TagProps> = ({ text, variant = "default" }) => {
  return (
    <div
      className={`
      py-[3px] px-2 rounded text-xs border
      ${
        variant === "highlight"
          ? "bg-[#FFF5F0] border-[#FFA77B] text-[#FFA172]"
          : "bg-white border-[#D9D9D9] text-[#999999]"
      }
    `}
    >
      {text}
    </div>
  );
};

type StatusBadgeProps = {
  status: "progress" | "complete" | "error";
  text: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "complete":
        return `${statusColors.complete.iconBg} text-[${statusColors.complete.main}]`;
      case "error":
        return `${statusColors.error.iconBg} text-[${statusColors.error.main}]`;
      default:
        return `${statusColors.progress.iconBg} text-[${statusColors.progress.main}]`;
    }
  };

  return (
    <div
      className={`${getStatusStyles()} rounded-full py-1 px-2 text-xs font-semibold`}
    >
      {text}
    </div>
  );
};

type ProductCardProps = {
  date: string;
  status: "progress" | "complete" | "error";
  statusText: string;
  productName: string;
  description: string;
  step: number;
  totalSteps: number;
  currentStep: number;
  tags: Array<{
    text: string;
    highlight?: boolean;
  }>;
  production?: string; // Production quantity information
  expanded?: boolean; // Whether the card is expanded
  onToggleExpand?: () => void; // Callback to toggle expanded state
};

const ProductCard: React.FC<ProductCardProps> = ({
  date,
  status,
  statusText,
  productName,
  description,
  totalSteps,
  currentStep,
  tags = [],
  production = "생산량 : 1,000kg (1 Ton)",
  expanded = false,
  onToggleExpand,
}) => {
  return (
    <div
      className={`bg-white border ${
        expanded
          ? `border-[${statusColors.progress.main}] shadow-lg h-full`
          : "border-[#EBEBEB]"
      } rounded-xl ${expanded ? "p-6" : "p-5"} flex flex-col ${
        expanded ? "gap-4" : "gap-3"
      } transition-all duration-300`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center flex-wrap gap-1">
          <div className="flex flex-row items-center gap-2">
            <p className="text-[#2C3238] text-base font-bold">{date}</p>
            <StatusBadge status={status} text={statusText} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-1 flex-1">
            <div className="w-full">
              <h3
                className={`${
                  expanded
                    ? `text-[${statusColors.progress.main}]`
                    : "text-[#2C3238]"
                } text-xl font-bold transition-colors duration-200`}
              >
                {productName}
              </h3>
            </div>

            <div className="flex flex-row flex-wrap gap-1 mt-1">
              {tags.map((tag, idx) => (
                <Tag
                  key={idx}
                  text={tag.text}
                  variant={tag.highlight ? "highlight" : "default"}
                />
              ))}
            </div>
            {expanded ? (
              <div className="mt-3">
                <p className="text-[#666666] text-base font-semibold">
                  {production}
                </p>
                <p className="text-[#666666] text-sm leading-6 mt-2">
                  {description}
                </p>
                {/* Additional details when expanded */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-[#F8F9FA] rounded-lg p-3">
                    <p className="text-[#2C3238] text-sm font-semibold">
                      제품 분류 코드
                    </p>
                    <p className="text-[#666666] text-sm mt-1">ADH-STC-001</p>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-lg p-3">
                    <p className="text-[#2C3238] text-sm font-semibold">단위</p>
                    <p className="text-[#666666] text-sm mt-1">Kg</p>
                  </div>
                </div>
                {/* Additional expanded content - more details */}
                <div className="mt-4 bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-[#2C3238] text-sm font-semibold">
                    추가 정보
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-[#666666] text-xs">담당자</p>
                      <p className="text-[#2C3238] text-sm">김영희</p>
                    </div>
                    <div>
                      <p className="text-[#666666] text-xs">등록일</p>
                      <p className="text-[#2C3238] text-sm">2025.01.01</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[#666666] text-sm leading-6 mt-2 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onToggleExpand}
            className="flex-shrink-0"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            <img
              src={arrowIcon}
              alt={expanded ? "Collapse" : "Expand"}
              className={`w-6 h-6 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`flex flex-row justify-between items-center flex-wrap gap-5 ${
          expanded ? "mt-4" : "mt-2"
        }`}
      >
        <p className="text-[#2C3238] text-base font-semibold">Step.{currentStep}</p>
        <StepIndicator
          totalSteps={totalSteps}
          currentStep={currentStep}
          status={status}
        />
      </div>
    </div>
  );
};

export default ProductCard;
