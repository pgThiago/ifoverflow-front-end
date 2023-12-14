import { twMerge } from "tailwind-merge";

const Colors = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "success" | "warning" | "danger" | "info";
}

export const Button = ({
  children,
  onClick,
  className,
  color = "success",
}: ButtonProps) => {
  const selectedColor = Colors[color];
  return (
    <button
      onClick={onClick}
      // className={twMerge(`text-black hover:scale-110 transition-all duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md text-sm px-5 py-2.5 text-center`,
      className={twMerge(
        `flex justify-center hover:brightness-110 py-2 border text-xs text-slate-50 leading-tight uppercase rounded-md focus:shadow-lg focus:outline-none focus:ring-0 w-28`,
        className,
        selectedColor
      )}
    >
      {children}
    </button>
  );
};
