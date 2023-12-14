interface ModalTitleProps {
  children: React.ReactNode;
}

export const ModalTitle = ({ children }: ModalTitleProps) => {
  return <h2 className="text-xl font-semibold text-white">{children}</h2>;
};
