import React from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  icon: IconType;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
}

function CategoryItem({ label, icon: Icon, description, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`
          flex flex-col items-center justify-center gap-2 py-3 px-2 border-b-2 hover:border-b-[2px] cursor-pointer transition hover:text-violet-600
          ${selected ? "border-b-neutral-800" : "border-transparent"}
          ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
    >
      <Icon size={24} />
      <div
        className={`text-sm font-medium  ${
          selected ? "font-bold text-violet-600 " : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default CategoryItem;