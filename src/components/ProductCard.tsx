import React from "react";
import arrowIcon from "../assets/icons/arrow-icon.svg";
import "./ProductCard.css";

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
  const getColor = (step: number) => {
    if (step > currentStep) {
      return "indicator-inactive";
    }
    // Use status-matching colors from status cards
    if (status === "error") return "indicator-error"; 
    if (status === "complete") return "indicator-complete"; 
    return "indicator-progress";
  };
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`indicator-step ${getColor(index + 1)} ${
            index === 0
              ? "indicator-first"
              : index === totalSteps - 1
              ? "indicator-last"
              : "indicator-middle"
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
    <div className={`tag ${variant === "highlight" ? "tag-highlight" : "tag-default"}`}>
      {text}
    </div>
  );
};

type StatusBadgeProps = {
  status: "progress" | "complete" | "error";
  text: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  const getStatusClass = () => {
    switch (status) {
      case "complete":
        return "status-badge-complete";
      case "error":
        return "status-badge-error";
      default:
        return "status-badge-progress";
    }
  };

  return (
    <div className={`status-badge ${getStatusClass()}`}>
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
  return (    <div className={`product-card ${expanded ? 'product-card-expanded' : 'product-card-normal'} card-content`}>
      <div className="card-header">
        <div className="card-date-status">
          <div className="date-status-container">
            <p className="card-date">{date}</p>
            <StatusBadge status={status} text={statusText} />
          </div>
        </div>

        <div className="card-main-content">
          <div className="card-details">
            <div className="product-title">
              <h3 className={`product-title-text ${expanded ? 'product-title-text-expanded' : 'product-title-text-normal'}`}>
                {productName}
              </h3>
            </div>

            <div className="tags-container">
              {tags.map((tag, idx) => (
                <Tag
                  key={idx}
                  text={tag.text}
                  variant={tag.highlight ? "highlight" : "default"}
                />
              ))}
            </div>
            {expanded ? (
              <div className="expanded-content">
                <p className="production-info">
                  {production}
                </p>
                <p className="description">
                  {description}
                </p>
                {/* Additional details when expanded */}
                <div className="details-grid">
                  <div className="details-box">
                    <p className="details-title">
                      제품 분류 코드
                    </p>
                    <p className="details-value">ADH-STC-001</p>
                  </div>
                  <div className="details-box">
                    <p className="details-title">단위</p>
                    <p className="details-value">Kg</p>
                  </div>
                </div>
                {/* Additional expanded content - more details */}
                <div className="additional-info">
                  <p className="details-title">
                    추가 정보
                  </p>
                  <div className="info-grid">
                    <div>
                      <p className="info-label">담당자</p>
                      <p className="info-value">김영희</p>
                    </div>
                    <div>
                      <p className="info-label">등록일</p>
                      <p className="info-value">2025.01.01</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="description description-truncated">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onToggleExpand}
            className="toggle-button"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            <img
              src={arrowIcon}
              alt={expanded ? "Collapse" : "Expand"}
              className={`toggle-icon ${expanded ? "toggle-icon-expanded" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className={`step-container ${expanded ? "step-container-expanded" : "step-container-normal"}`}>
        <p className="step-text">Step.{currentStep}</p>
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
