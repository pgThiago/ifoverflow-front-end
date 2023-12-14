interface HamburguerProps {
  toggleHamburguer: () => void;
  hamburguerIsActive: boolean;
}

export const Hamburguer = ({
  toggleHamburguer,
  hamburguerIsActive,
}: HamburguerProps) => {
  const genericHamburgerLine = `h-0.5 w-6 bg-white my-1 rounded-full transition ease transform duration-500`;

  return (
    <button
      className="flex z-40 flex-col h-12 w-6 border-none border-white rounded justify-center items-center group"
      onClick={toggleHamburguer}
    >
      <div
        className={`${genericHamburgerLine} ${
          hamburguerIsActive
            ? "rotate-45 translate-y-2 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          hamburguerIsActive
            ? "opacity-0"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          hamburguerIsActive
            ? "-rotate-45 -translate-y-3  opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};
