import { useRouter } from "next/navigation";
import { X } from "phosphor-react";
import { useState } from "react";

interface ModalHeaderProps {
  children: React.ReactNode;
}

export const ModalHeader = ({ children }: ModalHeaderProps) => {
  const { back } = useRouter();
  const [color, setColor] = useState("#fff");

  const handleMouseOver = () => {
    setColor("#ef4444");
  };

  const handleMouseOut = () => {
    setColor("#fff");
  };

  return (
    <header className="flex items-center justify-between">
      {children}
      <button type="button" onClick={() => back()} className="cursor-pointer">
        <X
          size={24}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          color={color}
          weight="fill"
        />
      </button>
    </header>
  );
};
